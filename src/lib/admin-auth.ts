import crypto from 'crypto'

// Los tokens de sesión de admin son firmados (HMAC) y sin estado.
// Antes se guardaban en una base SQLite vía Prisma (`file:./prisma/dev.db`),
// pero eso no funciona en Vercel: el filesystem de las funciones serverless
// es de solo lectura (y efímero incluso en /tmp), así que cualquier intento
// de escribir el token fallaba y el login devolvía "Error en el servidor".
// Un token firmado con expiración embebida no necesita persistirse en
// ningún lado para poder validarse después.

const SECRET = process.env.ADMIN_PASSWORD || 'panelux-admin-fallback-secret'

function sign(payload: string): string {
  return crypto.createHmac('sha256', SECRET).update(payload).digest('hex')
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
// expiración natural. Limitación aceptada por ahora: el logout del lado del
// cliente simplemente borra el token guardado en localStorage.
export async function invalidateToken(_token: string): Promise<void> {
  return
}

export async function getAdminSession(request: Request): Promise<boolean> {
  const authHeader = request.headers.get('authorization')
  if (!authHeader?.startsWith('Bearer ')) {
    return false
  }

  const token = authHeader.substring(7)
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
