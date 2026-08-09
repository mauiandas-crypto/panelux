// Tipos e interfaces para MercadoLibre
// La lógica de búsqueda se encuentra en /api/search/by-category

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
