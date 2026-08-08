'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Header from '@/components/header'

interface OrderItem {
  id: string
  productName: string
  quantity: number
  price: number
}

interface Order {
  id: string
  orderId: string
  email: string
  total: number
  status: string
  createdAt: string
  items: OrderItem[]
}

interface Stats {
  totalOrders: number
  approvedOrders: number
  pendingOrders: number
  totalRevenue: number
  totalDiscount: number
}

export default function AdminDashboard() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [authenticated, setAuthenticated] = useState(false)
  const [stats, setStats] = useState<Stats | null>(null)
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password) {
      setAuthenticated(true)
      loadData()
    }
  }

  const loadData = async (token?: string) => {
    const authToken = token || password
    setLoading(true)
    try {
      const response = await fetch('/api/admin/orders', {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })

      if (response.status === 401) {
        setError('Contraseña incorrecta')
        setAuthenticated(false)
        return
      }

      const data = await response.json()
      setStats(data.stats)
      setOrders(data.orders)
    } catch (err) {
      setError('Error cargando datos')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      const response = await fetch('/api/admin/orders', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${password}`,
        },
        body: JSON.stringify({
          orderId,
          status: newStatus,
        }),
      })

      if (response.ok) {
        loadData(password)
      }
    } catch (err) {
      console.error('Error updating order:', err)
    }
  }

  if (!authenticated) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 flex items-center justify-center px-4">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Panel Admin</h1>

            <form onSubmit={handleLogin} className="space-y-4">
              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-900 text-sm">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">
                  Contraseña
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  placeholder="Ingresa la contraseña"
                />
              </div>

              <button
                type="submit"
                className="w-full px-4 py-2 bg-cyan-500 text-white font-bold rounded-lg hover:bg-cyan-600 transition-colors"
              >
                Ingresar
              </button>
            </form>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Panel de Control</h1>
            <div className="flex gap-3">
              <button
                onClick={() => router.push('/admin/sync-mercadolibre')}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                🔄 Sincronizar ML
              </button>
              <button
                onClick={() => {
                  setAuthenticated(false)
                  setPassword('')
                }}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Salir
              </button>
            </div>
          </div>

          {/* Estadísticas */}
          {stats && (
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
              <div className="bg-white rounded-lg shadow-md p-6">
                <p className="text-gray-600 text-sm font-medium mb-2">Total Órdenes</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalOrders}</p>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <p className="text-gray-600 text-sm font-medium mb-2">Aprobadas</p>
                <p className="text-3xl font-bold text-green-600">{stats.approvedOrders}</p>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <p className="text-gray-600 text-sm font-medium mb-2">Pendientes</p>
                <p className="text-3xl font-bold text-yellow-600">{stats.pendingOrders}</p>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <p className="text-gray-600 text-sm font-medium mb-2">Ingresos</p>
                <p className="text-3xl font-bold text-cyan-600">${stats.totalRevenue.toFixed(2)}</p>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <p className="text-gray-600 text-sm font-medium mb-2">Descuentos</p>
                <p className="text-3xl font-bold text-orange-600">${stats.totalDiscount.toFixed(2)}</p>
              </div>
            </div>
          )}

          {/* Órdenes */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Órdenes Recientes</h2>
            </div>

            {loading ? (
              <div className="p-12 text-center">
                <div className="animate-spin text-4xl mb-4">⏳</div>
                <p className="text-gray-600">Cargando...</p>
              </div>
            ) : orders.length === 0 ? (
              <div className="p-12 text-center text-gray-600">
                No hay órdenes registradas
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">
                        Pedido
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">
                        Email
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">
                        Total
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">
                        Estado
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">
                        Fecha
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order.id} className="border-b border-gray-200 hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                          {order.orderId}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">{order.email}</td>
                        <td className="px-6 py-4 text-sm text-gray-900 font-bold">
                          ${order.total.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <select
                            value={order.status}
                            onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                            className={`px-3 py-1 rounded-full text-sm font-medium border-0 focus:outline-none focus:ring-2 focus:ring-cyan-500 ${
                              order.status === 'approved'
                                ? 'bg-green-100 text-green-800'
                                : order.status === 'pending'
                                ? 'bg-yellow-100 text-yellow-800'
                                : order.status === 'cancelled'
                                ? 'bg-red-100 text-red-800'
                                : 'bg-gray-100 text-gray-800'
                            }`}
                          >
                            <option value="pending">Pendiente</option>
                            <option value="approved">Aprobada</option>
                            <option value="delivered">Entregada</option>
                            <option value="cancelled">Cancelada</option>
                          </select>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {new Date(order.createdAt).toLocaleDateString('es-ES')}
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <button
                            onClick={() => setSelectedOrder(order)}
                            className="text-cyan-600 hover:text-cyan-700 font-medium"
                          >
                            Ver
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Detalle de orden */}
          {selectedOrder && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-96 overflow-y-auto">
                <div className="p-6 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white">
                  <h2 className="text-xl font-bold text-gray-900">
                    Orden {selectedOrder.orderId}
                  </h2>
                  <button
                    onClick={() => setSelectedOrder(null)}
                    className="text-gray-500 hover:text-gray-700 text-2xl"
                  >
                    ✕
                  </button>
                </div>

                <div className="p-6 space-y-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Email</p>
                    <p className="font-medium text-gray-900">{selectedOrder.email}</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-600 mb-3">Productos</p>
                    <div className="space-y-2">
                      {selectedOrder.items.map((item) => (
                        <div
                          key={item.id}
                          className="flex justify-between text-sm text-gray-900 bg-gray-50 p-3 rounded-lg"
                        >
                          <div>
                            <p className="font-medium">{item.productName}</p>
                            <p className="text-gray-600">x{item.quantity}</p>
                          </div>
                          <p className="font-bold">${(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between text-lg font-bold text-gray-900">
                      <span>Total</span>
                      <span className="text-cyan-600">${selectedOrder.total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
