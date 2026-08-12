'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function OrdersAdmin() {
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/admin" className="text-blue-600 hover:text-blue-700 font-bold">
            ← Volver al panel
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">📋 Órdenes</h1>
          <div></div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="bg-white rounded-lg shadow-lg p-12 text-center">
          <div className="text-6xl mb-4">📭</div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Sin órdenes aún</h2>
          <p className="text-gray-600 mb-8">
            Las órdenes aparecerán aquí cuando los clientes realicen compras.
          </p>

          <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-6 text-left">
            <h3 className="font-bold text-gray-900 mb-2">🔧 Próximamente</h3>
            <ul className="space-y-2 text-gray-700">
              <li>✓ Ver todas las órdenes</li>
              <li>✓ Filtrar por estado</li>
              <li>✓ Descargar facturas</li>
              <li>✓ Cambiar estado de órdenes</li>
              <li>✓ Enviar notificaciones al cliente</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
