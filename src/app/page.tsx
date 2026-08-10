import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/assets/panelux-logo.png" alt="Panelux" className="h-12 w-12" />
            <span className="text-3xl font-bold text-blue-600">Panelux</span>
          </div>
          <nav className="hidden md:flex gap-8">
            <a href="#productos" className="text-gray-700 hover:text-blue-600 font-semibold">Productos</a>
            <a href="#sobre" className="text-gray-700 hover:text-blue-600 font-semibold">Sobre Nosotros</a>
          </nav>
          <a href="https://wa.me/598XXXXXXXXX" target="_blank" className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-lg transition">
            WhatsApp
          </a>
        </div>
      </header>

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

        {/* WhatsApp flotante */}
        <a href="https://wa.me/598XXXXXXXXX" target="_blank" className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition transform hover:scale-110" title="Contactar por WhatsApp">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19.07 4.56L19 4.5c-1.81-1.8-4.22-2.79-6.78-2.79-5.28 0-9.58 4.3-9.58 9.58 0 1.68.44 3.33 1.28 4.79L2 22l5.15-1.35c1.4.76 2.98 1.16 4.6 1.16 5.28 0 9.59-4.3 9.59-9.59 0-2.56-.99-4.97-2.79-6.78zM11.75 19.76c-1.41 0-2.8-.37-4.01-1.07l-.29-.16-2.99.79.8-2.95-.19-.3c-.78-1.24-1.19-2.68-1.19-4.14 0-4.42 3.6-8.02 8.02-8.02 2.14 0 4.15.84 5.66 2.36 1.51 1.51 2.34 3.51 2.34 5.64 0 4.42-3.6 8.02-8.02 8.02zm4.38-6.04c-.24-.12-1.43-.71-1.65-.79-.22-.08-.38-.12-.55.13-.17.24-.63.79-.77.95-.14.16-.28.18-.52.06-.24-.12-1.02-.38-1.94-1.2-.72-.65-1.2-1.44-1.34-1.68-.14-.24-.02-.37.1-.49.1-.1.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.31-.74-1.79-.2-.48-.39-.41-.54-.42-.14-.01-.29-.01-.44-.01-.15 0-.4.06-.61.29-.21.23-.84.82-.84 2 0 1.18.86 2.33 1 2.49.14.16 1.72 2.62 4.16 3.67.58.25 1.03.4 1.38.51.58.19 1.11.16 1.53.1.47-.08 1.43-.58 1.63-1.14.2-.56.2-1.05.14-1.14-.06-.1-.22-.16-.46-.28z"/>
          </svg>
        </a>
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
            {[
              { codigo: "5000041", nombre: "Magnific - Sartén Francesa 32cm", categoria: "Sartenes", pvp: 710, imagen: "/productos/Magnific%20AA/5000041_Magnific_AA_Frigideira%20Francesa%20%C3%8732_Grafite.jpg" },
              { codigo: "5000094", nombre: "Magnific - Cacerola 18cm", categoria: "Ollas", pvp: 600, imagen: "/productos/Magnific%20AA/5000094_Magnific_AA_Ca%C3%A7arola%20%C3%8718_Grafite.jpg" },
              { codigo: "5000096", nombre: "Magnific - Cacerola 22cm", categoria: "Ollas", pvp: 840, imagen: "/productos/Magnific%20AA/5000096_Magnific_AA_Ca%C3%A7arola%20%C3%8722_Grafite.jpg" },
              { codigo: "5000097", nombre: "Magnific - Cacerola 24cm", categoria: "Ollas", pvp: 890, imagen: "/productos/Magnific%20AA/5000097_Magnific_AA_Ca%C3%A7arola%20%C3%8724_Grafite.jpg" },
              { codigo: "5000123", nombre: "Magnific - Hervidor 12cm", categoria: "Ollas", pvp: 380, imagen: "/productos/Magnific%20AA/5000123_Magnific_Fervedor%20%C3%8712_Grafite.jpg" },
              { codigo: "5000133", nombre: "Magnific - Hervidor 16cm", categoria: "Ollas", pvp: 465, imagen: "/productos/Magnific%20AA/5000133_Magnific_Fervedor%20%C3%8716_Grafite.jpg" },
            ].map(producto => (
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
            <p className="text-lg text-gray-600">✨ Mostrando 6 de 76 productos disponibles</p>
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
