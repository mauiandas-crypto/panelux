import Link from 'next/link'

export const metadata = {
  title: 'Testimonios de Clientes - Panelux Uruguay',
  description: 'Lee las opiniones y experiencias de nuestros clientes satisfechos con los utensilios de cocina Panelux.',
}

export default function Testimonios() {
  const testimonios = [
    {
      nombre: 'María García',
      ciudad: 'Montevideo',
      rating: 5,
      comentario: 'Excelente calidad. Las ollas son muy resistentes y el envío fue súper rápido. Recomiendo 100%',
      imagen: '👩‍🦰',
    },
    {
      nombre: 'Carlos López',
      ciudad: 'Maldonado',
      rating: 5,
      comentario: 'Mejor compra que hice. La olla a presión es increíble, cocina en la mitad del tiempo. Muy recomendado.',
      imagen: '👨‍🦱',
    },
    {
      nombre: 'Ana Martínez',
      ciudad: 'Punta del Este',
      rating: 5,
      comentario: 'Excelente atención. Me ayudaron a elegir el juego perfecto. Producto de primera calidad.',
      imagen: '👩‍🦳',
    },
    {
      nombre: 'Roberto Sánchez',
      ciudad: 'Salto',
      rating: 5,
      comentario: 'Impresionado por la calidad. Lleva 2 años en casa y sigue como nueva. Garantía oficial funciona.',
      imagen: '👨‍⚖️',
    },
    {
      nombre: 'Lucía Fernández',
      ciudad: 'Paysandú',
      rating: 5,
      comentario: 'El mejor distribuidor de Panelux en Uruguay. Productos originales con garantía. Perfecto.',
      imagen: '👩‍💼',
    },
    {
      nombre: 'Diego Acosta',
      ciudad: 'Canelones',
      rating: 5,
      comentario: 'Facilidad de compra, envío gratis y productos de calidad premium. No hay más para pedir.',
      imagen: '👨‍🍳',
    },
  ]

  return (
    <div className="min-h-screen bg-white pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Lo que Dicen Nuestros Clientes</h1>
          <p className="text-xl text-gray-600">Más de 500 familias confían en Panelux Uruguay</p>
        </div>

        {/* Estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">500+</div>
            <p className="text-gray-700">Clientes Satisfechos</p>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl text-center">
            <div className="text-4xl font-bold text-purple-600 mb-2">4.9⭐</div>
            <p className="text-gray-700">Calificación Promedio</p>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl text-center">
            <div className="text-4xl font-bold text-green-600 mb-2">98%</div>
            <p className="text-gray-700">Recomendarían</p>
          </div>
          <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-xl text-center">
            <div className="text-4xl font-bold text-orange-600 mb-2">2+ años</div>
            <p className="text-gray-700">Durabilidad Promedio</p>
          </div>
        </div>

        {/* Grid de Testimonios */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {testimonios.map((testimonio, idx) => (
            <div key={idx} className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:shadow-xl transition hover:border-blue-300">
              {/* Avatar */}
              <div className="flex items-center gap-4 mb-4">
                <div className="text-5xl">{testimonio.imagen}</div>
                <div>
                  <h3 className="font-bold text-gray-900">{testimonio.nombre}</h3>
                  <p className="text-sm text-gray-600">📍 {testimonio.ciudad}</p>
                </div>
              </div>

              {/* Rating */}
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-lg">⭐</span>
                ))}
              </div>

              {/* Comentario */}
              <p className="text-gray-700 italic">"{testimonio.comentario}"</p>

              {/* Badge */}
              <div className="mt-4 pt-4 border-t border-gray-200">
                <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                  ✓ Compra Verificada
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-xl p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">¿Listo para Unirte a Nuestros Clientes Satisfechos?</h2>
          <p className="text-lg mb-8 text-blue-100">
            Descubre por qué más de 500 familias eligen Panelux Uruguay
          </p>
          <a
            href="https://wa.me/598095244593"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-white text-blue-600 font-bold px-8 py-4 rounded-lg hover:bg-blue-50 transition"
          >
            Consultar Disponibilidad
          </a>
        </div>

        {/* Volver */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <Link href="/" className="text-blue-600 font-semibold hover:text-blue-800">
            ← Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  )
}
