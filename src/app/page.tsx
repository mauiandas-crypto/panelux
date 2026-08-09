import Link from 'next/link'
import Header from '@/components/header'
import Spotlight from '@/components/spotlight'

const CATEGORIES = [
  {
    id: 'ollas',
    name: 'Ollas',
    slug: 'ollas',
    description: 'Antiaderentes, aluminio, cerámica e inducción',
    icon: '🍳',
  },
  {
    id: 'juegos-ollas',
    name: 'Juegos de Ollas',
    slug: 'juegos-ollas',
    description: 'Juegos completos coordinados',
    icon: '🎁',
  },
  {
    id: 'ollas-presion',
    name: 'Ollas de Presión',
    slug: 'ollas-presion',
    description: 'Seguras y eficientes',
    icon: '⚡',
  },
  {
    id: 'sartenes',
    name: 'Sartenes',
    slug: 'sartenes',
    description: 'Para todo tipo de cocción',
    icon: '🍳',
  },
  {
    id: 'moldes-bandejas',
    name: 'Moldes y Bandejas',
    slug: 'moldes-bandejas',
    description: 'Para hornear y preparar',
    icon: '🥐',
  },
  {
    id: 'accesorios',
    name: 'Accesorios',
    slug: 'accesorios',
    description: 'Complementos para tus ollas',
    icon: '🔧',
  },
]

const BENEFITS = [
  {
    title: 'Calidad que Dura',
    description: 'Productos resistentes y confiables',
    icon: '✨',
  },
  {
    title: 'Envíos a Todo el País',
    description: 'Entrega rápida y segura',
    icon: '🚚',
  },
  {
    title: 'Compra 100% Segura',
    description: 'Seguridad del inicio al fin',
    icon: '🔒',
  },
  {
    title: 'Hasta 6 Cuotas',
    description: 'Sin interés en tarjeta',
    icon: '💳',
  },
]

export default function Home() {
  return (
    <>
      <Header />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'LocalBusiness',
            name: 'Panelux Uruguay',
            description: 'Distribuidor oficial de utensilios de cocina Panelux',
            url: 'https://panelux.com.uy',
            telephone: '+598123456789',
            address: {
              '@type': 'PostalAddress',
              addressCountry: 'UY',
            },
            sameAs: [
              'https://www.mercadolibre.com.uy/seller/panelux-uy',
            ],
          }),
        }}
      />

      {/* Beneficios superiores */}
      <section className="bg-gradient-to-r from-purple-100 to-purple-50 py-6 border-b-4 border-purple-600">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {BENEFITS.map((benefit, i) => (
              <div key={i} className="text-center">
                <div className="text-4xl mb-3 text-purple-600">{benefit.icon}</div>
                <h3 className="font-bold text-gray-900 text-sm">{benefit.title}</h3>
                <p className="text-gray-600 text-xs">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hero principal */}
      <section className="relative bg-gradient-to-b from-blue-500 via-blue-400 to-white py-20 px-4 min-h-96 flex items-center overflow-hidden">
        <Spotlight className="top-0 left-1/2 -translate-x-1/2" size={300} />

        <div className="max-w-3xl mx-auto text-center relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Pasión por Cocinar
          </h1>
          <p className="text-xl text-white mb-8 max-w-2xl mx-auto">
            Transformando ingredientes en recuerdos. Panelux es el distribuidor oficial en Uruguay de la marca brasileña líder en utensilios de cocina.
          </p>
          <Link
            href="#categorias"
            className="inline-block px-8 py-4 bg-cyan-500 text-white font-bold rounded-lg hover:bg-cyan-600 transition-colors text-lg"
          >
            Explorar Productos
          </Link>
        </div>

        {/* WhatsApp flotante */}
        <Link
          href="https://wa.me/598XXXXXXXXX"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all transform hover:scale-110"
          title="Contactar por WhatsApp"
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19.07 4.56L19 4.5c-1.81-1.8-4.22-2.79-6.78-2.79-5.28 0-9.58 4.3-9.58 9.58 0 1.68.44 3.33 1.28 4.79L2 22l5.15-1.35c1.4.76 2.98 1.16 4.6 1.16 5.28 0 9.59-4.3 9.59-9.59 0-2.56-.99-4.97-2.79-6.78zM11.75 19.76c-1.41 0-2.8-.37-4.01-1.07l-.29-.16-2.99.79.8-2.95-.19-.3c-.78-1.24-1.19-2.68-1.19-4.14 0-4.42 3.6-8.02 8.02-8.02 2.14 0 4.15.84 5.66 2.36 1.51 1.51 2.34 3.51 2.34 5.64 0 4.42-3.6 8.02-8.02 8.02zm4.38-6.04c-.24-.12-1.43-.71-1.65-.79-.22-.08-.38-.12-.55.13-.17.24-.63.79-.77.95-.14.16-.28.18-.52.06-.24-.12-1.02-.38-1.94-1.2-.72-.65-1.2-1.44-1.34-1.68-.14-.24-.02-.37.1-.49.1-.1.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.31-.74-1.79-.2-.48-.39-.41-.54-.42-.14-.01-.29-.01-.44-.01-.15 0-.4.06-.61.29-.21.23-.84.82-.84 2 0 1.18.86 2.33 1 2.49.14.16 1.72 2.62 4.16 3.67.58.25 1.03.4 1.38.51.58.19 1.11.16 1.53.1.47-.08 1.43-.58 1.63-1.14.2-.56.2-1.05.14-1.14-.06-.1-.22-.16-.46-.28z"/>
          </svg>
        </Link>
      </section>

      {/* Navegación rápida de categorías */}
      <section className="bg-white py-8 px-4 border-b border-gray-200">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap justify-center gap-4">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.id}
                href={`/categoria/${cat.slug}`}
                className="px-6 py-2 bg-gray-100 text-gray-900 font-semibold rounded-full hover:bg-yellow-400 hover:text-black transition-colors"
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Productos destacados */}
      <section id="categorias" className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-12 text-center">
            Productos en Destaque
          </h2>

          <div className="flex justify-center">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full lg:w-auto">
            {CATEGORIES.map((category) => (
              <Link
                key={category.id}
                href={`/categoria/${category.slug}`}
              >
                <div className="bg-white border-2 border-gray-300 rounded-lg p-8 hover:shadow-2xl transition-all cursor-pointer group">
                  <div className="text-5xl mb-4">{category.icon}</div>
                  <h3 className="text-2xl font-bold text-black mb-3 group-hover:text-yellow-500 transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-black font-medium mb-4">
                    {category.description}
                  </p>
                  <div className="text-yellow-500 font-bold group-hover:translate-x-2 transition-transform inline-block">
                    Ver más →
                  </div>
                </div>
              </Link>
            ))}
            </div>
          </div>
        </div>
      </section>

      {/* Sección "Sobre la Marca" */}
      <section className="py-16 px-4 bg-gradient-to-b from-blue-50 to-purple-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-12 text-center">
            ¿Por Qué Elegir Panelux?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-white p-6 rounded-lg border-l-4 border-blue-500">
              <h3 className="text-2xl font-bold text-blue-900 mb-4">
                🏆 Distribuidor Oficial
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Somos el distribuidor oficial en Uruguay de Panelux, la marca brasileña con más de 25 años en el mercado. Garantía de autenticidad en cada producto que compras.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border-l-4 border-purple-500">
              <h3 className="text-2xl font-bold text-purple-900 mb-4">
                ⭐ Calidad Premium
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Productos resistentes, funcionales y duraderos. Diseñados para acompañar tu cocina todos los días, con garantía oficial de la marca.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border-l-4 border-blue-500">
              <h3 className="text-2xl font-bold text-blue-900 mb-4">
                🚚 Envíos Rápidos
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Entrega segura a cualquier punto de Uruguay. Realizamos seguimiento de tu pedido en tiempo real y te notificamos en cada paso.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border-l-4 border-purple-500">
              <h3 className="text-2xl font-bold text-purple-900 mb-4">
                🛡️ Protegido
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Pagos seguros con Mercado Pago. Política de cambios y devoluciones clara. Atención al cliente en español disponible.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Banner Promocional Premium */}
      <section className="py-12 px-4 bg-gradient-to-r from-blue-600 to-purple-600 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white opacity-5 rounded-full -mr-48 -mt-48"></div>
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white bg-opacity-95 rounded-lg p-6 text-center shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-3">🎁</div>
              <h3 className="text-xl font-bold text-blue-600 mb-2">Ofertas Especiales</h3>
              <p className="text-gray-900 font-medium text-sm">Descuentos exclusivos en paquetes y juegos de ollas</p>
            </div>
            <div className="bg-white bg-opacity-95 rounded-lg p-6 text-center shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-3">⚡</div>
              <h3 className="text-xl font-bold text-purple-600 mb-2">Envío Express</h3>
              <p className="text-gray-900 font-medium text-sm">Entrega en 24-48 horas a Montevideo y zona</p>
            </div>
            <div className="bg-white bg-opacity-95 rounded-lg p-6 text-center shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-3">💳</div>
              <h3 className="text-xl font-bold text-blue-600 mb-2">Sin Interés</h3>
              <p className="text-gray-900 font-medium text-sm">Hasta 12 cuotas sin interés en tarjeta</p>
            </div>
          </div>

          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Calidad Brasileña a tu Alcance
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Utensilios de cocina premium con garantía oficial. Confía en Panelux, la marca que miles de familias uruguayas eligieron.
            </p>
            <Link
              href="#categorias"
              className="inline-block px-10 py-4 bg-cyan-500 text-white font-bold rounded-lg hover:bg-cyan-600 transition-colors text-lg shadow-lg"
            >
              Explorar Catálogo Completo
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ rápido */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Preguntas Frecuentes
          </h2>

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
    </>
  )
}
