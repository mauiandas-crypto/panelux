'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Banner, AdminData } from '@/lib/admin-data'

export default function BannersAdmin() {
  const [data, setData] = useState<AdminData | null>(null)
  const [banners, setBanners] = useState<Banner[]>([])
  const [editingId, setEditingId] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const router = useRouter()

  const token = typeof window !== 'undefined' ? localStorage.getItem('adminToken') : null

  useEffect(() => {
    if (!token) {
      router.push('/admin/login')
      return
    }

    fetchData()
  }, [token, router])

  const fetchData = async () => {
    try {
      const response = await fetch('/api/admin/data', {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (response.ok) {
        const adminData = await response.json()
        setData(adminData)
        setBanners(adminData.banners)
      } else {
        router.push('/admin/login')
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  const saveData = async (updatedBanners: Banner[]) => {
    setSaving(true)
    try {
      const response = await fetch('/api/admin/data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ...data, banners: updatedBanners }),
      })
      if (response.ok) {
        const adminData = await response.json()
        setData(adminData)
        setBanners(adminData.banners)
        alert('Cambios guardados correctamente')
      }
    } catch (error) {
      console.error('Error saving data:', error)
      alert('Error al guardar los cambios')
    } finally {
      setSaving(false)
    }
  }

  const updateBanner = (id: string, field: keyof Banner, value: any) => {
    const updated = banners.map((b) =>
      b.id === id ? { ...b, [field]: value } : b
    )
    setBanners(updated)
  }

  const addBanner = () => {
    const newBanner: Banner = {
      id: Date.now().toString(),
      imageUrl: '',
      title: 'Nuevo Banner',
      subtitle: 'Descripción',
      link: '/',
      active: true,
      order: banners.length + 1,
    }
    setBanners([...banners, newBanner])
  }

  const deleteBanner = (id: string) => {
    if (confirm('¿Eliminar este banner?')) {
      const updated = banners.filter((b) => b.id !== id)
      setBanners(updated)
    }
  }

  const handleSave = () => {
    saveData(banners)
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
          <h1 className="text-2xl font-bold text-gray-900">🖼️ Gestión de Banners</h1>
          <button
            onClick={handleSave}
            disabled={saving}
            className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-bold py-2 px-4 rounded transition"
          >
            {saving ? 'Guardando...' : '💾 Guardar cambios'}
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Botón agregar */}
        <button
          onClick={addBanner}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded mb-8 transition"
        >
          + Agregar nuevo banner
        </button>

        {/* Lista de banners */}
        <div className="space-y-6">
          {banners.map((banner) => (
            <div key={banner.id} className="bg-white rounded-lg shadow-lg p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Preview */}
                <div>
                  <h3 className="font-bold text-gray-900 mb-3">Vista previa</h3>
                  {banner.imageUrl ? (
                    <img
                      src={banner.imageUrl}
                      alt={banner.title}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  ) : (
                    <div className="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">
                      Sin imagen
                    </div>
                  )}
                </div>

                {/* Formulario */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-1">
                      URL de imagen
                    </label>
                    <input
                      type="text"
                      value={banner.imageUrl}
                      onChange={(e) =>
                        updateBanner(banner.id, 'imageUrl', e.target.value)
                      }
                      placeholder="https://..."
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-1">
                      Título
                    </label>
                    <input
                      type="text"
                      value={banner.title}
                      onChange={(e) => updateBanner(banner.id, 'title', e.target.value)}
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-1">
                      Subtítulo
                    </label>
                    <input
                      type="text"
                      value={banner.subtitle}
                      onChange={(e) =>
                        updateBanner(banner.id, 'subtitle', e.target.value)
                      }
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-1">
                        Link
                      </label>
                      <input
                        type="text"
                        value={banner.link || ''}
                        onChange={(e) => updateBanner(banner.id, 'link', e.target.value)}
                        placeholder="/"
                        className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-1">
                        Orden
                      </label>
                      <input
                        type="number"
                        value={banner.order}
                        onChange={(e) =>
                          updateBanner(banner.id, 'order', parseInt(e.target.value))
                        }
                        className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={banner.active}
                      onChange={(e) =>
                        updateBanner(banner.id, 'active', e.target.checked)
                      }
                      className="w-5 h-5"
                    />
                    <label className="text-gray-900 font-semibold">Activo</label>
                  </div>

                  <button
                    onClick={() => deleteBanner(banner.id)}
                    className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition mt-4"
                  >
                    🗑️ Eliminar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
