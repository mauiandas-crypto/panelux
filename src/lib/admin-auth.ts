import crypto from 'crypto'

// Los tokens de sesión de admin son firmados (HMAC) y sin estado.
// Antes se guardaban en una base SQLite vía Prisma (`file:./prisma/dev.db`),
// pero eso no funciona en Vercel: el filesystem de las funciones serverless
// es de solo lectura (y efímero incluso en /tmp), así que cualquier intento
// de escribir el token fallaba y el login devolvía "Error en el servidor".
// Un token firmado con expiración embebida no necesita persistirse en
// ningún lado para poder validarse después.

// Sin fallback: si ADMIN_PASSWORD no está seteada, firmar con un secreto fijo
// visible en el repo dejaría a cualquiera forjar tokens de sesión válidos.
// Mejor fallar fuerte que degradar silenciosamente la seguridad.
function sign(payload: string): string {
  const secret = process.env.ADMIN_PASSWORD
  if (!secret) {
    throw new Error('ADMIN_PASSWORD no está configurada')
  }
  return crypto.createHmac('sha256', secret).update(payload).digest('hex')
}

function getCookie(request: Request, name: string): string | null {
  const cookieHeader = request.headers.get('cookie')
  if (!cookieHeader) return null
  const match = cookieHeader
    .split(';')
    .map((c) => c.trim())
    .find((c) => c.startsWith(`${name}=`))
  return match ? decodeURIComponent(match.slice(name.length + 1)) : null
}

export function isValidAdminPassword(password: string): boolean {
  return password === process.env.ADMIN_PASSWORD
}

export function generateSecureToken(expirationMinutes: number = 24 * 60): string {
  const expiresAt = Date.now() + expirationMinutes * 60 * 1000
  const signature = sign(String(expiresAt))
  return `${expiresAt}.${signature}`
}

// Se mantiene por compatibilidad con código existente que la llama, pero
// ya no hace falta persistir nada: el token generado por generateSecureToken
// ya es válido por sí mismo.
export async function storeToken(_token: string, _expirationMinutes?: number): Promise<void> {
  return
}

// Sin almacenamiento no hay forma de invalidar un token antes de su
// expiración natural. El logout (POST /api/admin/logout) borra la cookie del
// navegador, pero un token ya emitido seguiría siendo válido si alguien lo
// hubiera copiado antes del logout - limitación aceptada dado el bajo riesgo
// (panel de un solo admin, sesiones de 24hs).
export async function invalidateToken(_token: string): Promise<void> {
  return
}

export async function getAdminSession(request: Request): Promise<boolean> {
  const token = getCookie(request, 'adminToken')
  if (!token || !token.includes('.')) {
    return false
  }

  const [expiresAtStr, signature] = token.split('.')
  const expiresAt = Number(expiresAtStr)

  if (Number.isNaN(expiresAt) || !signature) {
    return false
  }

  const expectedSignature = sign(expiresAtStr)
  const a = Buffer.from(signature)
  const b = Buffer.from(expectedSignature)
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) {
    return false
  }

  if (expiresAt < Date.now()) {
    return false
  }

  return true
}
