'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { productos } from '@/data/productos'

export default function ProductosAdmin() {
  const [filtro, setFiltro] = useState('')
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

  const productosFiltered = productos.filter(
    (p) =>
      p.nombre.toLowerCase().includes(filtro.toLowerCase()) ||
      p.codigo.includes(filtro)
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/admin" className="text-blue-600 hover:text-blue-700 font-bold">
            ← Volver al panel
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">📦 Gestión de Productos</h1>
          <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition">
            + Agregar producto
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Búsqueda */}
        <div className="mb-8">
          <input
            type="text"
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
            placeholder="Buscar por nombre o código..."
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
          />
        </div>

        {/* Tabla */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-100 border-b-2 border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-bold text-gray-900">Producto</th>
                <th className="px-6 py-3 text-left text-sm font-bold text-gray-900">Código</th>
                <th className="px-6 py-3 text-left text-sm font-bold text-gray-900">Categoría</th>
                <th className="px-6 py-3 text-left text-sm font-bold text-gray-900">Precio</th>
                <th className="px-6 py-3 text-left text-sm font-bold text-gray-900">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {productosFiltered.map((producto) => (
                <tr key={producto.codigo} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="px-6 py-4 text-gray-900">{producto.nombre}</td>
                  <td className="px-6 py-4 text-gray-600 font-mono">{producto.codigo}</td>
                  <td className="px-6 py-4 text-gray-600">{producto.categoria}</td>
                  <td className="px-6 py-4 text-gray-900 font-bold">${producto.pvp}</td>
                  <td className="px-6 py-4">
                    <button className="text-blue-600 hover:text-blue-700 font-semibold mr-4">
                      Editar
                    </button>
                    <button className="text-red-600 hover:text-red-700 font-semibold">
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 text-gray-600">
          Mostrando {productosFiltered.length} de {productos.length} productos
        </div>

        {/* Info */}
        <div className="mt-12 bg-blue-50 border-2 border-blue-300 rounded-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-3">📝 Nota</h2>
          <p className="text-gray-700">
            Los productos se cargan desde el archivo de datos. Para agregar o editar productos,
            necesitas actualizar el archivo <code className="bg-gray-200 px-2 py-1 rounded">src/data/productos.ts</code>
          </p>
        </div>
      </div>
    </div>
  )
}
