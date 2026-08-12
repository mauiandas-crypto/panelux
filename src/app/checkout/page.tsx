'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useCart } from '@/context/CartContext'
import { useOrder } from '@/context/OrderContext'

export default function CheckoutPage() {
  const router = useRouter()
  const { items, total, limpiarCarrito } = useCart()
  const { addOrder } = useOrder()

  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    direccion: '',
    ciudad: 'Montevideo',
  })

  const [metodoPago, setMetodoPago] = useState<'mercadopago' | 'transferencia' | 'efectivo'>('mercadopago')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-white pt-24 pb-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Tu carrito está vacío</h1>
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      // Validar formulario
      if (!formData.nombre || !formData.email || !formData.telefono || !formData.direccion) {
        setError('Por favor completa todos los campos')
        setLoading(false)
        return
      }

      // Crear orden
      const order = {
        cliente: formData,
        items,
        subtotal: total,
        descuento: 0,
        total,
        metodoPago,
        notas: `Pedido realizado el ${new Date().toLocaleDateString('es-UY')}`,
      }

      await addOrder(order)

      // Limpiar carrito
      limpiarCarrito()

      // Redirigir a confirmación
      router.push('/checkout/confirmacion')
    } catch (err) {
      setError('Error al procesar tu pedido. Intenta nuevamente.')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white pt-24 pb-20">
      <div className="max-w-6xl mx-auto px-6">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Formulario */}
          <div>
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Datos de envío</h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-1">
                    Nombre completo
                  </label>
                  <input
                    type="text"
                    value={formData.nombre}
                    onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                    placeholder="Tu nombre"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                    placeholder="tu@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-1">
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    value={formData.telefono}
                    onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                    placeholder="+598 9 1234 5678"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-1">
                    Dirección
                  </label>
                  <input
                    type="text"
                    value={formData.direccion}
                    onChange={(e) => setFormData({ ...formData, direccion: e.target.value })}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                    placeholder="Calle y número"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-1">
                    Ciudad
                  </label>
                  <select
                    value={formData.ciudad}
                    onChange={(e) => setFormData({ ...formData, ciudad: e.target.value })}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                  >
                    <option>Montevideo</option>
                    <option>Canelones</option>
                    <option>Maldonado</option>
                    <option>Otra</option>
                  </select>
                </div>

                {/* Método de pago */}
                <div className="border-t-2 border-gray-200 pt-6 mt-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Método de pago</h3>

                  <div className="space-y-3">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="pago"
                        value="mercadopago"
                        checked={metodoPago === 'mercadopago'}
                        onChange={(e) => setMetodoPago(e.target.value as any)}
                        className="w-4 h-4"
                      />
                      <span className="text-gray-900 font-semibold">💳 Mercado Pago (Tarjeta, Efectivo)</span>
                    </label>

                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="pago"
                        value="transferencia"
                        checked={metodoPago === 'transferencia'}
                        onChange={(e) => setMetodoPago(e.target.value as any)}
                        className="w-4 h-4"
                      />
                      <span className="text-gray-900 font-semibold">🏦 Transferencia Bancaria</span>
                    </label>

                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="pago"
                        value="efectivo"
                        checked={metodoPago === 'efectivo'}
                        onChange={(e) => setMetodoPago(e.target.value as any)}
                        className="w-4 h-4"
                      />
                      <span className="text-gray-900 font-semibold">💵 Efectivo a la entrega</span>
                    </label>
                  </div>
                </div>

                {error && (
                  <div className="bg-red-50 border-2 border-red-300 text-red-700 px-4 py-3 rounded-lg">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold py-3 px-6 rounded-lg transition mt-6"
                >
                  {loading ? 'Procesando...' : 'Completar pedido'}
                </button>
              </form>
            </div>
          </div>

          {/* Resumen de pedido */}
          <div>
            <div className="bg-blue-50 rounded-lg shadow-lg p-8 sticky top-28">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Resumen de pedido</h2>

              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={item.codigo} className="flex justify-between">
                    <span className="text-gray-700">
                      {item.nombre} x{item.cantidad}
                    </span>
                    <span className="font-bold text-gray-900">
                      ${(item.pvp * item.cantidad).toLocaleString('es-UY')}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-blue-200 pt-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal:</span>
                  <span className="font-bold text-gray-900">${total.toLocaleString('es-UY')}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Envío:</span>
                  <span className="font-bold text-green-600">Gratis</span>
                </div>

                <div className="border-t border-blue-200 pt-2 flex justify-between text-lg">
                  <span className="font-bold text-gray-900">Total:</span>
                  <span className="font-bold text-blue-600">${total.toLocaleString('es-UY')}</span>
                </div>
              </div>

              <div className="mt-6 p-4 bg-white rounded-lg border-2 border-blue-200">
                <p className="text-xs text-gray-600">
                  ✅ Envío gratis en compras mayores a $3000
                </p>
                <p className="text-xs text-gray-600 mt-2">
                  ✅ Garantía oficial del fabricante
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
