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
      const token = localStorage.getItem('adminToken')
      if (!token) {
        // Si no hay token, intentar obtener datos públicos (sin token)
        // Por ahora usamos los datos por defecto
        setLoading(false)
        return
      }

      const response = await fetch('/api/admin/data', {
        headers: { Authorization: `Bearer ${token}` },
      })

      if (response.ok) {
        const adminData = await response.json()
        setData(adminData)
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
