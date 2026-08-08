'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Header from '@/components/header'
import Link from 'next/link'

interface SearchResult {
  id: string
  name: string
  slug: string
  category: string
  categorySlug: string
  price: number
  description: string
  image?: string
}

export default function SearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get('q') || ''

  const [results, setResults] = useState<SearchResult[]>([])
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)

  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([])
      setSearched(false)
      return
    }

    const search = async () => {
      setLoading(true)
      try {
        const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`)
        const data = await response.json()
        setResults(data.results || [])
        setSearched(true)
      } catch (error) {
        console.error('Error searching:', error)
        setResults([])
        setSearched(true)
      } finally {
        setLoading(false)
      }
    }

    search()
  }, [query])

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Resultados de Búsqueda</h1>

          <div className="mb-8">
            <p className="text-gray-600">
              {searched && (
                <>
                  {results.length > 0
                    ? `Se encontraron ${results.length} resultado${results.length !== 1 ? 's' : ''} para "${query}"`
                    : `No se encontraron resultados para "${query}"`}
                </>
              )}
            </p>
          </div>

          {loading && (
            <div className="text-center py-12">
              <div className="animate-spin text-4xl mb-4">⏳</div>
              <p className="text-gray-600">Buscando...</p>
            </div>
          )}

          {searched && !loading && results.length === 0 && (
            <div className="bg-white rounded-lg shadow-md p-12 text-center mb-8">
              <p className="text-xl text-gray-600 mb-6">No encontramos productos que coincidan con tu búsqueda.</p>
              <Link
                href="/"
                className="inline-block px-8 py-3 bg-cyan-500 text-white font-bold rounded-lg hover:bg-cyan-600 transition-colors"
              >
                Ver Todos los Productos
              </Link>
            </div>
          )}

          {results.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {results.map((product) => (
                <Link
                  key={product.id}
                  href={`/categoria/${product.categorySlug}/${product.slug}`}
                  className="group"
                >
                  <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col">
                    <div className="bg-gradient-to-br from-blue-100 to-purple-100 h-48 flex items-center justify-center text-6xl group-hover:scale-110 transition-transform">
                      {product.image || '🍳'}
                    </div>

                    <div className="p-4 flex-1 flex flex-col">
                      <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                        {product.name}
                      </h3>

                      <p className="text-sm text-gray-600 mb-3 line-clamp-2 flex-1">
                        {product.description}
                      </p>

                      <p className="text-xs text-gray-500 mb-3">
                        {product.category}
                      </p>

                      <p className="text-2xl font-bold text-cyan-500">
                        ${product.price.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  )
}
