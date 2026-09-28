'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

// La sesión vive en una cookie httpOnly (no accesible desde JS), así que la
// única forma de saber si el usuario sigue logueado es preguntarle al
// servidor. Antes esto se manejaba guardando una copia del token en
// localStorage, lo que lo dejaba expuesto a robo vía XSS.
export function useAdminAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    let cancelled = false

    fetch('/api/admin/session')
      .then((res) => {
        if (cancelled) return
        if (res.ok) {
          setIsAuthenticated(true)
        } else {
          router.push('/admin/login')
        }
      })
      .catch(() => {
        if (!cancelled) router.push('/admin/login')
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [router])

  return { isAuthenticated, loading }
}
