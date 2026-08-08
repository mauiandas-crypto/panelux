'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Header from '@/components/header'

interface SyncResult {
  category: string
  icon: string
  count: number
  products: Array<{
    id: string
    title: string
    price: number
    image: string
    seller: string
    currency: string
    condition: string
  }>
  status: string
}

interface SyncResponse {
  success: boolean
  timestamp: string
  totalCategories: number
  totalProducts: number
  results: Record<string, SyncResult>
}

export default function SyncMercadoLibrePage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<SyncResponse | null>(null)
  const [error, setError] = useState('')

  const handleSync = async () => {
    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/sync/mercadolibre-productos')
      const result = await response.json()

      if (result.success) {
        setData(result)
      } else {
        setError('Error en la sincronización')
      }
    } catch (err) {
      setError('Error al conectar con la API')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Sincronizar MercadoLibre</h1>
            <button
              onClick={() => router.push('/admin')}
              className="px-4 py-2 text-gray-600 hover:text-gray-700"
            >
              ← Volver
            </button>
          </div>

          {/* Botón de sincronización */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <p className="text-gray-600 mb-4">
              Sincroniza todos los productos de MercadoLibre que contengan "Panelux" en el nombre.
              Se buscarán productos para cada categoría.
            </p>
            <button
              onClick={handleSync}
              disabled={loading}
              className="px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
            >
              {loading ? '⏳ Sincronizando...' : '🔄 Sincronizar Ahora'}
            </button>
          </div>

          {/* Mensaje de error */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8 text-red-900">
              {error}
            </div>
          )}

          {/* Resultados */}
          {data && (
            <div className="space-y-8">
              {/* Resumen */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <p className="text-gray-600 text-sm mb-2">Total Categorías</p>
                  <p className="text-3xl font-bold text-gray-900">{data.totalCategories}</p>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                  <p className="text-gray-600 text-sm mb-2">Productos Encontrados</p>
                  <p className="text-3xl font-bold text-cyan-600">{data.totalProducts}</p>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                  <p className="text-gray-600 text-sm mb-2">Última Sincronización</p>
                  <p className="text-sm font-mono text-gray-900">
                    {new Date(data.timestamp).toLocaleString('es-ES')}
                  </p>
                </div>
              </div>

              {/* Productos por categoría */}
              {Object.entries(data.results).map(([categorySlug, category]) => (
                <div key={categorySlug} className="bg-white rounded-lg shadow-md overflow-hidden">
                  {/* Header de categoría */}
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 px-6 py-4 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{category.icon}</span>
                        <div>
                          <h3 className="font-bold text-gray-900">{category.category}</h3>
                          <p className="text-sm text-gray-600">
                            {category.count} producto{category.count !== 1 ? 's' : ''} encontrado{category.count !== 1 ? 's' : ''}
                          </p>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        category.count > 0
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {category.status}
                      </span>
                    </div>
                  </div>

                  {/* Productos */}
                  {category.count > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-gray-200 bg-gray-50">
                            <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Producto</th>
                            <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Precio</th>
                            <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Vendedor</th>
                            <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Condición</th>
                          </tr>
                        </thead>
                        <tbody>
                          {category.products.map((product) => (
                            <tr key={product.id} className="border-b border-gray-200 hover:bg-gray-50">
                              <td className="px-6 py-4">
                                <div className="flex items-center gap-3">
                                  <img
                                    src={product.image}
                                    alt={product.title}
                                    className="w-12 h-12 object-cover rounded"
                                  />
                                  <div>
                                    <p className="font-medium text-gray-900 line-clamp-2">{product.title}</p>
                                    <p className="text-xs text-gray-500 mt-1">ID: {product.id}</p>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4 font-bold text-cyan-600">
                                {product.currency} ${product.price.toLocaleString()}
                              </td>
                              <td className="px-6 py-4 text-sm text-gray-600">{product.seller}</td>
                              <td className="px-6 py-4 text-sm">
                                <span className={`px-2 py-1 rounded text-xs font-medium ${
                                  product.condition === 'new'
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-blue-100 text-blue-800'
                                }`}>
                                  {product.condition === 'new' ? 'Nuevo' : 'Usado'}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="px-6 py-8 text-center text-gray-600">
                      No se encontraron productos Panelux en esta categoría
                    </div>
                  )}
                </div>
              ))}

              {/* Info adicional */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="font-bold text-blue-900 mb-3">ℹ️ Información</h3>
                <ul className="text-sm text-blue-800 space-y-2">
                  <li>✓ Se sincronizaron productos de MercadoLibre Uruguay</li>
                  <li>✓ Se filtraron solo productos que contienen "Panelux"</li>
                  <li>✓ Se muestran los primeros 12 resultados por categoría</li>
                  <li>✓ Los precios están en la moneda del producto</li>
                  <li>📝 Los productos se pueden usar para reemplazar o complementar el catálogo local</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
