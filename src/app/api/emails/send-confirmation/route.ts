import { NextRequest, NextResponse } from 'next/server'
import { enviarEmailConfirmacion, enviarEmailAdmin } from '@/lib/email/send'

export async function POST(request: NextRequest) {
  try {
    const pedido = await request.json()

    // Enviar email al cliente
    await enviarEmailConfirmacion(pedido)

    // Enviar email al admin
    await enviarEmailAdmin(pedido)

    return NextResponse.json({
      success: true,
      message: 'Emails enviados correctamente'
    })
  } catch (error) {
    console.error('Error en API de emails:', error)
    return NextResponse.json(
      { error: 'Error enviando emails' },
      { status: 500 }
    )
  }
}
