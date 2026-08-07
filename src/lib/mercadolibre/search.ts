// Funciones para buscar productos en MercadoLibre
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

// Mapeo de categorías a búsquedas de MercadoLibre
const CATEGORY_QUERIES: Record<string, string> = {
  'ollas': 'ollas panelux',
  'juegos-ollas': 'juego ollas panelux',
  'ollas-presion': 'olla presión panelux',
  'sartenes': 'sartenes panelux',
  'moldes-bandejas': 'moldes bandejas panelux',
  'accesorios': 'accesorios ollas panelux',
}

export async function searchProductsByCategory(categorySlug: string): Promise<MLProduct[]> {
  try {
    const query = CATEGORY_QUERIES[categorySlug] || categorySlug

    const response = await fetch(
      `${ML_API_BASE}/sites/${SITE_ID}/search?q=${encodeURIComponent(query)}&limit=12`,
      {
        next: { revalidate: 3600 } // Revalidar cada hora
      }
    )

    if (!response.ok) {
      console.error('Error fetching from MercadoLibre:', response.status)
      return []
    }

    const data: MLSearchResponse = await response.json()
    return data.results || []
  } catch (error) {
    console.error('Error searching MercadoLibre:', error)
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
