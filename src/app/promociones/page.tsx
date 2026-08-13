import Link from 'next/link'

export const metadata = {
  title: 'Promociones y Ofertas - Panelux Uruguay',
  description: 'Descubre nuestras ofertas especiales. Descuentos en juegos de ollas y utensilios de cocina.',
}

export default function Promociones() {
  const ofertas = [
    {
      titulo: 'Juego 5 Ollas + Regalo',
      descuento: -10,
      precio: '$1760',
      stock: 3,
      descripcion: 'Incluye: 4 ollas Magnific + tapa universal + accesorios',
      badge: 'Stock Limitado',
    },
    {
      titulo: 'Olla a Presión 7L',
      descuento: -15,
      precio: '$1450',
      stock: 5,
      descripcion: 'Magnific Grafito. Perfecta para familia de 4-5 personas',
      badge: 'Descuento Especial',
    },
    {
      titulo: 'Sartén + Wok Bundle',
      descuento: -8,
      precio: '$890',
      stock: 8,
      descripcion: 'Sartén francesa 24cm + Wok 26cm. Combo completo',
      badge: 'Combo',
    },
    {
      titulo: 'Maximum Stone - Juego 7 Ollas',
      descuento: -12,
      precio: '$3820',
      stock: 2,
      descripcion: 'Premium. La línea más resistente y duradera',
      badge: 'Lujo',
    },
    {
      titulo: 'Moldes Redondos (Par)',
      descuento: -20,
      precio: '$480',
      stock: 10,
      descripcion: '24cm + 28cm. Pulido, ideal para repostería',
      badge: 'Ofertonazo',
    },
    {
      titulo: 'Set Completo Asaderas',
      descuento: -18,
      precio: '$2100',
      stock: 4,
      descripcion: '3 asaderas de diferentes tamaños con tapas',
      badge: 'Ahorro Total',
    },
  ]

  return (
    <div className="min-h-screen bg-white pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">🎉 Promociones y Ofertas</h1>
          <p className="text-xl text-gray-600">Descuentos exclusivos en productos selectos</p>
          <p className="text-sm text-red-600 font-bold mt-4">⏱️ Ofertas válidas mientras dure el stock</p>
        </div>

        {/* Grid de Ofertas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {ofertas.map((oferta, idx) => (
            <div key={idx} className="bg-white border-2 border-gray-200 rounded-xl overflow-hidden hover:shadow-xl transition transform hover:-translate-y-1">
              {/* Badge */}
              <div className="relative">
                <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-4 py-2 text-center">
                  <span className="font-bold text-lg">{oferta.badge}</span>
                  <span className="block text-2xl font-bold">{oferta.descuento}% OFF</span>
                </div>
              </div>

              {/* Contenido */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{oferta.titulo}</h3>
                <p className="text-gray-600 text-sm mb-4">{oferta.descripcion}</p>

                {/* Precio */}
                <div className="mb-4">
                  <p className="text-3xl font-bold text-red-600">{oferta.precio}</p>
                  <p className="text-xs text-gray-500">Precio especial por tiempo limitado</p>
                </div>

                {/* Stock */}
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="text-sm font-bold text-gray-900">
                      {oferta.stock} en stock
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full"
                      style={{ width: `${Math.min(oferta.stock * 15, 100)}%` }}
                    ></div>
                  </div>
                </div>

                {/* CTA */}
                <a
                  href={`https://wa.me/59892715555?text=Me%20interesa%20la%20oferta%20de%20${encodeURIComponent(oferta.titulo)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg text-center transition"
                >
                  Consultar Oferta
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Sección de Beneficios */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-12 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">¿Por Qué Estas Ofertas?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-5xl mb-4">💰</div>
              <h3 className="font-bold text-lg mb-2">Precios Competitivos</h3>
              <p className="text-gray-600">Los mejores precios en Uruguay para productos Panelux</p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">⏱️</div>
              <h3 className="font-bold text-lg mb-2">Tiempo Limitado</h3>
              <p className="text-gray-600">Aprovecha mientras hay stock disponible</p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">🎁</div>
              <h3 className="font-bold text-lg mb-2">Regalos Incluidos</h3>
              <p className="text-gray-600">Algunos combos incluyen accesorios gratis</p>
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-xl p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">¿Quieres Más Ofertas?</h2>
          <p className="text-lg text-blue-100 mb-8">
            Suscríbete a nuestro newsletter para recibir promociones exclusivas
          </p>
          <div className="flex flex-col md:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Tu correo electrónico"
              className="flex-1 px-6 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <button className="bg-white text-blue-600 font-bold px-8 py-3 rounded-lg hover:bg-blue-50 transition">
              Suscribirse
            </button>
          </div>
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
