import Link from 'next/link'

export const metadata = {
  title: 'Técnicas de Cocina Profesional - Panelux Uruguay',
  description: 'Aprende técnicas de chef profesional usando los utensilios adecuados. Mejora tus habilidades culinarias.',
}

export default function ArticuloTecnicas() {
  return (
    <div className="min-h-screen bg-white pt-24 pb-20">
      <article className="max-w-3xl mx-auto px-6">
        <header className="mb-8">
          <div className="mb-4">
            <span className="text-sm font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
              Técnicas
            </span>
            <span className="text-gray-500 text-sm ml-4">1 de agosto de 2026</span>
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Técnicas de Cocina Profesional con los Utensilios Correctos
          </h1>
          <div className="text-7xl mb-6">⭐</div>
          <p className="text-xl text-gray-600">
            Aprende técnicas de chef profesional y mejora significativamente tus habilidades culinarias.
          </p>
        </header>

        <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">La Importancia del Utensilio Correcto</h2>
            <p>
              Un chef profesional sabe que el 50% de la cocina está en los ingredientes y las técnicas, pero el otro 50% está en los utensilios.
            </p>
            <p>
              Con los utensilios correctos, incluso un principiante puede lograr resultados profesionales.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Técnicas Fundamentales</h2>

            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-bold text-gray-900 mb-2">Sellar la Carne</h3>
                <p>Una técnica esencial que requiere sartén de acero inoxidable y calor correcto.</p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-bold text-gray-900 mb-2">Saltear Verduras</h3>
                <p>Mantener la textura y sabor requiere el wok o saltador adecuado.</p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-bold text-gray-900 mb-2">Emulsionar Salsas</h3>
                <p>La olla correcta permite controlar la temperatura y textura perfectamente.</p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-bold text-gray-900 mb-2">Cocción a Baja Temperatura</h3>
                <p>Requiere utensilios que distribuyan el calor uniformemente.</p>
              </div>
            </div>
          </section>

          <section>
            <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-lg">
              <h3 className="text-xl font-bold text-blue-900 mb-2">📌 Artículo en Desarrollo</h3>
              <p>Estamos preparando un contenido detallado con técnicas paso a paso, videos y recomendaciones de utensilios específicos. ¡Regresa pronto para la versión completa!</p>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Lo Que Vendra en el Artículo Completo</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Técnica de sellar y sofrito</li>
              <li>Cómo lograr texturas perfectas</li>
              <li>Control de temperaturas</li>
              <li>Recomendaciones de utensilios por técnica</li>
              <li>Tips de chefs profesionales</li>
            </ul>
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
