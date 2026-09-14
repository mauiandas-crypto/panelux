'use client'

import { useOrder } from '@/context/OrderContext'
import Link from 'next/link'

export default function AdminDashboard() {
  const { orders } = useOrder()

  // Calcular estadísticas
  const totalOrdenes = orders.length
  const totalVentas = orders.reduce((sum, order) => sum + order.total, 0)
  const ordenesPagadas = orders.filter(o => o.estado === 'pagado').length
  const ventasPagadas = orders
    .filter(o => o.estado === 'pagado')
    .reduce((sum, order) => sum + order.total, 0)

  // Contar productos más vendidos
  const productosMasVendidos = orders
    .flatMap(order => order.items)
    .reduce((acc: any, item: any) => {
      const existing = acc.find((p: any) => p.nombre === item.nombre)
      if (existing) {
        existing.cantidad += item.cantidad
        existing.total += item.pvp * item.cantidad
      } else {
        acc.push({ nombre: item.nombre, cantidad: item.cantidad, total: item.pvp * item.cantidad })
      }
      return acc
    }, [])
    .sort((a: any, b: any) => b.cantidad - a.cantidad)
    .slice(0, 5)

  // Órdenes recientes
  const ordenesRecientes = [...orders].reverse().slice(0, 10)

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

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Dashboard Admin</h1>
          <p className="text-gray-600">Estadísticas y gestión de órdenes</p>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {/* Total Ventas */}
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-sm text-gray-600 mb-2">Total Ventas</p>
            <p className="text-3xl font-bold text-blue-600">${totalVentas.toLocaleString('es-UY')}</p>
            <p className="text-xs text-gray-500 mt-2">{totalOrdenes} órdenes</p>
          </div>

          {/* Órdenes */}
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-sm text-gray-600 mb-2">Número de Órdenes</p>
            <p className="text-3xl font-bold text-purple-600">{totalOrdenes}</p>
            <p className="text-xs text-gray-500 mt-2">{ordenesPagadas} pagadas</p>
          </div>

          {/* Ventas Pagadas */}
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-sm text-gray-600 mb-2">Ventas Confirmadas</p>
            <p className="text-3xl font-bold text-green-600">${ventasPagadas.toLocaleString('es-UY')}</p>
            <p className="text-xs text-gray-500 mt-2">{ordenesPagadas} órdenes pagadas</p>
          </div>

          {/* Promedio */}
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-sm text-gray-600 mb-2">Ticket Promedio</p>
            <p className="text-3xl font-bold text-orange-600">
              ${totalOrdenes > 0 ? (totalVentas / totalOrdenes).toLocaleString('es-UY', {maximumFractionDigits: 0}) : 0}
            </p>
            <p className="text-xs text-gray-500 mt-2">Promedio por orden</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Productos Más Vendidos */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Productos Más Vendidos</h2>
            <div className="space-y-4">
              {productosMasVendidos.length > 0 ? (
                productosMasVendidos.map((producto: any, idx: number) => (
                  <div key={idx} className="flex justify-between items-center pb-4 border-b">
                    <div>
                      <p className="font-semibold text-gray-900">{producto.nombre}</p>
                      <p className="text-sm text-gray-600">{producto.cantidad} unidades vendidas</p>
                    </div>
                    <p className="font-bold text-gray-900">${producto.total.toLocaleString('es-UY')}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-600">No hay órdenes aún</p>
              )}
            </div>
          </div>

          {/* Órdenes Recientes */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Órdenes Recientes</h2>
            <div className="space-y-3">
              {ordenesRecientes.length > 0 ? (
                ordenesRecientes.map((order: any) => (
                  <div key={order.id} className="flex justify-between items-center pb-3 border-b">
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900 text-sm">{order.id}</p>
                      <p className="text-xs text-gray-600">{order.cliente.nombre}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-900 text-sm">${order.total.toLocaleString('es-UY')}</p>
                      <span className={`text-xs px-2 py-1 rounded ${getEstadoColor(order.estado)}`}>
                        {order.estado}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-600">No hay órdenes</p>
              )}
            </div>
            <Link href="/mis-ordenes" className="text-blue-600 hover:underline text-sm mt-4 block">
              Ver todas las órdenes →
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
