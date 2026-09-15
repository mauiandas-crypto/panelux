import { NextRequest, NextResponse } from 'next/server'
import { getAdminData } from '@/lib/admin-data-store'

// Endpoint público (sin login) para que el checkout valide un cupón contra
// los datos que gestiona el admin en /admin/coupons. Antes el checkout
// validaba contra una lista fija en el código (lib/cupones.ts) que el admin
// no podía tocar; ahora hay una sola fuente de verdad.
export async function POST(request: NextRequest) {
  try {
    const { codigo, total } = await request.json()

    if (!codigo || typeof codigo !== 'string') {
      return NextResponse.json(
        { valido: false, error: 'Ingresa un código de cupón' },
        { status: 400 }
      )
    }

    const { coupons } = getAdminData()
    const cupon = coupons.find(
      (c) => c.code.toUpperCase() === codigo.trim().toUpperCase()
    )

    if (!cupon) {
      return NextResponse.json({ valido: false, error: 'Cupón no encontrado' })
    }

    if (!cupon.active) {
      return NextResponse.json({ valido: false, error: 'Cupón inactivo' })
    }

    if (new Date(cupon.expiresAt) < new Date()) {
      return NextResponse.json({ valido: false, error: 'Cupón vencido' })
    }

    if (cupon.usedCount >= cupon.maxUses) {
      return NextResponse.json({ valido: false, error: 'Cupón agotado' })
    }

    if (cupon.minPurchase && total < cupon.minPurchase) {
      return NextResponse.json({
        valido: false,
        error: `Monto mínimo: $${cupon.minPurchase.toLocaleString('es-UY')}`,
      })
    }

    const descuento =
      cupon.discountType === 'percentage'
        ? (total * cupon.discount) / 100
        : cupon.discount

    return NextResponse.json({
      valido: true,
      cupon: {
        codigo: cupon.code,
        descripcion: `${cupon.discountType === 'percentage' ? cupon.discount + '%' : '$' + cupon.discount} de descuento`,
        descuento,
      },
    })
  } catch (error) {
    console.error('Error validating coupon:', error)
    return NextResponse.json(
      { valido: false, error: 'Error validando el cupón' },
      { status: 500 }
    )
  }
}
