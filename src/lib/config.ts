// Configuración centralizada del sitio
// Usar este archivo en lugar de hardcodear valores

export const siteConfig = {
  // Contacto
  contact: {
    whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '598095244593',
    phone: process.env.NEXT_PUBLIC_PHONE || '+598 95 244 593',
    email: process.env.NEXT_PUBLIC_EMAIL || 'info@panelux.com.uy',
    address: process.env.NEXT_PUBLIC_ADDRESS || 'Yaguarón 1764, Montevideo',
  },

  // Horarios
  hours: {
    weekday: {
      open: '09:00',
      close: '18:00',
      day: 'Lun-Vie',
    },
    saturday: {
      open: '10:00',
      close: '14:00',
      day: 'Sábado',
    },
  },

  // Envíos
  shipping: {
    freeZones: ['Montevideo', 'Ciudad de la Costa'],
    minOrderForFreeShipping: 3000,
  },

  // Pagos
  payments: {
    maxInstallments: 12,
    methods: ['Mercado Pago', 'Tarjeta de Crédito', 'Tarjeta de Débito', 'Efectivo', 'Transferencia'],
  },

  // Analytics
  analytics: {
    googleAnalyticsId: process.env.NEXT_PUBLIC_GA_ID || '',
  },

  // URLs
  urls: {
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL || 'https://panelux.com.uy',
  },
}

export default siteConfig
