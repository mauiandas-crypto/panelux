import { NextRequest, NextResponse } from 'next/server'
import { Order } from '@/lib/orders-types'
import { sendEmail, getOrderConfirmationEmail } from '@/lib/email-service'
import { updateInventoryAfterOrder } from '@/lib/odoo-service'
import { createMercadopagoPreference } from '@/lib/mercadopago-service'
import { getAdminSession } from '@/lib/admin-auth'

// Almacenar órdenes en memoria (en producción usar base de datos)
let orders: Order[] = []

export async function GET(request: NextRequest) {
  try {
    // Verificar si es una solicitud autenticada (admin)
    if (!(await getAdminSession(request))) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Si es admin, devolver todas las órdenes
    return NextResponse.json(orders)
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const orderData = await request.json()

    const newOrder: Order = {
      id: 'ORD-' + Date.now(),
      fecha: new Date().toISOString(),
      cliente: orderData.cliente,
      items: orderData.items,
      subtotal: orderData.subtotal,
      descuento: orderData.descuento || 0,
      cupon: orderData.cupon,
      total: orderData.total,
      estado: 'pendiente',
      metodoPago: orderData.metodoPago || 'mercadopago',
      notas: orderData.notas,
      fechaActualizacion: new Date().toISOString(),
    }

    orders.push(newOrder)

    // Enviar email de confirmación
    const emailHtml = getOrderConfirmationEmail(newOrder)
    await sendEmail({
      to: newOrder.cliente.email,
      subject: `Confirmación de pedido ${newOrder.id}`,
      html: emailHtml,
    })

    // Actualizar inventario en Odoo
    await updateInventoryAfterOrder(newOrder)

    // Crear preferencia de Mercado Pago si es el método de pago
    if (newOrder.metodoPago === 'mercadopago') {
      const mpLink = await createMercadopagoPreference(newOrder)
      if (mpLink) {
        newOrder.mpPaymentId = mpLink
      }
    }

    console.log('✅ Nueva orden creada:', newOrder.id)

    return NextResponse.json(newOrder, { status: 201 })
  } catch (error) {
    console.error('Error creating order:', error)
    return NextResponse.json({ error: 'Failed to create order' }, { status: 400 })
  }
}
