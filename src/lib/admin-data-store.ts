import prisma from './prisma'
import { defaultAdminData, AdminData, Banner, Coupon, PromoMessage } from './admin-data'

// Antes esto vivía en un array en memoria del proceso - se perdía en cada
// redeploy o cold start de la función serverless en Vercel (era el motivo
// de que pedidos y cupones "desaparecieran"). Ahora persiste en Postgres.

let seeded = false

// La primera vez que corre contra una base vacía, la llena con los cupones
// y mensajes por defecto que antes vivían hardcodeados en admin-data.ts.
async function ensureSeeded() {
  if (seeded) return
  const count = await prisma.coupon.count()
  if (count === 0) {
    await prisma.$transaction([
      prisma.banner.createMany({ data: defaultAdminData.banners }),
      prisma.coupon.createMany({
        data: defaultAdminData.coupons.map((c) => ({ ...c, expiresAt: new Date(c.expiresAt) })),
      }),
      prisma.promoMessage.createMany({ data: defaultAdminData.promoMessages }),
    ])
  }
  seeded = true
}

export async function getAdminData(): Promise<AdminData> {
  await ensureSeeded()

  const [banners, coupons, promoMessages] = await Promise.all([
    prisma.banner.findMany({ orderBy: { order: 'asc' } }),
    prisma.coupon.findMany(),
    prisma.promoMessage.findMany({ orderBy: { order: 'asc' } }),
  ])

  return {
    banners: banners.map((b): Banner => ({ ...b, link: b.link ?? undefined })),
    coupons: coupons.map((c): Coupon => ({
      ...c,
      discountType: c.discountType as Coupon['discountType'],
      expiresAt: c.expiresAt.toISOString(),
    })),
    promoMessages,
    lastUpdated: new Date().toISOString(),
  }
}

// El admin manda siempre el objeto completo (banners+cupones+promos), así
// que se reemplaza todo lo que haya en cada tabla por lo que llega.
export async function setAdminData(data: AdminData): Promise<AdminData> {
  await prisma.$transaction([
    prisma.banner.deleteMany({}),
    prisma.banner.createMany({ data: data.banners }),
    prisma.coupon.deleteMany({}),
    prisma.coupon.createMany({
      data: data.coupons.map((c) => ({ ...c, expiresAt: new Date(c.expiresAt) })),
    }),
    prisma.promoMessage.deleteMany({}),
    prisma.promoMessage.createMany({ data: data.promoMessages }),
  ])

  return getAdminData()
}

// Suma un uso a un cupón cuando efectivamente se concreta un pedido con él
// (no cuando el cliente solo lo "aplica" en el checkout, ya que eso no
// garantiza que la compra se termine de hacer).
export async function incrementCouponUsage(codigo: string): Promise<void> {
  await prisma.coupon.updateMany({
    where: { code: { equals: codigo, mode: 'insensitive' } },
    data: { usedCount: { increment: 1 } },
  })
}
