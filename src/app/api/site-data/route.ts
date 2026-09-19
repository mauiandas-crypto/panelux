import { NextResponse } from 'next/server'
import { getAdminData } from '@/lib/admin-data-store'

// Versión pública (sin login) de los datos que gestiona el admin, para que
// el sitio pueda mostrarle a CUALQUIER visitante lo que se edita en
// /admin/banners y /admin/promos. Antes, el front-end solo pedía estos
// datos si tenía un token de admin guardado (AdminContext), así que un
// visitante normal nunca veía los cambios - solo los veía el propio admin
// logueado en su navegador. No incluye cupones (esos tienen su propio
// endpoint de validación en /api/coupons/validate).
export async function GET() {
  const { banners, promoMessages } = await getAdminData()
  return NextResponse.json({ banners, promoMessages })
}
