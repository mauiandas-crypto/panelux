import { productos } from '@/data/productos'
import { siteConfig } from '@/lib/config'

// Feed de Google Shopping / Merchant Center (formato RSS 2.0 + namespace g:).
// Se genera en runtime desde productos.ts, así que siempre refleja precios y
// stock actuales sin necesidad de subir un archivo a mano. Merchant Center lo
// lee periódicamente desde esta URL (Orígenes de datos > Feeds > Programado).
function xmlEscape(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

function imageUrl(baseUrl: string, imagen: string): string {
  // El path tiene espacios y caracteres especiales (Ø, ç, ã) que hay que
  // codificar segmento por segmento para no romper el resto de la URL.
  const encoded = imagen
    .split('/')
    .map((segment) => encodeURIComponent(segment))
    .join('/')
  return `${baseUrl}${encoded}`
}

function descripcion(p: (typeof productos)[number]): string {
  const partes = [
    `${p.nombre}, línea ${p.linea} de Panelux.`,
    p.capacidadLitros ? `Capacidad ${p.capacidadLitros} litros.` : '',
    p.espesorMmReal ? `Espesor real ${p.espesorMmReal}mm.` : '',
    p.claseAdherencia ? `Clase de adherencia ${p.claseAdherencia}.` : '',
    p.certificacionInmetro ? 'Con certificación Inmetro.' : '',
    p.libreDePfoaPfos ? 'Libre de PFOA/PFOS.' : '',
    'Distribuidor oficial Panelux en Uruguay. Envío en 24 horas.',
  ]
  return partes.filter(Boolean).join(' ')
}

export async function GET() {
  const baseUrl = siteConfig.urls.baseUrl

  const items = productos
    .map((p) => {
      const link = `${baseUrl}/productos/${p.codigo}`
      return `
    <item>
      <g:id>${xmlEscape(p.codigo)}</g:id>
      <title>${xmlEscape(p.nombre)}</title>
      <description>${xmlEscape(descripcion(p))}</description>
      <link>${link}</link>
      <g:image_link>${imageUrl(baseUrl, p.imagen)}</g:image_link>
      <g:condition>new</g:condition>
      <g:availability>in stock</g:availability>
      <g:price>${p.pvp} UYU</g:price>
      <g:brand>Panelux</g:brand>
      <g:identifier_exists>no</g:identifier_exists>
      <g:product_type>${xmlEscape(p.categoria)}</g:product_type>
    </item>`
    })
    .join('')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss xmlns:g="http://base.google.com/ns/1.0" version="2.0">
  <channel>
    <title>Panelux Uruguay - Catálogo</title>
    <link>${baseUrl}</link>
    <description>Catálogo de productos Panelux Uruguay</description>${items}
  </channel>
</rss>`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  })
}
