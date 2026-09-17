import Link from 'next/link'

export const metadata = {
  title: 'Testimonios de Clientes - Panelux Uruguay',
  description: 'Lee las opiniones y experiencias de nuestros clientes satisfechos con los utensilios de cocina Panelux.',
}

export default function Testimonios() {
  return (
    <div className="min-h-screen bg-white pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Lo que Dicen Nuestros Clientes</h1>
          <p className="text-xl text-gray-600">Distribuidor oficial de Panelux en Uruguay</p>
        </div>

        {/* Todavía no hay reseñas reales publicadas */}
        <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl p-12 text-center mb-16">
          <p className="text-lg text-gray-600">
            Estamos reuniendo las opiniones de nuestros clientes. Muy pronto vas a poder ver acá reseñas reales y verificadas.
          </p>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-xl p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">¿Listo para elegir Panelux?</h2>
          <p className="text-lg mb-8 text-blue-100">
            Distribuidor oficial de Panelux en Uruguay
          </p>
          <a
            href="https://wa.me/59892715555"
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
