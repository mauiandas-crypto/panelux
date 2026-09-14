# 🎯 GUÍA COMPLETA: OBTENER CREDENCIALES DE MERCADO PAGO

## PASO 1: ACCEDER A MERCADO PAGO

### 1.1 Ir al sitio de Mercado Pago Uruguay
```
Abre en tu navegador:
https://www.mercadopago.com.uy
```

### 1.2 Si NO tienes cuenta:
- Click en "Vender" (esquina superior derecha)
- Click en "Crear cuenta"
- Elige "Persona Jurídica" (para tu negocio)
- Completa:
  - Email
  - Contraseña
  - Nombre de la empresa
  - RAUC/RUT
  - Tipo de negocio

### 1.3 Si YA tienes cuenta:
- Click en "Iniciar Sesión"
- Email
- Contraseña
- Ingresa

---

## PASO 2: IR A DESARROLLADOR

### 2.1 Una vez logueado
- Mira la esquina SUPERIOR DERECHA
- Encontrarás tu nombre/avatar
- Click en el menú desplegable

### 2.2 En el menú, busca:
```
"Configuración" o "Preferencias" 
    ↓
"Credenciales" o "Desarrollo"
    ↓
"Developers" o "Desarrollador"
```

### 2.3 Alternative (URL directa):
```
Copia y pega en tu navegador:
https://www.mercadopago.com.uy/developers/panel
```

---

## PASO 3: OBTENER CREDENCIALES DE SANDBOX

### 3.1 Una vez en el panel de desarrollador
Deberías ver dos secciones:
- **CREDENCIALES SANDBOX** (para testing)
- **CREDENCIALES PRODUCCIÓN** (dinero real)

### 3.2 Selecciona SANDBOX (para empezar)
Haz click en la pestaña o sección "Sandbox"

### 3.3 Verás dos campos importantes:

```
┌─────────────────────────────────────┐
│ PUBLIC KEY (Sandbox)                │
│ APP_USR-abc123def456ghi789...      │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ ACCESS TOKEN (Sandbox)              │
│ APP_USR-xyz789uvw456rst123...      │
└─────────────────────────────────────┘
```

### 3.4 COPIAR LAS CREDENCIALES

**PUBLIC KEY:**
1. Posiciónate sobre el campo
2. Deberías ver un icono de "Copiar" (📋)
3. Click en copiar
4. O selecciona el texto y Ctrl+C

**ACCESS TOKEN:**
1. Igual que arriba
2. Copia el token
3. Guarda en algún lugar seguro

---

## PASO 4: GUARDAR EN `.env.local`

### 4.1 Abre tu proyecto en el editor de código

```
C:\Users\mauri\paginaPanelux\
```

### 4.2 En la RAÍZ del proyecto (mismo nivel que package.json)

Crea un archivo llamado: `.env.local`

**IMPORTANTE:** Comienza con un punto (.)

### 4.3 Dentro de `.env.local`, pega:

```env
NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY=AQUI_PEGA_TU_PUBLIC_KEY
MERCADOPAGO_ACCESS_TOKEN=AQUI_PEGA_TU_ACCESS_TOKEN
```

### 4.4 Reemplaza los valores:

Ejemplo completo:
```env
NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY=APP_USR-12345678-9abc-def0-1234-567890abcdef
MERCADOPAGO_ACCESS_TOKEN=APP_USR-abcdef123456789-uvwxyz
```

**⚠️ IMPORTANTE:**
- NO incluyas comillas
- NO dejes espacios antes/después del =
- Cada variable en su propia línea

### 4.5 Guarda el archivo

Ctrl+S

---

## PASO 5: REINICIAR EL SERVIDOR

### Si tenías npm run dev corriendo:

```bash
1. En la terminal: Presiona Ctrl+C
2. Espera que se detenga
3. Ejecuta nuevamente: npm run dev
```

**Mercado Pago ahora debería funcionar ✅**

---

## PASO 6: TESTEAR EN SANDBOX

### 6.1 Abre tu aplicación
```
http://localhost:3000
```

### 6.2 Sigue estos pasos:

1. Agrega un producto al carrito
2. Ve a `/carrito`
3. Click "Ir a Pagar"
4. Completa el formulario:
   - Nombre: Tu nombre
   - Email: tumail@example.com
   - Teléfono: +598 9 1234 5678
   - Dirección: Calle 1234
   - Ciudad: Montevideo

5. Selecciona: "💳 Mercado Pago"
6. Click: "💳 Ir a Pagar con Mercado Pago"

### 6.3 Deberías ver:

```
Mercadopago.com.uy/checkout/...
```

Si ves esto = ¡FUNCIONA! ✅

---

## PASO 7: COMPLETAR UN PAGO DE PRUEBA

### 7.1 En Mercado Pago (Sandbox)

Verás un formulario para pagar.

### 7.2 Usa una tarjeta de PRUEBA

```
Titular: Apodo
Número: 4111 1111 1111 1111
Vencimiento: 11/25
CVV: 123
```

### 7.3 Completa y paga

### 7.4 Deberías ser redirigido a:
```
/checkout/confirmacion
```

¡**ÉXITO!** 🎉

---

## PASO 8: CAMBIAR A PRODUCCIÓN (Cuando estés listo)

### ⚠️ SOLO CUANDO QUIERAS DINERO REAL

### 8.1 En Mercado Pago, ve a "Credenciales Producción"

### 8.2 Copia:
- Production PUBLIC KEY
- Production ACCESS TOKEN

### 8.3 En `.env.local`, reemplaza:

```env
# CAMBIA SANDBOX POR PRODUCCIÓN
NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY=APP_USR-prod-123456789
MERCADOPAGO_ACCESS_TOKEN=APP_USR-prod-987654321
```

### 8.4 Reinicia el servidor

```bash
Ctrl+C
npm run dev
```

---

## 🆘 SOLUCIONAR PROBLEMAS

### Problema: "No voy a Mercado Pago"

**Solución:**
1. Verifica `.env.local` exista en la raíz
2. Verifica que las claves NO tengan comillas
3. Reinicia el servidor (`Ctrl+C` + `npm run dev`)
4. Abre DevTools (F12) → Consola
5. Busca errores

### Problema: "Dice que las credenciales no son válidas"

**Solución:**
1. Verifica copiar EXACTAMENTE (sin espacios)
2. Asegúrate de usar SANDBOX (no producción)
3. Copia nuevamente desde Mercado Pago
4. Pega nuevamente en `.env.local`

### Problema: ".env.local no aparece en el editor"

**Solución:**
1. En VS Code: View → Show Hidden Files
2. O presiona: Ctrl+Shift+P → Toggle Hidden

### Problema: "Después de pagar no vuelve"

**Solución:**
1. Esto es normal en SANDBOX
2. Puede tomar unos segundos
3. Intenta recargar la página
4. Verifica la consola (F12) para errores

---

## ✅ CHECKLIST FINAL

- [ ] Tengo cuenta en Mercado Pago Uruguay
- [ ] Logueado en mi cuenta
- [ ] Fui a Developers/Credenciales
- [ ] Copié PUBLIC KEY (Sandbox)
- [ ] Copié ACCESS TOKEN (Sandbox)
- [ ] Creé archivo `.env.local` en la raíz
- [ ] Pegué las credenciales en `.env.local`
- [ ] Reinicié el servidor (Ctrl+C + npm run dev)
- [ ] Testé el flujo completo
- [ ] Me redirigió a Mercado Pago ✅

---

## 📞 SOPORTE

Si tienes problemas:

1. **Contacto Mercado Pago:**
   - https://www.mercadopago.com.uy/ayuda
   - Email: ayuda@mercadopago.com

2. **Verificar documentación oficial:**
   - https://www.mercadopago.com.uy/developers

3. **Revisar tu `.env.local`:**
   - Debe estar en la RAÍZ del proyecto
   - Junto a `package.json`
   - Sin comillas en los valores

---

**¡Listo! Tu sistema de pago está funcionando 🚀**

Cualquier duda, pregunta.