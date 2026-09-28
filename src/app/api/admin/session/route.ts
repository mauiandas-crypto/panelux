import { NextRequest, NextResponse } from 'next/server'
import { getAdminSession } from '@/lib/admin-auth'

// El token de sesión vive en una cookie httpOnly, así que el cliente no
// puede leerlo directamente para saber si sigue logueado. Este endpoint es
// lo que usa useAdminAuth para chequearlo sin exponer el token al JS.
export async function GET(request: NextRequest) {
  const authenticated = await getAdminSession(request)
  return NextResponse.json({ authenticated }, { status: authenticated ? 200 : 401 })
}
