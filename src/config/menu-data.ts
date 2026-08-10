/**
 * Datos del MenuDrawer
 */

import { WHATSAPP_URL } from '@/lib/design-tokens';

export const FEATURED_BANNERS = [
  { id: 1, title: 'Ofertas', image: '/banners/ofertas.jpg', link: '/categoria/sartenes-y-woks', badge: 'HOT' },
  { id: 2, title: 'Nuevos', image: '/banners/nuevos.jpg', link: '/categoria/ollas-y-cacerolas', badge: 'NEW' },
  { id: 3, title: 'Juegos', image: '/banners/juegos.jpg', link: '/categoria/juego-de-ollas' },
];

export const MENU_CATEGORIES = [
  { id: 'sartenes', name: 'Sartenes y Woks', icon: '🍳', slug: 'sartenes-y-woks', subs: ['Magnific AA', 'Maximum Stone'] },
  { id: 'ollas', name: 'Ollas y Cacerolas', icon: '🍲', slug: 'ollas-y-cacerolas', subs: ['Magnific AA', 'Magnific Alto Brilho', 'Maximum Stone'] },
  { id: 'juegos', name: 'Juegos de Ollas', icon: '🎁', slug: 'juego-de-ollas', subs: ['Magnific AA', 'Magnific Alto Brilho', 'Maximum Stone'] },
  { id: 'presion', name: 'Ollas a Presión', icon: '⏱️', slug: 'ollas-a-presion', subs: ['Classic Pro', 'Magnific'] },
  { id: 'asaderas', name: 'Asaderas y Moldes', icon: '📦', slug: 'asaderas-y-moldes', subs: ['Magnific AA', 'Magnific Alto Brilho'] },
  { id: 'exhibidores', name: 'Exhibidores', icon: '🏪', slug: 'exhibidores', subs: ['Magnific AA', 'Magnific Alto Brilho'] },
];

export const HELP_LINKS = [
  { id: 'mis-compras', name: 'Mis Compras', icon: '📦', link: '/mis-compras', external: false },
  { id: 'mis-direcciones', name: 'Mis Direcciones', icon: '📍', link: '/mis-direcciones', external: false },
  { id: 'favoritos', name: 'Favoritos', icon: '❤️', link: '/favoritos', external: false },
  { id: 'tiendas', name: 'Nuestras Tiendas', icon: '🏬', link: '/tiendas', external: false },
  { id: 'whatsapp', name: 'WhatsApp', icon: '💬', link: WHATSAPP_URL, external: true },
];

export const CONTACT_DATA = {
  phone: '+598 9271 5555',
  address: 'Yaguarón 1764, Montevideo, Uruguay',
  hours: { weekday: 'Lun-Vie: 8:30 - 17:15', saturday: 'Sábado: Cerrado' },
};
