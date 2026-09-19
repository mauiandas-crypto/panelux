// Configuración centralizada del sitio
// Usar este archivo en lugar de hardcodear valores

export const siteConfig = {
  // Contacto
  contact: {
    whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '59892715555',
    phone: process.env.NEXT_PUBLIC_PHONE || '+598 9271 5555',
    email: process.env.NEXT_PUBLIC_EMAIL || 'info@panelux.com.uy',
    address: process.env.NEXT_PUBLIC_ADDRESS || 'Yaguarón 1764, Montevideo',
  },

  // Horarios
  hours: {
    weekday: {
      open: '08:30',
      close: '17:15',
      day: 'Lun-Vie',
    },
  },

  // Envíos: el envío gratis aplica a todo el país a partir de este monto
  // (no depende de la zona - ver cálculo real en carrito/checkout).
  shipping: {
    minOrderForFreeShipping: 2000,
    flatCost: 250,
  },

  // Pagos
  payments: {
    maxInstallments: 12,
    methods: ['Mercado Pago', 'Tarjeta de Crédito', 'Tarjeta de Débito', 'Efectivo', 'Transferencia'],
  },

  // Cuentas bancarias para pago por transferencia (titular: Todogastro SAS)
  bankAccounts: [
    {
      banco: 'Itaú',
      tipoCuenta: 'Cuenta corriente',
      titular: 'Todogastro SAS',
      cuentas: [
        { moneda: 'UYU', numero: '2677769' },
        { moneda: 'USD', numero: '2677770' },
      ],
    },
    {
      banco: 'BBVA',
      tipoCuenta: 'Cuenta corriente',
      titular: 'Todogastro SAS',
      cuentas: [
        { moneda: 'UYU y USD', numero: '26426935' },
      ],
    },
    {
      banco: 'Santander',
      tipoCuenta: 'Cuenta corriente',
      titular: 'Todogastro SAS',
      sucursal: '71',
      cuentas: [
        { moneda: 'UYU', numero: '1675753' },
        { moneda: 'USD', numero: '5101434992' },
      ],
    },
  ],

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
