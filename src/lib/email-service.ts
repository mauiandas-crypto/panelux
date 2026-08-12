// Servicio de emails (usar Resend u otro servicio en producción)
// Para este ejemplo, usamos un servicio simple de logging

interface EmailParams {
  to: string
  subject: string
  html: string
}

export async function sendEmail(params: EmailParams) {
  try {
    // En producción, integrar con Resend, SendGrid, etc.
    // const response = await fetch('https://api.resend.com/emails', {
    //   method: 'POST',
    //   headers: {
    //     'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     from: 'noreply@panelux.uy',
    //     to: params.to,
    //     subject: params.subject,
    //     html: params.html,
    //   }),
    // })

    console.log(`📧 Email enviado a ${params.to}:`, params.subject)

    return true
  } catch (error) {
    console.error('Error sending email:', error)
    return false
  }
}

export function getOrderConfirmationEmail(orderData: any): string {
  const itemsHtml = orderData.items
    .map(
      (item: any) =>
        `
    <tr>
      <td style="padding: 12px; border-bottom: 1px solid #ddd;">${item.nombre}</td>
      <td style="padding: 12px; border-bottom: 1px solid #ddd; text-align: center;">x${item.cantidad}</td>
      <td style="padding: 12px; border-bottom: 1px solid #ddd; text-align: right;">$${item.pvp.toLocaleString('es-UY')}</td>
    </tr>
  `
    )
    .join('')

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #0066cc; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 8px 8px; }
          .section { margin-bottom: 20px; }
          .section h3 { color: #0066cc; margin-top: 0; }
          table { width: 100%; border-collapse: collapse; margin: 20px 0; }
          .total { text-align: right; font-size: 18px; font-weight: bold; color: #0066cc; }
          .footer { text-align: center; color: #999; font-size: 12px; margin-top: 20px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>✅ Pedido confirmado</h1>
          </div>
          <div class="content">
            <div class="section">
              <p>Hola ${orderData.cliente.nombre},</p>
              <p>Gracias por tu compra. Tu pedido ha sido confirmado y será procesado en breve.</p>
            </div>

            <div class="section">
              <h3>Detalles del pedido</h3>
              <p><strong>Número de orden:</strong> ${orderData.id}</p>
              <p><strong>Fecha:</strong> ${new Date(orderData.fecha).toLocaleDateString('es-UY')}</p>
            </div>

            <div class="section">
              <h3>Artículos</h3>
              <table>
                <thead>
                  <tr style="background: #f0f0f0;">
                    <th style="padding: 12px; text-align: left;">Producto</th>
                    <th style="padding: 12px; text-align: center;">Cantidad</th>
                    <th style="padding: 12px; text-align: right;">Precio</th>
                  </tr>
                </thead>
                <tbody>
                  ${itemsHtml}
                </tbody>
              </table>
            </div>

            <div class="section">
              <div style="text-align: right; padding: 20px; background: #fff; border-top: 2px solid #0066cc;">
                <p style="margin: 5px 0;">Subtotal: $${orderData.subtotal.toLocaleString('es-UY')}</p>
                <p class="total">Total: $${orderData.total.toLocaleString('es-UY')}</p>
              </div>
            </div>

            <div class="section">
              <h3>Envío</h3>
              <p>${orderData.cliente.direccion}</p>
              <p>${orderData.cliente.ciudad}</p>
              <p>Teléfono: ${orderData.cliente.telefono}</p>
            </div>

            <div class="section">
              <h3>Próximos pasos</h3>
              <ol>
                <li>Confirma tu pago usando el link que recibirás en otro email</li>
                <li>Una vez confirmado, prepararemos tu pedido (24-48 horas)</li>
                <li>Te enviaremos tu compra con número de seguimiento</li>
              </ol>
            </div>

            <div class="footer">
              <p>Si tienes dudas, contáctanos por WhatsApp: +598 9271 5555</p>
              <p>&copy; 2026 Panelux Uruguay. Todos los derechos reservados.</p>
            </div>
          </div>
        </div>
      </body>
    </html>
  `
}

export function getPaymentReminderEmail(orderData: any): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .alert { background: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <h2>⏰ Recordatorio: Completa tu pago</h2>
          <div class="alert">
            <p>Hola ${orderData.cliente.nombre},</p>
            <p>Te recordamos que aún falta confirmar el pago de tu pedido <strong>${orderData.id}</strong>.</p>
            <p>Total a pagar: <strong>$${orderData.total.toLocaleString('es-UY')}</strong></p>
          </div>
          <p><a href="#" style="background: #0066cc; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">Ir a pagar ahora</a></p>
        </div>
      </body>
    </html>
  `
}
