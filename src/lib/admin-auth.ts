import { PrismaClient } from '@prisma/client'

// Cliente Prisma global (evitar múltiples instancias)
const prismaClientSingleton = () => {
  return new PrismaClient()
}

declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>
}

export const prisma = globalThis.prisma ?? prismaClientSingleton()

if (process.env.NODE_ENV !== 'production') {
  globalThis.prisma = prisma
}

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

export async function storeToken(token: string, expirationMinutes: number = 24 * 60): Promise<void> {
  try {
    const expiresAt = new Date(Date.now() + expirationMinutes * 60 * 1000)

    // Guardar token en base de datos
    await prisma.adminToken.create({
      data: {
        token,
        expiresAt,
      },
    })

    // Limpiar tokens expirados en background (no esperar)
    cleanExpiredTokens().catch(err => console.error('Error cleaning tokens:', err))
  } catch (error) {
    console.error('Error storing token:', error)
    throw error
  }
}

export async function invalidateToken(token: string): Promise<void> {
  try {
    await prisma.adminToken.deleteMany({
      where: { token },
    })
  } catch (error) {
    console.error('Error invalidating token:', error)
    throw error
  }
}

export async function getAdminSession(request: Request): Promise<boolean> {
  const authHeader = request.headers.get('authorization')
  if (!authHeader?.startsWith('Bearer ')) {
    return false
  }

  const token = authHeader.substring(7)

  try {
    // Buscar token en base de datos
    const tokenRecord = await prisma.adminToken.findUnique({
      where: { token },
    })

    if (!tokenRecord) {
      return false
    }

    // Verificar que no ha expirado
    if (tokenRecord.expiresAt < new Date()) {
      // Eliminar token expirado en background
      await prisma.adminToken.delete({
        where: { token },
      }).catch(() => {
        // Ignorar si ya fue eliminado
      })
      return false
    }

    return true
  } catch (error) {
    console.error('Error validating admin session:', error)
    return false
  }
}

// Función auxiliar para limpiar tokens expirados
async function cleanExpiredTokens(): Promise<void> {
  try {
    const now = new Date()
    await prisma.adminToken.deleteMany({
      where: {
        expiresAt: {
          lt: now,
        },
      },
    })
  } catch (error) {
    console.error('Error cleaning expired tokens:', error)
  }
}

// Ejecutar limpieza de tokens periódicamente (cada 1 hora)
if (typeof window === 'undefined' && process.env.NODE_ENV !== 'test') {
  setInterval(() => {
    cleanExpiredTokens().catch(err => console.error('Scheduled token cleanup error:', err))
  }, 60 * 60 * 1000)
}
