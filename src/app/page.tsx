import Link from 'next/link'

export default function Home() {
  const productos = [
    { codigo: "5000041", nombre: "Magnific - Sartén francesa 32cm - Grafito - 2,1mm", categoria: "Sartenes y woks", pvp: 710, imagen: "/productos/Magnific%20AA/5000041_Magnific_AA_Frigideira%20Francesa%20%C3%8732_Grafite.jpg", linea: "Magnific AA" },
    { codigo: "5000094", nombre: "Magnific - Cacerola 18cm - Grafito - 1mm", categoria: "Ollas y cacerolas", pvp: 600, imagen: "/productos/Magnific%20AA/5000094_Magnific_AA_Ca%C3%A7arola%20%C3%8718_Grafite.jpg", linea: "Magnific AA" },
    { codigo: "5000096", nombre: "Magnific - Cacerola 22cm - Grafito - 1,2mm", categoria: "Ollas y cacerolas", pvp: 840, imagen: "/productos/Magnific%20AA/5000096_Magnific_AA_Ca%C3%A7arola%20%C3%8722_Grafite.jpg", linea: "Magnific AA" },
    { codigo: "5000097", nombre: "Magnific - Cacerola 24cm - Grafito - 1,5mm", categoria: "Ollas y cacerolas", pvp: 890, imagen: "/productos/Magnific%20AA/5000097_Magnific_AA_Ca%C3%A7arola%20%C3%8724_Grafite.jpg", linea: "Magnific AA" },
    { codigo: "5000123", nombre: "Magnific - Hervidor 12cm - Grafito - 1mm", categoria: "Ollas y cacerolas", pvp: 380, imagen: "/productos/Magnific%20AA/5000123_Magnific_Fervedor%20%C3%8712_Grafite.jpg", linea: "Magnific AA" },
    { codigo: "5000133", nombre: "Magnific - Hervidor 16cm - Grafito - 1mm", categoria: "Ollas y cacerolas", pvp: 465, imagen: "/productos/Magnific%20AA/5000133_Magnific_Fervedor%20%C3%8716_Grafite.jpg", linea: "Magnific AA" },
  ]

  const porCategoria = productos.reduce((acc, p) => {
    if (!acc[p.categoria]) acc[p.categoria] = []
    acc[p.categoria].push(p)
    return acc
  }, {})

  const categorias = Object.keys(porCategoria).sort()

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
              🍳 Panelux
            </span>
          </Link>
          <nav className="hidden md:flex gap-8">
            <Link href="#productos" className="text-gray-700 hover:text-blue-600 font-semibold transition">
              Productos
            </Link>
            <Link href="https://wa.me/598XXXXXXXXX" target="_blank" className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-bold transition shadow-md">
              💬 WhatsApp
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-500 to-blue-400 text-white py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-6xl font-bold mb-4">Panelux Uruguay</h1>
          <p className="text-2xl mb-8 text-blue-100">Distribuidor Oficial de Utensilios de Cocina Premium</p>
          <Link href="#productos" className="inline-block px-8 py-4 bg-white text-blue-600 font-bold rounded-lg hover:bg-gray-100 transition shadow-lg text-lg">
            🛍️ Ver Catálogo Completo (76 Productos)
          </Link>
        </div>
      </section>

      {/* Productos */}
      <section id="productos" className="max-w-7xl mx-auto px-4 py-16">
        {categorias.map((categoria) => (
          <div key={categoria} className="mb-20">
            <div className="mb-12">
              <h2 className="text-4xl font-bold text-gray-900 pb-4 border-b-4 border-blue-500">
                {categoria}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {porCategoria[categoria].map((producto) => (
                <div
                  key={producto.codigo}
                  className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group"
                >
                  {/* Imagen */}
                  <div className="relative h-64 bg-gray-100 overflow-hidden">
                    <img
                      src={producto.imagen}
                      alt={producto.nombre}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      onError={(e) => {
                        e.currentTarget.style.fontSize = "64px"
                        e.currentTarget.style.display = "flex"
                        e.currentTarget.style.alignItems = "center"
                        e.currentTarget.style.justifyContent = "center"
                        e.currentTarget.textContent = "🍳"
                      }}
                    />
                  </div>

                  {/* Contenido */}
                  <div className="p-6">
                    <h3 className="font-bold text-gray-900 mb-2 text-base line-clamp-2">
                      {producto.nombre}
                    </h3>

                    <p className="text-sm text-gray-500 mb-1 font-medium">
                      Código: {producto.codigo}
                    </p>
                    <p className="text-xs text-gray-400 mb-4">
                      {producto.linea}
                    </p>

                    {/* Precio y botón */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <span className="text-3xl font-bold text-blue-600">
                        ${producto.pvp}
                      </span>
                      <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg font-bold transition shadow-md">
                        ➕ Agregar
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="text-center mt-16 p-8 bg-blue-50 rounded-lg">
          <p className="text-lg text-gray-600">
            ✨ Mostrando 6 de 76 productos disponibles
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Consulta por más productos en nuestro catálogo completo
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 mt-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h4 className="font-bold mb-4">Panelux Uruguay</h4>
              <p className="text-gray-400">Distribuidor oficial de utensilios de cocina premium</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Contacto</h4>
              <p className="text-gray-400">Yaguarón 1764, Montevideo</p>
              <Link href="https://wa.me/598XXXXXXXXX" className="text-green-400 hover:text-green-300">
                WhatsApp: +598 xxxxxxxxx
              </Link>
            </div>
            <div>
              <h4 className="font-bold mb-4">Horario</h4>
              <p className="text-gray-400">Lunes a Viernes: 9:00 - 18:00</p>
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
