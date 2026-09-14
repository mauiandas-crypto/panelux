'use client'

import { useOrder } from '@/context/OrderContext'
import Link from 'next/link'
import { useState } from 'react'

export default function MisOrdenesPage() {
  const { orders } = useOrder()
  const [selectedOrder, setSelectedOrder] = useState<any>(null)

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case 'pagado':
        return 'bg-green-100 text-green-800'
      case 'pendiente':
        return 'bg-yellow-100 text-yellow-800'
      case 'enviando':
        return 'bg-blue-100 text-blue-800'
      case 'entregado':
        return 'bg-green-100 text-green-800'
      case 'cancelado':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-white pt-24 pb-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Mis Pedidos</h1>
          <Link href="/" className="inline-block bg-blue-600 text-white font-bold py-3 px-8 rounded-lg">
            Ir al catálogo
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white pt-24 pb-20">
      <div className="max-w-6xl mx-auto px-6">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Mis Pedidos</h1>
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="border-2 border-gray-200 rounded-lg p-6 cursor-pointer hover:shadow-lg" onClick={() => setSelectedOrder(order)}>
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-lg font-bold">{order.id}</p>
                  <p className="text-sm text-gray-600">{new Date(order.fecha).toLocaleDateString('es-UY')}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-blue-600">${order.total.toLocaleString('es-UY')}</p>
                  <span className={`px-3 py-1 rounded-full text-sm font-bold ${getEstadoColor(order.estado)}`}>
                    {order.estado.toUpperCase()}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {selectedOrder && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-8 max-w-2xl w-full">
              <div className="flex justify-between mb-6">
                <h2 className="text-2xl font-bold">Pedido {selectedOrder.id}</h2>
                <button onClick={() => setSelectedOrder(null)} className="text-2xl">✕</button>
              </div>
              <div className="space-y-4">
                {selectedOrder.items.map((item: any, i: number) => (
                  <div key={i} className="flex justify-between">
                    <span>{item.nombre} x{item.cantidad}</span>
                    <span>${(item.pvp * item.cantidad).toLocaleString('es-UY')}</span>
                  </div>
                ))}
                <div className="border-t pt-4 flex justify-between font-bold">
                  <span>Total:</span>
                  <span className="text-blue-600">${selectedOrder.total.toLocaleString('es-UY')}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
