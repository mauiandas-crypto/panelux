import { searchProductsByCategory } from '@/lib/mercadolibre/search'
import { CATEGORIES } from '@/lib/products'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const syncResults = []

    // Sincronizar productos de cada categoría
    for (const category of CATEGORIES) {
      const products = await searchProductsByCategory(category.slug)
      syncResults.push({
        category: category.name,
        slug: category.slug,
        productsFound: products.length,
        status: products.length > 0 ? 'success' : 'no-products',
      })
    }

    return NextResponse.json({
      status: 'success',
      message: 'Sincronización completada',
      timestamp: new Date().toISOString(),
      results: syncResults,
      summary: {
        totalCategories: CATEGORIES.length,
        successfulCategories: syncResults.filter(r => r.status === 'success').length,
        totalProductsFound: syncResults.reduce((sum, r) => sum + r.productsFound, 0),
      },
    })
  } catch (error) {
    console.error('Error syncing with MercadoLibre:', error)
    return NextResponse.json(
      {
        status: 'error',
        message: 'Error durante sincronización con MercadoLibre',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
