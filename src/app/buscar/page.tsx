import { Suspense } from 'react'
import Header from '@/components/header'
import { SearchContent } from './search-content'

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
      <Header />
      <div className="min-h-screen bg-gray-50">
        <Suspense fallback={<SearchFallback />}>
          <SearchContent />
        </Suspense>
      </div>
    </>
  )
}
