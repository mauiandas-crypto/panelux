import { NextRequest, NextResponse } from 'next/server'
import { generateCSRFToken } from '@/lib/csrf'

export async function GET(request: NextRequest) {
  try {
    // Generar nuevo token CSRF
    const token = generateCSRFToken()

    return NextResponse.json({ csrfToken: token })
  } catch (error) {
    console.error('CSRF token generation error:', error)
    return NextResponse.json(
      { error: 'Error generating CSRF token' },
      { status: 500 }
    )
  }
}
