# Panelux — E-commerce de cookware (Next.js + MercadoLibre + Odoo)

Distribuidor oficial en Uruguay de una marca brasileña de utensilios de cocina. Sitio web de catálogo + venta online en https://panelux.com.uy

## Stack

- **Frontend:** Next.js 14+ (TypeScript, App Router, Tailwind CSS)
- **Datos:** Fuente inicial = MercadoLibre (después Odoo, cuando esté configurado)
- **Pagos:** Mercado Pago Checkout Pro
- **Deploy:** Vercel
- **Auth ML:** OAuth2 (app separada de todogastro-bot, misma cuenta vendedora)
- **Storage:** Upstash Redis (token de ML)

## Fases

1. ✅ **Fase 1 - Capa MercadoLibre** (HECHO)
   - OAuth2 (GET /api/auth/mercadolibre → callback → token en Upstash Redis)
   - Fetch items de la cuenta (GET /api/mercadolibre/items — relevamiento)
   - Adaptado de todogastro-bot/src/mercadolibre, pero para Next.js + Vercel

2. TODO **Fase 2 - Catálogo público con SEO**
   - Home + categorías + fichas de producto
   - SSR/SSG en catálogo
   - Meta tags dinámicos, canonical, sitemap.xml dinámico, robots.txt
   - JSON-LD (Organization, Product, BreadcrumbList, FAQPage)
   - Página "Sobre la marca" (diferencial vs competencia)
   - Definiir criterio para filtrar Panelux vs Todo Gastro (por categoría ML, marca, etc.)

3. TODO **Fase 3 - Checkout Mercado Pago**
   - Carrito
   - Integración Checkout Pro
   - Confirmación de orden

4. TODO **Fase 4 - Odoo + sincronización ML**
   - Cuando Odoo esté configurado: desplazar todo a Odoo como fuente única
   - Stock Odoo → listings ML
   - Ventas ML → órdenes Odoo
   - Adaptación/reutilización de integración ML de todogastro-bot

## Setup local

```bash
npm install
cp .env.local.example .env.local
# editar .env.local con credenciales (ver abajo)
npm run dev
```

Nota: para probar OAuth de ML sin Upstash Redis, no es necesario llenar esas vars en desarrollo local.

## TODO próximos pasos

- Crear app de MercadoLibre en developers.mercadolibre.com.uy y llenar MERCADOLIBRE_APP_ID / MERCADOLIBRE_CLIENT_SECRET
- Llamar GET /api/auth/mercadolibre en navegador (logueado con la cuenta vendedora Panelux/Todo Gastro) → autorizar → callback
- Ir a GET /api/mercadolibre/items y revisar la lista de productos para definir criterio de filtro
- Diseñar estructura de categorías y atributos de producto
- Build fase 2 (catálogo + SEO)

## Referencias

- Integración ML en todogastro-bot: `src/mercadolibre/oauthClient.js`, `tokenStore.js`, `questionsClient.js`
- Webhook ML: `src/routes/webhooks.js`
- MercadoLibre API docs: https://developers.mercadolibre.com.uy/es_uy
