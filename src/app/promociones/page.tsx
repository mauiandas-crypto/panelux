import Link from 'next/link'

export const metadata = {
  title: 'Promociones y Ofertas - Panelux Uruguay',
  description: 'Promociones y descuentos vigentes en utensilios de cocina Panelux.',
}

export default function Promociones() {
  return (
    <div className="min-h-screen bg-white pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">Promociones y Ofertas</h1>
        <p className="text-xl text-gray-600 mb-12">Descuentos vigentes en productos Panelux</p>

        <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl p-12 mb-12">
          <p className="text-lg text-gray-700 mb-2">
            Por el momento no tenemos promociones activas.
          </p>
          <p className="text-gray-600">
            Podés usar un cupón de descuento al finalizar tu compra en el checkout.
          </p>
        </div>

        <Link
          href="/"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-4 rounded-lg transition"
        >
          Ver catálogo completo
        </Link>
      </div>
    </div>
  )
}
