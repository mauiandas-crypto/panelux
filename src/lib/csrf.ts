import crypto from 'crypto'

// Los tokens CSRF son firmados (HMAC) y sin estado: no dependen de memoria
// del servidor. Esto es necesario porque en Vercel (serverless) cada request
// puede ejecutarse en una instancia distinta, así que un token guardado en
// un Map en memoria (como se hacía antes) casi nunca coincide entre el GET
// que lo genera y el POST que lo valida, rompiendo el login de forma
// intermitente.
const SECRET = process.env.ADMIN_PASSWORD || 'panelux-csrf-fallback-secret'
const EXPIRATION_MS = 60 * 60 * 1000 // 1 hora

function sign(payload: string): string {
  return crypto.createHmac('sha256', SECRET).update(payload).digest('hex')
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
