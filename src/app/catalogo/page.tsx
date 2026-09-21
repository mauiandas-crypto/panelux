import { Suspense } from 'react'
import { CatalogoContent } from './catalogo-content'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Catálogo Completo - Panelux Uruguay',
  description: 'Todos los productos Panelux disponibles en Uruguay: ollas, sartenes, woks, asaderas y más.',
}

function CatalogoFallback() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-24 text-center">
      <div className="w-8 h-8 mx-auto mb-4 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin"></div>
      <p className="text-gray-600">Cargando catálogo...</p>
    </div>
  )
}

export default function CatalogoPage() {
  return (
    <Suspense fallback={<CatalogoFallback />}>
      <CatalogoContent />
    </Suspense>
  )
}
