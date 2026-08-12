'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { productos } from '@/data/productos'

export default function StatsAdmin() {
  const [token, setToken] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const t = localStorage.getItem('adminToken')
    if (!t) {
      router.push('/admin/login')
    } else {
      setToken(t)
    }
  }, [router])

  const stats = {
    totalProducts: productos.length,
    categories: [...new Set(productos.map((p) => p.categoria))].length,
    avgPrice: (productos.reduce((sum, p) => sum + p.pvp, 0) / productos.length).toFixed(2),
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/admin" className="text-blue-600 hover:text-blue-700 font-bold">
            ← Volver al panel
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">📈 Estadísticas</h1>
          <div></div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Total Productos */}
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="text-5xl mb-3">📦</div>
            <h3 className="text-gray-600 font-semibold mb-2">Total Productos</h3>
            <p className="text-4xl font-bold text-blue-600">{stats.totalProducts}</p>
          </div>

          {/* Categorías */}
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="text-5xl mb-3">🏷️</div>
            <h3 className="text-gray-600 font-semibold mb-2">Categorías</h3>
            <p className="text-4xl font-bold text-green-600">{stats.categories}</p>
          </div>

          {/* Precio Promedio */}
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="text-5xl mb-3">💵</div>
            <h3 className="text-gray-600 font-semibold mb-2">Precio Promedio</h3>
            <p className="text-4xl font-bold text-purple-600">${stats.avgPrice}</p>
          </div>
        </div>

        {/* Secciones futuras */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">📊 Próximas funcionalidades</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border-2 border-gray-200 rounded-lg p-6">
              <h3 className="font-bold text-lg text-gray-900 mb-3">Ventas por período</h3>
              <div className="h-40 bg-gray-100 rounded flex items-center justify-center text-gray-500">
                Gráfico de ventas
              </div>
            </div>

            <div className="border-2 border-gray-200 rounded-lg p-6">
              <h3 className="font-bold text-lg text-gray-900 mb-3">Productos más vendidos</h3>
              <div className="h-40 bg-gray-100 rounded flex items-center justify-center text-gray-500">
                Top productos
              </div>
            </div>

            <div className="border-2 border-gray-200 rounded-lg p-6">
              <h3 className="font-bold text-lg text-gray-900 mb-3">Clientes recientes</h3>
              <div className="h-40 bg-gray-100 rounded flex items-center justify-center text-gray-500">
                Últimos clientes
              </div>
            </div>

            <div className="border-2 border-gray-200 rounded-lg p-6">
              <h3 className="font-bold text-lg text-gray-900 mb-3">Tasa de conversión</h3>
              <div className="h-40 bg-gray-100 rounded flex items-center justify-center text-gray-500">
                Análisis de conversión
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
