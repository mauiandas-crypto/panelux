'use client'

import Link from 'next/link'
import { useCart } from '@/context/CartContext'
import { useAdmin } from '@/context/AdminContext'
import { useEffect, useState } from 'react'

export default function CarritoPage() {
  const { items, removerDelCarrito, actualizarCantidad, total, limpiarCarrito } = useCart()
  const { data } = useAdmin()
  const [mounted, setMounted] = useState(false)
  const [couponCode, setCouponCode] = useState('')
  const [appliedCoupon, setAppliedCoupon] = useState<any>(null)
  const [couponError, setCouponError] = useState('')

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleApplyCoupon = () => {
    setCouponError('')
    const coupon = data.coupons.find(
      c => c.code.toLowerCase() === couponCode.toLowerCase() && c.active
    )

    if (!coupon) {
      setCouponError('Cupón no válido')
      return
    }

    // Verificar si el cupón ha expirado
    if (new Date(coupon.expiresAt) < new Date()) {
      setCouponError('Cupón expirado')
      return
    }

    // Verificar usos máximos
    if (coupon.usedCount >= coupon.maxUses) {
      setCouponError('Cupón sin usos disponibles')
      return
    }

    // Verificar compra mínima
    if (coupon.minPurchase > 0 && total < coupon.minPurchase) {
      setCouponError(`Compra mínima: $${coupon.minPurchase}`)
      return
    }

    setAppliedCoupon(coupon)
    setCouponCode('')
  }

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null)
  }

  const calculateDiscount = () => {
    if (!appliedCoupon) return 0
    if (appliedCoupon.discountType === 'percentage') {
      return (total * appliedCoupon.discount) / 100
    }
    return appliedCoupon.discount
  }

  const discount = calculateDiscount()
  const finalTotal = total - discount

  if (!mounted) return null

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-white pt-24 pb-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Tu carrito está vacío</h1>
          <p className="text-gray-600 mb-8">Agrega productos a tu carrito para continuar</p>
          <Link
            href="/"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition"
          >
            Volver al catálogo
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white pt-24 pb-20">
      <div className="max-w-6xl mx-auto px-6">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Tu carrito</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Productos */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              {items.map((item) => (
                <div
                  key={item.codigo}
                  className="border-b border-gray-200 p-6 flex gap-6 hover:bg-gray-50 transition"
                >
                  {/* Imagen */}
                  <div className="w-24 h-24 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden">
                    <img
                      src={item.imagen}
                      alt={item.nombre}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Detalles */}
                  <div className="flex-1">
                    <Link
                      href={`/productos/${item.codigo}`}
                      className="text-lg font-bold text-gray-900 hover:text-blue-600 transition"
                    >
                      {item.nombre}
                    </Link>
                    <p className="text-gray-600 mt-1">Código: {item.codigo}</p>
                    <p className="text-2xl font-bold text-blue-600 mt-2">${item.pvp}</p>

                    {/* Cantidad */}
                    <div className="flex items-center gap-3 mt-4">
                      <span className="text-gray-600">Cantidad:</span>
                      <button
                        onClick={() => actualizarCantidad(item.codigo, item.cantidad - 1)}
                        className="bg-gray-200 hover:bg-gray-300 text-gray-900 font-bold py-1 px-3 rounded"
                      >
                        −
                      </button>
                      <span className="text-lg font-bold text-gray-900 w-8 text-center">
                        {item.cantidad}
                      </span>
                      <button
                        onClick={() => actualizarCantidad(item.codigo, item.cantidad + 1)}
                        className="bg-gray-200 hover:bg-gray-300 text-gray-900 font-bold py-1 px-3 rounded"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Subtotal y acciones */}
                  <div className="text-right">
                    <p className="text-gray-600 text-sm mb-2">Subtotal</p>
                    <p className="text-2xl font-bold text-blue-600 mb-4">
                      ${(item.pvp * item.cantidad).toLocaleString('es-UY')}
                    </p>
                    <button
                      onClick={() => removerDelCarrito(item.codigo)}
                      className="text-red-600 hover:text-red-700 font-bold text-sm"
                    >
                      🗑️ Remover
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Acciones */}
            <div className="flex gap-4 mt-8">
              <Link
                href="/"
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-900 font-bold py-3 px-6 rounded-lg transition text-center"
              >
                ← Seguir comprando
              </Link>
              <button
                onClick={limpiarCarrito}
                className="flex-1 bg-red-100 hover:bg-red-200 text-red-700 font-bold py-3 px-6 rounded-lg transition"
              >
                🗑️ Vaciar carrito
              </button>
            </div>
          </div>

          {/* Resumen */}
          <div className="lg:col-span-1">
            <div className="bg-blue-50 rounded-lg shadow-lg p-8 sticky top-28">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Resumen</h2>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between">
                  <span className="text-gray-600">Cantidad de items:</span>
                  <span className="font-bold text-gray-900">{items.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total de unidades:</span>
                  <span className="font-bold text-gray-900">
                    {items.reduce((acc, item) => acc + item.cantidad, 0)}
                  </span>
                </div>
                <div className="border-t border-blue-200 pt-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-lg font-bold text-gray-900">Subtotal:</span>
                    <span className="text-xl font-bold text-gray-900">
                      ${total.toLocaleString('es-UY')}
                    </span>
                  </div>

                  {/* Descuento del cupón */}
                  {appliedCoupon && (
                    <div className="flex justify-between text-green-600 mb-2">
                      <span className="font-semibold">Descuento ({appliedCoupon.code}):</span>
                      <span className="font-bold">
                        -${discount.toLocaleString('es-UY')}
                      </span>
                    </div>
                  )}

                  {/* Total final */}
                  <div className="flex justify-between pt-2 border-t border-blue-200">
                    <span className="text-lg font-bold text-gray-900">Total:</span>
                    <span className="text-3xl font-bold text-blue-600">
                      ${finalTotal.toLocaleString('es-UY')}
                    </span>
                  </div>
                </div>
              </div>

              {/* Cupón */}
              {!appliedCoupon ? (
                <div className="mb-6 p-4 bg-white rounded-lg border-2 border-gray-200">
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    🎟️ Código de cupón
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => {
                        setCouponCode(e.target.value.toUpperCase())
                        setCouponError('')
                      }}
                      placeholder="WELCOME10"
                      className="flex-1 px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                    />
                    <button
                      onClick={handleApplyCoupon}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition"
                    >
                      Aplicar
                    </button>
                  </div>
                  {couponError && (
                    <p className="text-red-600 text-sm mt-2">{couponError}</p>
                  )}
                </div>
              ) : (
                <div className="mb-6 p-4 bg-green-50 rounded-lg border-2 border-green-200">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-bold text-green-900">✓ Cupón aplicado</p>
                      <p className="text-sm text-green-700">{appliedCoupon.code}</p>
                    </div>
                    <button
                      onClick={handleRemoveCoupon}
                      className="text-red-600 hover:text-red-700 font-bold"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              )}

              {/* Beneficios */}
              <div className="bg-white rounded-lg p-4 mb-6">
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <span>✅</span>
                    <span className="text-gray-700">Envío seguro</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span>✅</span>
                    <span className="text-gray-700">Hasta 6 cuotas</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span>✅</span>
                    <span className="text-gray-700">Garantía oficial</span>
                  </li>
                </ul>
              </div>

              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-lg transition mb-3">
                Ir a pagar
              </button>

              <Link
                href="/"
                className="block text-center text-blue-600 hover:text-blue-700 font-bold text-sm"
              >
                Continuar comprando
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
