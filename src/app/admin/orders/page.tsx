'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useAdminAuth } from '@/hooks/useAdminAuth'
import { Order } from '@/lib/orders-types'

export default function OrdersAdmin() {
  const { isAuthenticated } = useAdminAuth()
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<Order['estado'] | 'all'>('all')
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [showDetail, setShowDetail] = useState(false)

  useEffect(() => {
    if (isAuthenticated) {
      fetchOrders()
    }
  }, [isAuthenticated])

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem('adminToken')
      const response = await fetch('/api/orders', {
        headers: { Authorization: `Bearer ${token}` },
      })

      if (response.ok) {
        const data = await response.json()
        setOrders(data)
      }
    } catch (error) {
      console.error('Error fetching orders:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateOrderStatus = async (orderId: string, nuevoEstado: Order['estado']) => {
    try {
      const token = localStorage.getItem('adminToken')
      const response = await fetch(`/api/orders/${orderId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ estado: nuevoEstado }),
      })

      if (response.ok) {
        setOrders(prev =>
          prev.map(order =>
            order.id === orderId ? { ...order, estado: nuevoEstado } : order
          )
        )
        if (selectedOrder?.id === orderId) {
          setSelectedOrder({ ...selectedOrder, estado: nuevoEstado })
        }
      }
    } catch (error) {
      console.error('Error updating order:', error)
    }
  }

  const filteredOrders = filter === 'all' ? orders : orders.filter(o => o.estado === filter)

  const estadoColors: Record<Order['estado'], string> = {
    pendiente: 'bg-yellow-100 text-yellow-800',
    pagado: 'bg-blue-100 text-blue-800',
    en_preparacion: 'bg-orange-100 text-orange-800',
    enviado: 'bg-purple-100 text-purple-800',
    entregado: 'bg-green-100 text-green-800',
    cancelado: 'bg-red-100 text-red-800',
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-900 font-bold">Cargando...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/admin" className="text-blue-600 hover:text-blue-700 font-bold">
            ← Volver al panel
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">📋 Órdenes ({orders.length})</h1>
          <div></div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Filtros */}
        <div className="mb-8 flex gap-2 flex-wrap">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-full font-semibold transition ${
              filter === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-900 hover:bg-gray-300'
            }`}
          >
            Todas ({orders.length})
          </button>
          <button
            onClick={() => setFilter('pendiente')}
            className={`px-4 py-2 rounded-full font-semibold transition ${
              filter === 'pendiente'
                ? 'bg-yellow-600 text-white'
                : 'bg-gray-200 text-gray-900 hover:bg-gray-300'
            }`}
          >
            Pendientes ({orders.filter(o => o.estado === 'pendiente').length})
          </button>
          <button
            onClick={() => setFilter('en_preparacion')}
            className={`px-4 py-2 rounded-full font-semibold transition ${
              filter === 'en_preparacion'
                ? 'bg-orange-600 text-white'
                : 'bg-gray-200 text-gray-900 hover:bg-gray-300'
            }`}
          >
            En preparación ({orders.filter(o => o.estado === 'en_preparacion').length})
          </button>
          <button
            onClick={() => setFilter('enviado')}
            className={`px-4 py-2 rounded-full font-semibold transition ${
              filter === 'enviado'
                ? 'bg-purple-600 text-white'
                : 'bg-gray-200 text-gray-900 hover:bg-gray-300'
            }`}
          >
            Enviados ({orders.filter(o => o.estado === 'enviado').length})
          </button>
          <button
            onClick={() => setFilter('entregado')}
            className={`px-4 py-2 rounded-full font-semibold transition ${
              filter === 'entregado'
                ? 'bg-green-600 text-white'
                : 'bg-gray-200 text-gray-900 hover:bg-gray-300'
            }`}
          >
            Entregadas ({orders.filter(o => o.estado === 'entregado').length})
          </button>
        </div>

        {/* Tabla de órdenes */}
        {filteredOrders.length === 0 ? (
          <div className="bg-white rounded-lg shadow-lg p-12 text-center">
            <p className="text-gray-600">No hay órdenes en este estado</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-100 border-b-2 border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-bold text-gray-900">ID Orden</th>
                  <th className="px-6 py-3 text-left text-sm font-bold text-gray-900">Cliente</th>
                  <th className="px-6 py-3 text-left text-sm font-bold text-gray-900">Total</th>
                  <th className="px-6 py-3 text-left text-sm font-bold text-gray-900">Estado</th>
                  <th className="px-6 py-3 text-left text-sm font-bold text-gray-900">Fecha</th>
                  <th className="px-6 py-3 text-left text-sm font-bold text-gray-900">Acción</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="px-6 py-4 text-gray-900 font-mono text-sm">{order.id}</td>
                    <td className="px-6 py-4 text-gray-900">{order.cliente.nombre}</td>
                    <td className="px-6 py-4 text-gray-900 font-bold">
                      ${order.total.toLocaleString('es-UY')}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${estadoColors[order.estado]}`}>
                        {order.estado.replace('_', ' ').toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-600 text-sm">
                      {new Date(order.fecha).toLocaleDateString('es-UY')}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => {
                          setSelectedOrder(order)
                          setShowDetail(true)
                        }}
                        className="text-blue-600 hover:text-blue-700 font-semibold text-sm"
                      >
                        Ver detalles
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Modal de detalles */}
        {showDetail && selectedOrder && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-96 overflow-y-auto">
              <div className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{selectedOrder.id}</h2>
                    <p className="text-gray-600 text-sm">
                      {new Date(selectedOrder.fecha).toLocaleDateString('es-UY')}
                    </p>
                  </div>
                  <button
                    onClick={() => setShowDetail(false)}
                    className="text-gray-600 hover:text-gray-900 text-2xl"
                  >
                    ✕
                  </button>
                </div>

                {/* Cliente */}
                <div className="mb-6 pb-6 border-b border-gray-200">
                  <h3 className="font-bold text-gray-900 mb-2">Cliente</h3>
                  <p className="text-gray-700">{selectedOrder.cliente.nombre}</p>
                  <p className="text-gray-600 text-sm">{selectedOrder.cliente.email}</p>
                  <p className="text-gray-600 text-sm">{selectedOrder.cliente.telefono}</p>
                  <p className="text-gray-600 text-sm">
                    {selectedOrder.cliente.direccion}, {selectedOrder.cliente.ciudad}
                  </p>
                </div>

                {/* Items */}
                <div className="mb-6 pb-6 border-b border-gray-200">
                  <h3 className="font-bold text-gray-900 mb-3">Artículos</h3>
                  <div className="space-y-2">
                    {selectedOrder.items.map((item) => (
                      <div key={item.codigo} className="flex justify-between text-sm">
                        <span className="text-gray-700">{item.nombre} x{item.cantidad}</span>
                        <span className="text-gray-900 font-bold">
                          ${item.subtotal.toLocaleString('es-UY')}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Cambiar estado */}
                <div className="mb-6 pb-6 border-b border-gray-200">
                  <h3 className="font-bold text-gray-900 mb-3">Cambiar estado</h3>
                  <select
                    value={selectedOrder.estado}
                    onChange={(e) => updateOrderStatus(selectedOrder.id, e.target.value as Order['estado'])}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                  >
                    <option value="pendiente">Pendiente</option>
                    <option value="pagado">Pagado</option>
                    <option value="en_preparacion">En preparación</option>
                    <option value="enviado">Enviado</option>
                    <option value="entregado">Entregado</option>
                    <option value="cancelado">Cancelado</option>
                  </select>
                </div>

                {/* Total */}
                <div className="text-right">
                  <p className="text-gray-600 mb-1">Total:</p>
                  <p className="text-3xl font-bold text-blue-600">
                    ${selectedOrder.total.toLocaleString('es-UY')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
