// Tipos de datos de admin
export interface Banner {
  id: string
  imageUrl: string
  title: string
  subtitle: string
  link?: string
  active: boolean
  order: number
}

export interface Coupon {
  id: string
  code: string
  discount: number
  discountType: 'percentage' | 'fixed'
  minPurchase: number
  maxUses: number
  usedCount: number
  active: boolean
  expiresAt: string
}

export interface PromoMessage {
  id: string
  text: string
  active: boolean
  order: number
}

export interface AdminData {
  banners: Banner[]
  coupons: Coupon[]
  promoMessages: PromoMessage[]
  lastUpdated: string
}

// Datos por defecto
export const defaultAdminData: AdminData = {
  banners: [
    {
      id: '1',
      imageUrl: 'https://via.placeholder.com/1200x400?text=Banner+1',
      title: 'Bienvenido a Panelux',
      subtitle: 'Productos premium de cocina',
      link: '/',
      active: true,
      order: 1,
    },
  ],
  coupons: [
    {
      id: '1',
      code: 'WELCOME10',
      discount: 10,
      discountType: 'percentage',
      minPurchase: 0,
      maxUses: 100,
      usedCount: 0,
      active: true,
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ],
  promoMessages: [
    {
      id: '1',
      text: '📦 Envío gratis en compras mayores a $3000',
      active: true,
      order: 1,
    },
    {
      id: '2',
      text: '💳 Hasta 6 cuotas sin interés con tarjeta',
      active: true,
      order: 2,
    },
  ],
  lastUpdated: new Date().toISOString(),
}
