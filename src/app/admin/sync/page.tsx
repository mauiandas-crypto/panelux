'use client'

import { useState } from 'react'
import Header from '@/components/header'
import Footer from '@/components/footer'

interface SyncResult {
  category: string
  slug: string
  productsFound: number
  status: string
}

export default function SyncPage() {
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<SyncResult[]>([])
  const [summary, setSummary] = useState<any>(null)
  const [error, setError] = useState('')

  const handleSync = async () => {
    setLoading(true)
    setError('')
    setResults([])
    setSummary(null)

    try {
      const response = await fetch('/api/sync/mercadolibre')
      const data = await response.json()

      if (data.status === 'success') {
        setResults(data.results)
        setSummary(data.summary)
      } else {
        setError(data.message)
      }
    } catch (err) {
      setError('Error al sincronizar con MercadoLibre')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">
              📦 Sincronización MercadoLibre
            </h1>

            <div className="mb-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-blue-900">
                Esta página sincroniza todos los productos de MercadoLibre en las categorías configuradas.
                Los productos reales de MercadoLibre se mostrarán en las páginas de categoría.
              </p>
            </div>

            <button
              onClick={handleSync}
              disabled={loading}
              className="px-6 py-3 bg-cyan-500 text-white font-bold rounded-lg hover:bg-cyan-600 disabled:bg-gray-400 transition-colors mb-8"
            >
              {loading ? '⏳ Sincronizando...' : '🔄 Iniciar Sincronización'}
            </button>

            {error && (
              <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-lg text-red-900">
                {error}
              </div>
            )}

            {summary && (
              <div className="mb-8 p-4 bg-green-50 border border-green-200 rounded-lg">
                <h2 className="font-bold text-green-900 mb-3">✓ Sincronización Completada</h2>
                <div className="grid grid-cols-3 gap-4 text-green-900">
                  <div>
                    <p className="text-2xl font-bold">{summary.totalCategories}</p>
                    <p className="text-sm">Total de Categorías</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{summary.successfulCategories}</p>
                    <p className="text-sm">Con Productos</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{summary.totalProductsFound}</p>
                    <p className="text-sm">Productos Totales</p>
                  </div>
                </div>
              </div>
            )}

            {results.length > 0 && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">Resultados por Categoría</h2>
                <div className="space-y-3">
                  {results.map((result) => (
                    <div
                      key={result.slug}
                      className={`p-4 rounded-lg border-2 ${
                        result.status === 'success'
                          ? 'bg-green-50 border-green-200'
                          : 'bg-yellow-50 border-yellow-200'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-bold text-gray-900">{result.category}</h3>
                          <p className={`text-sm ${result.status === 'success' ? 'text-green-700' : 'text-yellow-700'}`}>
                            {result.productsFound > 0
                              ? `${result.productsFound} productos encontrados`
                              : 'No se encontraron productos'}
                          </p>
                        </div>
                        <div className="text-2xl">
                          {result.status === 'success' ? '✓' : '⚠️'}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {!loading && results.length === 0 && !error && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">
                  Haz clic en "Iniciar Sincronización" para traer productos de MercadoLibre
                </p>
              </div>
            )}

            <div className="mt-12 p-6 bg-gray-50 rounded-lg border border-gray-200">
              <h3 className="font-bold text-gray-900 mb-3">ℹ️ Cómo Funciona</h3>
              <ul className="text-gray-700 space-y-2 text-sm">
                <li>✓ Se buscan productos por cada categoría en MercadoLibre Uruguay</li>
                <li>✓ Los datos se cachean por 1 hora para optimizar rendimiento</li>
                <li>✓ Si hay productos de MercadoLibre, se muestran con un badge 📦</li>
                <li>✓ Si no hay conexión, se usan productos de prueba locales</li>
                <li>✓ Es compatible con el carrito y cupones</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
