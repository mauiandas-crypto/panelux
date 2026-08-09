import { getCategoryBySlug, getProductsByCategory } from '@/lib/products'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Header from '@/components/header'
import Footer from '@/components/footer'
import AddToCartButton from '@/components/add-to-cart-button'

interface Props {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const category = getCategoryBySlug(slug)
  if (!category) return {}

  return {
    title: `${category.name} | Panelux Uruguay`,
    description: category.description,
  }
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params
  const category = getCategoryBySlug(slug)

  if (!category) {
    notFound()
  }

  // Usar productos locales
  const products = getProductsByCategory(slug)

  // Marcar si son datos de MercadoLibre
  const isFromML = mlProducts.length > 0

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
            <span className="text-gray-900 font-medium">{category.name}</span>
          </div>
        </div>

        {/* Category Header */}
        <div className="bg-gradient-to-b from-blue-50 to-purple-50 py-12 px-4 border-b border-gray-200">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-4xl font-bold text-gray-900 flex items-center gap-3">
                <span className="text-4xl">{category.icon}</span>
                {category.name}
              </h1>
            </div>
            <p className="text-lg text-gray-600">{category.description}</p>
            <p className="text-sm text-gray-500 mt-4">
              {products.length} producto{products.length !== 1 ? 's' : ''} disponible{products.length !== 1 ? 's' : ''}
            </p>
          </div>
        </div>

        {/* Products Grid */}
        <div className="py-12 px-4">
          <div className="max-w-6xl mx-auto">
            {products.length === 0 ? (
              <div className="bg-white rounded-lg shadow-md p-12 text-center">
                <p className="text-xl text-gray-600 mb-6">No hay productos en esta categoría</p>
                <Link
                  href="/"
                  className="inline-block px-8 py-3 bg-cyan-500 text-white font-bold rounded-lg hover:bg-cyan-600 transition-colors"
                >
                  Volver a Inicio
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <Link
                    key={product.id}
                    href={`/categoria/${params.slug}/${product.slug}`}
                  >
                    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow cursor-pointer h-full flex flex-col">
                      {/* Image */}
                      <div className="bg-gray-100 p-8 text-center text-6xl h-48 flex items-center justify-center">
                        {product.image}
                      </div>

                      {/* Content */}
                      <div className="p-6 flex flex-col flex-1">
                        <h3 className="text-lg font-bold text-gray-900 mb-2">
                          {product.name}
                        </h3>
                        <p className="text-sm text-gray-600 mb-4 flex-1">
                          {product.description}
                        </p>

                        {/* Rating */}
                        <div className="flex items-center gap-2 mb-4">
                          <div className="flex">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <span key={i} className={i < Math.floor(product.rating) ? '⭐' : '☆'}>
                              </span>
                            ))}
                          </div>
                          <span className="text-xs text-gray-600">
                            {product.rating} ({product.reviews})
                          </span>
                        </div>

                        {/* Price and Stock */}
                        <div className="border-t border-gray-200 pt-4">
                          <p className="text-2xl font-bold text-cyan-500 mb-3">
                            ${product.price.toFixed(2)}
                          </p>
                          <div className="flex items-center justify-between">
                            <span className={`text-sm font-medium ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                              {product.stock > 0 ? `${product.stock} disponibles` : 'Sin stock'}
                            </span>
                            {product.stock > 0 && (
                              <AddToCartButton product={product} />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
