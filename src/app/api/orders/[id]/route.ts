import { NextRequest, NextResponse } from 'next/server'
import { getAdminSession } from '@/lib/admin-auth'
import { getOrderById, updateOrder } from '@/lib/orders-store'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const order = await getOrderById(id)

    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 })
    }

    // Un admin autenticado puede ver cualquier orden. Un cliente sin sesión
    // (no hay login de clientes) puede consultar la suya si conoce el id
    // Y el email con el que la hizo - así "Mis pedidos" funciona sin exponer
    // pedidos de otras personas a quien solo adivine un id.
    const isAdmin = await getAdminSession(request)
    if (!isAdmin) {
      const email = request.nextUrl.searchParams.get('email')?.trim().toLowerCase()
      if (!email || email !== order.cliente.email.trim().toLowerCase()) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
      }
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

    const updated = await updateOrder(id, updates)

    if (!updated) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 })
    }

    return NextResponse.json(updated)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update order' }, { status: 400 })
  }
}
