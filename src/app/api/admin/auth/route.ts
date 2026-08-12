import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json()

    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123'

    if (password === adminPassword) {
      return NextResponse.json({ token: 'admin-token-' + Date.now() })
    }

    return NextResponse.json({ error: 'Contraseña incorrecta' }, { status: 401 })
  } catch (error) {
    return NextResponse.json({ error: 'Error en el servidor' }, { status: 500 })
  }
}
