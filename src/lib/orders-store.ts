import prisma from './prisma'
import { Order } from './orders-types'

// Antes esto era un array en memoria del proceso, compartido entre
// /api/orders y /api/orders/[id] - pero al vivir en memoria de una función
// serverless, se perdía en cada redeploy o cold start (los pedidos
// "desaparecían"). Ahora persiste en Postgres.

function toOrder(row: {
  id: string
  fecha: Date
  clienteNombre: string
  clienteEmail: string
  clienteTelefono: string
  clienteDireccion: string
  clienteCiudad: string
  items: unknown
  subtotal: number
  descuento: number
  cupon: string | null
  costoEnvio: number
  total: number
  estado: string
  metodoPago: string
  numeroSeguimiento: string | null
  mpPaymentId: string | null
  notas: string | null
  fechaActualizacion: Date
}): Order {
  return {
    id: row.id,
    fecha: row.fecha.toISOString(),
    cliente: {
      nombre: row.clienteNombre,
      email: row.clienteEmail,
      telefono: row.clienteTelefono,
      direccion: row.clienteDireccion,
      ciudad: row.clienteCiudad,
    },
    items: row.items as Order['items'],
    subtotal: row.subtotal,
    descuento: row.descuento,
    cupon: row.cupon ?? undefined,
    costoEnvio: row.costoEnvio,
    total: row.total,
    estado: row.estado as Order['estado'],
    metodoPago: row.metodoPago as Order['metodoPago'],
    numeroSeguimiento: row.numeroSeguimiento ?? undefined,
    mpPaymentId: row.mpPaymentId ?? undefined,
    notas: row.notas ?? undefined,
    fechaActualizacion: row.fechaActualizacion.toISOString(),
  }
}

export async function getOrders(): Promise<Order[]> {
  const rows = await prisma.order.findMany({ orderBy: { fecha: 'desc' } })
  return rows.map(toOrder)
}

export async function getOrderById(id: string): Promise<Order | undefined> {
  const row = await prisma.order.findUnique({ where: { id } })
  return row ? toOrder(row) : undefined
}

export async function addOrder(order: Order): Promise<Order> {
  const row = await prisma.order.create({
    data: {
      id: order.id,
      fecha: new Date(order.fecha),
      clienteNombre: order.cliente.nombre,
      clienteEmail: order.cliente.email,
      clienteTelefono: order.cliente.telefono,
      clienteDireccion: order.cliente.direccion,
      clienteCiudad: order.cliente.ciudad,
      items: order.items as unknown as object,
      subtotal: order.subtotal,
      descuento: order.descuento,
      cupon: order.cupon,
      costoEnvio: order.costoEnvio ?? 0,
      total: order.total,
      estado: order.estado,
      metodoPago: order.metodoPago,
      numeroSeguimiento: order.numeroSeguimiento,
      mpPaymentId: order.mpPaymentId,
      notas: order.notas,
    },
  })
  return toOrder(row)
}

// Solo aplica los campos que realmente vinieron, para no pisar con
// `undefined` un valor que ya tenía la orden.
export async function updateOrder(id: string, updates: Partial<Order>): Promise<Order | null> {
  const data: Record<string, unknown> = {}
  if (updates.estado !== undefined) data.estado = updates.estado
  if (updates.numeroSeguimiento !== undefined) data.numeroSeguimiento = updates.numeroSeguimiento
  if (updates.notas !== undefined) data.notas = updates.notas
  if (updates.mpPaymentId !== undefined) data.mpPaymentId = updates.mpPaymentId

  try {
    const row = await prisma.order.update({ where: { id }, data })
    return toOrder(row)
  } catch {
    return null
  }
}
