import crypto from 'crypto'

// Los tokens CSRF son firmados (HMAC) y sin estado: no dependen de memoria
// del servidor. Esto es necesario porque en Vercel (serverless) cada request
// puede ejecutarse en una instancia distinta, así que un token guardado en
// un Map en memoria (como se hacía antes) casi nunca coincide entre el GET
// que lo genera y el POST que lo valida, rompiendo el login de forma
// intermitente.
const EXPIRATION_MS = 60 * 60 * 1000 // 1 hora

// Sin fallback: ver la misma nota en admin-auth.ts - un secreto fijo en el
// repo permitiría forjar tokens CSRF válidos si la env var falta.
function sign(payload: string): string {
  const secret = process.env.ADMIN_PASSWORD
  if (!secret) {
    throw new Error('ADMIN_PASSWORD no está configurada')
  }
  return crypto.createHmac('sha256', secret).update(payload).digest('hex')
}

export function generateCSRFToken(): string {
  const expiresAt = Date.now() + EXPIRATION_MS
  const signature = sign(String(expiresAt))
  return `${expiresAt}.${signature}`
}

export function validateCSRFToken(token: string): boolean {
  if (!token || !token.includes('.')) {
    return false
  }

  const [expiresAtStr, signature] = token.split('.')
  const expiresAt = Number(expiresAtStr)

  if (Number.isNaN(expiresAt) || !signature) {
    return false
  }

  const expectedSignature = sign(expiresAtStr)

  // Comparación en tiempo constante para evitar timing attacks
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

export function getCSRFTokenFromRequest(request: Request): string | null {
  return request.headers.get('x-csrf-token')
}
