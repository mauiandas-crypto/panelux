import { Suspense } from 'react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { CATEGORIA_SLUGS, getCategoriaFromSlug } from '@/lib/categorias'
import { CatalogoContent } from '../catalogo/catalogo-content'
import { productos } from '@/data/productos'

interface Props {
  params: Promise<{ categoria: string }>
}

// Genera las páginas de categoría en build time: /sartenes-y-woks,
// /ollas-a-presion, etc. Antes solo existían como /catalogo?categoria=X,
// una URL basada en parámetros que Google indexa peor que una ruta propia.
export function generateStaticParams() {
  return Object.keys(CATEGORIA_SLUGS).map((categoria) => ({ categoria }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { categoria: slug } = await params
  const categoria = getCategoriaFromSlug(slug)
  if (!categoria) return {}

  const cantidad = productos.filter((p) => p.categoria === categoria).length
  const title = `${categoria} Panelux Uruguay - ${cantidad} productos con garantía oficial`
  const description = `Comprá ${categoria.toLowerCase()} Panelux en Uruguay. Distribuidor oficial, envío a todo el país, hasta 12 cuotas sin interés y garantía oficial del fabricante.`
  const url = `https://panelux.com.uy/${slug}`

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, type: 'website' },
  }
}

export default async function CategoriaPage({ params }: Props) {
  const { categoria: slug } = await params
  const categoria = getCategoriaFromSlug(slug)

  if (!categoria) {
    notFound()
  }

  return (
    <Suspense
      fallback={
        <div className="max-w-7xl mx-auto px-6 py-24 text-center">
          <div className="w-8 h-8 mx-auto mb-4 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin"></div>
          <p className="text-gray-600">Cargando...</p>
        </div>
      }
    >
      <CatalogoContent categoriaFija={categoria} />
    </Suspense>
  )
}
