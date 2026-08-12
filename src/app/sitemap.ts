import { MetadataRoute } from 'next'
import { productos } from '@/data/productos'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://panelux.com.uy'

  // URLs estáticas
  const staticUrls: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/buscar`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/carrito`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/checkout`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
  ]

  // URLs de productos
  const productUrls: MetadataRoute.Sitemap = productos.map((producto) => ({
    url: `${baseUrl}/productos/${producto.codigo}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  // URLs de categorías
  const categorias = [...new Set(productos.map((p) => p.categoria))]
  const categoryUrls: MetadataRoute.Sitemap = categorias.map((categoria) => ({
    url: `${baseUrl}/?categoria=${encodeURIComponent(categoria)}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  return [...staticUrls, ...productUrls, ...categoryUrls]
}
