'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface CartItem {
  codigo: string
  nombre: string
  pvp: number
  cantidad: number
}

interface CartImprovementsProps {
  items: CartItem[]
  subtotal: number
}

export default function CartImprovements({ items, subtotal }: CartImprovementsProps) {
  const [timeLeft, setTimeLeft] = useState(3600)
  const [couponCode, setCouponCode] = useState('')
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null)
  const [discountPercent, setDiscountPercent] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 3600))
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60
  const discount = (subtotal * discountPercent) / 100
  const total = subtotal - discount

  const coupons: Record<string, number> = {
    WELCOME10: 10,
    SUMMER20: 20,
    PANELUX50: 50,
  }

  const handleApplyCoupon = () => {
    const coupon = coupons[couponCode.toUpperCase()]
    if (coupon) {
      setAppliedCoupon(couponCode.toUpperCase())
      setDiscountPercent(coupon)
      setCouponCode('')
    } else {
      alert('Cupón no válido')
    }
  }

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-lg p-6 text-center">
        <p className="text-sm font-semibold mb-2">⏰ Oferta limitada</p>
        <div className="text-4xl font-bold font-mono">
          {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
        </div>
        <p className="text-orange-100 text-sm mt-2">Completa tu compra antes de que expire</p>
      </div>

      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="font-bold text-gray-900 mb-4">Resumen de Compra</h3>

        <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
          {items.map((item) => (
            <div key={item.codigo} className="flex justify-between text-sm">
              <span className="text-gray-700">
                {item.nombre} <span className="text-gray-500">x{item.cantidad}</span>
              </span>
              <span className="font-semibold text-gray-900">${(item.pvp * item.cantidad).toFixed(0)}</span>
            </div>
          ))}
        </div>

        <div className="flex justify-between mb-4 text-gray-700">
          <span>Subtotal:</span>
          <span className="font-semibold">${subtotal.toFixed(0)}</span>
        </div>

        <div className="flex justify-between mb-4 text-gray-700">
          <span>Envío a Montevideo:</span>
          <span className="font-semibold text-green-600">GRATIS ✓</span>
        </div>

        {discountPercent > 0 && (
          <div className="flex justify-between mb-4 text-green-600 font-semibold">
            <span>Descuento ({discountPercent}%):</span>
            <span>-${discount.toFixed(0)}</span>
          </div>
        )}

        <div className="flex justify-between text-xl font-bold text-gray-900 pt-4 border-t-2 border-gray-300">
          <span>Total:</span>
          <span className="text-blue-600">${total.toFixed(0)}</span>
        </div>
      </div>

      <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6">
        <h4 className="font-bold text-gray-900 mb-3">🎁 Código de descuento</h4>

        {!appliedCoupon ? (
          <div className="flex gap-2">
            <input
              type="text"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              placeholder="Ej: WELCOME10"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
              onKeyPress={(e) => e.key === 'Enter' && handleApplyCoupon()}
            />
            <button
              onClick={handleApplyCoupon}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition"
            >
              Aplicar
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-between bg-green-100 border-l-4 border-green-600 p-4 rounded">
            <span className="text-green-700 font-semibold">✓ Cupón aplicado: {appliedCoupon}</span>
            <button
              onClick={() => {
                setAppliedCoupon(null)
                setDiscountPercent(0)
              }}
              className="text-green-600 hover:text-green-800 font-bold"
            >
              Cambiar
            </button>
          </div>
        )}

        <p className="text-xs text-gray-600 mt-3">
          <strong>Cupones disponibles:</strong> {Object.keys(coupons).join(', ')}
        </p>
      </div>

      <div className="space-y-3">
        <Link
          href="/checkout"
          className="block w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-4 px-6 rounded-lg text-center transition transform hover:scale-105 shadow-lg"
        >
          💳 Ir a Pagar
        </Link>
        <Link
          href="/"
          className="block w-full bg-gray-200 hover:bg-gray-300 text-gray-900 font-bold py-3 px-6 rounded-lg text-center transition"
        >
          Seguir Comprando
        </Link>
      </div>
    </div>
  )
}
