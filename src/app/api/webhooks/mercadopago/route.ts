import { NextRequest, NextResponse } from 'next/server'
import { getPaymentInfo } from '@/lib/mercadopago/client'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    console.log('🔔 Webhook de Mercado Pago recibido:', body)

    const { type, data } = body

    if (type !== 'payment') {
      return NextResponse.json({ received: true })
    }

    const paymentId = data.id
    const paymentInfo = await getPaymentInfo(paymentId)

    if (!paymentInfo) {
      console.error('❌ No se pudo obtener información del pago:', paymentId)
      return NextResponse.json({ error: 'Payment not found' }, { status: 404 })
    }

    console.log('💰 Información del pago:', {
      id: paymentInfo.id,
      status: paymentInfo.status,
      external_reference: paymentInfo.external_reference,
      amount: paymentInfo.transaction_amount,
    })

    const orderId = paymentInfo.external_reference

    if (paymentInfo.status === 'approved') {
      console.log('✅ Pago aprobado para orden:', orderId)
    } else if (paymentInfo.status === 'rejected' || paymentInfo.status === 'cancelled') {
      console.log('❌ Pago rechazado/cancelado para orden:', orderId)
    } else if (paymentInfo.status === 'pending' || paymentInfo.status === 'in_process') {
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
