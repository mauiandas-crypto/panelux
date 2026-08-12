import { NextRequest, NextResponse } from 'next/server'

// En producción, usar base de datos real
let orders: any[] = []

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Por ahora devolver error 404 ya que no tenemos DB
    return NextResponse.json(
      { error: 'Order not found' },
      { status: 404 }
    )
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '')
    const isAdmin = token === process.env.ADMIN_PASSWORD

    if (!isAdmin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { estado, numeroSeguimiento, notas } = await request.json()
    const { id } = await params

    // En producción actualizar en DB
    console.log(`Actualizando orden ${id} a estado: ${estado}`)

    return NextResponse.json({
      id,
      estado,
      numeroSeguimiento,
      notas,
      fechaActualizacion: new Date().toISOString(),
    })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update order' }, { status: 400 })
  }
}
