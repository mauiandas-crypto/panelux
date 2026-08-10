/**
 * Design Tokens - Paleta de colores y constantes de diseño
 */

export const COLORS = {
  primary: {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    500: '#3b82f6',
    600: '#2563eb',
  },
  secondary: {
    500: '#22c55e',
  },
  neutral: {
    50: '#f9fafb',
    200: '#e5e7eb',
    900: '#111827',
  },
} as const;

export const Z_INDEX = {
  sticky: 1020,
  modal: 1060,
  fixed: 1030,
};

export const WHATSAPP_NUMBER = '59892715555';
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

export const PROMO_MESSAGES = [
  '📦 Envío gratis en compras mayores a $3000',
  '💳 Hasta 6 cuotas sin interés con tarjeta',
  '🎁 Compra 2 productos y obtén 10% descuento',
];
