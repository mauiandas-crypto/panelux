import Link from "next/link"
import { productos } from "@/data/productos"
import ProductCard from "@/components/ProductCard"
import Hero from "@/components/Hero"

const categorias = [
  { nombre: 'Sartenes y woks', icono: '🍳' },
  { nombre: 'Ollas y cacerolas', icono: '🍲' },
  { nombre: 'Ollas a presión', icono: '⏱️' },
  { nombre: 'Juego de ollas', icono: '🎁' },
  { nombre: 'Asaderas y moldes', icono: '📦' },
]

// Un producto representativo por línea, para mostrar variedad en la portada
// sin traer el catálogo completo (52 productos) de una.
const codigosDestacados = ['5000096', '5000141', '5001656', '5000019', '5002424', '5001217', '5004086', '5000185']

export default function Home() {
  const destacados = codigosDestacados
    .map((codigo) => productos.find((p) => p.codigo === codigo))
    .filter(Boolean)

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Azul Animado */}
      <Hero />

      {/* Categorías */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Comprá por categoría</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {categorias.map((cat) => {
              const cantidad = productos.filter((p) => p.categoria === cat.nombre).length
              return (
                <Link
                  key={cat.nombre}
                  href={`/catalogo?categoria=${encodeURIComponent(cat.nombre)}`}
                  className="bg-white border-2 border-gray-200 rounded-xl p-6 text-center hover:border-blue-400 hover:shadow-lg transition"
                >
                  <div className="text-4xl mb-3">{cat.icono}</div>
                  <p className="font-bold text-gray-900 text-sm mb-1">{cat.nombre}</p>
                  <p className="text-xs text-gray-500">{cantidad} productos</p>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Productos destacados */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-black mb-4 text-center">Productos Destacados</h2>
          <p className="text-center text-gray-600 mb-12">Una selección de nuestro catálogo</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {destacados.map((producto: any) => (
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

          <div className="text-center">
            <Link
              href="/catalogo"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-10 rounded-lg transition"
            >
              Ver catálogo completo ({productos.length} productos)
            </Link>
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
