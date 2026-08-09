import { getMercadoLibreAccessToken } from '@/lib/mercadolibre/getAccessToken'

const CATEGORY_KEYWORDS: Record<string, string[]> = {
  'ollas': ['olla', 'ollas'],
  'juegos-ollas': ['juego', 'set'],
  'ollas-presion': ['presión', 'presion'],
  'sartenes': ['sartén', 'sarten'],
  'moldes-bandejas': ['molde', 'bandeja'],
  'accesorios': ['accesorio', 'tapa'],
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const categorySlug = searchParams.get('category')

    if (!categorySlug) {
      return Response.json(
        { error: 'Category parameter is required' },
        { status: 400 }
      )
    }

    // Delay para evitar rate limiting
    await new Promise(resolve => setTimeout(resolve, 500))

    // Obtener token autenticado
    const accessToken = await getMercadoLibreAccessToken()

    const searchUrl = `https://api.mercadolibre.com/sites/MLU/search?q=panelux&limit=50`
    console.log(`[${categorySlug}] Buscando con token autenticado`)

    const response = await fetch(searchUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept': 'application/json',
      },
      cache: 'no-store'
    })

    console.log(`[${categorySlug}] Respuesta ML: ${response.status}`)

    if (!response.ok) {
      const text = await response.text()
      console.error(`[${categorySlug}] Error ML [${response.status}]: ${text.substring(0, 200)}`)
      return Response.json({ results: [] })
    }

    const data = await response.json()
    let results = data.results || []

    console.log(`[${categorySlug}] Total resultados ML: ${results.length}`)

    // Filtrar resultados por categoría
    const keywords = CATEGORY_KEYWORDS[categorySlug] || []
    if (keywords.length > 0) {
      results = results.filter((product: any) => {
        const title = product.title.toLowerCase()
        return keywords.some(keyword => title.includes(keyword))
      })
    }

    console.log(`[${categorySlug}] Encontrados ${results.length} productos después del filtro`)

    return Response.json({
      results: results.slice(0, 12),
      category: categorySlug,
      total: results.length
    })
  } catch (error) {
    console.error('Error en búsqueda:', error)
    return Response.json(
      { error: 'Search error', results: [] },
      { status: 500 }
    )
  }
}
