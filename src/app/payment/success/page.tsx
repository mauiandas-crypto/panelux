import Link from 'next/link'
import Header from '@/components/header'
import Footer from '@/components/footer'

export default function PaymentSuccessPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="text-6xl mb-6">✅</div>

          <h1 className="text-3xl font-bold text-green-600 mb-4">
            ¡Pago Exitoso!
          </h1>

          <p className="text-gray-600 mb-2">
            Tu compra ha sido procesada correctamente.
          </p>

          <p className="text-sm text-gray-500 mb-8">
            Recibirás un email con la confirmación y detalles de tu pedido.
          </p>

          <div className="space-y-3">
            <Link
              href="/"
              className="block w-full px-6 py-3 bg-cyan-500 text-white font-bold rounded-lg hover:bg-cyan-600 transition-colors"
            >
              Volver al Inicio
            </Link>
            <Link
              href="/categoria/ollas"
              className="block w-full px-6 py-3 border-2 border-cyan-500 text-cyan-500 font-bold rounded-lg hover:bg-cyan-50 transition-colors"
            >
              Continuar Comprando
            </Link>
          </div>

          <div className="mt-8 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-sm text-green-800">
              <span className="font-bold">📦 Próximo paso:</span> Tu pedido será preparado y enviado en las próximas 24 horas.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
