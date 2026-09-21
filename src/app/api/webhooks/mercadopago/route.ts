import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import { getPaymentInfo } from '@/lib/mercadopago/client'
import { getOrderById, updateOrder } from '@/lib/orders-store'
import { sendPurchaseEvent } from '@/lib/ga4-measurement-protocol'

// Valida la firma x-signature que Mercado Pago envía si se configuró una
// "clave secreta" para el webhook en el panel de MP. Sin esa variable de
// entorno no hay nada que verificar (limitación conocida, no bloqueante:
// MP igual firma la notificación con el external_reference real).
function isValidSignature(request: NextRequest, dataId: string): boolean {
  const secret = process.env.MERCADOPAGO_WEBHOOK_SECRET
  if (!secret) return true

  const xSignature = request.headers.get('x-signature')
  const xRequestId = request.headers.get('x-request-id')
  if (!xSignature || !xRequestId) return false

  const parts = Object.fromEntries(
    xSignature.split(',').map((p) => {
      const [k, v] = p.split('=')
      return [k?.trim(), v?.trim()]
    })
  )
  const ts = parts.ts
  const hash = parts.v1
  if (!ts || !hash) return false

  const manifest = `id:${dataId};request-id:${xRequestId};ts:${ts};`
  const expected = crypto.createHmac('sha256', secret).update(manifest).digest('hex')

  try {
    return crypto.timingSafeEqual(Buffer.from(hash), Buffer.from(expected))
  } catch {
    return false
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { type, data } = body

    if (type !== 'payment') {
      return NextResponse.json({ received: true })
    }

    const paymentId = data.id

    if (!isValidSignature(request, String(paymentId))) {
      console.error('❌ Firma de webhook inválida, se ignora la notificación')
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
    }

    const paymentInfo = await getPaymentInfo(paymentId)

    if (!paymentInfo) {
      console.error('❌ No se pudo obtener información del pago:', paymentId)
      return NextResponse.json({ error: 'Payment not found' }, { status: 404 })
    }

    const orderId = paymentInfo.external_reference
    const order = orderId ? await getOrderById(orderId) : undefined

    if (!order) {
      console.error('❌ Orden no encontrada para el pago:', orderId)
      return NextResponse.json({ received: true })
    }

    if (paymentInfo.status === 'approved') {
      const yaEstabaPagada = order.estado === 'pagado'
      await updateOrder(orderId, { estado: 'pagado', mpPaymentId: String(paymentInfo.id) })
      console.log('✅ Pago aprobado, orden actualizada:', orderId)

      // Mercado Pago puede reintentar la misma notificación varias veces;
      // solo mandar el evento de conversión real la primera vez que se
      // confirma, para no contar la misma compra dos veces en GA4.
      if (!yaEstabaPagada) {
        await sendPurchaseEvent({ ...order, estado: 'pagado', mpPaymentId: String(paymentInfo.id) })
      }
    } else if (paymentInfo.status === 'rejected' || paymentInfo.status === 'cancelled') {
      await updateOrder(orderId, { estado: 'cancelado', mpPaymentId: String(paymentInfo.id) })
      console.log('❌ Pago rechazado/cancelado, orden actualizada:', orderId)
    } else if (paymentInfo.status === 'pending' || paymentInfo.status === 'in_process') {
      await updateOrder(orderId, { mpPaymentId: String(paymentInfo.id) })
      console.log('⏳ Pago pendiente para orden:', orderId)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('❌ Error en webhook:', error)
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  return NextResponse.json({ status: 'ok' })
}
