'use client'

import { useCart } from '@/context/CartContext'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { siteConfig } from '@/lib/config'

export default function CarritoPage() {
  const { items, total, removerDelCarrito, actualizarCantidad, limpiarCarrito } = useCart()
  const router = useRouter()

  const envioGratis = total >= siteConfig.shipping.minOrderForFreeShipping
  const costoEnvio = envioGratis ? 0 : siteConfig.shipping.flatCost
  const totalConEnvio = total + costoEnvio

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-white pt-24 pb-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="text-6xl mb-4">🛒</div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Tu carrito está vacío</h1>
          <p className="text-gray-600 mb-8 text-lg">No hay productos en tu carrito. ¡Explora nuestro catálogo!</p>
          <Link
            href="/"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition"
          >
            📦 Volver al catálogo
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">🛒 Tu Carrito</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Tabla de productos */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-100 border-b-2 border-gray-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Producto</th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Precio</th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Cantidad</th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Subtotal</th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Acción</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item) => (
                      <tr key={item.codigo} className="border-b border-gray-200 hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="flex gap-4">
                            {item.imagen && (
                              <div className="relative w-16 h-16 flex-shrink-0">
                                <Image
                                  src={item.imagen}
                                  alt={item.nombre}
                                  fill
                                  className="object-contain"
                                />
                              </div>
                            )}
                            <div>
                              <p className="font-semibold text-gray-900">{item.nombre}</p>
                              <p className="text-xs text-gray-500">{item.codigo}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 font-semibold text-gray-900">${item.pvp.toLocaleString()}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2 w-fit">
                            <button
                              onClick={() => actualizarCantidad(item.codigo, Math.max(1, item.cantidad - 1))}
                              className="w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded text-sm font-bold transition"
                            >
                              −
                            </button>
                            <span className="w-8 text-center font-bold">{item.cantidad}</span>
                            <button
                              onClick={() => actualizarCantidad(item.codigo, item.cantidad + 1)}
                              className="w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded text-sm font-bold transition"
                            >
                              +
                            </button>
                          </div>
                        </td>
                        <td className="px-6 py-4 font-bold text-gray-900">${(item.pvp * item.cantidad).toLocaleString()}</td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => removerDelCarrito(item.codigo)}
                            className="text-red-600 hover:text-red-700 font-semibold transition"
                          >
                            🗑️ Remover
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="p-6 bg-gray-50 border-t-2 border-gray-200 flex justify-between">
                <button
                  onClick={() => limpiarCarrito()}
                  className="text-red-600 hover:text-red-700 font-bold transition"
                >
                  🗑️ Limpiar carrito
                </button>
                <Link
                  href="/"
                  className="text-blue-600 hover:text-blue-700 font-bold transition"
                >
                  ← Seguir comprando
                </Link>
              </div>
            </div>
          </div>

          {/* Resumen y checkout */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-24">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Resumen</h2>

              {/* Información de envío */}
              <div className="mb-6 pb-6 border-b border-gray-200">
                <p className="text-sm text-gray-600 mb-2">
                  <strong>📍 Zona de envío:</strong> Montevideo y Ciudad de la Costa
                </p>
                <p className="text-sm text-green-600 font-semibold">
                  ✅ Envío GRATIS (en compras mayores a ${siteConfig.shipping.minOrderForFreeShipping.toLocaleString('es-UY')})
                </p>
              </div>

              {/* Detalles de precio */}
              <div className="space-y-3 mb-6 pb-6 border-b-2 border-gray-200">
                <div className="flex justify-between text-gray-700">
                  <span>Subtotal ({items.reduce((sum, item) => sum + item.cantidad, 0)} items)</span>
                  <span className="font-semibold">${total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Envío</span>
                  {envioGratis ? (
                    <span className="text-green-600 font-semibold">GRATIS</span>
                  ) : (
                    <span className="font-semibold">${costoEnvio.toLocaleString('es-UY')}</span>
                  )}
                </div>
              </div>

              {/* Total */}
              <div className="flex justify-between mb-6 text-2xl">
                <span className="font-bold text-gray-900">Total:</span>
                <span className="font-bold text-blue-600">${totalConEnvio.toLocaleString('es-UY')}</span>
              </div>

              {/* Botones de acción */}
              <div className="space-y-3">
                <Link
                  href="/checkout"
                  className="block w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-3 px-4 rounded-lg text-center transition transform hover:scale-105 shadow-lg"
                >
                  💳 Ir a Pagar
                </Link>
                <button
                  onClick={() => router.push('/')}
                  className="w-full bg-gray-200 hover:bg-gray-300 text-gray-900 font-bold py-2 px-4 rounded-lg text-center transition"
                >
                  Seguir Comprando
                </button>
              </div>

              {/* Info de seguridad */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-xs text-gray-600 text-center">
                  🔒 Compra 100% segura con Mercado Pago
                </p>
                <p className="text-xs text-gray-600 text-center mt-2">
                  ✅ Hasta 12 cuotas sin interés
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
