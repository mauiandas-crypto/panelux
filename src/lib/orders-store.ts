import { Order } from './orders-types'

// Estado compartido en memoria entre /api/orders y /api/orders/[id]. Antes
// cada uno de esos archivos de ruta tenía su propio array `orders` separado
// (cada route.ts es su propio módulo), así que un cambio de estado hecho por
// PATCH /api/orders/[id] nunca se veía reflejado en lo que devolvía
// GET /api/orders - el admin cambiaba el estado de un pedido y, al recargar,
// volvía a aparecer como si nada hubiera pasado.
// Sigue siendo en memoria (pendiente: base de datos real), pero al menos
// ambas rutas ahora leen y escriben el mismo array.
let orders: Order[] = []

export function getOrders(): Order[] {
  return orders
}

export function getOrderById(id: string): Order | undefined {
  return orders.find((o) => o.id === id)
}

export function addOrder(order: Order): Order {
  orders.push(order)
  return order
}

export function updateOrder(id: string, updates: Partial<Order>): Order | null {
  const index = orders.findIndex((o) => o.id === id)
  if (index === -1) return null

  orders[index] = {
    ...orders[index],
    ...updates,
    fechaActualizacion: new Date().toISOString(),
  }
  return orders[index]
}
