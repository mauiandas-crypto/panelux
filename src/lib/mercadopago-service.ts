// Integración con Mercado Pago
// Documentación: https://www.mercadopago.com.uy/developers/es

interface MercadopagoPreference {
  items: Array<{
    id: string
    title: string
    quantity: number
    unit_price: number
  }>
  payer: {
    name: string
    email: string
    phone: {
      area_code: string
      number: string
    }
  }
  back_urls: {
    success: string
    failure: string
    pending: string
  }
  auto_return: string
  external_reference: string
}

export async function createMercadopagoPreference(orderData: any): Promise<string | null> {
  try {
    const preference: MercadopagoPreference = {
      items: orderData.items.map((item: any) => ({
        id: item.codigo,
        title: item.nombre,
        quantity: item.cantidad,
        unit_price: item.pvp,
      })),
      payer: {
        name: orderData.cliente.nombre,
        email: orderData.cliente.email,
        phone: {
          area_code: '598',
          number: orderData.cliente.telefono.replace(/\D/g, ''),
        },
      },
      back_urls: {
        success: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/confirmacion?status=success&order_id=${orderData.id}`,
        failure: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout?status=failure&order_id=${orderData.id}`,
        pending: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/confirmacion?status=pending&order_id=${orderData.id}`,
      },
      auto_return: 'approved',
      external_reference: orderData.id,
    }

    // En producción, hacer request a la API de Mercado Pago
    // const response = await fetch('https://api.mercadopago.com/checkout/preferences', {
    //   method: 'POST',
    //   headers: {
    //     'Authorization': `Bearer ${process.env.MERCADOPAGO_ACCESS_TOKEN}`,
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(preference),
    // })

    // const data = await response.json()
    // return data.init_point // URL del checkout

    console.log('🔗 Mercado Pago preference creada para orden:', orderData.id)
    // Por ahora retornar URL simulada
    return `https://www.mercadopago.com.uy/checkout/v1/redirect?pref_id=test_${orderData.id}`
  } catch (error) {
    console.error('Error creating Mercado Pago preference:', error)
    return null
  }
}

export async function verifyMercadopagoPayment(paymentId: string): Promise<boolean> {
  try {
    // En producción, verificar el pago con Mercado Pago
    // const response = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
    //   headers: {
    //     'Authorization': `Bearer ${process.env.MERCADOPAGO_ACCESS_TOKEN}`,
    //   },
    // })

    // const data = await response.json()
    // return data.status === 'approved'

    console.log('✅ Pago verificado en Mercado Pago:', paymentId)
    return true
  } catch (error) {
    console.error('Error verifying Mercado Pago payment:', error)
    return false
  }
}

export function getMercadopagoCheckoutLink(orderData: any): string {
  // Generar un link de checkout de Mercado Pago
  const params = new URLSearchParams({
    preference_id: `test_${orderData.id}`,
  })
  return `https://www.mercadopago.com.uy/checkout/v1/redirect?${params.toString()}`
}
