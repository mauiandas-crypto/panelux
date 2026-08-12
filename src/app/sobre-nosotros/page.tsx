import Link from 'next/link'

export const metadata = {
  title: 'Sobre Panelux Uruguay - Distribuidor Oficial',
  description: 'Conoce la historia de Panelux Uruguay, nuestro compromiso con la calidad y el servicio al cliente.',
}

export default function SobreNosotros() {
  return (
    <div className="min-h-screen bg-white pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Sobre Panelux Uruguay</h1>
          <p className="text-xl text-gray-600">Distribuidor oficial desde 2015</p>
        </div>

        {/* Historia */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Nuestra Historia</h2>
          <div className="prose prose-lg text-gray-700 space-y-4">
            <p>
              Panelux Uruguay nace en 2015 como distribuidor oficial de Panelux Brasil, la marca brasileña líder en utensilios de cocina con más de 25 años de trayectoria.
            </p>
            <p>
              Nuestro compromiso desde el día uno ha sido traer productos de calidad premium a los hogares uruguayos, manteniendo los más altos estándares de servicio y garantía.
            </p>
            <p>
              Hoy, más de 500 familias confían en nosotros y recomiendan nuestros productos a sus amigos y familia.
            </p>
          </div>
        </section>

        {/* Misión */}
        <section className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-lg">
              <h3 className="text-2xl font-bold text-blue-900 mb-3">🎯 Misión</h3>
              <p className="text-gray-700">
                Distribuir utensilios de cocina de calidad premium que mejoren la experiencia culinaria de cada familia uruguaya.
              </p>
            </div>

            <div className="bg-purple-50 border-l-4 border-purple-600 p-6 rounded-r-lg">
              <h3 className="text-2xl font-bold text-purple-900 mb-3">👁️ Visión</h3>
              <p className="text-gray-700">
                Ser el distribuidor más confiable y recomendado de utensilios de cocina en Uruguay.
              </p>
            </div>

            <div className="bg-green-50 border-l-4 border-green-600 p-6 rounded-r-lg">
              <h3 className="text-2xl font-bold text-green-900 mb-3">💚 Valores</h3>
              <p className="text-gray-700">
                Calidad, confianza, servicio al cliente y compromiso con la excelencia.
              </p>
            </div>
          </div>
        </section>

        {/* Por Qué Elegirnos */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">¿Por Qué Elegirnos?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border-2 border-gray-200 rounded-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">🏆 Distribuidor Oficial</h3>
              <p className="text-gray-700">
                Somos el distribuidor oficial certificado de Panelux en Uruguay. Todos nuestros productos son 100% auténticos.
              </p>
            </div>

            <div className="border-2 border-gray-200 rounded-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">🛡️ Garantía Oficial</h3>
              <p className="text-gray-700">
                Todos nuestros productos incluyen garantía oficial del fabricante. Somos responsables de su cumplimiento.
              </p>
            </div>

            <div className="border-2 border-gray-200 rounded-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">🚚 Logística Propia</h3>
              <p className="text-gray-700">
                Contamos con envíos rápidos y seguimiento en tiempo real. Envío gratis en Montevideo y Cd. de la Costa.
              </p>
            </div>

            <div className="border-2 border-gray-200 rounded-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">🔧 Servicio Técnico Propio</h3>
              <p className="text-gray-700">
                Contamos con equipo técnico capacitado para resolver problemas y brindar soporte post-venta.
              </p>
            </div>

            <div className="border-2 border-gray-200 rounded-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">💳 Múltiples Formas de Pago</h3>
              <p className="text-gray-700">
                Tarjetas de crédito, débito, efectivo, transferencia, Mercado Pago. Hasta 12 cuotas sin interés.
              </p>
            </div>

            <div className="border-2 border-gray-200 rounded-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">👥 Atención Personalizada</h3>
              <p className="text-gray-700">
                Nuestro equipo está disponible para asesorarte en la elección del producto que mejor se adapte a tus necesidades.
              </p>
            </div>
          </div>
        </section>

        {/* Números */}
        <section className="mb-16 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Por los números</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">500+</div>
              <p className="text-gray-700">Clientes Satisfechos</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">2000+</div>
              <p className="text-gray-700">Órdenes Procesadas</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">9 años</div>
              <p className="text-gray-700">En el Mercado</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-600 mb-2">4.9⭐</div>
              <p className="text-gray-700">Calificación Promedio</p>
            </div>
          </div>
        </section>

        {/* Contacto */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Visitanos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-blue-50 rounded-xl p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">📍 Tienda Física</h3>
              <p className="text-gray-700 mb-4">
                <strong>Yaguarón 1764, Montevideo</strong>
              </p>
              <p className="text-gray-700">
                Puedes visitarnos para ver los productos en persona, hablar con nuestro equipo y recibir asesoramiento profesional.
              </p>
            </div>

            <div className="bg-purple-50 rounded-xl p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">⏰ Horarios</h3>
              <p className="text-gray-700 mb-2">
                <strong>Lunes a Viernes:</strong> 9:00 AM - 6:00 PM
              </p>
              <p className="text-gray-700 mb-4">
                <strong>Sábados:</strong> 10:00 AM - 2:00 PM
              </p>
              <p className="text-gray-700">
                Te recomendamos contactarnos antes de visitarnos para asegurar disponibilidad.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">¿Preguntas?</h2>
          <p className="text-lg text-blue-100 mb-8">
            Estamos aquí para ayudarte. Contáctanos por cualquier medio.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/598095244593"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-white text-blue-600 font-bold px-8 py-4 rounded-lg hover:bg-blue-50 transition"
            >
              💬 WhatsApp
            </a>
            <a
              href="mailto:info@panelux.com.uy"
              className="inline-block bg-white text-blue-600 font-bold px-8 py-4 rounded-lg hover:bg-blue-50 transition"
            >
              ✉️ Email
            </a>
            <a
              href="tel:+598095244593"
              className="inline-block bg-white text-blue-600 font-bold px-8 py-4 rounded-lg hover:bg-blue-50 transition"
            >
              📞 Llamar
            </a>
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
