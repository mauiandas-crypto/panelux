import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { PRODUCTS, searchProducts } from '@/lib/products'

// GET /api/search?q=búsqueda
export async function GET(request: NextRequest) {
  try {
    const query = request.nextUrl.searchParams.get('q')?.toLowerCase().trim()

    if (!query || query.length < 2) {
      return NextResponse.json({
        success: true,
        results: [],
        total: 0,
      })
    }

    // Buscar en productos locales
    const localResults = searchProducts(query)

    // Registrar búsqueda en BD (para analytics)
    await prisma.searchLog.create({
      data: {
        query,
        results: localResults.length,
      },
    })

    return NextResponse.json({
      success: true,
      results: localResults,
      total: localResults.length,
    })
  } catch (error) {
    console.error('Error searching products:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
