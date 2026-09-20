/**
 * Design Tokens - Paleta de colores y constantes de diseño
 */

// Púrpura real de la marca Panelux (sampleado de panelux.com.br), coordinado
// con la escala "blue" de Tailwind sobreescrita en globals.css.
export const COLORS = {
  primary: {
    50: '#f4f3fa',
    100: '#e7e4f3',
    200: '#cfc9e8',
    500: '#5e5198',
    600: '#4e4280',
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
  '📦 Envío gratis en compras mayores a $2000',
  '💳 Hasta 12 cuotas sin interés con tarjeta',
  '🎁 Compra 2 productos y obtén 10% descuento',
];
