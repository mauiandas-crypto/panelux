/**
 * Datos del MenuDrawer
 */

import { WHATSAPP_URL } from '@/lib/design-tokens';
import { siteConfig } from '@/lib/config';

// Nombres tal cual figuran en productos.ts (categoria), así los links a
// /catalogo?categoria=X filtran de verdad. Antes apuntaban a /categoria/*,
// una ruta con su propio carrito/checkout separado (y roto: pegaba a un
// endpoint /api/orders/create que no existe).
export const MENU_CATEGORIES = [
  { id: 'sartenes', name: 'Sartenes y Woks', categoria: 'Sartenes y woks' },
  { id: 'ollas', name: 'Ollas y Cacerolas', categoria: 'Ollas y cacerolas' },
  { id: 'juegos', name: 'Juegos de Ollas', categoria: 'Juego de ollas' },
  { id: 'presion', name: 'Ollas a Presión', categoria: 'Ollas a presión' },
  { id: 'asaderas', name: 'Asaderas y Moldes', categoria: 'Asaderas y moldes' },
];

export const HELP_LINKS = [
  { id: 'mis-pedidos', name: 'Mis Pedidos', link: '/mis-ordenes', external: false },
  { id: 'faq', name: 'Preguntas Frecuentes', link: '/faq', external: false },
  { id: 'testimonios', name: 'Opiniones', link: '/testimonios', external: false },
  { id: 'whatsapp', name: 'WhatsApp', link: WHATSAPP_URL, external: true },
];

export const CONTACT_DATA = {
  phone: siteConfig.contact.phone,
  address: siteConfig.contact.address,
  hours: { weekday: `${siteConfig.hours.weekday.day}: ${siteConfig.hours.weekday.open} - ${siteConfig.hours.weekday.close}` },
};
