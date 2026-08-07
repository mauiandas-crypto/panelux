# Configuración de Mercado Pago

## 📋 Requisitos

- Cuenta de Mercado Pago (https://www.mercadopago.com.uy)
- Access Token de la aplicación
- Credenciales de API

## 🔑 Obtener Access Token

1. **Ir al Panel de Desarrolladores**
   - Accede a https://www.mercadopago.com.uy/developers/panel
   - Inicia sesión con tu cuenta de Mercado Pago

2. **Crear una Aplicación**
   - Si no tienes una, crea una nueva aplicación
   - Dale un nombre (ej: "Panelux Uruguay")
   - Selecciona "Checkout Pro" como tipo de integración

3. **Copiar Access Token**
   - Ve a la sección "Credenciales de producción"
   - Copia el "Access Token"
   - Este es el valor para `MERCADOPAGO_ACCESS_TOKEN`

## 🔧 Configurar Variables de Entorno

En `C:\Users\mauri\paginaPanelux\.env.local` agrega:

```
# Mercado Pago
MERCADOPAGO_ACCESS_TOKEN=tu_access_token_aqui
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

Para producción en Vercel:

```
MERCADOPAGO_ACCESS_TOKEN=tu_access_token_aqui
NEXT_PUBLIC_APP_URL=https://panelux.com.uy
```

## 🧪 Modo Sandbox vs Producción

Por defecto, la integración usa **modo sandbox** para pruebas.

### Tarjetas de Prueba (Sandbox)
- **Visa válida**: 4111 1111 1111 1111
- **Mastercard válida**: 5555 5555 5555 4444
- **Fecha expiración**: Cualquier fecha futura (ej: 12/25)
- **CVV**: Cualquier número de 3 dígitos

### Para Producción
1. Verifica tu cuenta en Mercado Pago
2. Activa pagos con dinero real
3. Usa el Access Token de producción

## 🔄 Flujo de Pago

1. Usuario agrega productos al carrito
2. En la página `/carrito` ingresa su email
3. Hace clic en "💳 Pagar con Mercado Pago"
4. Se genera una preferencia de pago
5. Redirige a Mercado Pago para el checkout
6. Después del pago exitoso → `/payment/success`
7. Si cancela → vuelve a `/carrito`

## 📧 Cupones y Descuentos

Los cupones se aplican ANTES de ir a Mercado Pago:
- Total con descuento es lo que se envía a MP
- MP no conoce sobre los cupones

## 🔔 Webhooks (Pendiente)

Para recibir notificaciones de pagos:
1. Ve a Configuración → Webhooks en MP
2. Configura: `https://tu-dominio.com/api/webhooks/mercadopago`
3. Eventos: payment.created, payment.updated

Actualmente el webhook está preparado pero NO IMPLEMENTADO.
Implementar según necesites guardar confirmaciones en DB.

## 🐛 Solución de Problemas

### "Access Token no configurado"
- Verifica que `MERCADOPAGO_ACCESS_TOKEN` esté en `.env.local`
- Reinicia el servidor con `npm run dev`

### "Error al crear preferencia"
- Valida que el token sea válido
- Verifica que tu cuenta de MP tenga acceso a Checkout Pro
- Revisa los logs del servidor para más detalles

### "Página de éxito no aparece"
- Verifica que `NEXT_PUBLIC_APP_URL` esté correcto
- En sandbox, debe ser `http://localhost:3000`
- En producción, debe ser tu dominio real

## 📚 Documentación Oficial

- Panel de Desarrolladores: https://www.mercadopago.com.uy/developers/panel
- Documentación API: https://www.mercadopago.com.uy/developers/es/docs
- Checkout Pro: https://www.mercadopago.com.uy/developers/es/docs/checkout-pro/landing

## 💰 Comisiones y Costos

- Comisión: depende de tu acuerdo con MP
- Sin costo por integración
- Se deduce automáticamente de cada pago

---

**Nota**: Después de configurar, prueba con las tarjetas de sandbox antes de usar dinero real.
