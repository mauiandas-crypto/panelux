'use client'

import Link from 'next/link'

export default function ConfirmacionPage() {
  return (
    <div className="min-h-screen bg-white pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <div className="mb-8">
          <div className="text-6xl mb-4">✅</div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">¡Pedido confirmado!</h1>
          <p className="text-xl text-gray-600 mb-8">
            Gracias por tu compra. Recibirás un email de confirmación en breve.
          </p>
        </div>

        <div className="bg-blue-50 rounded-lg shadow-lg p-8 mb-8 text-left">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Próximos pasos:</h2>

          <ol className="space-y-4">
            <li className="flex gap-4">
              <span className="text-2xl font-bold text-blue-600 flex-shrink-0">1</span>
              <div className="text-left">
                <p className="font-bold text-gray-900">Confirma tu pago</p>
                <p className="text-gray-600 text-sm">
                  Recibirás un link de pago seguro en tu email. Puedes pagara con tarjeta, transferencia o efectivo.
                </p>
              </div>
            </li>

            <li className="flex gap-4">
              <span className="text-2xl font-bold text-blue-600 flex-shrink-0">2</span>
              <div className="text-left">
                <p className="font-bold text-gray-900">Preparamos tu pedido</p>
                <p className="text-gray-600 text-sm">
                  Una vez confirmado el pago, nuestro equipo preparará tu pedido en 24-48 horas.
                </p>
              </div>
            </li>

            <li className="flex gap-4">
              <span className="text-2xl font-bold text-blue-600 flex-shrink-0">3</span>
              <div className="text-left">
                <p className="font-bold text-gray-900">Recibe tu orden</p>
                <p className="text-gray-600 text-sm">
                  Enviaremos tu pedido con número de seguimiento. Recibirás tu compra en 3-5 días hábiles.
                </p>
              </div>
            </li>
          </ol>
        </div>

        <div className="space-y-4">
          <p className="text-gray-600 mb-4">
            📧 Revisa tu email (incluyendo spam) para el enlace de pago y confirmación de pedido.
          </p>

          <div className="flex gap-4 justify-center">
            <Link
              href="/"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition"
            >
              Volver al catálogo
            </Link>

            <a
              href="https://wa.me/59892715555"
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg transition"
            >
              Contactar por WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
