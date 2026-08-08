'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/header'
import Link from 'next/link'

interface OrderItem {
  id: string
  productName: string
  quantity: number
  price: number
}

interface Review {
  id: string
  rating: number
  comment?: string
}

interface Order {
  id: string
  orderId: string
  email: string
  total: number
  status: string
  createdAt: string
  items: OrderItem[]
  reviews: Review[]
}

export default function MyOrdersPage() {
  const [email, setEmail] = useState('')
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)
  const [error, setError] = useState('')
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [reviewForm, setReviewForm] = useState({
    productId: '',
    productName: '',
    rating: 5,
    comment: '',
  })
  const [submittingReview, setSubmittingReview] = useState(false)

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return

    setLoading(true)
    setError('')

    try {
      const response = await fetch(`/api/orders/list?email=${encodeURIComponent(email)}`)
      const data = await response.json()

      if (data.success) {
        setOrders(data.orders)
        setSearched(true)
      } else {
        setError('Error al cargar órdenes')
      }
    } catch (err) {
      setError('Error al conectar')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmitReview = async () => {
    if (!selectedOrder || !reviewForm.productId) return

    setSubmittingReview(true)

    try {
      const response = await fetch('/api/reviews/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderId: selectedOrder.id,
          productId: reviewForm.productId,
          productName: reviewForm.productName,
          rating: reviewForm.rating,
          comment: reviewForm.comment,
        }),
      })

      if (response.ok) {
        setReviewForm({ productId: '', productName: '', rating: 5, comment: '' })
        alert('Reseña enviada correctamente')
        // Recargar órdenes
        handleSearch(new Event('submit') as any)
      }
    } catch (err) {
      console.error('Error submitting review:', err)
    } finally {
      setSubmittingReview(false)
    }
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Mis Órdenes</h1>

          {!searched ? (
            <div className="bg-white rounded-lg shadow-md p-8">
              <form onSubmit={handleSearch} className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">
                    Ingresa tu email para ver tus órdenes
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    placeholder="tu@email.com"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full px-4 py-3 bg-cyan-500 text-white font-bold rounded-lg hover:bg-cyan-600 disabled:bg-gray-400 transition-colors"
                >
                  {loading ? 'Buscando...' : 'Buscar Órdenes'}
                </button>
              </form>
            </div>
          ) : orders.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-12 text-center">
              <p className="text-lg text-gray-600 mb-6">No hay órdenes registradas con este email</p>
              <button
                onClick={() => {
                  setSearched(false)
                  setEmail('')
                  setOrders([])
                }}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Buscar con otro email
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <p className="text-gray-600">
                  Se encontraron {orders.length} orden{orders.length !== 1 ? 'es' : ''} para {email}
                </p>
                <button
                  onClick={() => {
                    setSearched(false)
                    setEmail('')
                    setOrders([])
                  }}
                  className="px-4 py-2 text-blue-600 hover:text-blue-700"
                >
                  Buscar otro email
                </button>
              </div>

              {orders.map((order) => (
                <div key={order.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="p-6 border-b border-gray-200">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{order.orderId}</h3>
                        <p className="text-sm text-gray-600">
                          {new Date(order.createdAt).toLocaleDateString('es-ES')}
                        </p>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          order.status === 'approved'
                            ? 'bg-green-100 text-green-800'
                            : order.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : order.status === 'delivered'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {order.status === 'approved'
                          ? 'Aprobada'
                          : order.status === 'pending'
                          ? 'Pendiente'
                          : order.status === 'delivered'
                          ? 'Entregada'
                          : 'Cancelada'}
                      </span>
                    </div>

                    <div className="space-y-2">
                      {order.items.map((item) => (
                        <div key={item.id} className="flex justify-between text-sm">
                          <div>
                            <p className="font-medium text-gray-900">{item.productName}</p>
                            <p className="text-gray-600">x{item.quantity}</p>
                          </div>
                          <p className="font-bold text-gray-900">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="border-t border-gray-200 pt-4 mt-4 flex justify-between text-lg font-bold">
                      <span>Total:</span>
                      <span className="text-cyan-600">${order.total.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="p-6 bg-gray-50">
                    {order.status === 'delivered' || order.status === 'approved' ? (
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        ⭐ Dejar Reseña
                      </button>
                    ) : (
                      <p className="text-sm text-gray-600">
                        Podrás dejar reseñas una vez que tu pedido sea entregado
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Review Modal */}
          {selectedOrder && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
                <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                  <h2 className="text-xl font-bold text-gray-900">Dejar Reseña</h2>
                  <button
                    onClick={() => setSelectedOrder(null)}
                    className="text-gray-500 hover:text-gray-700 text-2xl"
                  >
                    ✕
                  </button>
                </div>

                <div className="p-6 space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-2">
                      Producto
                    </label>
                    <select
                      value={reviewForm.productId}
                      onChange={(e) => {
                        const item = selectedOrder.items.find(
                          (i) => i.productName === e.target.value
                        )
                        if (item) {
                          setReviewForm({
                            ...reviewForm,
                            productId: item.productName,
                            productName: item.productName,
                          })
                        }
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    >
                      <option value="">Selecciona un producto</option>
                      {selectedOrder.items.map((item) => (
                        <option key={item.id} value={item.productName}>
                          {item.productName}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-2">
                      Calificación
                    </label>
                    <select
                      value={reviewForm.rating}
                      onChange={(e) =>
                        setReviewForm({
                          ...reviewForm,
                          rating: parseInt(e.target.value),
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    >
                      <option value="5">⭐⭐⭐⭐⭐ Excelente</option>
                      <option value="4">⭐⭐⭐⭐ Muy bueno</option>
                      <option value="3">⭐⭐⭐ Bueno</option>
                      <option value="2">⭐⭐ Regular</option>
                      <option value="1">⭐ Malo</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-2">
                      Comentario (opcional)
                    </label>
                    <textarea
                      value={reviewForm.comment}
                      onChange={(e) =>
                        setReviewForm({ ...reviewForm, comment: e.target.value })
                      }
                      placeholder="Cuéntanos qué te pareció este producto..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 resize-none"
                      rows={4}
                    />
                  </div>

                  <button
                    onClick={handleSubmitReview}
                    disabled={!reviewForm.productId || submittingReview}
                    className="w-full px-4 py-2 bg-cyan-500 text-white font-bold rounded-lg hover:bg-cyan-600 disabled:bg-gray-400 transition-colors"
                  >
                    {submittingReview ? 'Enviando...' : 'Enviar Reseña'}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
