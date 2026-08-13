import crypto from 'crypto'

// Almacenamiento de tokens CSRF en memoria (en producción usar Redis/DB)
const csrfTokens = new Map<string, { expiresAt: number; createdAt: number }>()

// Limpieza de tokens expirados cada 30 minutos
if (typeof window === 'undefined') {
  setInterval(() => {
    const now = Date.now()
    for (const [token, data] of csrfTokens.entries()) {
      if (data.expiresAt < now) {
        csrfTokens.delete(token)
      }
    }
  }, 30 * 60 * 1000)
}

export function generateCSRFToken(): string {
  const token = crypto.randomBytes(32).toString('hex')
  const expiresAt = Date.now() + 60 * 60 * 1000 // 1 hora de expiración
  csrfTokens.set(token, { expiresAt, createdAt: Date.now() })
  return token
}

export function validateCSRFToken(token: string): boolean {
  const tokenData = csrfTokens.get(token)

  if (!tokenData) {
    return false
  }

  // Verificar que no ha expirado
  if (tokenData.expiresAt < Date.now()) {
    csrfTokens.delete(token)
    return false
  }

  // Consumir el token (single-use)
  csrfTokens.delete(token)
  return true
}

export function getCSRFTokenFromRequest(request: Request): string | null {
  // Buscar en headers X-CSRF-Token
  const token = request.headers.get('x-csrf-token')
  if (token) return token

  // Buscar en body si es JSON
  try {
    if (request.headers.get('content-type')?.includes('application/json')) {
      // Nota: No podemos leer body dos veces, así que esto es mejor hacerlo en la función que llama
      return null
    }
  } catch {
    return null
  }

  return null
}
