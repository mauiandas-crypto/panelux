import Link from 'next/link'

// Catálogo de productos (datos estáticos)
const productos = [
  { codigo: "5000041", nombre: "Magnific - Sartén francesa 32cm - Grafito - 2,1mm", categoria: "Sartenes y woks", pvp: 710, imagen: "/productos/Magnific%20AA/5000041_Magnific_AA_Frigideira%20Francesa%20%C3%8732_Grafite.jpg", linea: "Magnific AA" },
  { codigo: "5000094", nombre: "Magnific - Cacerola 18cm - Grafito - 1mm", categoria: "Ollas y cacerolas", pvp: 600, imagen: "/productos/Magnific%20AA/5000094_Magnific_AA_Ca%C3%A7arola%20%C3%8718_Grafite.jpg", linea: "Magnific AA" },
  { codigo: "5000096", nombre: "Magnific - Cacerola 22cm - Grafito - 1,2mm", categoria: "Ollas y cacerolas", pvp: 840, imagen: "/productos/Magnific%20AA/5000096_Magnific_AA_Ca%C3%A7arola%20%C3%8722_Grafite.jpg", linea: "Magnific AA" },
  { codigo: "5000097", nombre: "Magnific - Cacerola 24cm - Grafito - 1,5mm", categoria: "Ollas y cacerolas", pvp: 890, imagen: "/productos/Magnific%20AA/5000097_Magnific_AA_Ca%C3%A7arola%20%C3%8724_Grafite.jpg", linea: "Magnific AA" },
  { codigo: "5000123", nombre: "Magnific - Hervidor 12cm - Grafito - 1mm", categoria: "Ollas y cacerolas", pvp: 380, imagen: "/productos/Magnific%20AA/5000123_Magnific_Fervedor%20%C3%8712_Grafite.jpg", linea: "Magnific AA" },
  { codigo: "5000133", nombre: "Magnific - Hervidor 16cm - Grafito - 1mm", categoria: "Ollas y cacerolas", pvp: 465, imagen: "/productos/Magnific%20AA/5000133_Magnific_Fervedor%20%C3%8716_Grafite.jpg", linea: "Magnific AA" },
]

export default function Home() {
  // Agrupar por categoría
  const porCategoria = productos.reduce((acc, p) => {
    if (!acc[p.categoria]) acc[p.categoria] = []
    acc[p.categoria].push(p)
    return acc
  }, {} as Record<string, typeof productos>)

  const categorias = Object.keys(porCategoria).sort()

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-3xl font-bold text-blue-600">🍳 Panelux</Link>
          <nav className="hidden md:flex gap-6">
            <Link href="/" className="text-gray-700 hover:text-blue-600 font-medium">Inicio</Link>
            <Link href="#productos" className="text-gray-700 hover:text-blue-600 font-medium">Productos</Link>
          </nav>
          <Link href="https://wa.me/598XXXXXXXXX" target="_blank" className="bg-green-500 text-white px-4 py-2 rounded-lg">
            WhatsApp
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-400 text-white py-20 px-4 text-center">
        <h1 className="text-5xl font-bold mb-4">Panelux Uruguay</h1>
        <p className="text-xl mb-8">Distribuidor oficial de utensilios de cocina premium</p>
        <Link href="#productos" className="inline-block px-8 py-3 bg-white text-blue-600 font-bold rounded-lg hover:bg-gray-100">
          Ver Catálogo
        </Link>
      </section>

      {/* Productos */}
      <section id="productos" className="max-w-7xl mx-auto px-4 py-20">
        {categorias.map((categoria) => (
          <div key={categoria} className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 pb-4 border-b-4 border-blue-500">
              {categoria}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {porCategoria[categoria].map((producto) => (
                <div key={producto.codigo} className="bg-white rounded-lg shadow-lg hover:shadow-2xl overflow-hidden">
                  <div className="relative h-48 bg-gray-100">
                    <img
                      src={producto.imagen}
                      alt={producto.nombre}
                      className="w-full h-full object-cover"
                      onError={(e) => { e.currentTarget.style.fontSize = "48px"; e.currentTarget.textContent = "🍳" }}
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-gray-900 mb-2 text-sm line-clamp-2">{producto.nombre}</h3>
                    <p className="text-xs text-gray-500 mb-2">Código: {producto.codigo}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-bold text-blue-600">${producto.pvp}</span>
                      <button className="bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700 text-sm">➕</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 text-center">
        <p>© 2026 Panelux Uruguay - Distribuidor Oficial</p>
        <p className="text-gray-400">Yaguarón 1764, Montevideo</p>
      </footer>
    </div>
  )
}
