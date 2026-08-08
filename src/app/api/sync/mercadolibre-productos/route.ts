import { NextRequest, NextResponse } from 'next/server'
import { searchProductsByCategory, getProductDetail, MLProduct } from '@/lib/mercadolibre/search'
import { CATEGORIES } from '@/lib/products'

export async function GET(request: NextRequest) {
  try {
    const results: Record<string, any> = {}
    let totalProducts = 0

    console.log('Sincronizando productos de MercadoLibre...')

    // Por cada categoría, buscar productos en ML
    for (const category of CATEGORIES) {
      console.log(`Buscando productos para: ${category.name}`)

      const mlProducts = await searchProductsByCategory(category.slug)

      if (mlProducts.length > 0) {
        results[category.slug] = {
          category: category.name,
          icon: category.icon,
          count: mlProducts.length,
          products: mlProducts.map((product: MLProduct) => ({
            id: product.id,
            title: product.title,
            price: product.price,
            image: product.thumbnail,
            seller: product.seller.nickname,
            currency: product.currency_id,
            condition: product.condition,
          })),
          status: '✓ OK',
        }
        totalProducts += mlProducts.length
      } else {
        results[category.slug] = {
          category: category.name,
          icon: category.icon,
          count: 0,
          products: [],
          status: '⚠️ Sin productos',
        }
      }
    }

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      totalCategories: CATEGORIES.length,
      totalProducts,
      results,
    })
  } catch (error) {
    console.error('Error sincronizando productos:', error)
    return NextResponse.json(
      { error: 'Error sincronizando productos' },
      { status: 500 }
    )
  }
}
