'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { PromoMessage, AdminData } from '@/lib/admin-data'

export default function PromosAdmin() {
  const [data, setData] = useState<AdminData | null>(null)
  const [promos, setPromos] = useState<PromoMessage[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [token, setToken] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const t = localStorage.getItem('adminToken')
    if (!t) {
      router.push('/admin/login')
    } else {
      setToken(t)
    }
  }, [router])

  useEffect(() => {
    if (token) {
      fetchData()
    }
  }, [token])

  const fetchData = async () => {
    try {
      const response = await fetch('/api/admin/data', {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (response.ok) {
        const adminData = await response.json()
        setData(adminData)
        setPromos(adminData.promoMessages)
      } else {
        router.push('/admin/login')
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  const saveData = async (updatedPromos: PromoMessage[]) => {
    setSaving(true)
    try {
      const response = await fetch('/api/admin/data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ...data, promoMessages: updatedPromos }),
      })
      if (response.ok) {
        const adminData = await response.json()
        setData(adminData)
        setPromos(adminData.promoMessages)
        alert('Cambios guardados correctamente')
      }
    } catch (error) {
      console.error('Error saving data:', error)
      alert('Error al guardar los cambios')
    } finally {
      setSaving(false)
    }
  }

  const updatePromo = (id: string, field: keyof PromoMessage, value: any) => {
    const updated = promos.map((p) =>
      p.id === id ? { ...p, [field]: value } : p
    )
    setPromos(updated)
  }

  const addPromo = () => {
    const newPromo: PromoMessage = {
      id: Date.now().toString(),
      text: 'Nueva promoción',
      active: true,
      order: promos.length + 1,
    }
    setPromos([...promos, newPromo])
  }

  const deletePromo = (id: string) => {
    if (confirm('¿Eliminar esta promoción?')) {
      const updated = promos.filter((p) => p.id !== id)
      setPromos(updated)
    }
  }

  const handleSave = () => {
    saveData(promos)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-900 font-bold">Cargando...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/admin" className="text-blue-600 hover:text-blue-700 font-bold">
            ← Volver al panel
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">📢 Promociones (Textos que se mueven)</h1>
          <button
            onClick={handleSave}
            disabled={saving}
            className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-bold py-2 px-4 rounded transition"
          >
            {saving ? 'Guardando...' : '💾 Guardar cambios'}
          </button>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Info */}
        <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-4 mb-8">
          <p className="text-blue-900">
            Estos textos se mostrarán en un carrusel en la parte superior de la página. Aparecen uno tras otro.
          </p>
        </div>

        {/* Botón agregar */}
        <button
          onClick={addPromo}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded mb-8 transition"
        >
          + Agregar nueva promoción
        </button>

        {/* Lista de promos */}
        <div className="space-y-4">
          {promos.map((promo) => (
            <div key={promo.id} className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Texto promocional
                  </label>
                  <textarea
                    value={promo.text}
                    onChange={(e) =>
                      updatePromo(promo.id, 'text', e.target.value)
                    }
                    placeholder="Ingresa el texto que se mostrará..."
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                    rows={2}
                  />

                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-1">
                        Orden
                      </label>
                      <input
                        type="number"
                        value={promo.order}
                        onChange={(e) =>
                          updatePromo(promo.id, 'order', parseInt(e.target.value))
                        }
                        className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                      />
                    </div>

                    <div className="flex items-end gap-3">
                      <input
                        type="checkbox"
                        checked={promo.active}
                        onChange={(e) =>
                          updatePromo(promo.id, 'active', e.target.checked)
                        }
                        className="w-5 h-5"
                      />
                      <label className="text-gray-900 font-semibold">Activo</label>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => deletePromo(promo.id)}
                  className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition h-fit"
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Preview */}
        {promos.filter((p) => p.active).length > 0 && (
          <div className="mt-12 pt-8 border-t-2 border-gray-300">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">📺 Vista previa</h2>
            <div className="bg-blue-600 text-white overflow-hidden rounded-lg">
              {promos
                .filter((p) => p.active)
                .map((promo) => (
                  <div key={promo.id} className="px-4 py-3 text-center font-semibold">
                    {promo.text}
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
