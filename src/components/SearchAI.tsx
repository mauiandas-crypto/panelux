'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { productos } from '@/data/productos'

// Levenshtein distance algorithm for fuzzy matching
function levenshteinDistance(a: string, b: string): number {
  const aLower = a.toLowerCase()
  const bLower = b.toLowerCase()
  const matrix: number[][] = []

  for (let i = 0; i <= bLower.length; i++) {
    matrix[i] = [i]
  }

  for (let j = 0; j <= aLower.length; j++) {
    matrix[0][j] = j
  }

  for (let i = 1; i <= bLower.length; i++) {
    for (let j = 1; j <= aLower.length; j++) {
      if (bLower[i - 1] === aLower[j - 1]) {
        matrix[i][j] = matrix[i - 1][j - 1]
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        )
      }
    }
  }

  return matrix[bLower.length][aLower.length]
}

interface SearchResult {
  codigo: string
  nombre: string
  pvp: number
  categoria: string
  similarity: number
}

export default function SearchAI() {
  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState<SearchResult[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const router = useRouter()
  const suggestionsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!query.trim()) {
      setSuggestions([])
      return
    }

    const results = productos
      .map((p) => ({
        codigo: p.codigo,
        nombre: p.nombre,
        pvp: p.pvp,
        categoria: p.categoria,
        similarity: levenshteinDistance(query, p.nombre),
      }))
      .filter((p) => p.similarity <= query.length / 2 + 2)
      .sort((a, b) => a.similarity - b.similarity)
      .slice(0, 8)

    setSuggestions(results)
    setSelectedIndex(-1)
  }, [query])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions || suggestions.length === 0) return

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setSelectedIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : 0))
        break
      case 'ArrowUp':
        e.preventDefault()
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : suggestions.length - 1))
        break
      case 'Enter':
        e.preventDefault()
        if (selectedIndex >= 0) {
          router.push(`/productos/${suggestions[selectedIndex].codigo}`)
        } else if (query.trim()) {
          router.push(`/?buscar=${encodeURIComponent(query)}`)
        }
        break
      case 'Escape':
        setShowSuggestions(false)
        break
    }
  }

  return (
    <div className="relative w-full">
      <div className="flex gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setShowSuggestions(true)}
          onKeyDown={handleKeyDown}
          placeholder="🔍 Buscar productos..."
          className="flex-1 px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 text-gray-900"
        />
        <button
          onClick={() => query.trim() && router.push(`/?buscar=${encodeURIComponent(query)}`)}
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition"
        >
          🔍
        </button>
      </div>

      {showSuggestions && suggestions.length > 0 && (
        <div
          ref={suggestionsRef}
          className="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-gray-300 rounded-lg shadow-lg z-50"
        >
          {suggestions.map((result, idx) => (
            <button
              key={result.codigo}
              onClick={() => {
                router.push(`/productos/${result.codigo}`)
                setQuery('')
                setShowSuggestions(false)
              }}
              className={`w-full text-left px-4 py-3 border-b border-gray-200 last:border-b-0 transition ${
                idx === selectedIndex ? 'bg-blue-50' : 'hover:bg-gray-50'
              }`}
            >
              <div className="font-semibold text-gray-900">{result.nombre}</div>
              <div className="text-xs text-gray-600">
                {result.categoria} • <strong>${result.pvp}</strong>
              </div>
            </button>
          ))}
        </div>
      )}

      {showSuggestions && query.trim() && suggestions.length === 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-gray-300 rounded-lg shadow-lg p-4 text-center text-gray-600">
          No se encontraron resultados para "{query}"
        </div>
      )}
    </div>
  )
}
