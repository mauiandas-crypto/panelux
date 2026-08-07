// Cliente para interactuar con la API de Mercado Pago
import { MP_CONFIG, CreatePreferenceData } from './config'

const MP_API_BASE = 'https://api.mercadopago.com'

export interface PreferenceResponse {
  id: string
  init_point: string
  sandbox_init_point: string
}

export async function createPaymentPreference(
  data: CreatePreferenceData
): Promise<PreferenceResponse | null> {
  if (!MP_CONFIG.accessToken) {
    console.error('❌ Mercado Pago access token no configurado')
    return null
  }

  try {
    const response = await fetch(`${MP_API_BASE}/checkout/preferences`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${MP_CONFIG.accessToken}`,
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error('Error creating Mercado Pago preference:', errorData)
      return null
    }

    const preference: PreferenceResponse = await response.json()
    return preference
  } catch (error) {
    console.error('Error calling Mercado Pago API:', error)
    return null
  }
}

export interface PaymentNotification {
  id: string
  type: 'payment' | 'plan' | 'subscription' | 'invoice'
  action: string
  data: {
    id: string
  }
}

export async function getPaymentInfo(paymentId: string) {
  if (!MP_CONFIG.accessToken) {
    console.error('❌ Mercado Pago access token no configurado')
    return null
  }

  try {
    const response = await fetch(`${MP_API_BASE}/v1/payments/${paymentId}`, {
      headers: {
        Authorization: `Bearer ${MP_CONFIG.accessToken}`,
      },
    })

    if (!response.ok) {
      console.error('Error fetching payment info')
      return null
    }

    return await response.json()
  } catch (error) {
    console.error('Error fetching payment info:', error)
    return null
  }
}
