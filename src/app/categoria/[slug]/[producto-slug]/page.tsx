import { getCategoryBySlug, getProductBySlug } from '@/lib/products'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Header from '@/components/header'
import Footer from '@/components/footer'
import AddToCartButton from '@/components/add-to-cart-button'

interface Props {
  params: Promise<{
    slug: string
    'producto-slug': string
  }>
}

export async function generateMetadata({ params }: Props) {
  const { slug, 'producto-slug': productoSlug } = await params
  const product = getProductBySlug(slug, productoSlug)
  if (!product) return {}

  return {
    title: `${product.name} | Panelux Uruguay`,
    description: product.description,
  }
}

export default async function ProductPage({ params }: Props) {
  const { slug, 'producto-slug': productoSlug } = await params
  const category = getCategoryBySlug(slug)
  const product = getProductBySlug(slug, productoSlug)

  if (!category || !product) {
    notFound()
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        {/* Breadcrumb */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-6xl mx-auto px-4 py-4 flex items-center gap-2 text-sm">
            <Link href="/" className="text-blue-600 hover:text-blue-700">
              Inicio
            </Link>
            <span className="text-gray-400">›</span>
            <Link href={`/categoria/${slug}`} className="text-blue-600 hover:text-blue-700">
              {category.name}
            </Link>
            <span className="text-gray-400">›</span>
            <span className="text-gray-900 font-medium">{product.name}</span>
          </div>
        </div>

        {/* Product Detail */}
        <div className="py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white rounded-lg shadow-md p-8">
              {/* Image */}
              <div className="flex items-center justify-center bg-gray-100 rounded-lg p-8 min-h-96">
                <div className="text-9xl">{product.image}</div>
              </div>

              {/* Details */}
              <div>
                <div className="mb-6">
                  <Link
                    href={`/categoria/${slug}`}
                    className="text-sm text-blue-600 hover:text-blue-700 mb-2 inline-block"
                  >
                    ← Volver a {category.name}
                  </Link>
                  <h1 className="text-4xl font-bold text-gray-900 mb-4">
                    {product.name}
                  </h1>
                  <p className="text-lg text-gray-600">{product.description}</p>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-6 pb-6 border-b border-gray-200">
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span key={i} className="text-xl">
                        {i < Math.floor(product.rating) ? '⭐' : '☆'}
                      </span>
                    ))}
                  </div>
                  <span className="text-gray-600">
                    {product.rating} de 5 - {product.reviews} reseñas
                  </span>
                </div>

                {/* Price */}
                <div className="mb-6">
                  <p className="text-gray-600 text-sm mb-2">Precio</p>
                  <p className="text-5xl font-bold text-cyan-500 mb-2">
                    ${product.price.toFixed(2)}
                  </p>
                  <p className="text-sm text-gray-600">IVA incluido</p>
                </div>

                {/* Stock */}
                <div className="mb-6 pb-6 border-b border-gray-200">
                  <p className={`text-sm font-bold ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {product.stock > 0 ? (
                      <>🟢 {product.stock} en stock</>
                    ) : (
                      <>🔴 Sin stock</>
                    )}
                  </p>
                </div>

                {/* Add to Cart */}
                {product.stock > 0 && (
                  <div className="mb-8">
                    <div className="flex gap-4 items-center">
                      <AddToCartButton product={product} />
                      <button className="px-6 py-3 border-2 border-gray-300 text-gray-900 font-bold rounded-lg hover:border-gray-400 transition-colors">
                        ❤️
                      </button>
                    </div>
                  </div>
                )}

                {/* Features */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="font-bold text-gray-900 mb-4">Características</h3>
                  <ul className="space-y-3">
                    {product.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3 text-gray-700">
                        <span className="text-cyan-500 font-bold text-lg">✓</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Additional Info */}
                <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-blue-900">
                    <span className="font-bold">Envío:</span> Calculado al checkout
                  </p>
                  <p className="text-sm text-blue-900 mt-2">
                    <span className="font-bold">Garantía:</span> Oficial de Panelux
                  </p>
                </div>
              </div>
            </div>

            {/* Related Products */}
            <div className="mt-16">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Productos Relacionados</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Placeholder para productos relacionados */}
                <div className="bg-white rounded-lg shadow-md p-6 text-center text-gray-500">
                  <p>Otros productos en {category.name}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
