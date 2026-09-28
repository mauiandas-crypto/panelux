import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json({ error: 'Email inválido' }, { status: 400 })
    }

    const webhookUrl = process.env.NEWSLETTER_SHEET_WEBHOOK_URL
    if (!webhookUrl) {
      console.error('NEWSLETTER_SHEET_WEBHOOK_URL no está configurada')
      return NextResponse.json({ error: 'Suscripción no disponible' }, { status: 503 })
    }

    // Apps Script escribe la fila al recibir el POST y recién después
    // responde con un 302 hacia una URL de "echo" con el resultado. No hace
    // falta seguir ese redirect: para cuando llega, el dato ya se guardó.
    const res = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        fecha: new Date().toISOString(),
        origen: 'panelux.com.uy',
      }),
      redirect: 'manual',
    })

    if (res.status !== 302 && !res.ok) {
      console.error('Error guardando en Google Sheet, status:', res.status)
      return NextResponse.json({ error: 'No se pudo guardar la suscripción' }, { status: 502 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error en newsletter subscribe:', error)
    return NextResponse.json({ error: 'Error al procesar la suscripción' }, { status: 500 })
  }
}
