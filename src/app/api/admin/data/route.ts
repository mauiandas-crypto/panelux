import { NextRequest, NextResponse } from 'next/server'
import { defaultAdminData, AdminData } from '@/lib/admin-data'
import { getAdminSession } from '@/lib/admin-auth'

// Guardar datos en memoria (en producción usar base de datos)
let adminData: AdminData = defaultAdminData

export async function GET(request: NextRequest) {
  if (!getAdminSession(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  return NextResponse.json(adminData)
}

export async function POST(request: NextRequest) {
  if (!getAdminSession(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const data = await request.json()
    adminData = {
      ...data,
      lastUpdated: new Date().toISOString(),
    }
    return NextResponse.json(adminData)
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}
