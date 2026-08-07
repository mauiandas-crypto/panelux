import { NextRequest, NextResponse } from 'next/server'
import { createPaymentPreference } from '@/lib/mercadopago/client'
import { MP_CONFIG } from '@/lib/mercadopago/config'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { items, email, orderId } = body

    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: 'No items provided' },
        { status: 400 }
      )
    }

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    // Crear preferencia de pago
    const preference = await createPaymentPreference({
      items: items.map((item: any) => ({
        title: item.name,
        quantity: item.quantity,
        unit_price: item.price,
        currency_id: 'UYU', // Uruguay pesos
      })),
      payer: {
        email,
      },
      back_urls: {
        success: MP_CONFIG.successUrl,
        failure: MP_CONFIG.cancelUrl,
        pending: MP_CONFIG.cancelUrl,
      },
      auto_return: 'approved',
      external_reference: orderId || `order-${Date.now()}`,
      notification_url: MP_CONFIG.notificationUrl,
    })

    if (!preference) {
      return NextResponse.json(
        { error: 'Failed to create payment preference' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      preferenceId: preference.id,
      initPoint: preference.init_point,
      sandboxInitPoint: preference.sandbox_init_point,
    })
  } catch (error) {
    console.error('Error creating preference:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
