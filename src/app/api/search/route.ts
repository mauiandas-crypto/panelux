import { NextRequest, NextResponse } from 'next/server'
import { productos } from '@/data/productos'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get('q') || ''

  if (!query.trim()) {
    return NextResponse.json({ results: [] })
  }

  // Normalizar texto: minúsculas y sin acentos
  const normalizeText = (text: string) => {
    return text.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
  }

  const searchTerms = query.trim().split(/\s+/)
  const normalizedSearchTerms = searchTerms.map(normalizeText)

  // Filtrar productos
  const results = productos
    .filter((p) => {
      const normalizedNombre = normalizeText(p.nombre)
      const normalizedCodigo = normalizeText(p.codigo)

      // Todas las palabras de la búsqueda deben estar en el nombre o código
      return normalizedSearchTerms.every(
        (term) => normalizedNombre.includes(term) || normalizedCodigo.includes(term)
      )
    })
    .map((p) => ({
      id: p.codigo,
      name: p.nombre,
      slug: p.codigo,
      category: p.categoria,
      categorySlug: p.categoria.toLowerCase().replace(/\s+/g, '-'),
      price: p.pvp,
      description: `${p.linea}`,
      image: p.imagen,
    }))

  return NextResponse.json({ results })
}
