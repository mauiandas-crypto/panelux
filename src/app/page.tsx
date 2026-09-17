'use client'

import { useState, useMemo } from "react"
import { productos } from "@/data/productos"
import ProductCard from "@/components/ProductCard"
import Hero from "@/components/Hero"

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const productosPorCategoria = useMemo(() => {
    return productos.reduce((acc: Record<string, any[]>, p) => {
      if (!acc[p.categoria]) acc[p.categoria] = []
      acc[p.categoria].push(p)
      return acc
    }, {})
  }, [])

  const categorias = Object.keys(productosPorCategoria).sort()
  const productosVisibles = selectedCategory ? productosPorCategoria[selectedCategory] : productos

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Azul Animado */}
      <Hero />

      {/* Categorías */}
      <section className="bg-white py-8 px-6 border-b sticky top-20 z-40">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center gap-2">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-2 rounded-full font-semibold transition ${
                selectedCategory === null
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
              }`}
            >
              Todos ({productos.length})
            </button>
            {categorias.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full font-semibold transition ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                }`}
              >
                {cat} ({productosPorCategoria[cat].length})
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Productos */}
      <section id="productos" className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-black mb-4 text-center">Catálogo Completo</h2>
          <p className="text-center text-gray-600 mb-12">
            {productosVisibles.length} de {productos.length} productos
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {productosVisibles.map((producto: any) => (
              <ProductCard
                key={`${producto.codigo}-${producto.imagen}`}
                codigo={producto.codigo}
                nombre={producto.nombre}
                imagen={producto.imagen}
                linea={producto.linea}
                pvp={producto.pvp}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Sobre */}
      <section id="sobre" className="py-16 px-6 bg-gradient-to-b from-blue-50 to-purple-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-blue-900 mb-12 text-center">¿Por Qué Elegir Panelux?</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-white p-6 rounded-lg border-l-4 border-blue-500">
              <h3 className="text-2xl font-bold text-blue-900 mb-4">🏆 Distribuidor Oficial</h3>
              <p className="text-gray-700">Somos el distribuidor oficial en Uruguay de Panelux, la marca brasileña con más de 25 años en el mercado.</p>
            </div>

            <div className="bg-white p-6 rounded-lg border-l-4 border-purple-500">
              <h3 className="text-2xl font-bold text-purple-900 mb-4">⭐ Calidad Premium</h3>
              <p className="text-gray-700">Productos resistentes, funcionales y duraderos con garantía oficial.</p>
            </div>

            <div className="bg-white p-6 rounded-lg border-l-4 border-blue-500">
              <h3 className="text-2xl font-bold text-blue-900 mb-4">🚚 Envíos Rápidos</h3>
              <p className="text-gray-700">Entrega segura a cualquier punto de Uruguay con seguimiento en tiempo real.</p>
            </div>

            <div className="bg-white p-6 rounded-lg border-l-4 border-purple-500">
              <h3 className="text-2xl font-bold text-purple-900 mb-4">🛡️ Protegido</h3>
              <p className="text-gray-700">Pagos seguros con Mercado Pago. Cambios y devoluciones garantizados.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
