'use client'

import { useCart } from '@/context/cart-context'
import { useState } from 'react'

interface CheckoutButtonProps {
  email?: string
}

export default function CheckoutButton({ email = '' }: CheckoutButtonProps) {
  const { items, total } = useCart()
  const [loading, setLoading] = useState(false)
  const [emailInput, setEmailInput] = useState(email)
  const [error, setError] = useState('')

  const handleCheckout = async () => {
    if (!emailInput) {
      setError('Por favor ingresa tu email')
      return
    }

    if (items.length === 0) {
      setError('Tu carrito está vacío')
      return
    }

    setLoading(true)
    setError('')

    try {
      const orderId = `order-${Date.now()}`

      // 1. Crear orden en BD
      const createOrderResponse = await fetch('/api/orders/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: emailInput,
          items: items.map((item) => ({
            name: item.name,
            quantity: item.quantity,
            price: item.price,
          })),
          total,
          orderId,
        }),
      })

      if (!createOrderResponse.ok) {
        setError('Error al crear la orden')
        return
      }

      // 2. Crear preferencia de pago en Mercado Pago
      const response = await fetch('/api/payments/create-preference', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: items.map((item) => ({
            name: item.name,
            quantity: item.quantity,
            price: item.price,
          })),
          email: emailInput,
          orderId,
        }),
      })

      const data = await response.json()

      if (data.success && data.initPoint) {
        // Redirigir a Mercado Pago
        window.location.href = data.initPoint
      } else {
        setError(data.error || 'Error al procesar el pago')
      }
    } catch (err) {
      setError('Error al conectar con Mercado Pago')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-900 text-sm">
          {error}
        </div>
      )}

      <input
        type="email"
        placeholder="tu@email.com"
        value={emailInput}
        onChange={(e) => setEmailInput(e.target.value)}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
      />

      <button
        onClick={handleCheckout}
        disabled={loading || items.length === 0}
        className="w-full px-6 py-3 bg-cyan-500 text-white font-bold rounded-lg hover:bg-cyan-600 disabled:bg-gray-400 transition-colors flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <span className="animate-spin">⏳</span>
            Procesando...
          </>
        ) : (
          <>
            💳 Pagar ${total.toFixed(2)} con Mercado Pago
          </>
        )}
      </button>

      <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-900">
        <p className="font-bold mb-1">🔒 Pago Seguro</p>
        <p>Tus datos están protegidos por Mercado Pago. Se abrirá una nueva ventana.</p>
      </div>
    </div>
  )
}
