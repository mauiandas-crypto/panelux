import Link from 'next/link'

export const metadata = {
  title: 'Juego Completo de Ollas - Panelux Uruguay',
  description: 'Ventajas de invertir en un juego completo de ollas vs comprar piezas individuales.',
}

export default function ArticuloJuegoOllas() {
  return (
    <div className="min-h-screen bg-white pt-24 pb-20">
      <article className="max-w-3xl mx-auto px-6">
        <header className="mb-8">
          <div className="mb-4">
            <span className="text-sm font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
              Consejos
            </span>
            <span className="text-gray-500 text-sm ml-4">3 de agosto de 2026</span>
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Por Qué Invertir en un Juego Completo de Ollas
          </h1>
          <div className="text-7xl mb-6">🏆</div>
          <p className="text-xl text-gray-600">
            Ventajas de tener un juego completo vs comprar piezas individuales.
          </p>
        </header>

        <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">La Decisión: Juego Completo vs Piezas Individuales</h2>
            <p>
              Una de las preguntas más frecuentes es si comprar un juego completo o ir agregando utensilios gradualmente. Aquí te presentamos las ventajas de elegir un juego.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">1. Consistencia y Armonía</h2>
            <p>
              Un juego completo viene diseñado para trabajar junto. Mismos materiales, acabados y sistemas de tapa compatible.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">2. Mejor Precio Unitario</h2>
            <p>
              Los juegos suelen tener precios más competitivos que las piezas individuales. Ahorras dinero en la compra.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">3. Completitud Garantizada</h2>
            <p>
              No te quedarás con piezas faltantes. Todo viene en un solo paquete listo para usar.
            </p>
          </section>

          <section>
            <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-lg">
              <h3 className="text-xl font-bold text-blue-900 mb-2">📌 Contenido Completo</h3>
              <p>Estamos elaborando este artículo con comparativas detalladas. ¡Regresa pronto!</p>
            </div>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t">
          <Link href="/blog" className="text-blue-600 font-semibold hover:text-blue-800">
            ← Volver al Blog
          </Link>
        </div>
      </article>
    </div>
  )
}
