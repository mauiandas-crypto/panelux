# ⚡ Setup de Nuevas Funcionalidades

Este archivo te guía paso a paso para activar todas las nuevas features (1-7).

---

## 1️⃣ Instalar Dependencias

```bash
npm install
```

Esto instalará:
- `@prisma/client` - ORM para base de datos
- `prisma` - CLI de Prisma
- `nodemailer` - Para enviar emails

---

## 2️⃣ Configurar Variables de Entorno

Abre o crea `C:\Users\mauri\paginaPanelux\.env.local` y actualiza:

### Base de Datos (requerido)
```env
DATABASE_URL="file:./prisma/dev.db"
```

### Mercado Pago (requerido para webhooks)
```env
MERCADOPAGO_ACCESS_TOKEN=tu_access_token_aqui
NEXT_PUBLIC_APP_URL=http://localhost:3001
```

### Email (requerido para confirmaciones automáticas)
```env
EMAIL_SERVICE=gmail
EMAIL_USER=tu@email.com
EMAIL_PASSWORD=tu_app_password
```

**Para Gmail:**
1. Ve a https://myaccount.google.com/apppasswords
2. Selecciona "Mail" y "Windows Computer"
3. Genera la contraseña
4. Copia y pega en `EMAIL_PASSWORD`

### Admin Dashboard (requerido)
```env
ADMIN_PASSWORD=tu_contraseña_fuerte
```

---

## 3️⃣ Inicializar Base de Datos

```bash
npx prisma generate
npx prisma migrate dev --name init
```

Esto:
- Genera el cliente de Prisma
- Crea la base de datos SQLite
- Crea todas las tablas necesarias

---

## 4️⃣ Iniciar el Servidor

```bash
npm run dev
```

El servidor debería estar en `http://localhost:3001`

---

## 5️⃣ Verificar Que Todo Funcione

### ✅ Base de Datos
```bash
npm run prisma:studio
```
Abre http://localhost:5555 y verifica que las tablas existan:
- Order
- OrderItem
- Review
- Payment
- SearchLog

### ✅ Sistema de Órdenes
1. Ve a http://localhost:3001
2. Agrega un producto al carrito
3. Ve a /carrito
4. Ingresa tu email y haz clic en "Pagar"
5. Debería crearse la orden en la BD

### ✅ Dashboard Admin
1. Ve a http://localhost:3001/admin
2. Ingresa la contraseña configurada
3. Deberías ver la orden que creaste
4. Cambia el estado y verifica que se actualice

### ✅ Búsqueda
1. Ve a http://localhost:3001
2. Usa el buscador en el header
3. Escribe "olla" o similar
4. Deberías ver resultados

### ✅ Mis Órdenes
1. Ve a http://localhost:3001/mis-ordenes
2. Ingresa el email de la orden creada
3. Deberías ver tu orden
4. Si el estado es "approved", puedes dejar una reseña

---

## 6️⃣ Configurar Webhooks de Mercado Pago (IMPORTANTE)

Para que los emails automáticos se envíen y las órdenes se confirmen:

1. Ve a https://www.mercadopago.com.uy/developers/panel
2. Inicia sesión
3. Selecciona tu aplicación (o crea una si no existe)
4. Ve a **Configuración → Webhooks**
5. Haz clic en "+ Agregar webhook"
6. En "URL", ingresa:
   - **Desarrollo (ngrok)**: `https://tu-ngrok-url.dev/api/webhooks/mercadopago`
   - **Producción**: `https://panelux.com.uy/api/webhooks/mercadopago`
7. En "Eventos", selecciona:
   - `payment.created`
   - `payment.updated`
8. Haz clic en "Guardar"

**Si estás en desarrollo local:**
- Necesitas ngrok corriendo
- Actualiza el URL de webhook cuando cambie el ngrok

---

## 7️⃣ Probar Webhooks (Sandbox)

Para probar pagos en sandbox:

1. En `/carrito`, usa una tarjeta de prueba:
   - **Visa**: 4111 1111 1111 1111
   - **Mastercard**: 5555 5555 5555 4444
   - **Fecha**: 12/25
   - **CVV**: 123

2. Después del pago:
   - La orden debería cambiar a `approved` en el admin
   - Deberías recibir un email de confirmación

---

## 8️⃣ Probar Emails

Para verificar que los emails se envían:

1. Verifica que `EMAIL_USER`, `EMAIL_PASSWORD` y `EMAIL_SERVICE` están configurados
2. Realiza un pago de prueba (ver paso 7️⃣)
3. Revisa tu bandeja de entrada (y spam)
4. Deberías recibir el email de confirmación

**Si no reciben el email:**
- Verifica que `EMAIL_PASSWORD` es correcta (app password de Gmail)
- Revisa los logs de la consola para errores
- Verifica que `MERCADOPAGO_ACCESS_TOKEN` es válido

---

## ⚠️ Troubleshooting

### Error: "MERCADOPAGO_ACCESS_TOKEN not configured"
→ Verifica `.env.local` y reinicia el servidor

### Error: "Email password incorrect"
→ Genera una nueva app password en Gmail

### Error: "Cannot find module @prisma/client"
→ Ejecuta `npm install` nuevamente

### La base de datos no se crea
→ Verifica que `DATABASE_URL` esté en `.env.local`
→ Ejecuta `npx prisma migrate dev --name init`

### No aparecen órdenes en el admin
→ Crea una orden primero
→ El admin solo muestra órdenes creadas después

---

## 📱 Producción (Vercel)

Cuando deploys a Vercel:

1. **Variables de entorno**: Agrega en "Settings → Environment Variables":
   ```
   DATABASE_URL=tu_postgresql_url (en producción usar PG)
   MERCADOPAGO_ACCESS_TOKEN=...
   EMAIL_SERVICE=gmail
   EMAIL_USER=...
   EMAIL_PASSWORD=...
   ADMIN_PASSWORD=...
   NEXT_PUBLIC_APP_URL=https://panelux.com.uy
   ```

2. **Base de datos**: Cambia de SQLite a PostgreSQL
   - En Vercel, puedes usar Vercel Postgres
   - O cualquier hosting de PostgreSQL

3. **Webhooks**: Actualiza la URL en Mercado Pago a tu dominio real

---

## ✨ Listo!

Ahora puedes:
- ✅ Crear órdenes
- ✅ Recibir confirmaciones por email
- ✅ Ver estadísticas en el admin
- ✅ Buscar productos globalmente
- ✅ Dejar reseñas en productos
- 📋 Sincronizar con Odoo (configurable)

---

## 📞 Ayuda

Si hay problemas:
1. Verifica el `.env.local` está completo
2. Revisa los logs de la consola
3. Verifica que las tablas de la BD fueron creadas (`npm run prisma:studio`)
4. Reinicia el servidor: `npm run dev`
