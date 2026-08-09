import Link from 'next/link'
import Image from 'next/image'
import catalogo from '@/catalogo-completo.json'

export default function Home() {
  // Agrupar productos por categoría
  const productosPorCategoria = catalogo.reduce((acc, producto) => {
    if (!acc[producto.categoria]) {
      acc[producto.categoria] = []
    }
    acc[producto.categoria].push(producto)
    return acc
  }, {} as Record<string, typeof catalogo>)

  const categorias = Object.keys(productosPorCategoria).sort()

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-3xl font-bold text-blue-600">🍳 Panelux</span>
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link href="/" className="text-gray-700 hover:text-blue-600 font-medium">Inicio</Link>
            <Link href="#productos" className="text-gray-700 hover:text-blue-600 font-medium">Productos</Link>
          </nav>
          <Link href="https://wa.me/598XXXXXXXXX" target="_blank" className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">
            WhatsApp
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-400 text-white py-20 px-4 text-center">
        <h1 className="text-5xl font-bold mb-4">Panelux Uruguay</h1>
        <p className="text-xl mb-8">Distribuidor oficial de utensilios de cocina premium</p>
        <Link href="#productos" className="inline-block px-8 py-3 bg-white text-blue-600 font-bold rounded-lg hover:bg-gray-100">
          Ver Catálogo Completo
        </Link>
      </section>

      {/* Productos por categoría */}
      <section id="productos" className="max-w-7xl mx-auto px-4 py-20">
        {categorias.map((categoria) => (
          <div key={categoria} className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 pb-4 border-b-4 border-blue-500">
              {categoria}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {productosPorCategoria[categoria].map((producto) => (
                <div
                  key={producto.codigo}
                  className="bg-white rounded-lg shadow-lg hover:shadow-2xl transition-all overflow-hidden group"
                >
                  {/* Imagen */}
                  <div className="relative h-48 bg-gray-100 overflow-hidden">
                    <img
                      src={producto.imagen}
                      alt={producto.nombre}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      onError={(e) => {
                        e.currentTarget.src = '🍳'
                        e.currentTarget.style.fontSize = '48px'
                        e.currentTarget.style.display = 'flex'
                        e.currentTarget.style.alignItems = 'center'
                        e.currentTarget.style.justifyContent = 'center'
                      }}
                    />
                  </div>

                  {/* Contenido */}
                  <div className="p-4">
                    <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 text-sm">
                      {producto.nombre}
                    </h3>
                    
                    <p className="text-xs text-gray-500 mb-3">
                      Código: {producto.codigo}
                    </p>

                    <p className="text-xs text-gray-600 mb-4 line-clamp-2">
                      {producto.linea}
                    </p>

                    {/* Precio */}
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-blue-600">
                        ${producto.pvp}
                      </span>
                      <button className="bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700 text-sm font-medium">
                        ➕
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 text-center">
        <p>© 2026 Panelux Uruguay - Distribuidor Oficial</p>
        <p className="mt-2 text-gray-400">Yaguarón 1764, Montevideo</p>
      </footer>
    </div>
  )
}
