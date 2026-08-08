// Funciones para buscar productos en MercadoLibre
import { getMercadoLibreAccessToken } from './getAccessToken'

export interface MLProduct {
  id: string
  title: string
  price: number
  thumbnail: string
  condition: string
  seller: {
    id: string
    nickname: string
  }
  currency_id: string
}

export interface MLSearchResponse {
  results: MLProduct[]
  paging: {
    total: number
    offset: number
    limit: number
  }
}

const ML_API_BASE = 'https://api.mercadolibre.com'
const SITE_ID = 'MLU' // Uruguay

// Mapeo de categorías a palabras clave para filtrado
const CATEGORY_KEYWORDS: Record<string, string[]> = {
  'ollas': ['olla', 'ollas'],
  'juegos-ollas': ['juego', 'set'],
  'ollas-presion': ['presión', 'presion'],
  'sartenes': ['sartén', 'sarten'],
  'moldes-bandejas': ['molde', 'bandeja'],
  'accesorios': ['accesorio', 'tapa'],
}

export async function searchProductsByCategory(categorySlug: string): Promise<MLProduct[]> {
  try {
    // Agregar delay para evitar rate limiting
    await new Promise(resolve => setTimeout(resolve, 500))

    // Obtener token autenticado
    const accessToken = await getMercadoLibreAccessToken()

    const searchUrl = `${ML_API_BASE}/sites/${SITE_ID}/search?q=panelux&limit=50`
    console.log(`[${categorySlug}] Buscando con token autenticado: ${searchUrl}`)

    const response = await fetch(searchUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept': 'application/json',
      },
      cache: 'no-store'
    })

    console.log(`[${categorySlug}] Respuesta ML: ${response.status}`)

    if (!response.ok) {
      const text = await response.text()
      console.error(`[${categorySlug}] Error ML [${response.status}]: ${text.substring(0, 200)}`)
      return []
    }

    const data: MLSearchResponse = await response.json()
    let results = data.results || []

    console.log(`[${categorySlug}] Total resultados ML: ${results.length}`)

    // Filtrar resultados por categoría usando palabras clave
    const keywords = CATEGORY_KEYWORDS[categorySlug] || []
    if (keywords.length > 0) {
      results = results.filter(product => {
        const title = product.title.toLowerCase()
        return keywords.some(keyword => title.includes(keyword))
      })
    }

    console.log(`[${categorySlug}] Encontrados ${results.length} productos Panelux después filtro`)
    return results.slice(0, 12)
  } catch (error) {
    console.error(`Error en búsqueda [${categorySlug}]:`, error)
    return []
  }
}

export async function getProductDetail(productId: string) {
  try {
    const response = await fetch(
      `${ML_API_BASE}/items/${productId}`,
      {
        next: { revalidate: 3600 }
      }
    )

    if (!response.ok) {
      return null
    }

    return await response.json()
  } catch (error) {
    console.error('Error fetching product detail:', error)
    return null
  }
}

export async function getProductDescriptions(productId: string) {
  try {
    const response = await fetch(
      `${ML_API_BASE}/items/${productId}/description`,
      {
        next: { revalidate: 3600 }
      }
    )

    if (!response.ok) {
      return null
    }

    return await response.json()
  } catch (error) {
    console.error('Error fetching product description:', error)
    return null
  }
}

// Convertir producto de MercadoLibre al formato interno
export function convertMLProduct(mlProduct: MLProduct, categorySlug: string) {
  return {
    id: mlProduct.id,
    name: mlProduct.title,
    slug: mlProduct.id.toLowerCase(),
    category: categorySlug,
    categorySlug: categorySlug,
    price: mlProduct.price,
    image: mlProduct.thumbnail || '🍳',
    description: mlProduct.title,
    features: [
      mlProduct.condition === 'new' ? 'Nuevo' : 'Usado',
      `Vendedor: ${mlProduct.seller.nickname}`,
      'Envío disponible',
    ],
    stock: 10, // MercadoLibre no proporciona stock en search
    rating: 4.5, // Valor por defecto
    reviews: 0,
  }
}
