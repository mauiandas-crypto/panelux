'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { AdminData, defaultAdminData } from '@/lib/admin-data'

interface AdminContextType {
  data: AdminData
  loading: boolean
}

const AdminContext = createContext<AdminContextType>({
  data: defaultAdminData,
  loading: true,
})

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<AdminData>(defaultAdminData)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Cargar datos del admin cada vez que se monta
    fetchAdminData()

    // Recargar cada 30 segundos para sincronizar cambios
    const interval = setInterval(fetchAdminData, 30000)

    return () => clearInterval(interval)
  }, [])

  const fetchAdminData = async () => {
    try {
      // Endpoint público: cualquier visitante (no solo el admin logueado)
      // necesita ver los banners y textos promocionales configurados.
      const response = await fetch('/api/site-data')

      if (response.ok) {
        const publicData = await response.json()
        setData(prev => ({ ...prev, ...publicData }))
      }
    } catch (error) {
      console.error('Error fetching admin data:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <AdminContext.Provider value={{ data, loading }}>
      {children}
    </AdminContext.Provider>
  )
}

export function useAdmin() {
  const context = useContext(AdminContext)
  if (!context) {
    throw new Error('useAdmin must be used within AdminProvider')
  }
  return context
}
