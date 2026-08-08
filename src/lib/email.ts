import nodemailer from 'nodemailer'

// Crear transportador de email
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE || 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
})

export interface OrderEmailData {
  email: string
  orderId: string
  total: number
  items: Array<{
    name: string
    quantity: number
    price: number
  }>
  discount?: number
}

export async function sendOrderConfirmation(data: OrderEmailData) {
  try {
    const itemsHtml = data.items
      .map(
        (item) =>
          `<tr>
        <td style="padding: 10px; border-bottom: 1px solid #eee;">${item.name}</td>
        <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: center;">${item.quantity}</td>
        <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">$${item.price.toFixed(2)}</td>
      </tr>`
      )
      .join('')

    const discountHtml =
      data.discount && data.discount > 0
        ? `<tr>
        <td colspan="2" style="padding: 10px; text-align: right; font-weight: bold;">Descuento:</td>
        <td style="padding: 10px; text-align: right; color: green;">-$${((data.total / (1 - data.discount / 100)) * (data.discount / 100)).toFixed(2)}</td>
      </tr>`
        : ''

    const html = `
      <html>
        <body style="font-family: Arial, sans-serif; color: #333;">
          <div style="max-width: 600px; margin: 0 auto; border: 1px solid #ddd; border-radius: 8px; overflow: hidden;">
            <div style="background: linear-gradient(135deg, #0ea5e9 0%, #7c3aed 100%); padding: 20px; color: white; text-align: center;">
              <h1 style="margin: 0;">✅ ¡Pedido Confirmado!</h1>
            </div>

            <div style="padding: 30px;">
              <p>Hola,</p>
              <p>Tu pago ha sido procesado exitosamente. Aquí está el resumen de tu pedido:</p>

              <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <p style="margin: 0;"><strong>Número de Pedido:</strong> ${data.orderId}</p>
                <p style="margin: 10px 0 0 0;"><strong>Email:</strong> ${data.email}</p>
              </div>

              <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
                <thead>
                  <tr style="background: #f3f4f6; border-bottom: 2px solid #ddd;">
                    <th style="padding: 10px; text-align: left; font-weight: bold;">Producto</th>
                    <th style="padding: 10px; text-align: center; font-weight: bold;">Cantidad</th>
                    <th style="padding: 10px; text-align: right; font-weight: bold;">Precio</th>
                  </tr>
                </thead>
                <tbody>
                  ${itemsHtml}
                  ${discountHtml}
                  <tr style="font-weight: bold; font-size: 16px;">
                    <td colspan="2" style="padding: 15px 10px; text-align: right;">Total:</td>
                    <td style="padding: 15px 10px; text-align: right; color: #0ea5e9;">$${data.total.toFixed(2)}</td>
                  </tr>
                </tbody>
              </table>

              <div style="background: #f0fdf4; border-left: 4px solid #22c55e; padding: 15px; margin: 20px 0;">
                <p style="margin: 0;"><strong>📦 Próximos pasos:</strong></p>
                <p style="margin: 10px 0 0 0;">Tu pedido será preparado y enviado en las próximas 24 horas. Recibirás un email con el número de seguimiento.</p>
              </div>

              <div style="background: #f0f9ff; border-left: 4px solid #0ea5e9; padding: 15px; margin: 20px 0;">
                <p style="margin: 0;"><strong>❓ ¿Preguntas?</strong></p>
                <p style="margin: 10px 0 0 0;">Si tienes alguna pregunta, contáctanos por WhatsApp o email.</p>
              </div>
            </div>

            <div style="background: #f9fafb; padding: 20px; text-align: center; border-top: 1px solid #eee;">
              <p style="margin: 0; font-size: 12px; color: #666;">© 2026 Panelux Uruguay. Todos los derechos reservados.</p>
            </div>
          </div>
        </body>
      </html>
    `

    const result = await transporter.sendMail({
      from: `Panelux <${process.env.EMAIL_USER}>`,
      to: data.email,
      subject: `Pedido Confirmado #${data.orderId}`,
      html,
    })

    console.log('Email enviado:', result.response)
    return true
  } catch (error) {
    console.error('Error enviando email:', error)
    return false
  }
}

export async function sendShippingNotification(
  email: string,
  orderId: string,
  trackingUrl: string
) {
  try {
    const html = `
      <html>
        <body style="font-family: Arial, sans-serif; color: #333;">
          <div style="max-width: 600px; margin: 0 auto; border: 1px solid #ddd; border-radius: 8px;">
            <div style="background: linear-gradient(135deg, #0ea5e9 0%, #7c3aed 100%); padding: 20px; color: white; text-align: center;">
              <h1 style="margin: 0;">📦 ¡Tu Pedido está en Camino!</h1>
            </div>

            <div style="padding: 30px;">
              <p>Hola,</p>
              <p>Tu pedido <strong>#${orderId}</strong> ha sido enviado y está en camino.</p>

              <div style="text-align: center; margin: 30px 0;">
                <a href="${trackingUrl}" style="display: inline-block; padding: 15px 30px; background: #0ea5e9; color: white; text-decoration: none; border-radius: 8px; font-weight: bold;">
                  Ver Seguimiento
                </a>
              </div>

              <p>Puedes seguir el estado de tu envío haciendo clic en el botón anterior.</p>
            </div>
          </div>
        </body>
      </html>
    `

    await transporter.sendMail({
      from: `Panelux <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `Pedido Enviado #${orderId}`,
      html,
    })

    return true
  } catch (error) {
    console.error('Error enviando notificación de envío:', error)
    return false
  }
}
