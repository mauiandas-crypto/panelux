'use client'

import { useCart } from '@/context/cart-context'
import Link from 'next/link'
import Header from '@/components/header'
import CheckoutButton from '@/components/checkout-button'
import { useState } from 'react'

export default function CartPage() {
  const { items, removeItem, updateQuantity, total, clearCart, coupon, discount, applyCoupon, removeCoupon, subtotal } = useCart()
  const [couponInput, setCouponInput] = useState('')
  const [couponError, setCouponError] = useState('')
  const [couponSuccess, setCouponSuccess] = useState(false)

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Carrito de Compras</h1>

          {items.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-12 text-center">
              <p className="text-xl text-gray-600 mb-6">Tu carrito está vacío</p>
              <Link
                href="/"
                className="inline-block px-8 py-3 bg-cyan-500 text-white font-bold rounded-lg hover:bg-cyan-600 transition-colors"
              >
                Volver a Productos
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Items */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200 bg-gray-50">
                        <th className="text-left px-6 py-4 font-bold text-gray-900">
                          Producto
                        </th>
                        <th className="text-center px-6 py-4 font-bold text-gray-900">
                          Precio
                        </th>
                        <th className="text-center px-6 py-4 font-bold text-gray-900">
                          Cantidad
                        </th>
                        <th className="text-right px-6 py-4 font-bold text-gray-900">
                          Subtotal
                        </th>
                        <th className="px-6 py-4"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {items.map((item) => (
                        <tr
                          key={item.id}
                          className="border-b border-gray-200 hover:bg-gray-50"
                        >
                          <td className="px-6 py-4 text-gray-900 font-medium">
                            {item.name}
                          </td>
                          <td className="px-6 py-4 text-center text-gray-600">
                            ${item.price.toFixed(2)}
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center justify-center gap-2">
                              <button
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity - 1)
                                }
                                className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-100 text-sm"
                              >
                                −
                              </button>
                              <span className="w-8 text-center font-medium">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity + 1)
                                }
                                className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-100 text-sm"
                              >
                                +
                              </button>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-right text-gray-900 font-bold">
                            ${(item.price * item.quantity).toFixed(2)}
                          </td>
                          <td className="px-6 py-4">
                            <button
                              onClick={() => removeItem(item.id)}
                              className="text-red-600 hover:text-red-700 text-sm font-medium"
                            >
                              Eliminar
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Resumen */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow-md p-6 sticky top-20">
                  <h2 className="text-xl font-bold text-gray-900 mb-6">
                    Resumen de Compra
                  </h2>

                  {/* Cupón */}
                  <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                    <label className="block text-sm font-bold text-gray-900 mb-2">
                      Código de Cupón
                    </label>
                    {coupon ? (
                      <div className="flex items-center justify-between bg-green-50 border border-green-200 rounded p-3">
                        <div>
                          <p className="text-sm font-medium text-green-800">{coupon}</p>
                          <p className="text-xs text-green-600">{discount}% descuento aplicado</p>
                        </div>
                        <button
                          onClick={() => {
                            removeCoupon()
                            setCouponInput('')
                            setCouponError('')
                            setCouponSuccess(false)
                          }}
                          className="text-green-600 hover:text-green-700 text-sm font-medium"
                        >
                          ✕
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <input
                          type="text"
                          placeholder="Ingresa tu cupón"
                          value={couponInput}
                          onChange={(e) => {
                            setCouponInput(e.target.value.toUpperCase())
                            setCouponError('')
                            setCouponSuccess(false)
                          }}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        />
                        <button
                          onClick={() => {
                            if (applyCoupon(couponInput)) {
                              setCouponSuccess(true)
                              setCouponInput('')
                              setTimeout(() => setCouponSuccess(false), 3000)
                            } else {
                              setCouponError('Cupón inválido')
                              setTimeout(() => setCouponError(''), 3000)
                            }
                          }}
                          className="w-full px-3 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          Aplicar
                        </button>
                        {couponError && (
                          <p className="text-xs text-red-600">{couponError}</p>
                        )}
                        {couponSuccess && (
                          <p className="text-xs text-green-600">¡Cupón aplicado!</p>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between text-gray-600">
                      <span>Subtotal:</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between text-green-600 font-medium">
                        <span>Descuento ({discount}%):</span>
                        <span>-${((subtotal * discount) / 100).toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-gray-600">
                      <span>Envío:</span>
                      <span>Calculado al pagar</span>
                    </div>
                    <div className="border-t border-gray-200 pt-4 flex justify-between text-lg font-bold text-gray-900">
                      <span>Total:</span>
                      <span className="text-cyan-500">${total.toFixed(2)}</span>
                    </div>
                  </div>

                  <CheckoutButton />

                  <button
                    onClick={clearCart}
                    className="w-full text-gray-600 hover:text-gray-700 font-medium py-2 border border-gray-300 rounded-lg"
                  >
                    Vaciar Carrito
                  </button>

                  <Link
                    href="/"
                    className="block text-center text-blue-600 hover:text-blue-700 font-medium py-3 mt-3"
                  >
                    Continuar Comprando
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
