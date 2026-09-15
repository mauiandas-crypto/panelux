import { defaultAdminData, AdminData } from './admin-data'

// Estado compartido en memoria entre /api/admin/data (lectura/escritura del
// admin) y /api/coupons/validate (lectura pública desde el checkout), para
// que ambos vean los mismos datos dentro de la misma instancia de servidor.
// Sigue teniendo la limitación de siempre: en Vercel esto vive en memoria y
// se puede perder al reiniciarse la función serverless (pendiente: mover a
// una base de datos real).
let adminData: AdminData = defaultAdminData

export function getAdminData(): AdminData {
  return adminData
}

export function setAdminData(data: AdminData): AdminData {
  adminData = {
    ...data,
    lastUpdated: new Date().toISOString(),
  }
  return adminData
}
