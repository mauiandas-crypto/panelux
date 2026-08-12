import Link from 'next/link'
import Image from 'next/image'

export const metadata = {
  title: 'Blog - Panelux Uruguay',
  description: 'Consejos, recetas y guías sobre utensilios de cocina premium. Descubre cómo cocinar mejor con productos de calidad.',
}

export default function Blog() {
  const articulos = [
    {
      id: 'olla-presion-beneficios',
      titulo: 'Beneficios de Cocinar con Olla a Presión',
      resumen: 'Ahorra tiempo y energía cocinando con olla a presión. Descubre por qué es el utensilio favorito de chefs profesionales.',
      fecha: '12 de agosto de 2026',
      categoria: 'Consejos',
      imagen: '🍲',
    },
    {
      id: 'como-elegir-sarten',
      titulo: 'Cómo Elegir la Sartén Perfecta para tu Cocina',
      resumen: 'Guía completa para elegir la mejor sartén según tus necesidades. Tipos de materiales y usos principales.',
      fecha: '10 de agosto de 2026',
      categoria: 'Guías',
      imagen: '🍳',
    },
    {
      id: 'cuidados-utensilios',
      titulo: 'Cuidados y Mantenimiento de Utensilios de Cocina',
      resumen: 'Aprende cómo mantener tus utensilios en perfectas condiciones. Consejos para prolongar la vida útil de tus productos.',
      fecha: '8 de agosto de 2026',
      categoria: 'Mantenimiento',
      imagen: '🧹',
    },
    {
      id: 'receta-guiso',
      titulo: '5 Recetas Perfectas para Cocinar en Olla de Vidrio',
      resumen: 'Recetas tradicionales y sabrosas que puedes preparar con tu olla de vidrio Panelux. ¡Delicioso!',
      fecha: '5 de agosto de 2026',
      categoria: 'Recetas',
      imagen: '👨‍🍳',
    },
    {
      id: 'juego-ollas-completo',
      titulo: 'Por Qué Invertir en un Juego Completo de Ollas',
      resumen: 'Ventajas de tener un juego completo de ollas vs comprar piezas individuales. Calidad y ahorro garantizado.',
      fecha: '3 de agosto de 2026',
      categoria: 'Consejos',
      imagen: '🏆',
    },
    {
      id: 'tecnicas-cocina',
      titulo: 'Técnicas de Cocina Profesional con los Utensilios Correctos',
      resumen: 'Aprende técnicas de chef profesional usando los utensilios adecuados. Mejora tus habilidades en la cocina.',
      fecha: '1 de agosto de 2026',
      categoria: 'Técnicas',
      imagen: '⭐',
    },
  ]

  const categorias = ['Todos', 'Consejos', 'Guías', 'Recetas', 'Mantenimiento', 'Técnicas']

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20 px-6 mt-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold mb-4">Blog Panelux Uruguay</h1>
          <p className="text-xl text-blue-100">Consejos, recetas y guías sobre cocina profesional y utensilios de calidad</p>
        </div>
      </div>

      {/* Filtros */}
      <div className="bg-white sticky top-20 z-40 border-b">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex flex-wrap gap-2">
            {categorias.map(cat => (
              <button
                key={cat}
                className="px-4 py-2 rounded-full font-semibold text-sm transition hover:bg-blue-50 border border-gray-200 text-gray-700 hover:border-blue-300"
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Artículos */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {articulos.map((articulo) => (
              <Link
                key={articulo.id}
                href={`/blog/${articulo.id}`}
                className="bg-white rounded-xl overflow-hidden hover:shadow-xl transition transform hover:-translate-y-1"
              >
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 h-48 flex items-center justify-center text-7xl border-b-4 border-blue-200">
                  {articulo.imagen}
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                      {articulo.categoria}
                    </span>
                    <span className="text-xs text-gray-500">{articulo.fecha}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                    {articulo.titulo}
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-3">
                    {articulo.resumen}
                  </p>
                  <div className="mt-4 text-blue-600 font-semibold text-sm">
                    Leer más →
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">¿Necesitas Asesoramiento?</h2>
          <p className="text-lg text-blue-100 mb-8">Nuestro equipo experto te ayudará a elegir los utensilios perfectos</p>
          <button
            onClick={() => window.open('https://wa.me/598095244593', '_blank')}
            className="inline-block px-8 py-4 bg-white text-blue-600 font-bold rounded-lg hover:bg-blue-50 transition"
          >
            Hablar con un Asesor
          </button>
        </div>
      </section>
    </div>
  )
}
