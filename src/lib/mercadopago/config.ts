// Configuración de Mercado Pago
export const MP_CONFIG = {
  // Access Token de Mercado Pago
  // Obtén tu token en: https://www.mercadopago.com.uy/developers/panel
  accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN || '',

  // URL de retorno después del pago (success)
  successUrl: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/payment/success`,

  // URL de retorno si el usuario cancela
  cancelUrl: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/carrito`,

  // URL de notificación de webhook
  notificationUrl: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/webhooks/mercadopago`,
}

export function validateMercadoPagoConfig(): boolean {
  if (!MP_CONFIG.accessToken) {
    console.warn('⚠️ MERCADOPAGO_ACCESS_TOKEN no está configurado')
    return false
  }
  return true
}

export interface PaymentItem {
  title: string
  quantity: number
  unit_price: number
  currency_id: string
}

export interface CreatePreferenceData {
  items: PaymentItem[]
  payer: {
    email: string
    name?: string
    surname?: string
  }
  back_urls: {
    success: string
    failure: string
    pending: string
  }
  auto_return: 'approved' | 'all'
  external_reference: string
  notification_url: string
}
