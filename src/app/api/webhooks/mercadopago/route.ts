import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validar que sea un webhook de Mercado Pago
    // En producción, verificar la firma del webhook

    if (body.type === 'payment') {
      const paymentId = body.data.id
      const externalReference = body.external_reference

      console.log(`💳 Pago confirmado: ${paymentId}`)
      console.log(`📋 Orden: ${externalReference}`)

      // TODO: Actualizar estado de la orden a "pagado"
      // TODO: Enviar email de confirmación de pago

      return NextResponse.json({ success: true })
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Error processing webhook:', error)
    return NextResponse.json({ error: 'Webhook error' }, { status: 400 })
  }
}
