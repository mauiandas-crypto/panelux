'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function AdminLogin() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [csrfToken, setCsrfToken] = useState<string | null>(null)
  const router = useRouter()

  // Obtener token CSRF al cargar la página
  useEffect(() => {
    const fetchCSRFToken = async () => {
      try {
        const response = await fetch('/api/admin/csrf')
        const data = await response.json()
        setCsrfToken(data.csrfToken)
      } catch (err) {
        console.error('Error obteniendo CSRF token:', err)
        setError('Error al cargar la página. Recarga e intenta de nuevo.')
      }
    }

    fetchCSRFToken()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    if (!csrfToken) {
      setError('Token CSRF no disponible. Recarga la página.')
      setLoading(false)
      return
    }

    try {
      const response = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': csrfToken,
        },
        body: JSON.stringify({ password }),
      })

      if (response.ok) {
        // Token se guarda automáticamente como cookie HttpOnly Secure por el servidor
        // No guardamos en localStorage por seguridad (vulnerable a XSS)
        setTimeout(() => {
          router.push('/admin')
        }, 100)
      } else {
        setError('Contraseña incorrecta')
        setLoading(false)
      }
    } catch (err) {
      setError('Error al iniciar sesión')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Panel Admin</h1>
          <p className="text-gray-600">Panelux Uruguay</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Contraseña de administrador
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Ingresa la contraseña"
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
              disabled={loading}
            />
          </div>

          {error && (
            <div className="bg-red-50 border-2 border-red-300 text-red-700 px-4 py-2 rounded-lg">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold py-3 px-6 rounded-lg transition"
          >
            {loading ? 'Ingresando...' : 'Ingresar al Panel'}
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-gray-200 text-center">
          <Link href="/" className="text-blue-600 hover:text-blue-700 font-semibold">
            ← Volver al sitio
          </Link>
        </div>
      </div>
    </div>
  )
}
