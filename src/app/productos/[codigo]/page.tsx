import type { Metadata } from 'next'
import Link from 'next/link'
import { productos } from '@/data/productos'
import { ProductSchema, BreadcrumbSchema } from '@/components/SchemaOrg'
import { getSlugFromCategoria } from '@/lib/categorias'
import ProductDetailClient from './ProductDetailClient'

interface Props {
  params: Promise<{ codigo: string }>
}

// Antes esta página era un client component completo, lo que significa que
// Next.js nunca generaba title/description/canonical/OG por producto: cada
// ficha heredaba la metadata genérica del layout raíz (misma que la home),
// y el canonical de cada producto apuntaba a la home en vez de a sí mismo -
// un problema de SEO técnico grave detectado en auditoría externa.
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { codigo } = await params
  const producto = productos.find((p) => p.codigo === codigo)

  if (!producto) {
    return { title: 'Producto no encontrado - Panelux Uruguay' }
  }

  const title = `${producto.nombre} | Panelux Uruguay`
  const description = `${producto.nombre} - Línea ${producto.linea}. Comprá online con envío a todo Uruguay, garantía oficial y hasta 12 cuotas sin interés. Código ${producto.codigo}.`
  const url = `https://panelux.com.uy/productos/${producto.codigo}`
  const imageUrl = `https://panelux.com.uy${encodeURI(producto.imagen)}`

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: 'website',
      images: [{ url: imageUrl, alt: producto.nombre }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
  }
}

export default async function ProductoDetailPage({ params }: Props) {
  const { codigo } = await params
  const producto = productos.find((p) => p.codigo === codigo)

  if (!producto) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Producto no encontrado</h1>
          <Link href="/" className="text-blue-600 hover:underline">
            Volver al catálogo
          </Link>
        </div>
      </div>
    )
  }

  return (
    <>
      <ProductSchema
        codigo={producto.codigo}
        nombre={producto.nombre}
        descripcion={`${producto.nombre} - Marca ${producto.linea}`}
        imagen={producto.imagen}
        pvp={producto.pvp}
        categoria={producto.categoria}
      />
      <BreadcrumbSchema items={[
        { name: 'Inicio', url: 'https://panelux.com.uy' },
        { name: producto.categoria, url: `https://panelux.com.uy/${getSlugFromCategoria(producto.categoria) ?? `catalogo?categoria=${encodeURIComponent(producto.categoria)}`}` },
        { name: producto.nombre, url: `https://panelux.com.uy/productos/${producto.codigo}` },
      ]} />
      <ProductDetailClient producto={producto} />
    </>
  )
}
