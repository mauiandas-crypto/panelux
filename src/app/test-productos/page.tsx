import { PRODUCTS, CATEGORIES } from '@/lib/products'
import Header from '@/components/header'
import Link from 'next/link'

export default function TestProductosPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Test: Todos los Productos</h1>

          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Total: {PRODUCTS.length} productos en {CATEGORIES.length} categorías
            </h2>
          </div>

          {/* Productos por categoría */}
          {CATEGORIES.map((category) => {
            const categoryProducts = PRODUCTS.filter(p => p.categorySlug === category.slug)
            return (
              <div key={category.id} className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  {category.icon} {category.name} ({categoryProducts.length})
                </h2>

                {categoryProducts.length === 0 ? (
                  <p className="text-gray-600">No hay productos en esta categoría</p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categoryProducts.map((product) => (
                      <Link
                        key={product.id}
                        href={`/categoria/${product.categorySlug}/${product.slug}`}
                        className="group"
                      >
                        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                          <div className="bg-gradient-to-br from-blue-100 to-purple-100 h-48 flex items-center justify-center text-6xl">
                            {product.image}
                          </div>

                          <div className="p-4">
                            <h3 className="text-lg font-bold text-gray-900 mb-2">
                              {product.name}
                            </h3>

                            <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                              {product.description}
                            </p>

                            <div className="flex items-center justify-between mb-3">
                              <span className="text-sm text-gray-500">
                                ⭐ {product.rating} ({product.reviews} reviews)
                              </span>
                              <span className="text-sm font-medium text-green-600">
                                {product.stock} disponibles
                              </span>
                            </div>

                            <p className="text-2xl font-bold text-cyan-500">
                              ${product.price.toFixed(2)}
                            </p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}
