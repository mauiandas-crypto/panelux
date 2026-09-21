// Mapeo de slugs de URL limpia (ej: /ollas-a-presion) a los nombres de
// categoría reales usados en productos.ts. Antes las categorías solo vivían
// como /catalogo?categoria=X, una URL basada en query string que Google
// indexa peor que una ruta propia con contenido y metadata específicos.
export const CATEGORIA_SLUGS: Record<string, string> = {
  'sartenes-y-woks': 'Sartenes y woks',
  'ollas-y-cacerolas': 'Ollas y cacerolas',
  'ollas-a-presion': 'Ollas a presión',
  'juego-de-ollas': 'Juego de ollas',
  'asaderas-y-moldes': 'Asaderas y moldes',
  'exhibidores': 'Exhibidores',
}

export function getCategoriaFromSlug(slug: string): string | undefined {
  return CATEGORIA_SLUGS[slug]
}

export function getSlugFromCategoria(categoria: string): string | undefined {
  return Object.entries(CATEGORIA_SLUGS).find(([, nombre]) => nombre === categoria)?.[0]
}
