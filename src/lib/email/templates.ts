// Templates de emails en HTML

export const emailConfirmacionCliente = (pedido: any) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; text-align: center; border-radius: 5px; }
    .content { padding: 20px; background: #f9f9f9; margin: 20px 0; border-radius: 5px; }
    .items { width: 100%; border-collapse: collapse; margin: 20px 0; }
    .items th { background: #667eea; color: white; padding: 10px; text-align: left; }
    .items td { padding: 10px; border-bottom: 1px solid #ddd; }
    .total { font-size: 18px; font-weight: bold; color: #667eea; text-align: right; padding: 20px 0; }
    .button { display: inline-block; background: #667eea; color: white; padding: 10px 20px; border-radius: 5px; text-decoration: none; margin-top: 20px; }
    .footer { text-align: center; color: #999; font-size: 12px; margin-top: 40px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>¡Pedido Confirmado! ✅</h1>
    </div>

    <div class="content">
      <p>Hola <strong>${pedido.cliente.nombre}</strong>,</p>

      <p>Tu pedido ha sido recibido correctamente. Aquí están los detalles:</p>

      <p><strong>Número de Pedido:</strong> ${pedido.id}</p>
      <p><strong>Email:</strong> ${pedido.cliente.email}</p>
      <p><strong>Teléfono:</strong> ${pedido.cliente.telefono}</p>
      <p><strong>Dirección:</strong> ${pedido.cliente.direccion}, ${pedido.cliente.ciudad}</p>

      <h3>Productos:</h3>
      <table class="items">
        <thead>
          <tr>
            <th>Producto</th>
            <th>Cantidad</th>
            <th>Precio</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          ${pedido.items.map((item: any) => `
            <tr>
              <td>${item.nombre}</td>
              <td>${item.cantidad}</td>
              <td>$${item.pvp.toLocaleString('es-UY')}</td>
              <td>$${(item.pvp * item.cantidad).toLocaleString('es-UY')}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>

      <div class="total">
        Total: $${pedido.total.toLocaleString('es-UY')}
      </div>

      <p><strong>Método de pago:</strong> ${pedido.metodoPago === 'mercadopago' ? 'Mercado Pago' : pedido.metodoPago}</p>

      <p>Te enviaremos un email cuando tu pedido haya sido despachado.</p>

      <a href="https://panelux.com.uy" class="button">Ver tu pedido</a>
    </div>

    <div class="footer">
      <p>Panelux - Distribuidor Oficial de Utensilios de Cocina Premium</p>
      <p>📞 +598 92 715 555 | 📧 info@panelux.com.uy</p>
    </div>
  </div>
</body>
</html>
`;

export const emailNotificacionAdmin = (pedido: any) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #667eea; color: white; padding: 20px; text-align: center; }
    .content { padding: 20px; background: #f9f9f9; }
    .items { width: 100%; border-collapse: collapse; margin: 20px 0; }
    .items th { background: #667eea; color: white; padding: 10px; text-align: left; }
    .items td { padding: 10px; border-bottom: 1px solid #ddd; }
    .total { font-weight: bold; text-align: right; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Nuevo Pedido Recibido 📦</h1>
    </div>

    <div class="content">
      <p><strong>Pedido ID:</strong> ${pedido.id}</p>

      <h3>Datos del Cliente:</h3>
      <p>
        <strong>Nombre:</strong> ${pedido.cliente.nombre}<br>
        <strong>Email:</strong> ${pedido.cliente.email}<br>
        <strong>Teléfono:</strong> ${pedido.cliente.telefono}<br>
        <strong>Dirección:</strong> ${pedido.cliente.direccion}, ${pedido.cliente.ciudad}
      </p>

      <h3>Productos:</h3>
      <table class="items">
        <thead>
          <tr>
            <th>Producto</th>
            <th>Cantidad</th>
            <th>Precio</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          ${pedido.items.map((item: any) => `
            <tr>
              <td>${item.nombre}</td>
              <td>${item.cantidad}</td>
              <td>$${item.pvp.toLocaleString('es-UY')}</td>
              <td>$${(item.pvp * item.cantidad).toLocaleString('es-UY')}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>

      <p class="total">Total: $${pedido.total.toLocaleString('es-UY')}</p>
      <p><strong>Método de pago:</strong> ${pedido.metodoPago === 'mercadopago' ? 'Mercado Pago' : pedido.metodoPago}</p>
      <p><strong>Estado:</strong> ${pedido.estado}</p>
    </div>
  </div>
</body>
</html>
`;
