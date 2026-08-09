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
