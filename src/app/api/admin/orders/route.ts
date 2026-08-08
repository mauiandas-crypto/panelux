import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { getAdminSession } from '@/lib/admin-auth'

// GET /api/admin/orders - Obtener todas las órdenes
export async function GET(request: NextRequest) {
  // Verificar autenticación
  if (!getAdminSession(request)) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    )
  }

  try {
    const orders = await prisma.order.findMany({
      include: {
        items: true,
        reviews: true,
      },
      orderBy: { createdAt: 'desc' },
    })

    // Calcular estadísticas
    const stats = {
      totalOrders: orders.length,
      approvedOrders: orders.filter((o) => o.status === 'approved').length,
      pendingOrders: orders.filter((o) => o.status === 'pending').length,
      totalRevenue: orders
        .filter((o) => o.status === 'approved')
        .reduce((sum, o) => sum + o.total, 0),
      totalDiscount: orders.reduce((sum, o) => sum + o.discount, 0),
    }

    return NextResponse.json({
      success: true,
      stats,
      orders,
    })
  } catch (error) {
    console.error('Error fetching admin orders:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// PATCH /api/admin/orders - Actualizar estado de orden
export async function PATCH(request: NextRequest) {
  if (!getAdminSession(request)) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    )
  }

  try {
    const body = await request.json()
    const { orderId, status } = body

    if (!orderId || !status) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const order = await prisma.order.update({
      where: { id: orderId },
      data: { status },
      include: { items: true },
    })

    return NextResponse.json({
      success: true,
      order,
    })
  } catch (error) {
    console.error('Error updating order:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
