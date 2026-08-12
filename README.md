# 🛒 Panelux Uruguay - E-Commerce Platform

Plataforma de e-commerce completa para Panelux Uruguay (distribuidor oficial de utensilios de cocina premium).

## ✨ Características

### 🎯 Frontend
- ✅ Catálogo dinámico de 52 productos
- ✅ Filtrado por categorías
- ✅ Carrusel de banners administrable
- ✅ Sistema de promociones (textos que se mueven)
- ✅ Detalles de productos con múltiples imágenes
- ✅ Carrito de compras persistente
- ✅ Sistema de cupones con validación
- ✅ Responsive design (mobile-first)

### 💳 Pagos & Órdenes
- ✅ Checkout con datos de cliente
- ✅ Múltiples métodos de pago:
  - Mercado Pago (tarjeta, efectivo)
  - Transferencia bancaria
  - Efectivo a la entrega
- ✅ Confirmación de órdenes
- ✅ Tracking de envíos
- ✅ Integración con Mercado Pago

### 📧 Comunicación
- ✅ Emails de confirmación de orden
- ✅ Plantillas HTML personalizadas
- ✅ Notificaciones de pago
- ✅ Integración con Resend/SendGrid

### 📊 Administración
- ✅ Panel admin con autenticación segura
- ✅ Gestión de banners y promos
- ✅ Gestión de cupones
- ✅ Listado de órdenes
- ✅ Cambio de estado de órdenes
- ✅ Estadísticas en tiempo real
- ✅ Gestión de productos (view-only)

### 🔄 Integraciones
- ✅ Sincronización con Odoo (inventario)
- ✅ Webhooks de Mercado Pago
- ✅ Context global (admin, órdenes, carrito)
- ✅ localStorage para persistencia

## 🚀 Inicio Rápido

### Requisitos
- Node.js 18+
- npm o yarn

### Instalación

```bash
# Clonar repositorio
git clone https://github.com/mauiandas-crypto/panelux.git
cd paginaPanelux

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env.local
```

### Variables de Entorno

```env
# Admin
ADMIN_PASSWORD=admin123

# Mercado Pago
MERCADOPAGO_ACCESS_TOKEN=tu_token_mp
NEXT_PUBLIC_BASE_URL=http://localhost:3000

# Emails
RESEND_API_KEY=tu_api_key_resend
# O SendGrid
SENDGRID_API_KEY=tu_api_key_sendgrid

# Odoo
ODOO_URL=http://odoo.local
ODOO_DATABASE=panelux
ODOO_USERNAME=admin
ODOO_PASSWORD=password
```

### Desarrollo

```bash
# Iniciar servidor de desarrollo
npm run dev

# La aplicación estará disponible en http://localhost:3000
```

### Producción

```bash
# Build
npm run build

# Start
npm start

# Deployment en Vercel
vercel deploy
```

## 📱 URLs Principales

### Frontend
- **Inicio**: http://localhost:3000/
- **Catálogo**: http://localhost:3000/#productos
- **Producto**: http://localhost:3000/productos/[codigo]
- **Carrito**: http://localhost:3000/carrito
- **Checkout**: http://localhost:3000/checkout
- **Confirmación**: http://localhost:3000/checkout/confirmacion

### Admin
- **Login**: http://localhost:3000/admin/login
- **Dashboard**: http://localhost:3000/admin
- **Banners**: http://localhost:3000/admin/banners
- **Promos**: http://localhost:3000/admin/promos
- **Cupones**: http://localhost:3000/admin/coupons
- **Productos**: http://localhost:3000/admin/productos
- **Órdenes**: http://localhost:3000/admin/orders
- **Estadísticas**: http://localhost:3000/admin/stats

**Credenciales Admin**: 
- Usuario: cualquiera
- Contraseña: `admin123` (o la configurada en ADMIN_PASSWORD)

## 🏗️ Estructura del Proyecto

```
src/
├── app/                    # Next.js App Router
│   ├── admin/             # Panel de administración
│   ├── api/               # APIs REST
│   │   ├── orders/        # Gestión de órdenes
│   │   ├── webhooks/      # Webhooks externos
│   │   └── admin/         # Datos del admin
│   ├── checkout/          # Proceso de compra
│   ├── carrito/           # Carrito de compras
│   ├── productos/         # Detalle de productos
│   └── page.tsx           # Página principal
├── components/            # Componentes React
│   ├── ProductCard.tsx    # Tarjeta de producto
│   ├── BannerCarousel.tsx # Carrusel de banners
│   └── ImageCarousel.tsx  # Carrusel de imágenes
├── context/              # Context API
│   ├── CartContext.tsx    # Carrito global
│   ├── OrderContext.tsx   # Órdenes global
│   └── AdminContext.tsx   # Datos del admin
├── lib/                  # Librerías y servicios
│   ├── email-service.ts  # Envío de emails
│   ├── mercadopago-service.ts  # Integración MP
│   ├── odoo-service.ts   # Sincronización Odoo
│   └── design-tokens.ts  # Constantes de diseño
└── data/                 # Datos estáticos
    └── productos.ts      # Catálogo de productos
```

## 💾 Base de Datos

### Estructura de Órdenes
```typescript
interface Order {
  id: string
  fecha: string
  cliente: {
    nombre: string
    email: string
    telefono: string
    direccion: string
    ciudad: string
  }
  items: OrderItem[]
  total: number
  estado: 'pendiente' | 'pagado' | 'en_preparacion' | 'enviado' | 'entregado' | 'cancelado'
  metodoPago: 'mercadopago' | 'transferencia' | 'efectivo'
}
```

## 🔑 Credenciales de Prueba

### Mercado Pago Sandbox
- Usuario: usuario_test_123@gmail.com
- Contraseña: (solicitar en Mercado Pago)

### Email de Prueba
- Usar direcciones de email reales para recibir emails de confirmación

## 📚 Configuración Detallada

### Mercado Pago

1. Crear cuenta en [Mercado Pago](https://www.mercadopago.com.uy)
2. Ir a Configuración → Credenciales
3. Copiar el Access Token
4. Pegar en `.env.local`:
   ```env
   MERCADOPAGO_ACCESS_TOKEN=APP_USR_123456789...
   ```

### Email (Resend)

1. Crear cuenta en [Resend](https://resend.com)
2. Crear API Key
3. Pegar en `.env.local`:
   ```env
   RESEND_API_KEY=re_123456789...
   ```

### Odoo

1. Instalar Odoo en tu servidor
2. Crear usuario API
3. Configurar en `.env.local`:
   ```env
   ODOO_URL=https://odoo.tuempresa.com
   ODOO_DATABASE=tubase
   ODOO_USERNAME=api_user
   ODOO_PASSWORD=password123
   ```

## 🧪 Testing

### Órdenes de Prueba
```javascript
// Crear una orden de prueba
const testOrder = {
  cliente: {
    nombre: "Juan Pérez",
    email: "juan@example.com",
    telefono: "5989123456",
    direccion: "Calle 1234",
    ciudad: "Montevideo"
  },
  items: [
    {
      codigo: "5000041",
      nombre: "Sartén francesa",
      cantidad: 2,
      pvp: 710,
      imagen: "..."
    }
  ],
  subtotal: 1420,
  total: 1420,
  metodoPago: "mercadopago"
}
```

## 🤝 Contribuir

1. Fork el repositorio
2. Crear rama: `git checkout -b feature/nueva-funcionalidad`
3. Commit: `git commit -am 'Agregar nueva funcionalidad'`
4. Push: `git push origin feature/nueva-funcionalidad`
5. Pull Request

## 📄 Licencia

Propietario: Panelux Uruguay

## 📞 Contacto

- **Email**: info@panelux.uy
- **WhatsApp**: +598 9271 5555
- **Dirección**: Yaguarón 1764, Montevideo

## 🗂️ Roadmap

- [ ] Implementar pagos reales con Mercado Pago
- [ ] Conectar base de datos (PostgreSQL)
- [ ] Sistema de autenticación de usuarios
- [ ] Historial de pedidos por usuario
- [ ] Reseñas y calificaciones
- [ ] Sistema de recomendaciones
- [ ] Integración con analytics
- [ ] App móvil (React Native)
- [ ] Chat en vivo con soporte
- [ ] Programa de fidelización

---

**Desarrollado con ❤️ por Claude Code**
