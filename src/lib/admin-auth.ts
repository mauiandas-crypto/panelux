// Almacenamiento en memoria de tokens válidos (en producción usar Redis/DB)
// { token: { expiresAt, createdAt } }
const validTokens = new Map<string, { expiresAt: number; createdAt: number }>()

export function isValidAdminPassword(password: string): boolean {
  return password === process.env.ADMIN_PASSWORD
}

export function generateSecureToken(): string {
  // Generar token seguro de 32 bytes aleatorios
  if (typeof window !== 'undefined') {
    throw new Error('generateSecureToken debe ejecutarse en servidor')
  }

  const crypto = require('crypto')
  return crypto.randomBytes(32).toString('hex')
}

export function storeToken(token: string, expirationMinutes: number = 24 * 60): void {
  const now = Date.now()
  const expiresAt = now + expirationMinutes * 60 * 1000
  validTokens.set(token, { expiresAt, createdAt: now })

  // Limpiar tokens expirados
  for (const [t, data] of validTokens.entries()) {
    if (data.expiresAt < now) {
      validTokens.delete(t)
    }
  }
}

export function invalidateToken(token: string): void {
  validTokens.delete(token)
}

export function getAdminSession(request: Request): boolean {
  const authHeader = request.headers.get('authorization')
  if (!authHeader?.startsWith('Bearer ')) {
    return false
  }

  const token = authHeader.substring(7)

  // Validar que el token existe y no ha expirado
  const tokenData = validTokens.get(token)
  if (!tokenData) {
    return false
  }

  if (tokenData.expiresAt < Date.now()) {
    validTokens.delete(token)
    return false
  }

  return true
}
