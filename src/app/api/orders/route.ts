import { NextRequest, NextResponse } from 'next/server'
import { Order } from '@/lib/orders-types'
import { getAdminSession } from '@/lib/admin-auth'
import { getOrders, addOrder } from '@/lib/orders-store'
import { incrementCouponUsage } from '@/lib/admin-data-store'

export async function GET(request: NextRequest) {
  try {
    // Verificar si es una solicitud autenticada (admin)
    if (!(await getAdminSession(request))) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Si es admin, devolver todas las órdenes
    return NextResponse.json(await getOrders())
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const orderData = await request.json()

    const newOrder: Order = {
      // Usar el id que ya generó el checkout, que es el mismo que se manda
      // como external_reference a Mercado Pago y al email de confirmación.
      // Generar uno nuevo acá los desincronizaba: la orden en el admin nunca
      // iba a poder cruzarse con la notificación de pago del webhook.
      id: orderData.id || 'ORD-' + Date.now(),
      fecha: new Date().toISOString(),
      cliente: orderData.cliente,
      items: orderData.items,
      subtotal: orderData.subtotal,
      descuento: orderData.descuento || 0,
      cupon: orderData.cupon,
      costoEnvio: orderData.costoEnvio || 0,
      total: orderData.total,
      estado: 'pendiente',
      metodoPago: orderData.metodoPago || 'mercadopago',
      notas: orderData.notas,
      fechaActualizacion: new Date().toISOString(),
    }

    const created = await addOrder(newOrder)

    if (newOrder.cupon) {
      await incrementCouponUsage(newOrder.cupon)
    }

    // El email real (Resend) y la preference real de Mercado Pago se generan
    // desde el checkout (/api/emails/send-confirmation y
    // /api/payments/create-preference), que sí llaman a las APIs reales con
    // el cupón y el envío ya calculados. Antes esta ruta también intentaba
    // hacer su propia versión de ambas cosas (más una sincronización con
    // Odoo), pero eran simulaciones que solo hacían console.log y nunca
    // pegaban a ningún servicio real - se sacaron para no tener dos caminos
    // haciendo lo mismo, uno de ellos falso.
    console.log('✅ Nueva orden creada:', newOrder.id)

    return NextResponse.json(created, { status: 201 })
  } catch (error) {
    console.error('Error creating order:', error)
    return NextResponse.json({ error: 'Failed to create order' }, { status: 400 })
  }
}
