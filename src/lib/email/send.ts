import { Resend } from 'resend'
import { emailConfirmacionCliente, emailNotificacionAdmin } from './templates'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function enviarEmailConfirmacion(pedido: any) {
  try {
    const result = await resend.emails.send({
      from: 'Panelux <info@panelux.com.uy>',
      to: pedido.cliente.email,
      subject: `Pedido Confirmado #${pedido.id}`,
      html: emailConfirmacionCliente(pedido),
    })

    console.log('✅ Email de confirmación enviado:', result)
    return result
  } catch (error) {
    console.error('❌ Error enviando email de confirmación:', error)
    return null
  }
}

export async function enviarEmailAdmin(pedido: any) {
  try {
    const result = await resend.emails.send({
      from: 'Panelux <onboarding@resend.dev>',
      to: 'mauiandas@gmail.com', // Email del admin (en onboarding)
      subject: `Nuevo Pedido #${pedido.id}`,
      html: emailNotificacionAdmin(pedido),
    })

    console.log('✅ Email del admin enviado:', result)
    return result
  } catch (error) {
    console.error('❌ Error enviando email del admin:', error)
    return null
  }
}
