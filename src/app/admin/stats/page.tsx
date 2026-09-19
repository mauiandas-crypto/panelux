'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { productos } from '@/data/productos'
import { Order } from '@/lib/orders-types'
import { ChevronLeftIcon, ChartIcon, BoxIcon, TagIcon, MoneyIcon, ClipboardIcon } from '@/components/icons/Icons'

export default function StatsAdmin() {
  const router = useRouter()
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const t = localStorage.getItem('adminToken')
    if (!t) {
      router.push('/admin/login')
      return
    }

    const fetchOrders = async () => {
      try {
        const response = await fetch('/api/orders', {
          headers: { Authorization: `Bearer ${t}` },
        })
        if (response.ok) {
          setOrders(await response.json())
        }
      } catch (error) {
        console.error('Error fetching orders:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchOrders()
  }, [router])

  const stats = {
    totalProducts: productos.length,
    categories: [...new Set(productos.map((p) => p.categoria))].length,
    avgPrice: (productos.reduce((sum, p) => sum + p.pvp, 0) / productos.length).toFixed(2),
  }

  const ordenesPagadas = orders.filter((o) => o.estado === 'pagado')
  const ventasTotales = ordenesPagadas.reduce((sum, o) => sum + o.total, 0)
  const ticketPromedio = ordenesPagadas.length > 0 ? ventasTotales / ordenesPagadas.length : 0

  const productosMasVendidos = orders
    .flatMap((o) => o.items)
    .reduce((acc: { nombre: string; cantidad: number }[], item) => {
      const existing = acc.find((p) => p.nombre === item.nombre)
      if (existing) {
        existing.cantidad += item.cantidad
      } else {
        acc.push({ nombre: item.nombre, cantidad: item.cantidad })
      }
      return acc
    }, [])
    .sort((a, b) => b.cantidad - a.cantidad)
    .slice(0, 5)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/admin" className="inline-flex items-center gap-1.5 text-blue-600 hover:text-blue-700 font-bold">
            <ChevronLeftIcon className="w-4 h-4" /> Volver al panel
          </Link>
          <h1 className="flex items-center gap-2 text-2xl font-bold text-gray-900">
            <ChartIcon className="w-6 h-6" /> Estadísticas
          </h1>
          <div></div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {loading ? (
          <p className="text-center text-gray-600">Cargando estadísticas...</p>
        ) : (
          <>
            {/* KPIs */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <div className="bg-white rounded-lg shadow-lg p-8 text-center">
                <BoxIcon className="w-10 h-10 mx-auto mb-3 text-blue-600" />
                <h3 className="text-gray-600 font-semibold mb-2">Total Productos</h3>
                <p className="text-4xl font-bold text-blue-600">{stats.totalProducts}</p>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-8 text-center">
                <TagIcon className="w-10 h-10 mx-auto mb-3 text-green-600" />
                <h3 className="text-gray-600 font-semibold mb-2">Categorías</h3>
                <p className="text-4xl font-bold text-green-600">{stats.categories}</p>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-8 text-center">
                <MoneyIcon className="w-10 h-10 mx-auto mb-3 text-purple-600" />
                <h3 className="text-gray-600 font-semibold mb-2">Precio Promedio</h3>
                <p className="text-4xl font-bold text-purple-600">${stats.avgPrice}</p>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-8 text-center">
                <ClipboardIcon className="w-10 h-10 mx-auto mb-3 text-orange-600" />
                <h3 className="text-gray-600 font-semibold mb-2">Órdenes Totales</h3>
                <p className="text-4xl font-bold text-orange-600">{orders.length}</p>
              </div>
            </div>

            {/* Ventas */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <div className="bg-white rounded-lg shadow-lg p-8 text-center">
                <MoneyIcon className="w-10 h-10 mx-auto mb-3 text-green-600" />
                <h3 className="text-gray-600 font-semibold mb-2">Ventas Totales (pagadas)</h3>
                <p className="text-4xl font-bold text-green-600">${ventasTotales.toLocaleString('es-UY')}</p>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-8 text-center">
                <ChartIcon className="w-10 h-10 mx-auto mb-3 text-blue-600" />
                <h3 className="text-gray-600 font-semibold mb-2">Ticket Promedio</h3>
                <p className="text-4xl font-bold text-blue-600">
                  ${ticketPromedio.toLocaleString('es-UY', { maximumFractionDigits: 0 })}
                </p>
              </div>
            </div>

            {/* Productos más vendidos */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Productos más vendidos</h2>
              {productosMasVendidos.length > 0 ? (
                <div className="space-y-3">
                  {productosMasVendidos.map((p, idx) => (
                    <div key={idx} className="flex justify-between items-center pb-3 border-b border-gray-100">
                      <span className="text-gray-900 font-medium">{p.nombre}</span>
                      <span className="text-gray-600 text-sm">{p.cantidad} unidades</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">Todavía no hay pedidos registrados.</p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
