import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { sendOrderConfirmation } from '@/lib/email'

// POST /api/webhooks/mercadopago
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Mercado Pago envía diferentes tipos de notificaciones
    // Nos interesan las de payment con status
    if (body.type !== 'payment') {
      return NextResponse.json({ received: true })
    }

    const paymentData = body.data
    const paymentId = paymentData.id

    // Obtener información completa del pago desde MP
    const mpToken = process.env.MERCADOPAGO_ACCESS_TOKEN
    if (!mpToken) {
      return NextResponse.json(
        { error: 'MP token not configured' },
        { status: 500 }
      )
    }

    const paymentDetails = await fetch(
      `https://api.mercadopago.com/v1/payments/${paymentId}`,
      {
        headers: {
          Authorization: `Bearer ${mpToken}`,
        },
      }
    ).then((res) => res.json())

    // Verificar estado del pago
    if (paymentDetails.status === 'approved') {
      // Buscar la orden asociada por el external_reference
      const orderData = paymentDetails.external_reference
        ? JSON.parse(Buffer.from(paymentDetails.external_reference, 'base64').toString())
        : null

      if (!orderData) {
        console.error('No order data in payment:', paymentDetails)
        return NextResponse.json({ received: true })
      }

      // Actualizar estado de la orden en la BD
      const order = await prisma.order.update({
        where: { orderId: orderData.orderId },
        data: {
          status: 'approved',
          paymentId: paymentId.toString(),
        },
      })

      // Registrar pago
      await prisma.payment.create({
        data: {
          orderId: order.id,
          mpPaymentId: paymentId.toString(),
          mpStatus: 'approved',
          amount: paymentDetails.transaction_amount,
        },
      })

      // Enviar email de confirmación
      const items = await prisma.orderItem.findMany({
        where: { orderId: order.id },
      })

      await sendOrderConfirmation({
        email: order.email,
        orderId: order.orderId,
        total: order.total,
        items: items.map((item) => ({
          name: item.productName,
          quantity: item.quantity,
          price: item.price,
        })),
        discount: order.discount,
      })

      console.log('Orden confirmada:', order.id)
    } else if (paymentDetails.status === 'rejected') {
      // Buscar y actualizar orden como fallida
      const orderData = paymentDetails.external_reference
        ? JSON.parse(Buffer.from(paymentDetails.external_reference, 'base64').toString())
        : null

      if (orderData) {
        await prisma.order.update({
          where: { orderId: orderData.orderId },
          data: { status: 'failed' },
        })
      }
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
