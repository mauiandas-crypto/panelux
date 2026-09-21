import { Order } from './orders-types'

// Manda el evento "purchase" real a GA4 desde el servidor, en el momento en
// que Mercado Pago confirma el pago (webhook) - no al crear el pedido, que
// es solo una aproximación del lado del cliente. Requiere un API secret de
// Measurement Protocol (GA4 Admin → Data Streams → tu stream → Measurement
// Protocol API secrets → Create). Sin esa variable de entorno, no hace nada
// (no rompe el webhook si todavía no está configurada).
export async function sendPurchaseEvent(order: Order): Promise<void> {
  const measurementId = process.env.NEXT_PUBLIC_GA_ID
  const apiSecret = process.env.GA_MEASUREMENT_PROTOCOL_API_SECRET

  if (!measurementId || !apiSecret) {
    console.warn('⚠️ GA_MEASUREMENT_PROTOCOL_API_SECRET no configurado, no se manda el evento purchase a GA4')
    return
  }

  // Sin el client_id real del navegador que hizo la compra, GA4 igual acepta
  // el evento pero no lo puede unir a la sesión original - se usa uno
  // generado como respaldo para que el evento no se pierda.
  const clientId = order.gaClientId || `${Date.now()}.${Math.floor(Math.random() * 1e10)}`

  const body = {
    client_id: clientId,
    events: [
      {
        name: 'purchase',
        params: {
          transaction_id: order.id,
          value: order.total,
          currency: 'UYU',
          shipping: order.costoEnvio ?? 0,
          coupon: order.cupon ?? undefined,
          items: order.items.map((item) => ({
            item_id: item.codigo,
            item_name: item.nombre,
            price: item.pvp,
            quantity: item.cantidad,
          })),
        },
      },
    ],
  }

  try {
    const res = await fetch(
      `https://www.google-analytics.com/mp/collect?measurement_id=${measurementId}&api_secret=${apiSecret}`,
      {
        method: 'POST',
        body: JSON.stringify(body),
      }
    )
    if (!res.ok) {
      console.error('❌ GA4 Measurement Protocol respondió', res.status)
    } else {
      console.log('✅ Evento purchase mandado a GA4 para', order.id)
    }
  } catch (error) {
    console.error('❌ Error mandando evento purchase a GA4:', error)
  }
}
