# 🚀 GUÍA DE DEPLOY EN VERCEL

## PRE-REQUISITOS
- GitHub account
- Vercel account (gratuita)
- Dominio (opcional, puedes usar panelux.vercel.app primero)

---

## PASO 1: PREPARAR GITHUB

```bash
# Asegúrate de que todo está en GitHub
git status
git push origin main

# Verificar que el repositorio es público
# (Settings → Visibility → Public)
```

---

## PASO 2: CONECTAR VERCEL

### Opción A: Usar Vercel CLI (Rápido)
```bash
# Instalar Vercel CLI globalmente
npm install -g vercel

# Hacer login
vercel login

# Deploy
vercel

# Seleccionar preguntas:
# - Link to existing project? NO (primera vez)
# - What's your project's name? panelux
# - Which template? Next.js
# - Create Vercel folder? YES
```

### Opción B: Usar Web (Más fácil)
1. Ir a https://vercel.com
2. Click en "New Project"
3. Buscar el repositorio "paginaPanelux"
4. Click "Import"
5. Configurar variables de entorno (ver PASO 3)
6. Click "Deploy"

---

## PASO 3: CONFIGURAR VARIABLES DE ENTORNO

En Vercel Dashboard → Settings → Environment Variables

**Agregar estas variables:**

```
ADMIN_PASSWORD = admin123  (cambiar a contraseña fuerte)
NEXT_PUBLIC_BASE_URL = https://panelux.vercel.app  (o tu dominio)
```

**Opcionales (si implementas pagos):**
```
MERCADOPAGO_ACCESS_TOKEN = APP_USR_xxxxx
RESEND_API_KEY = re_xxxxx
```

---

## PASO 4: CONECTAR DOMINIO (OPCIONAL)

### Si comprasite dominio en:

#### GoDaddy
1. Vercel → Project Settings → Domains
2. Agregar dominio
3. Copiar nameservers de Vercel
4. GoDaddy → Account → Domains → Nameservers → Custom
5. Pegar nameservers
6. Esperar 24-48 horas

#### Otros (Namecheap, etc.)
Proceso similar, cambiar nameservers en el proveedor

#### Sin dominio
```
Usar: panelux.vercel.app (gratis)
```

---

## PASO 5: VERIFICAR DEPLOY

```bash
# Después de 5-10 minutos:
1. Ir a https://panelux.vercel.app
2. Verificar que carga correctamente
3. Ir a /admin/login
4. Ingresar contraseña
5. Verificar que funciona el admin panel
```

---

## PASO 6: CONFIGURAR GOOGLE SEARCH CONSOLE

```
1. Ir a https://search.google.com/search-console
2. "Agregar propiedad"
3. Seleccionar "Dominio"
4. Ingresar: panelux.com.uy (o tu dominio)
5. Seguir instrucciones de verificación
6. Esperar a que Google indexe
7. Enviar sitemap manualmente:
   - Ir a: https://panelux.com.uy/sitemap.ts
   - Copiar URL
   - En GSC → Sitemaps → Agregar sitemap
```

---

## PASO 7: CONFIGURAR GOOGLE ANALYTICS

```
1. Ir a https://analytics.google.com
2. "Crear nueva propiedad"
3. Nombre: Panelux
4. Copiar el GA_ID (G-XXXXXXXXXX)
5. Agregar a variables de entorno:
   NEXT_PUBLIC_GA_ID = G-XXXXXXXXXX
6. Redeployar
7. Verificar en Analytics → Real time
```

---

## VERIFICAR QUE TODO FUNCIONA

```bash
# Test 1: Performance
curl -w "@curl-format.txt" -o /dev/null -s https://panelux.vercel.app
# Expected: < 2 segundos

# Test 2: SEO
# Ir a: https://search.google.com/test/mobile-friendly?url=panelux.vercel.app
# Expected: Verde "Mobile-friendly"

# Test 3: Schema.org
# Ir a: https://schema.org/validate/?url=panelux.vercel.app
# Expected: Sin errores

# Test 4: Sitemap
# Ir a: https://panelux.vercel.app/sitemap.xml
# Expected: XML con todas las URLs

# Test 5: Admin
# Ir a: https://panelux.vercel.app/admin/login
# Ingresar: contraseña
# Expected: Acceso al panel
```

---

## TROUBLESHOOTING

### Error: Build Failed
```
Solución:
1. Verificar que .env.local tiene ADMIN_PASSWORD
2. Verificar que no hay archivos con errores de sintaxis
3. Revisar logs de build en Vercel
```

### Error: 404 Not Found
```
Solución:
1. Esperar 5-10 minutos para que se complete el deploy
2. Hacer hard refresh (Ctrl+Shift+R)
3. Verificar que seleccionaste el proyecto correcto en Vercel
```

### Imágenes no se ven
```
Solución:
1. Verificar que las rutas de imágenes en /public/Productos/ son correctas
2. Las URLs de las imágenes en la BD deben ser relativas: /Productos/...
```

### Admin no funciona
```
Solución:
1. Verificar que ADMIN_PASSWORD está en variables de entorno
2. Usar contraseña exacta (case-sensitive)
3. Limpiar cookies y cache
```

---

## AFTER DEPLOY (Importante)

```bash
# 1. Cambiar contraseña admin a algo fuerte
# ADMIN_PASSWORD = "algo-muy-seguro-123"

# 2. Monitorear en Google Search Console
# Tomar 2-4 semanas para indexación completa

# 3. Crear contenido (blog posts, guías)
# Aumenta tráfico orgánico

# 4. Recopilar reseñas de clientes
# Mejora rankings

# 5. Monitorear Core Web Vitals en PageSpeed Insights
# https://pagespeed.web.dev
```

---

## PROBLEMAS DE PERFORMANCE

Si el sitio es lento:

1. Verificar imágenes optimizadas
2. Ir a PageSpeed Insights → https://pagespeed.web.dev
3. Seguir recomendaciones
4. Ver Core Web Vitals en Google Search Console

---

## PREGUNTAS FRECUENTES

**¿Cuesta dinero?**
No, Vercel gratis hasta 100GB/mes. Suficiente para este sitio.

**¿Puedo usar mi dominio actual?**
Sí, cambiar nameservers en tu registrador.

**¿Cuánto tarda en indexar Google?**
2-4 semanas. Puedes acelerar en Google Search Console.

**¿Puedo hacer cambios después?**
Sí, cualquier push a GitHub automáticamente deploya en Vercel.

**¿Cómo hago backup?**
GitHub es tu backup. La BD está en memoria (necesita persistencia real).

---

**¡LISTO! Tu sitio estará en vivo en ~10 minutos.** 🎉

Próximo: Crear Google Analytics y Search Console.
