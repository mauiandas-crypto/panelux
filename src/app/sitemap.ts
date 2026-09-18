import { MetadataRoute } from 'next'
import { productos } from '@/data/productos'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://panelux.com.uy'

  // URLs estáticas. /checkout y /carrito quedan afuera: /checkout está
  // bloqueado en robots.txt (no tiene sentido pedirle a Google que lo
  // indexe) y /carrito es contenido personal por navegador, sin valor SEO.
  const staticUrls: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/catalogo`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/buscar`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/sobre-nosotros`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/testimonios`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/terminos`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/privacidad`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]

  // URLs de productos
  const productUrls: MetadataRoute.Sitemap = productos.map((producto) => ({
    url: `${baseUrl}/productos/${producto.codigo}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  // URLs de categorías (viven en /catalogo desde la reorganización de portada)
  const categorias = [...new Set(productos.map((p) => p.categoria))]
  const categoryUrls: MetadataRoute.Sitemap = categorias.map((categoria) => ({
    url: `${baseUrl}/catalogo?categoria=${encodeURIComponent(categoria)}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  return [...staticUrls, ...productUrls, ...categoryUrls]
}
