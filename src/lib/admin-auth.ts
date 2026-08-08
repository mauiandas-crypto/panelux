// Middleware simple para proteger rutas de admin
// En producción, usar Next-Auth o similar

export function isValidAdminPassword(password: string): boolean {
  return password === process.env.ADMIN_PASSWORD
}

export function getAdminSession(
  request: Request
): boolean {
  const authHeader = request.headers.get('authorization')
  if (!authHeader?.startsWith('Bearer ')) {
    return false
  }

  const token = authHeader.substring(7)
  return isValidAdminPassword(token)
}
