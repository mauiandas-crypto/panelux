import { Suspense } from 'react'
import { SearchContent } from './search-content'

export const metadata = {
  title: 'Buscar productos - Panelux Uruguay',
  description: 'Buscá entre nuestro catálogo de utensilios de cocina Panelux: ollas, sartenes, cacerolas y más productos premium con garantía oficial.',
}

function SearchFallback() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="animate-spin text-4xl mb-4">⏳</div>
      <p className="text-gray-600">Cargando...</p>
    </div>
  )
}

export default function SearchPage() {
  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <Suspense fallback={<SearchFallback />}>
          <SearchContent />
        </Suspense>
      </div>
    </>
  )
}
