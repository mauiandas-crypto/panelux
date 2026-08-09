import { getMercadoLibreAccessToken } from '@/lib/mercadolibre/getAccessToken'

const CATEGORIES = [
  { slug: 'ollas', name: 'Ollas', icon: '🍲', keywords: ['olla', 'ollas'] },
  { slug: 'juegos-ollas', name: 'Juegos de Ollas', icon: '🍽️', keywords: ['juego', 'set', 'batería'] },
  { slug: 'ollas-presion', name: 'Ollas de Presión', icon: '⚙️', keywords: ['presión', 'presion'] },
  { slug: 'sartenes', name: 'Sartenes', icon: '🍳', keywords: ['sartén', 'sarten', 'wok'] },
  { slug: 'moldes-bandejas', name: 'Moldes y Bandejas', icon: '📦', keywords: ['molde', 'bandeja', 'fuente'] },
  { slug: 'accesorios', name: 'Accesorios', icon: '⚒️', keywords: ['accesorio', 'tapa', 'asa', 'utensilio'] },
]

export async function GET(request: Request) {
  try {
    const results: Record<string, any> = {}
    let totalProducts = 0

    for (const category of CATEGORIES) {
      try {
        console.log(`Buscando productos para: ${category.name}`)

        // Delay para evitar rate limiting
        await new Promise(resolve => setTimeout(resolve, 1000))

        // Obtener token autenticado
        const accessToken = await getMercadoLibreAccessToken()

        const searchUrl = `https://api.mercadolibre.com/sites/MLU/search?q=panelux&limit=50`

        const response = await fetch(searchUrl, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
            'Accept': 'application/json',
          },
          cache: 'no-store'
        })

        let products = []

        if (response.ok) {
          const data = await response.json()
          let mlProducts = data.results || []

          // Filtrar por palabras clave de la categoría
          mlProducts = mlProducts.filter((product: any) => {
            const title = product.title.toLowerCase()
            return category.keywords.some(keyword => title.includes(keyword))
          })

          products = mlProducts.slice(0, 12).map((product: any) => ({
            id: product.id,
            title: product.title,
            price: product.price,
            image: product.thumbnail || product.pictures?.[0]?.url || '🍳',
            seller: product.seller?.nickname || 'Unknown',
            currency: product.currency_id || 'UYU',
            condition: product.condition === 'new' ? 'new' : 'used'
          }))
        } else {
          console.log(`No se pudieron obtener productos para ${category.name}`)
        }

        results[category.slug] = {
          category: category.name,
          icon: category.icon,
          count: products.length,
          products,
          status: products.length > 0 ? 'Encontrados' : 'Sin resultados'
        }

        totalProducts += products.length
      } catch (categoryError) {
        console.error(`Error sincronizando ${category.name}:`, categoryError)
        results[category.slug] = {
          category: category.name,
          icon: category.icon,
          count: 0,
          products: [],
          status: 'Error'
        }
      }
    }

    return Response.json({
      success: true,
      timestamp: new Date().toISOString(),
      totalCategories: CATEGORIES.length,
      totalProducts,
      results
    })
  } catch (error) {
    console.error('Error en sincronización:', error)
    return Response.json(
      { success: false, error: 'Sync error' },
      { status: 500 }
    )
  }
}
