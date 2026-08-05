import { Metadata } from 'next'
import { Spotlight } from '@/components/ui/spotlight'
import { Card } from '@/components/ui/card'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Panelux Uruguay | Distribuidor Oficial de Utensilios de Cocina',
  description:
    'Panelux es el distribuidor oficial en Uruguay de la marca brasileña de utensilios de cocina. Ollas, sartenes, panelas de presión y más. Envíos a todo el país.',
  keywords: [
    'panelux',
    'utensilios cocina',
    'ollas',
    'sartenes',
    'panela presion',
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
    id: 'panelas',
    name: 'Panelas',
    slug: 'panelas',
    description: 'Panelas antiaderentes, aluminio, cerámica e inducción',
    icon: '🍳',
  },
  {
    id: 'jogo-panelas',
    name: 'Juegos de Panelas',
    slug: 'jogo-panelas',
    description: 'Juegos completos de utensilios coordinados',
    icon: '🎁',
  },
  {
    id: 'panelas-pressao',
    name: 'Panelas de Presión',
    slug: 'panelas-pressao',
    description: 'Panelas de presión seguras y eficientes',
    icon: '⚡',
  },
  {
    id: 'frigideiras',
    name: 'Frigideiras',
    slug: 'frigideiras',
    description: 'Sartenes para todo tipo de cocción',
    icon: '🍳',
  },
  {
    id: 'formas-assadeiras',
    name: 'Formas y Asaderas',
    slug: 'formas-assadeiras',
    description: 'Formas y asaderas para hornear',
    icon: '🥐',
  },
  {
    id: 'acessorios',
    name: 'Accesorios',
    slug: 'acessorios',
    description: 'Accesorios para panelas de presión',
    icon: '🔧',
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

      {/* Hero Section */}
      <section className="relative w-full min-h-screen overflow-hidden bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-950">
        <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" />

        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 mb-6">
              Paixão por Cozinhar
            </h1>
            <p className="text-lg md:text-xl text-neutral-300 mb-8 max-w-2xl mx-auto">
              Transformando ingredientes en memórias. Panelux es el distribuidor oficial en Uruguay de la marca brasileña líder en utensilios de cocina.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link
                href="#categorias"
                className="px-8 py-3 bg-yellow-400 text-black font-semibold rounded-lg hover:bg-yellow-500 transition-colors"
              >
                Ver Catálogo
              </Link>
              <Link
                href="#sobre"
                className="px-8 py-3 border border-neutral-400 text-neutral-300 font-semibold rounded-lg hover:bg-neutral-900 transition-colors"
              >
                Sobre la Marca
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categorías */}
      <section id="categorias" className="py-20 px-4 bg-white dark:bg-neutral-950">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-neutral-950 dark:text-neutral-50">
            Explora Nuestros Productos
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CATEGORIES.map((category) => (
              <Link
                key={category.id}
                href={`/categoria/${category.slug}`}
              >
                <Card className="group hover:shadow-lg transition-shadow cursor-pointer h-full">
                  <div className="p-6">
                    <div className="text-4xl mb-4">{category.icon}</div>
                    <h3 className="text-xl font-bold text-neutral-950 dark:text-neutral-50 mb-2 group-hover:text-yellow-500 transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                      {category.description}
                    </p>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Diferencial: Sobre la Marca */}
      <section id="sobre" className="py-20 px-4 bg-neutral-50 dark:bg-neutral-900">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-8 text-neutral-950 dark:text-neutral-50">
            ¿Por Qué Elegir Panelux?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-bold text-neutral-950 dark:text-neutral-50 mb-4">
                Distribuidor Oficial
              </h3>
              <p className="text-neutral-700 dark:text-neutral-300 mb-4">
                Somos el distribuidor oficial en Uruguay de Panelux, la marca brasileña con más de 25 años de trayectoria. Garantía de autenticidad en cada producto.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-neutral-950 dark:text-neutral-50 mb-4">
                Calidad que Dura
              </h3>
              <p className="text-neutral-700 dark:text-neutral-300 mb-4">
                Productos resistentes, funcionales y duraderos. Diseñados para acompañar tu cocina todos los días, con garantía oficial.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-neutral-950 dark:text-neutral-50 mb-4">
                Envíos a Todo el País
              </h3>
              <p className="text-neutral-700 dark:text-neutral-300 mb-4">
                Entrega rápida y segura a cualquier punto de Uruguay. Realizamos seguimiento de tu pedido en tiempo real.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-neutral-950 dark:text-neutral-50 mb-4">
                Compra 100% Segura
              </h3>
              <p className="text-neutral-700 dark:text-neutral-300 mb-4">
                Pagos seguros con Mercado Pago. Política de cambios y devoluciones clara. Atención al cliente en español.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="py-16 px-4 bg-yellow-400 text-black">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            Transforma Tu Cocina Hoy
          </h2>
          <p className="text-lg mb-8 opacity-90">
            Descubre por qué miles de uruguayos confían en Panelux.
          </p>
          <Link
            href="#categorias"
            className="inline-block px-8 py-3 bg-black text-yellow-400 font-bold rounded-lg hover:bg-neutral-900 transition-colors"
          >
            Ir al Catálogo
          </Link>
        </div>
      </section>
    </>
  )
}
