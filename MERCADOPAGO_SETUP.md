# CONFIGURACIÓN DE MERCADO PAGO - GUÍA COMPLETA

## Pasos para integración real:

### 1. CREDENCIALES
- Ir a https://www.mercadopago.com.uy/developers
- Sandbox > Copiar Public Key + Access Token

### 2. .env.local
`
NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY=YOUR_KEY
MERCADOPAGO_ACCESS_TOKEN=YOUR_TOKEN
`

### 3. ACTUALIZAR /checkout/page.tsx
- Llamar POST /api/payments/create-preference
- Pasar items, email, orderId
- Recibir initPoint
- Redirigir window.location.href = initPoint

### 4. WEBHOOK
- Ya existe en /api/webhooks/mercadopago
- Recibe notificaciones cuando usuario paga
- Actualiza estado de orden a 'pagado'

### 5. BD PARA ÓRDENES
Usar Prisma para guardar órdenes reales (ya está en route.ts pero sin BD)

### ESTADO:
✅ API estructurada
✅ Cliente Mercado Pago
✅ Webhook endpoint
❌ Checkout actualizado (en desarrollo)
❌ BD de órdenes (en desarrollo)
