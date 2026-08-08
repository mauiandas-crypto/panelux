import { PrismaClient } from '@prisma/client'

// Usar una variable global para almacenar la instancia de Prisma
declare global {
  var prisma: PrismaClient | undefined
}

// Crear una instancia única de Prisma
const prisma = global.prisma || new PrismaClient()

// En desarrollo, guardar la instancia en global para evitar múltiples instancias
if (process.env.NODE_ENV === 'development') {
  global.prisma = prisma
}

export default prisma
