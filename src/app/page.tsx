'use client'

import Link from "next/link"
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

      {/* Beneficios */}
      <section className="bg-gradient-to-r from-blue-50 to-purple-50 py-8 px-6 border-b-4 border-blue-500">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-3">⚡</div>
              <h3 className="font-bold text-gray-900">Calidad Premium</h3>
              <p className="text-gray-600 text-sm">Productos resistentes y confiables</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3">🚚</div>
              <h3 className="font-bold text-gray-900">Envíos Rápidos</h3>
              <p className="text-gray-600 text-sm">Entrega segura a todo Uruguay</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3">🔒</div>
              <h3 className="font-bold text-gray-900">Seguridad</h3>
              <p className="text-gray-600 text-sm">Compra 100% protegida</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3">💳</div>
              <h3 className="font-bold text-gray-900">Hasta 12 Cuotas</h3>
              <p className="text-gray-600 text-sm">Sin interés en tarjeta</p>
            </div>
          </div>
        </div>
      </section>

      {/* Hero */}
      <section className="relative bg-gradient-to-b from-blue-600 to-blue-400 text-white py-24 px-6 min-h-96 flex items-center">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="text-6xl font-bold mb-6">Pasión por Cocinar</h1>
          <p className="text-2xl mb-8">Distribuidor oficial en Uruguay de la marca brasileña líder en utensilios de cocina</p>
          <a href="#productos" className="inline-block px-8 py-4 bg-cyan-500 text-white font-bold rounded-lg hover:bg-cyan-600 transition text-lg shadow-lg">
            Explorar Productos
          </a>
        </div>
      </section>

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

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h4 className="font-bold mb-4 text-lg flex items-center gap-2">
                <img src="/assets/panelux-logo.png" alt="Panelux" className="h-8" />
                Panelux Uruguay
              </h4>
              <p className="text-gray-400">Distribuidor oficial de utensilios de cocina premium</p>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-lg">Contacto</h4>
              <p className="text-gray-400">Yaguarón 1764, Montevideo</p>
              <p className="text-gray-400">+598 9271 5555</p>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-lg">Horario</h4>
              <p className="text-gray-400">Lun-Vie: 8:30 - 17:15</p>
              <p className="text-gray-400">Sábado: Cerrado</p>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>© 2026 Panelux Uruguay - Distribuidor Oficial</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
