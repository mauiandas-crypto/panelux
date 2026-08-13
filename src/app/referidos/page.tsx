import Link from 'next/link'

export const metadata = {
  title: 'Programa de Referidos - Panelux Uruguay',
  description: 'Gana descuentos invitando amigos. Cada referido te da crédito para futuras compras.',
}

export default function Referidos() {
  return (
    <div className="min-h-screen bg-white pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">🎁 Programa de Referidos</h1>
          <p className="text-xl text-gray-600">Invita amigos y gana descuentos en Panelux</p>
        </div>

        {/* Cómo Funciona */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">¿Cómo Funciona?</h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            <div className="bg-blue-50 rounded-xl p-6 text-center border-2 border-blue-200">
              <div className="text-4xl mb-4">1️⃣</div>
              <h3 className="font-bold text-lg mb-2">Comparte tu Link</h3>
              <p className="text-gray-700 text-sm">Envía tu código referido a amigos por WhatsApp o Email</p>
            </div>

            <div className="bg-purple-50 rounded-xl p-6 text-center border-2 border-purple-200">
              <div className="text-4xl mb-4">2️⃣</div>
              <h3 className="font-bold text-lg mb-2">Ellos Compran</h3>
              <p className="text-gray-700 text-sm">Tus amigos compran usando tu código de referido</p>
            </div>

            <div className="bg-green-50 rounded-xl p-6 text-center border-2 border-green-200">
              <div className="text-4xl mb-4">3️⃣</div>
              <h3 className="font-bold text-lg mb-2">Obtén Crédito</h3>
              <p className="text-gray-700 text-sm">Recibe 5-10% de descuento en su compra como crédito</p>
            </div>

            <div className="bg-orange-50 rounded-xl p-6 text-center border-2 border-orange-200">
              <div className="text-4xl mb-4">4️⃣</div>
              <h3 className="font-bold text-lg mb-2">Usa tu Crédito</h3>
              <p className="text-gray-700 text-sm">Aplica el crédito en tu próxima compra</p>
            </div>
          </div>
        </section>

        {/* Beneficios */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Beneficios</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="border-2 border-gray-200 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">👥 Para Ti</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-2xl">✅</span>
                  <span className="text-gray-700">5-10% de descuento en cada referido</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-2xl">✅</span>
                  <span className="text-gray-700">Crédito acumulable indefinidamente</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-2xl">✅</span>
                  <span className="text-gray-700">Bonus especiales por cantidad de referidos</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-2xl">✅</span>
                  <span className="text-gray-700">Acceso a ofertas exclusivas</span>
                </li>
              </ul>
            </div>

            <div className="border-2 border-gray-200 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">🎉 Para Tus Amigos</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-2xl">✅</span>
                  <span className="text-gray-700">5-10% de descuento en su compra</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-2xl">✅</span>
                  <span className="text-gray-700">Envío gratis en órdenes superiores a $3000</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-2xl">✅</span>
                  <span className="text-gray-700">Garantía oficial en todos los productos</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-2xl">✅</span>
                  <span className="text-gray-700">Acceso a ofertas y promociones exclusivas</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Tabla de Bonos */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">🏆 Tabla de Bonos por Cantidad</h2>

          <div className="overflow-x-auto bg-gray-50 rounded-xl">
            <table className="w-full">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="px-6 py-4 text-left font-bold">Referidos</th>
                  <th className="px-6 py-4 text-left font-bold">Descuento Base</th>
                  <th className="px-6 py-4 text-left font-bold">Bonus Extra</th>
                  <th className="px-6 py-4 text-left font-bold">Premio</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr className="hover:bg-blue-50">
                  <td className="px-6 py-4 font-bold">1-3</td>
                  <td className="px-6 py-4">5% por referido</td>
                  <td className="px-6 py-4">-</td>
                  <td className="px-6 py-4">Crédito acumulado</td>
                </tr>
                <tr className="hover:bg-blue-50 bg-blue-50">
                  <td className="px-6 py-4 font-bold">4-6</td>
                  <td className="px-6 py-4">7% por referido</td>
                  <td className="px-6 py-4">$500 extra</td>
                  <td className="px-6 py-4">Crédito + Bonus</td>
                </tr>
                <tr className="hover:bg-blue-50">
                  <td className="px-6 py-4 font-bold">7-10</td>
                  <td className="px-6 py-4">10% por referido</td>
                  <td className="px-6 py-4">$1000 extra</td>
                  <td className="px-6 py-4">Crédito + Bonus + Acceso VIP</td>
                </tr>
                <tr className="hover:bg-blue-50 bg-blue-50">
                  <td className="px-6 py-4 font-bold">10+</td>
                  <td className="px-6 py-4">10% por referido</td>
                  <td className="px-6 py-4">$2000 extra</td>
                  <td className="px-6 py-4">Todo + Envío Gratis Permanente</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* CTA */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">¿Listo para Empezar?</h2>
          <p className="text-lg text-blue-100 mb-8">
            Comparte tu código referido y comienza a ganar descuentos
          </p>
          <a
            href="https://wa.me/59892715555?text=Hola%20Panelux%2C%20quiero%20activar%20mi%20c%C3%B3digo%20de%20referidos"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-white text-blue-600 font-bold px-8 py-4 rounded-lg hover:bg-blue-50 transition"
          >
            Activar Mi Código de Referido
          </a>
        </div>

        {/* Ejemplo */}
        <section className="mt-16 bg-gray-50 rounded-xl p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">📱 Ejemplo: Cómo Compartir</h3>
          <div className="bg-white rounded-lg p-6 border-2 border-blue-200">
            <p className="text-gray-700 mb-4">
              <strong>Mensaje de WhatsApp:</strong>
            </p>
            <p className="bg-blue-50 p-4 rounded-lg text-gray-900 font-mono text-sm">
              "Hola! Te recomiendo Panelux Uruguay, tienen los mejores utensilios de cocina.
              Usa mi código REFERIDO123 y obtén descuento en tu compra. Checa: panelux.com.uy"
            </p>
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
