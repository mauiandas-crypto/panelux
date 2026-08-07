// Datos de prueba de productos
export interface Product {
  id: string
  name: string
  slug: string
  category: string
  categorySlug: string
  price: number
  image: string
  description: string
  features: string[]
  stock: number
  rating: number
  reviews: number
}

export interface Category {
  id: string
  name: string
  slug: string
  description: string
  icon: string
}

export const CATEGORIES: Category[] = [
  {
    id: 'ollas',
    name: 'Ollas',
    slug: 'ollas',
    description: 'Ollas antiaderentes, aluminio, cerámica e inducción',
    icon: '🍳',
  },
  {
    id: 'juegos-ollas',
    name: 'Juegos de Ollas',
    slug: 'juegos-ollas',
    description: 'Juegos completos coordinados',
    icon: '🎁',
  },
  {
    id: 'ollas-presion',
    name: 'Ollas de Presión',
    slug: 'ollas-presion',
    description: 'Ollas de presión seguras y eficientes',
    icon: '⚡',
  },
  {
    id: 'sartenes',
    name: 'Sartenes',
    slug: 'sartenes',
    description: 'Sartenes para todo tipo de cocción',
    icon: '🍳',
  },
  {
    id: 'moldes-bandejas',
    name: 'Moldes y Bandejas',
    slug: 'moldes-bandejas',
    description: 'Para hornear y preparar',
    icon: '🥐',
  },
  {
    id: 'accesorios',
    name: 'Accesorios',
    slug: 'accesorios',
    description: 'Complementos para tus ollas',
    icon: '🔧',
  },
]

export const PRODUCTS: Product[] = [
  // Ollas
  {
    id: '1',
    name: 'Olla Antiaderente 20cm',
    slug: 'olla-antiaderente-20cm',
    category: 'Ollas',
    categorySlug: 'ollas',
    price: 45.99,
    image: '🍳',
    description: 'Olla antiaderente de 20cm con tapa de vidrio incluida',
    features: ['Antiaderente de calidad', 'Tapa de vidrio templado', 'Base de aluminio', 'Mango ergonómico'],
    stock: 15,
    rating: 4.8,
    reviews: 234,
  },
  {
    id: '2',
    name: 'Olla Aluminio 24cm',
    slug: 'olla-aluminio-24cm',
    category: 'Ollas',
    categorySlug: 'ollas',
    price: 38.50,
    image: '🍳',
    description: 'Olla de aluminio resistente de 24cm',
    features: ['Aluminio de alta calidad', 'Resistente al calor', 'Fácil de limpiar', 'Económica'],
    stock: 22,
    rating: 4.5,
    reviews: 156,
  },
  {
    id: '3',
    name: 'Olla Cerámica 18cm',
    slug: 'olla-ceramica-18cm',
    category: 'Ollas',
    categorySlug: 'ollas',
    price: 52.99,
    image: '🍳',
    description: 'Olla de cerámica premium con diseño moderno',
    features: ['Cerámica ecológica', 'Revestimiento premium', 'Diseño elegante', 'Apta para inducción'],
    stock: 8,
    rating: 4.9,
    reviews: 189,
  },

  // Juegos de Ollas
  {
    id: '4',
    name: 'Juego de Ollas 5 Piezas',
    slug: 'juego-ollas-5-piezas',
    category: 'Juegos de Ollas',
    categorySlug: 'juegos-ollas',
    price: 129.99,
    image: '🎁',
    description: 'Juego completo de 5 ollas antiaderentes coordinadas',
    features: ['5 piezas coordenadas', 'Antiaderente doble capa', 'Tapas incluidas', 'Todas las tallas'],
    stock: 12,
    rating: 4.7,
    reviews: 312,
  },
  {
    id: '5',
    name: 'Juego de Ollas 7 Piezas Premium',
    slug: 'juego-ollas-7-piezas-premium',
    category: 'Juegos de Ollas',
    categorySlug: 'juegos-ollas',
    price: 199.99,
    image: '🎁',
    description: 'Juego premium de 7 piezas con accesorios',
    features: ['7 piezas premium', 'Antiaderente ultra resistente', 'Accesorios incluidos', 'Garantía 5 años'],
    stock: 6,
    rating: 4.9,
    reviews: 428,
  },

  // Ollas de Presión
  {
    id: '6',
    name: 'Olla de Presión 4.5L',
    slug: 'olla-presion-4-5l',
    category: 'Ollas de Presión',
    categorySlug: 'ollas-presion',
    price: 79.99,
    image: '⚡',
    description: 'Olla de presión segura de 4.5 litros',
    features: ['Válvula de seguridad', 'Cierre hermético', 'Fácil de usar', 'Inducción compatible'],
    stock: 18,
    rating: 4.6,
    reviews: 267,
  },
  {
    id: '7',
    name: 'Olla de Presión 7L',
    slug: 'olla-presion-7l',
    category: 'Ollas de Presión',
    categorySlug: 'ollas-presion',
    price: 89.99,
    image: '⚡',
    description: 'Olla de presión de 7 litros para familias grandes',
    features: ['Gran capacidad', 'Doble válvula seguridad', 'Cierre rápido', 'Profesional'],
    stock: 10,
    rating: 4.8,
    reviews: 345,
  },

  // Sartenes
  {
    id: '8',
    name: 'Sartén Antiaderente 24cm',
    slug: 'sarten-antiaderente-24cm',
    category: 'Sartenes',
    categorySlug: 'sartenes',
    price: 35.99,
    image: '🍳',
    description: 'Sartén antiaderente de 24cm para cocción diaria',
    features: ['Antiaderente premium', 'Base reforzada', 'Mango resistente', 'Para gas e inducción'],
    stock: 25,
    rating: 4.7,
    reviews: 298,
  },
  {
    id: '9',
    name: 'Juego Sartenes 3 Piezas',
    slug: 'juego-sartenes-3-piezas',
    category: 'Sartenes',
    categorySlug: 'sartenes',
    price: 99.99,
    image: '🍳',
    description: 'Juego de 3 sartenes de diferentes tamaños',
    features: ['3 sartenes coordenadas', 'Antiaderente de calidad', 'Tapas incluidas', 'Versátil'],
    stock: 14,
    rating: 4.8,
    reviews: 389,
  },

  // Moldes y Bandejas
  {
    id: '10',
    name: 'Molde para Horno Rectangular',
    slug: 'molde-horno-rectangular',
    category: 'Moldes y Bandejas',
    categorySlug: 'moldes-bandejas',
    price: 19.99,
    image: '🥐',
    description: 'Molde rectangular para horno antiadherente',
    features: ['Antiadherente', 'Apto horno', 'Fácil limpieza', 'Económico'],
    stock: 30,
    rating: 4.6,
    reviews: 145,
  },

  // Accesorios
  {
    id: '11',
    name: 'Tapa de Vidrio Universal 24cm',
    slug: 'tapa-vidrio-universal-24cm',
    category: 'Accesorios',
    categorySlug: 'accesorios',
    price: 12.99,
    image: '🔧',
    description: 'Tapa de vidrio templado universal para ollas',
    features: ['Vidrio templado', 'Universal', 'Apta para lavar', 'Resistente'],
    stock: 40,
    rating: 4.5,
    reviews: 234,
  },
]

export function getCategories(): Category[] {
  return CATEGORIES
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return CATEGORIES.find((cat) => cat.slug === slug)
}

export function getProductsByCategory(categorySlug: string): Product[] {
  return PRODUCTS.filter((prod) => prod.categorySlug === categorySlug)
}

export function getProductBySlug(categorySlug: string, productSlug: string): Product | undefined {
  return PRODUCTS.find(
    (prod) => prod.categorySlug === categorySlug && prod.slug === productSlug
  )
}

export function searchProducts(query: string): Product[] {
  const q = query.toLowerCase()
  return PRODUCTS.filter(
    (prod) =>
      prod.name.toLowerCase().includes(q) ||
      prod.description.toLowerCase().includes(q)
  )
}
