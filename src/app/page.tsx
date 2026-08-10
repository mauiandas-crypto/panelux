'use client'

import Link from "next/link"
import { useState, useMemo } from "react"
import productos from "../../catalogo-completo.json"

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const productosPorCategoria = useMemo(() => {
    return productos.reduce((acc: Record<string, typeof productos>, p) => {
      if (!acc[p.categoria]) acc[p.categoria] = []
      acc[p.categoria].push(p)
      return acc
    }, {})
  }, [])

  const categorias = Object.keys(productosPorCategoria).sort()
  const productosVisibles = selectedCategory ? productosPorCategoria[selectedCategory] : productos.slice(0, 6)
  return (
    <div className="min-h-screen bg-white">
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
              <h3 className="font-bold text-gray-900">Hasta 6 Cuotas</h3>
              <p className="text-gray-600 text-sm">Sin interés en tarjeta</p>
            </div>
          </div>
        </div>
      </section>

      {/* Hero */}
      <section className="relative bg-gradient-to-b from-blue-600 to-blue-400 text-white py-24 px-6 min-h-96 flex items-center">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="text-6xl font-bold mb-6">Pasión por Cocinar</h1>
          <p className="text-2xl mb-8">Transformando ingredientes en recuerdos. Panelux es el distribuidor oficial en Uruguay de la marca brasileña líder en utensilios de cocina.</p>
          <a href="#productos" className="inline-block px-8 py-4 bg-cyan-500 text-white font-bold rounded-lg hover:bg-cyan-600 transition text-lg shadow-lg">
            Explorar Productos
          </a>
        </div>
      </section>

      {/* Categorías rápidas */}
      <section className="bg-white py-8 px-6 border-b">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center gap-4">
            {["Ollas a Presión", "Juego de Ollas", "Sartenes", "Cacerolas", "Accesorios"].map(cat => (
              <a key={cat} href="#productos" className="px-6 py-2 bg-blue-100 text-blue-900 font-semibold rounded-full hover:bg-blue-200 transition">
                {cat}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Productos destacados */}
      <section id="productos" className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-16 text-center">
            Productos en Destaque
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {productosVisibles.map((producto: any) => (
              <div key={producto.codigo} className="bg-white rounded-lg shadow-lg hover:shadow-2xl transition overflow-hidden group">
                <div className="relative h-64 bg-gray-200">
                  <img src={producto.imagen} alt={producto.nombre} className="w-full h-full object-cover group-hover:scale-110 transition duration-300" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-black mb-2">{producto.nombre}</h3>
                  <p className="text-gray-600 text-sm mb-4">{producto.categoria}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-bold text-blue-600">${producto.pvp}</span>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-bold transition">
                      ➕ Agregar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12 p-8 bg-blue-50 rounded-lg">
            <p className="text-lg text-gray-600">✨ Mostrando {productosVisibles.length} de {productos.length} productos disponibles</p>
          </div>
        </div>
      </section>

      {/* Sobre la marca */}
      <section id="sobre" className="py-16 px-6 bg-gradient-to-b from-blue-50 to-purple-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-blue-900 mb-12 text-center">¿Por Qué Elegir Panelux?</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-white p-6 rounded-lg border-l-4 border-blue-500">
              <h3 className="text-2xl font-bold text-blue-900 mb-4">🏆 Distribuidor Oficial</h3>
              <p className="text-gray-700">Somos el distribuidor oficial en Uruguay de Panelux, la marca brasileña con más de 25 años en el mercado. Garantía de autenticidad en cada producto.</p>
            </div>

            <div className="bg-white p-6 rounded-lg border-l-4 border-purple-500">
              <h3 className="text-2xl font-bold text-purple-900 mb-4">⭐ Calidad Premium</h3>
              <p className="text-gray-700">Productos resistentes, funcionales y duraderos. Diseñados para acompañar tu cocina todos los días con garantía oficial de la marca.</p>
            </div>

            <div className="bg-white p-6 rounded-lg border-l-4 border-blue-500">
              <h3 className="text-2xl font-bold text-blue-900 mb-4">🚚 Envíos Rápidos</h3>
              <p className="text-gray-700">Entrega segura a cualquier punto de Uruguay. Realizamos seguimiento de tu pedido en tiempo real y te notificamos en cada paso.</p>
            </div>

            <div className="bg-white p-6 rounded-lg border-l-4 border-purple-500">
              <h3 className="text-2xl font-bold text-purple-900 mb-4">🛡️ Protegido</h3>
              <p className="text-gray-700">Pagos seguros con Mercado Pago. Política de cambios y devoluciones clara. Atención al cliente en español disponible.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Preguntas Frecuentes</h2>

          <div className="space-y-6">
            <div className="border-b border-gray-200 pb-4">
              <h3 className="font-bold text-gray-900 mb-2">¿Hacen envíos a todo Uruguay?</h3>
              <p className="text-gray-600">Sí, realizamos envíos a todo el país. El costo se calcula automáticamente según tu localidad.</p>
            </div>
            <div className="border-b border-gray-200 pb-4">
              <h3 className="font-bold text-gray-900 mb-2">¿Cuál es la garantía de los productos?</h3>
              <p className="text-gray-600">Todos nuestros productos cuentan con garantía oficial de la marca Panelux.</p>
            </div>
            <div className="border-b border-gray-200 pb-4">
              <h3 className="font-bold text-gray-900 mb-2">¿Puedo pagar en cuotas?</h3>
              <p className="text-gray-600">Sí, ofrecemos hasta 6 cuotas sin interés a través de Mercado Pago.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h4 className="font-bold mb-4 text-lg">Panelux Uruguay</h4>
              <p className="text-gray-400">Distribuidor oficial de utensilios de cocina premium de la marca Panelux</p>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-lg">Contacto</h4>
              <p className="text-gray-400">Yaguarón 1764, Montevideo</p>
              <p className="text-gray-400">ventas@todogastro.com.uy</p>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-lg">Horario</h4>
              <p className="text-gray-400">Lunes a Viernes: 9:00 - 18:00</p>
              <p className="text-gray-400">Sábado: 10:00 - 14:00</p>
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
