import crypto from 'crypto'
import { Order } from './orders-types'

// Manda el evento "Purchase" real a Meta desde el servidor (Conversions
// API), en el momento en que Mercado Pago confirma el pago - más confiable
// que el píxel del navegador, que se pierde con bloqueadores de anuncios y
// las restricciones de privacidad de iOS. Requiere un access token de Meta
// (Events Manager → tu conjunto de datos → Configurar API de conversiones →
// Generar token de acceso manualmente). Sin esa variable de entorno, no
// hace nada (no rompe el webhook si todavía no está configurada).
function sha256(value: string): string {
  return crypto.createHash('sha256').update(value.trim().toLowerCase()).digest('hex')
}

export async function sendMetaPurchaseEvent(order: Order): Promise<void> {
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID
  const accessToken = process.env.META_CONVERSIONS_API_ACCESS_TOKEN

  if (!pixelId || !accessToken) {
    console.warn('⚠️ META_CONVERSIONS_API_ACCESS_TOKEN no configurado, no se manda el evento Purchase a Meta')
    return
  }

  const body = {
    data: [
      {
        event_name: 'Purchase',
        event_time: Math.floor(Date.now() / 1000),
        event_id: order.id, // deduplica con el evento del píxel del navegador si tiene el mismo id
        action_source: 'website',
        event_source_url: `https://panelux.com.uy/checkout/confirmacion`,
        user_data: {
          em: [sha256(order.cliente.email)],
          ph: [sha256(order.cliente.telefono.replace(/\D/g, ''))],
        },
        custom_data: {
          value: order.total,
          currency: 'UYU',
          content_ids: order.items.map((item) => item.codigo),
          contents: order.items.map((item) => ({
            id: item.codigo,
            quantity: item.cantidad,
            item_price: item.pvp,
          })),
        },
      },
    ],
  }

  try {
    const res = await fetch(
      `https://graph.facebook.com/v21.0/${pixelId}/events?access_token=${accessToken}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      }
    )
    if (!res.ok) {
      console.error('❌ Meta Conversions API respondió', res.status, await res.text())
    } else {
      console.log('✅ Evento Purchase mandado a Meta para', order.id)
    }
  } catch (error) {
    console.error('❌ Error mandando evento Purchase a Meta:', error)
  }
}
