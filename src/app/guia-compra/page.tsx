import Link from 'next/link'

export const metadata = {
  title: 'Guía de Compra - Panelux Uruguay',
  description: 'Elige el utensilio perfecto para tu cocina. Guía completa con comparativas y recomendaciones.',
}

export default function GuiaCompra() {
  return (
    <div className="min-h-screen bg-white pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Guía de Compra Panelux</h1>
          <p className="text-xl text-gray-600">Encuentra el utensilio perfecto para tu cocina</p>
        </div>

        {/* OLLAS A PRESIÓN */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            🍲 Ollas a Presión
          </h2>
          <p className="text-gray-700 mb-6">
            Las ollas a presión Panelux cocinan hasta 70% más rápido. Perfectas para comidas elaboradas sin pasar horas en la cocina.
          </p>

          <div className="bg-gray-50 rounded-xl overflow-hidden mb-6">
            <table className="w-full">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="px-4 py-3 text-left font-bold">Capacidad</th>
                  <th className="px-4 py-3 text-left font-bold">Ideal Para</th>
                  <th className="px-4 py-3 text-left font-bold">Materiales</th>
                  <th className="px-4 py-3 text-left font-bold">Precio Aprox.</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr className="hover:bg-blue-50">
                  <td className="px-4 py-3 font-bold text-gray-900">3 Litros</td>
                  <td className="px-4 py-3 text-gray-700">1-2 personas</td>
                  <td className="px-4 py-3 text-gray-700">Aluminio, Acero</td>
                  <td className="px-4 py-3 font-bold text-blue-600">$670-990</td>
                </tr>
                <tr className="hover:bg-blue-50">
                  <td className="px-4 py-3 font-bold text-gray-900">4.5 Litros</td>
                  <td className="px-4 py-3 text-gray-700">2-3 personas</td>
                  <td className="px-4 py-3 text-gray-700">Aluminio, Acero</td>
                  <td className="px-4 py-3 font-bold text-blue-600">$950-1190</td>
                </tr>
                <tr className="hover:bg-blue-50">
                  <td className="px-4 py-3 font-bold text-gray-900">7 Litros</td>
                  <td className="px-4 py-3 text-gray-700">4-5 personas</td>
                  <td className="px-4 py-3 text-gray-700">Aluminio, Acero</td>
                  <td className="px-4 py-3 font-bold text-blue-600">$1450-1690</td>
                </tr>
                <tr className="hover:bg-blue-50">
                  <td className="px-4 py-3 font-bold text-gray-900">10 Litros</td>
                  <td className="px-4 py-3 text-gray-700">Familia grande (6+)</td>
                  <td className="px-4 py-3 text-gray-700">Aluminio, Acero</td>
                  <td className="px-4 py-3 font-bold text-blue-600">$1750+</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-lg">
            <p className="text-gray-900">
              <strong>💡 Consejo:</strong> Para una familia de 3-4 personas, recomendamos comenzar con 4.5L o 7L. La 7L es más versátil.
            </p>
          </div>
        </section>

        {/* SARTENES */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            🍳 Sartenes y Woks
          </h2>
          <p className="text-gray-700 mb-6">
            Sartenes para todo: desde huevos al desayuno hasta woks para salteados. Magnific ofrece excelente relación precio-calidad.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="border-2 border-gray-200 rounded-xl p-6">
              <h4 className="font-bold text-lg mb-3">🍳 Sartén Francesa</h4>
              <ul className="space-y-2 text-gray-700">
                <li>✓ 22cm, 24cm, 32cm</li>
                <li>✓ Material: Aluminio/Acero</li>
                <li>✓ Precio: $290-710</li>
                <li>✓ Ideal: Frituras, desayunos</li>
              </ul>
            </div>

            <div className="border-2 border-gray-200 rounded-xl p-6">
              <h4 className="font-bold text-lg mb-3">🥢 Wok</h4>
              <ul className="space-y-2 text-gray-700">
                <li>✓ 24cm, 28cm</li>
                <li>✓ Material: Aluminio/Acero</li>
                <li>✓ Precio: $470-1350</li>
                <li>✓ Ideal: Salteados, comida oriental</li>
              </ul>
            </div>
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-lg">
            <p className="text-gray-900">
              <strong>💡 Consejo:</strong> Combina una sartén francesa (22-24cm) + wok para máxima versatilidad.
            </p>
          </div>
        </section>

        {/* OLLAS COMUNES */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            🍲 Ollas y Cacerolas
          </h2>
          <p className="text-gray-700 mb-6">
            Ollas tradicionales para cocción común. Ideales para arroces, pastas, guisos y más.
          </p>

          <div className="bg-gray-50 rounded-xl overflow-hidden mb-6">
            <table className="w-full text-sm">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="px-4 py-3 text-left font-bold">Tamaño</th>
                  <th className="px-4 py-3 text-left font-bold">Usos</th>
                  <th className="px-4 py-3 text-left font-bold">Recomendación</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr className="hover:bg-blue-50">
                  <td className="px-4 py-3 font-bold">16-18cm</td>
                  <td className="px-4 py-3">Aguas, bebidas calientes</td>
                  <td className="px-4 py-3">Apartamento pequeño</td>
                </tr>
                <tr className="hover:bg-blue-50">
                  <td className="px-4 py-3 font-bold">20cm</td>
                  <td className="px-4 py-3">Arroces, pastas</td>
                  <td className="px-4 py-3">Pareja o pequeña familia</td>
                </tr>
                <tr className="hover:bg-blue-50">
                  <td className="px-4 py-3 font-bold">24cm</td>
                  <td className="px-4 py-3">Guisos, fondos</td>
                  <td className="px-4 py-3">Familia de 3-4 personas</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-lg">
            <p className="text-gray-900">
              <strong>💡 Consejo:</strong> Un juego de 5 ollas es lo ideal: 3 ollas de diferentes tamaños + tapa para todas + accesorio.
            </p>
          </div>
        </section>

        {/* MOLDES */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            🎂 Moldes y Asaderas
          </h2>
          <p className="text-gray-700 mb-6">
            Moldes de altas prestaciones para repostería, gratinados y hornados. Material resistente y duradero.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border-2 border-gray-200 rounded-xl p-6 text-center">
              <div className="text-5xl mb-4">🍰</div>
              <h4 className="font-bold mb-2">Molde Redondo</h4>
              <p className="text-sm text-gray-600">24-28cm, Ideal para tartas y bizcochos</p>
              <p className="font-bold text-blue-600 mt-3">$280-380</p>
            </div>

            <div className="border-2 border-gray-200 rounded-xl p-6 text-center">
              <div className="text-5xl mb-4">🍞</div>
              <h4 className="font-bold mb-2">Molde Pan</h4>
              <p className="text-sm text-gray-600">23-27cm, Para pan casero</p>
              <p className="font-bold text-blue-600 mt-3">$190-200</p>
            </div>

            <div className="border-2 border-gray-200 rounded-xl p-6 text-center">
              <div className="text-5xl mb-4">🍕</div>
              <h4 className="font-bold mb-2">Asadera</h4>
              <p className="text-sm text-gray-600">27-35cm, Gratinados y pizza</p>
              <p className="font-bold text-blue-600 mt-3">$820-1450</p>
            </div>
          </div>
        </section>

        {/* JUEGOS COMPLETOS */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            ⭐ Juegos Completos (Lo Mejor)
          </h2>
          <p className="text-gray-700 mb-6">
            La opción más práctica y económica. Todos los utensilios coordinados y con precio preferencial.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border-4 border-blue-600 rounded-xl p-6 bg-blue-50">
              <h4 className="font-bold text-lg mb-4 text-blue-900">Juego 5 Ollas</h4>
              <ul className="space-y-2 text-gray-700 mb-4">
                <li>✓ Olla 16cm, 18cm, 20cm, 24cm</li>
                <li>✓ Tapa universal</li>
                <li>✓ Material: Aluminio</li>
                <li>✓ Precio: $1760-2020</li>
              </ul>
              <p className="text-sm text-blue-900 font-bold">💰 Ahorra ~$500 vs comprar individual</p>
            </div>

            <div className="border-4 border-purple-600 rounded-xl p-6 bg-purple-50">
              <h4 className="font-bold text-lg mb-4 text-purple-900">Juego 7 Ollas</h4>
              <ul className="space-y-2 text-gray-700 mb-4">
                <li>✓ Ollas variadas 16-24cm</li>
                <li>✓ Tapas universales</li>
                <li>✓ Material: Aluminio Premium</li>
                <li>✓ Precio: $3820+</li>
              </ul>
              <p className="text-sm text-purple-900 font-bold">💎 Lo más completo para toda la familia</p>
            </div>
          </div>
        </section>

        {/* RECOMENDACIONES FINALES */}
        <section className="mb-16">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl p-8">
            <h3 className="text-2xl font-bold mb-4">Recomendación Personalizada</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              <div>
                <h4 className="font-bold mb-3">👨‍🍳 Principiante</h4>
                <p className="text-sm text-blue-100 mb-3">
                  Juego 5 Ollas Magnific + Sartén 24cm
                </p>
                <a href="https://wa.me/59892715555" target="_blank" rel="noopener noreferrer" className="text-xs font-bold bg-white text-blue-600 px-3 py-1 rounded hover:bg-blue-50 inline-block">
                  Consultar
                </a>
              </div>

              <div>
                <h4 className="font-bold mb-3">👩‍🍳 Cocinero Casero</h4>
                <p className="text-sm text-blue-100 mb-3">
                  Juego 7 Ollas + Wok + 2 Sartenes
                </p>
                <a href="https://wa.me/59892715555" target="_blank" rel="noopener noreferrer" className="text-xs font-bold bg-white text-blue-600 px-3 py-1 rounded hover:bg-blue-50 inline-block">
                  Consultar
                </a>
              </div>

              <div>
                <h4 className="font-bold mb-3">🍳 Chef Profesional</h4>
                <p className="text-sm text-blue-100 mb-3">
                  Maximum Stone + Accesorios + Olla Presión
                </p>
                <a href="https://wa.me/59892715555" target="_blank" rel="noopener noreferrer" className="text-xs font-bold bg-white text-blue-600 px-3 py-1 rounded hover:bg-blue-50 inline-block">
                  Consultar
                </a>
              </div>
            </div>
          </div>
        </section>

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
