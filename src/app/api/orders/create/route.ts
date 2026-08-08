import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

// POST /api/orders/create
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const {
      email,
      items,
      total,
      discount,
      coupon,
      orderId,
    } = body

    if (!email || !items || items.length === 0 || !orderId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Crear orden en BD
    const order = await prisma.order.create({
      data: {
        email,
        orderId,
        total,
        discount: discount || 0,
        coupon: coupon || null,
        status: 'pending',
        items: {
          create: items.map(
            (item: { name: string; quantity: number; price: number }) => ({
              productId: item.name.toLowerCase().replace(/\s+/g, '-'),
              productName: item.name,
              quantity: item.quantity,
              price: item.price,
            })
          ),
        },
      },
      include: { items: true },
    })

    return NextResponse.json({
      success: true,
      orderId: order.id,
      externalOrderId: order.orderId,
    })
  } catch (error) {
    console.error('Error creating order:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
