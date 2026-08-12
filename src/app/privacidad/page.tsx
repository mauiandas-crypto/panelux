import Link from 'next/link'

export const metadata = {
  title: 'Política de Privacidad - Panelux Uruguay',
  description: 'Conoce cómo protegemos tus datos personales en Panelux Uruguay. Política de privacidad completa y transparente.',
}

export default function Privacidad() {
  return (
    <div className="min-h-screen bg-white pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Política de Privacidad</h1>

        <div className="prose prose-lg text-gray-700 space-y-6">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">1. Introducción</h2>
            <p>
              Panelux Uruguay respeta tu privacidad y se compromete a proteger tus datos personales. Esta política de privacidad explica cómo recopilamos, usamos y protegemos tu información.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">2. Datos que Recopilamos</h2>
            <p>Recopilamos los siguientes tipos de datos:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Datos de contacto:</strong> Nombre, email, teléfono, dirección</li>
              <li><strong>Datos de compra:</strong> Historial de pedidos, preferencias</li>
              <li><strong>Datos de navegación:</strong> Cookies, datos de Google Analytics</li>
              <li><strong>Datos de pago:</strong> Procesados por Mercado Pago (no almacenamos tarjetas)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">3. Cómo Usamos tus Datos</h2>
            <p>Usamos tus datos para:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Procesar y entregar tus pedidos</li>
              <li>Comunicarnos contigo sobre tu compra</li>
              <li>Mejorar nuestro sitio web y servicios</li>
              <li>Enviar newsletters (solo si lo autorizas)</li>
              <li>Cumplir con obligaciones legales</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">4. Protección de Datos</h2>
            <p>
              Utilizamos encriptación SSL y otras medidas de seguridad para proteger tus datos. No compartimos tu información con terceros sin tu consentimiento, excepto con:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Mercado Pago (procesamiento de pagos)</li>
              <li>Google Analytics (análisis de tráfico)</li>
              <li>Resend (envío de emails, si está habilitado)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">5. Cookies</h2>
            <p>
              Utilizamos cookies para mejorar tu experiencia. Puedes controlar las cookies en la configuración de tu navegador. Las cookies que usamos son:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Google Analytics:</strong> Para análisis de tráfico</li>
              <li><strong>Carrito de compras:</strong> Para mantener tus selecciones</li>
              <li><strong>Sesión:</strong> Para mantener tu sesión activa</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">6. Tus Derechos</h2>
            <p>Tienes derecho a:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Acceder a tus datos personales</li>
              <li>Solicitar la corrección de datos incorrectos</li>
              <li>Solicitar la eliminación de tus datos</li>
              <li>Desuscribirse de newsletters en cualquier momento</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">7. Contacto</h2>
            <p>
              Si tienes preguntas sobre esta política de privacidad, contáctanos:
            </p>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p><strong>WhatsApp:</strong> 095 244 593</p>
              <p><strong>Email:</strong> info@panelux.com.uy</p>
              <p><strong>Horario:</strong> Lun-Vie 9:00-18:00</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">8. Cambios en esta Política</h2>
            <p>
              Nos reservamos el derecho de actualizar esta política de privacidad en cualquier momento. Los cambios serán notificados en esta página.
            </p>
            <p className="text-sm text-gray-600">
              <strong>Última actualización:</strong> 12 de agosto de 2026
            </p>
          </section>
        </div>

        <div className="mt-12 pt-6 border-t border-gray-200">
          <Link
            href="/"
            className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition"
          >
            Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  )
}
