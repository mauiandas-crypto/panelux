import Link from 'next/link'
import { ChevronLeftIcon, ChatIcon } from '@/components/icons/Icons'

export const metadata = {
  title: 'Página no encontrada - Panelux Uruguay',
  robots: 'noindex, follow',
}

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center pt-24 pb-20 px-6">
      <div className="max-w-lg mx-auto text-center">
        <p className="text-8xl font-bold text-blue-600 mb-4">404</p>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          No encontramos esta página
        </h1>
        <p className="text-gray-600 mb-10">
          El enlace puede estar roto o el producto ya no está disponible. Volvé al inicio o buscá lo que necesitás en nuestro catálogo.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-lg transition"
          >
            <ChevronLeftIcon className="w-4 h-4" /> Volver al inicio
          </Link>
          <a
            href="https://wa.me/59892715555"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-bold px-6 py-3 rounded-lg transition"
          >
            <ChatIcon className="w-5 h-5" /> Hablar por WhatsApp
          </a>
        </div>
      </div>
    </div>
  )
}
