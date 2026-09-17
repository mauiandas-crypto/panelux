import { NextRequest, NextResponse } from 'next/server'
import { getAdminSession } from '@/lib/admin-auth'
import { getOrderById, updateOrder } from '@/lib/orders-store'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    if (!(await getAdminSession(request))) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params
    const order = getOrderById(id)

    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 })
    }

    return NextResponse.json(order)
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    if (!(await getAdminSession(request))) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { id } = await params

    // Solo aplicar los campos que realmente vinieron en el body, para no
    // pisar con `undefined` un valor que ya tenía la orden.
    const updates: Record<string, unknown> = {}
    if (body.estado !== undefined) updates.estado = body.estado
    if (body.numeroSeguimiento !== undefined) updates.numeroSeguimiento = body.numeroSeguimiento
    if (body.notas !== undefined) updates.notas = body.notas

    const updated = updateOrder(id, updates)

    if (!updated) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 })
    }

    return NextResponse.json(updated)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update order' }, { status: 400 })
  }
}
