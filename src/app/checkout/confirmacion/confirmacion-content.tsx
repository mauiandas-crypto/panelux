'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { siteConfig } from '@/lib/config'
import { CheckIcon, MailIcon } from '@/components/icons/Icons'

export function ConfirmacionContent() {
  const searchParams = useSearchParams()
  const metodo = searchParams.get('metodo')
  const esTransferencia = metodo === 'transferencia'

  return (
    <div className="min-h-screen bg-white pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <div className="mb-8">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
            <CheckIcon className="w-10 h-10" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">¡Pedido confirmado!</h1>
          <p className="text-xl text-gray-600 mb-8">
            Gracias por tu compra. Recibirás un email de confirmación en breve.
          </p>
        </div>

        {esTransferencia && (
          <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-8 mb-8 text-left">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Datos para la transferencia</h2>
            <p className="text-gray-600 text-sm mb-6">
              Transferí el total de tu pedido a una de estas cuentas y enviá el comprobante por WhatsApp para que confirmemos y preparemos tu envío.
            </p>
            <div className="space-y-4">
              {siteConfig.bankAccounts.map((cuenta) => (
                <div key={cuenta.banco} className="text-sm text-gray-900">
                  <p className="font-bold">{cuenta.banco}</p>
                  <p className="text-gray-700">
                    {cuenta.tipoCuenta}{cuenta.sucursal ? ` · Suc. ${cuenta.sucursal}` : ''} · Titular: {cuenta.titular}
                  </p>
                  {cuenta.cuentas.map((c) => (
                    <p key={c.moneda} className="text-gray-700">
                      {c.moneda}: <span className="font-semibold">{c.numero}</span>
                    </p>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="bg-blue-50 rounded-lg shadow-lg p-8 mb-8 text-left">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Próximos pasos:</h2>

          <ol className="space-y-4">
            <li className="flex gap-4">
              <span className="text-2xl font-bold text-blue-600 flex-shrink-0">1</span>
              <div className="text-left">
                <p className="font-bold text-gray-900">
                  {esTransferencia ? 'Enviá el comprobante' : 'Confirmamos tu pago'}
                </p>
                <p className="text-gray-600 text-sm">
                  {esTransferencia
                    ? 'Mandanos el comprobante de la transferencia por WhatsApp para confirmar tu pedido.'
                    : 'Te avisamos por email en cuanto el pago quede confirmado.'}
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
          <p className="text-gray-600 mb-4 flex items-center justify-center gap-2">
            <MailIcon className="w-4 h-4" /> Revisa tu email (incluyendo spam) para la confirmación de tu pedido.
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
