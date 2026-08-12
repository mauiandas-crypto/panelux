'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Pequeño delay para asegurar que localStorage esté disponible
    const timer = setTimeout(() => {
      const token = localStorage.getItem('adminToken')
      if (!token) {
        // Intentar obtener de la cookie también
        const cookieToken = document.cookie
          .split('; ')
          .find((row) => row.startsWith('adminToken='))
          ?.split('=')[1]

        if (!cookieToken) {
          router.push('/admin/login')
          return
        } else {
          localStorage.setItem('adminToken', cookieToken)
          setIsAuthenticated(true)
          setLoading(false)
        }
      } else {
        setIsAuthenticated(true)
        setLoading(false)
      }
    }, 50)

    return () => clearTimeout(timer)
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('adminToken')
    router.push('/admin/login')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-900 font-bold">Cargando...</div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">📊 Panel Administrador</h1>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition"
          >
            Cerrar sesión
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Grid de opciones */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Banners */}
          <Link href="/admin/banners">
            <div className="bg-white rounded-lg shadow-lg hover:shadow-2xl transition cursor-pointer p-8 text-center">
              <div className="text-5xl mb-4">🖼️</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Banners</h2>
              <p className="text-gray-600">Gestiona los banners principales</p>
            </div>
          </Link>

          {/* Promos */}
          <Link href="/admin/promos">
            <div className="bg-white rounded-lg shadow-lg hover:shadow-2xl transition cursor-pointer p-8 text-center">
              <div className="text-5xl mb-4">📢</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Promos</h2>
              <p className="text-gray-600">Textos que se mueven arriba</p>
            </div>
          </Link>

          {/* Cupones */}
          <Link href="/admin/coupons">
            <div className="bg-white rounded-lg shadow-lg hover:shadow-2xl transition cursor-pointer p-8 text-center">
              <div className="text-5xl mb-4">🎟️</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Cupones</h2>
              <p className="text-gray-600">Descuentos y promociones</p>
            </div>
          </Link>

          {/* Productos */}
          <Link href="/admin/productos">
            <div className="bg-white rounded-lg shadow-lg hover:shadow-2xl transition cursor-pointer p-8 text-center">
              <div className="text-5xl mb-4">📦</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Productos</h2>
              <p className="text-gray-600">Gestión de catálogo</p>
            </div>
          </Link>

          {/* Órdenes */}
          <Link href="/admin/orders">
            <div className="bg-white rounded-lg shadow-lg hover:shadow-2xl transition cursor-pointer p-8 text-center">
              <div className="text-5xl mb-4">📋</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Órdenes</h2>
              <p className="text-gray-600">Pedidos realizados</p>
            </div>
          </Link>

          {/* Estadísticas */}
          <Link href="/admin/stats">
            <div className="bg-white rounded-lg shadow-lg hover:shadow-2xl transition cursor-pointer p-8 text-center">
              <div className="text-5xl mb-4">📈</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Estadísticas</h2>
              <p className="text-gray-600">Resumen de ventas</p>
            </div>
          </Link>
        </div>

        {/* Volver al sitio */}
        <div className="mt-12 text-center">
          <Link href="/" className="text-blue-600 hover:text-blue-700 font-bold">
            ← Volver al sitio principal
          </Link>
        </div>
      </div>
    </div>
  )
}
