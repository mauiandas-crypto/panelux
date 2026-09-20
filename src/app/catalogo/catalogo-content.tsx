'use client'

import { useState, useMemo, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { productos } from "@/data/productos"
import ProductCard from "@/components/ProductCard"

export function CatalogoContent() {
  const searchParams = useSearchParams()
  const categoriaInicial = searchParams.get('categoria')

  const [selectedCategory, setSelectedCategory] = useState<string | null>(categoriaInicial)
  const [selectedLinea, setSelectedLinea] = useState<string | null>(null)
  const [orden, setOrden] = useState<'default' | 'precioAsc' | 'precioDesc'>('default')

  useEffect(() => {
    if (categoriaInicial) setSelectedCategory(categoriaInicial)
  }, [categoriaInicial])

  const productosPorCategoria = useMemo(() => {
    return productos.reduce((acc: Record<string, any[]>, p) => {
      if (!acc[p.categoria]) acc[p.categoria] = []
      acc[p.categoria].push(p)
      return acc
    }, {})
  }, [])

  const categorias = Object.keys(productosPorCategoria).sort()
  const lineas = useMemo(
    () => Array.from(new Set(productos.map((p) => p.linea))).sort(),
    []
  )

  const productosVisibles = useMemo(() => {
    let lista = selectedCategory ? (productosPorCategoria[selectedCategory] || productos) : productos
    if (selectedLinea) {
      lista = lista.filter((p) => p.linea === selectedLinea)
    }
    if (orden === 'precioAsc') {
      lista = [...lista].sort((a, b) => a.pvp - b.pvp)
    } else if (orden === 'precioDesc') {
      lista = [...lista].sort((a, b) => b.pvp - a.pvp)
    }
    return lista
  }, [selectedCategory, selectedLinea, orden, productosPorCategoria])

  return (
    <div className="min-h-screen bg-white">
      {/* Filtros: sticky solo en desktop - en mobile, con categoría + línea +
          orden envueltos en varias líneas, quedaba una franja anclada gigante
          tapando media pantalla al scrollear. */}
      <section className="bg-white py-4 md:py-8 px-6 border-b md:sticky md:top-20 md:z-40">
        <div className="max-w-7xl mx-auto space-y-3 md:space-y-4">
          <div>
            <p className="text-xs font-semibold text-gray-500 mb-2">CATEGORÍA</p>
            <div className="flex md:flex-wrap gap-2 overflow-x-auto md:overflow-visible pb-1 md:pb-0 -mx-6 px-6 md:mx-0 md:px-0">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`flex-shrink-0 px-4 py-2 rounded-full font-semibold transition text-sm ${
                  selectedCategory === null
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                }`}
              >
                Todas ({productos.length})
              </button>
              {categorias.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`flex-shrink-0 px-4 py-2 rounded-full font-semibold transition text-sm ${
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

          <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4 md:justify-between">
            <div>
              <p className="text-xs font-semibold text-gray-500 mb-2">LÍNEA</p>
              <div className="flex md:flex-wrap gap-2 overflow-x-auto md:overflow-visible pb-1 md:pb-0 -mx-6 px-6 md:mx-0 md:px-0">
                <button
                  onClick={() => setSelectedLinea(null)}
                  className={`flex-shrink-0 px-3 py-1.5 rounded-full font-semibold transition text-xs ${
                    selectedLinea === null
                      ? 'bg-gray-900 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Todas
                </button>
                {lineas.map((linea) => (
                  <button
                    key={linea}
                    onClick={() => setSelectedLinea(linea)}
                    className={`flex-shrink-0 px-3 py-1.5 rounded-full font-semibold transition text-xs ${
                      selectedLinea === linea
                        ? 'bg-gray-900 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {linea}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold text-gray-500 mb-2">ORDENAR</p>
              <select
                value={orden}
                onChange={(e) => setOrden(e.target.value as any)}
                className="w-full md:w-auto px-3 py-2 border-2 border-gray-300 rounded-lg text-sm text-gray-900"
              >
                <option value="default">Relevancia</option>
                <option value="precioAsc">Precio: menor a mayor</option>
                <option value="precioDesc">Precio: mayor a menor</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Productos */}
      <section className="py-12 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-black mb-4 text-center">Catálogo Completo</h1>
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
    </div>
  )
}
