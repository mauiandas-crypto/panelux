import Link from 'next/link'

export const metadata = {
  title: '5 Recetas para Olla de Vidrio - Panelux Uruguay',
  description: 'Recetas deliciosas para preparar en olla de vidrio Panelux. Comidas tradicionales fáciles de hacer.',
}

export default function ArticuloRecetas() {
  return (
    <div className="min-h-screen bg-white pt-24 pb-20">
      <article className="max-w-3xl mx-auto px-6">
        <header className="mb-8">
          <div className="mb-4">
            <span className="text-sm font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
              Recetas
            </span>
            <span className="text-gray-500 text-sm ml-4">5 de agosto de 2026</span>
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            5 Recetas Perfectas para Olla de Vidrio
          </h1>
          <div className="text-7xl mb-6">👨‍🍳</div>
          <p className="text-xl text-gray-600">
            Recetas tradicionales y deliciosas que puedes preparar con tu olla de vidrio Panelux.
          </p>
        </header>

        <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Introducción</h2>
            <p>
              La olla de vidrio es versátil, hermosa y práctica. Va del horno a la mesa, permitiéndote preparar comidas elaboradas sin trasvasar.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">1. Lasaña de Carne Clásica</h2>
            <p>La estrella de los gratinados. Fácil de preparar, impresiona siempre.</p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">2. Pollo al Horno con Verduras</h2>
            <p>Simple y saludable. Todo en una olla, desde preparación hasta presentación.</p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">3. Gratinado de Papas</h2>
            <p>Clásico irresistible. Perfecto como acompañamiento o plato principal vegetariano.</p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">4. Pescado al Horno</h2>
            <p>Elegante y saludable. El vidrio permite ver el punto de cocción perfecto.</p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">5. Brownies de Chocolate</h2>
            <p>Postre espectacular. Sirve directo desde la olla a la mesa.</p>
          </section>

          <section>
            <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-lg">
              <h3 className="text-xl font-bold text-blue-900 mb-2">📌 Próximas Recetas</h3>
              <p>Estamos preparando el contenido completo con instrucciones paso a paso. ¡Vuelve pronto!</p>
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
