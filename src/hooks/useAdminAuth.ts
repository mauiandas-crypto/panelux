'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export function useAdminAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Pequeño delay para asegurar que localStorage esté disponible
    const timer = setTimeout(() => {
      const token = localStorage.getItem('adminToken')

      if (!token) {
        // Intentar obtener de la cookie también
        const cookieToken = document.cookie
          .split('; ')
          .find((row) => row.startsWith('adminToken='))
          ?.split('=')[1]

        if (!cookieToken) {
          router.push('/admin/login')
          return
        } else {
          localStorage.setItem('adminToken', cookieToken)
          setIsAuthenticated(true)
          setLoading(false)
        }
      } else {
        setIsAuthenticated(true)
        setLoading(false)
      }
    }, 50)

    return () => clearTimeout(timer)
  }, [router])

  return { isAuthenticated, loading }
}
