import { Metadata } from 'next'
import { Card } from '@/components/ui/card'
import { Spotlight } from '@/components/ui/spotlight'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Panelux Uruguay | Distribuidor Oficial de Utensilios de Cocina',
  description:
    'Panelux es el distribuidor oficial en Uruguay de la marca brasileña de utensilios de cocina. Ollas, sartenes, ollas de presión y más. Envíos a todo el país.',
  keywords: [
    'panelux',
    'utensilios cocina',
    'ollas',
    'sartenes',
    'olla presion',
    'cookware',
    'uruguay',
    'distribuidor oficial',
  ],
  openGraph: {
    title: 'Panelux Uruguay | Distribuidor Oficial',
    description: 'Utensilios de cocina premium. Distribuidor oficial en Uruguay.',
    type: 'website',
    locale: 'es_UY',
    url: 'https://panelux.com.uy',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1578500494198-246f612d03b3?w=1200&h=630&fit=crop',
        width: 1200,
        height: 630,
        alt: 'Utensilios de cocina Panelux',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Panelux Uruguay | Distribuidor Oficial',
    description: 'Utensilios de cocina premium de la marca brasileña Panelux.',
  },
}

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
      <section className="bg-gradient-to-r from-yellow-50 to-yellow-100 py-4">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {BENEFITS.map((benefit, i) => (
              <div key={i} className="text-center">
                <div className="text-2xl mb-2">{benefit.icon}</div>
                <h3 className="font-bold text-gray-900 text-sm">{benefit.title}</h3>
                <p className="text-gray-700 text-xs">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hero principal */}
      <section className="relative bg-gradient-to-b from-white to-gray-50 py-20 px-4 min-h-96 flex items-center overflow-hidden">
        <Spotlight className="top-0 left-1/2 -translate-x-1/2" size={300} />

        <div className="max-w-3xl mx-auto text-center relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Pasión por Cocinar
          </h1>
          <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
            Transformando ingredientes en recuerdos. Panelux es el distribuidor oficial en Uruguay de la marca brasileña líder en utensilios de cocina.
          </p>
          <Link
            href="#categorias"
            className="inline-block px-8 py-4 bg-yellow-400 text-black font-bold rounded-lg hover:bg-yellow-500 transition-colors text-lg"
          >
            Explorar Productos
          </Link>
        </div>
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
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
            Productos en Destaque
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CATEGORIES.map((category) => (
              <Link
                key={category.id}
                href={`/categoria/${category.slug}`}
              >
                <Card className="group hover:shadow-xl transition-all cursor-pointer h-full border-2 border-gray-200">
                  <div className="p-8">
                    <div className="text-5xl mb-4">{category.icon}</div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-yellow-500 transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-gray-600">
                      {category.description}
                    </p>
                    <div className="mt-4 text-yellow-500 font-semibold group-hover:translate-x-2 transition-transform">
                      Ver más →
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Sección "Sobre la Marca" */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
            ¿Por Qué Elegir Panelux?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                🏆 Distribuidor Oficial
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Somos el distribuidor oficial en Uruguay de Panelux, la marca brasileña con más de 25 años en el mercado. Garantía de autenticidad en cada producto que compras.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                ⭐ Calidad Premium
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Productos resistentes, funcionales y duraderos. Diseñados para acompañar tu cocina todos los días, con garantía oficial de la marca.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                🚚 Envíos Rápidos
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Entrega segura a cualquier punto de Uruguay. Realizamos seguimiento de tu pedido en tiempo real y te notificamos en cada paso.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                🛡️ Protegido
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Pagos seguros con Mercado Pago. Política de cambios y devoluciones clara. Atención al cliente en español disponible.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="py-16 px-4 bg-yellow-400">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
            Transforma Tu Cocina Hoy
          </h2>
          <p className="text-lg text-black mb-8 opacity-90">
            Descubre por qué miles de uruguayos confían en Panelux.
          </p>
          <Link
            href="#categorias"
            className="inline-block px-8 py-4 bg-black text-yellow-400 font-bold rounded-lg hover:bg-gray-900 transition-colors text-lg"
          >
            Ver Catálogo Completo
          </Link>
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
