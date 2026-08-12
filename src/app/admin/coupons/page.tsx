'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Coupon, AdminData } from '@/lib/admin-data'

export default function CouponsAdmin() {
  const [data, setData] = useState<AdminData | null>(null)
  const [coupons, setCoupons] = useState<Coupon[]>([])
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
        setCoupons(adminData.coupons)
      } else {
        router.push('/admin/login')
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  const saveData = async (updatedCoupons: Coupon[]) => {
    setSaving(true)
    try {
      const response = await fetch('/api/admin/data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ...data, coupons: updatedCoupons }),
      })
      if (response.ok) {
        const adminData = await response.json()
        setData(adminData)
        setCoupons(adminData.coupons)
        alert('Cambios guardados correctamente')
      }
    } catch (error) {
      console.error('Error saving data:', error)
      alert('Error al guardar los cambios')
    } finally {
      setSaving(false)
    }
  }

  const updateCoupon = (id: string, field: keyof Coupon, value: any) => {
    const updated = coupons.map((c) =>
      c.id === id ? { ...c, [field]: value } : c
    )
    setCoupons(updated)
  }

  const addCoupon = () => {
    const newCoupon: Coupon = {
      id: Date.now().toString(),
      code: 'NUEVO' + Math.random().toString(36).substring(7).toUpperCase(),
      discount: 10,
      discountType: 'percentage',
      minPurchase: 0,
      maxUses: 100,
      usedCount: 0,
      active: true,
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    }
    setCoupons([...coupons, newCoupon])
  }

  const deleteCoupon = (id: string) => {
    if (confirm('¿Eliminar este cupón?')) {
      const updated = coupons.filter((c) => c.id !== id)
      setCoupons(updated)
    }
  }

  const handleSave = () => {
    saveData(coupons)
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
          <h1 className="text-2xl font-bold text-gray-900">🎟️ Gestión de Cupones</h1>
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
          onClick={addCoupon}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded mb-8 transition"
        >
          + Agregar nuevo cupón
        </button>

        {/* Lista de cupones */}
        <div className="space-y-6">
          {coupons.map((coupon) => (
            <div key={coupon.id} className="bg-white rounded-lg shadow-lg p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Información principal */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-1">
                      Código del cupón
                    </label>
                    <input
                      type="text"
                      value={coupon.code}
                      onChange={(e) =>
                        updateCoupon(coupon.id, 'code', e.target.value.toUpperCase())
                      }
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 font-bold text-lg"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-1">
                        Tipo de descuento
                      </label>
                      <select
                        value={coupon.discountType}
                        onChange={(e) =>
                          updateCoupon(
                            coupon.id,
                            'discountType',
                            e.target.value as 'percentage' | 'fixed'
                          )
                        }
                        className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                      >
                        <option value="percentage">Porcentaje (%)</option>
                        <option value="fixed">Monto fijo ($)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-1">
                        Valor
                      </label>
                      <input
                        type="number"
                        value={coupon.discount}
                        onChange={(e) =>
                          updateCoupon(coupon.id, 'discount', parseFloat(e.target.value))
                        }
                        className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                      />
                    </div>
                  </div>
                </div>

                {/* Configuración */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-1">
                      Compra mínima
                    </label>
                    <input
                      type="number"
                      value={coupon.minPurchase}
                      onChange={(e) =>
                        updateCoupon(coupon.id, 'minPurchase', parseFloat(e.target.value))
                      }
                      placeholder="0"
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-1">
                        Usos máximos
                      </label>
                      <input
                        type="number"
                        value={coupon.maxUses}
                        onChange={(e) =>
                          updateCoupon(coupon.id, 'maxUses', parseInt(e.target.value))
                        }
                        className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-1">
                        Ya usados
                      </label>
                      <input
                        type="number"
                        value={coupon.usedCount}
                        onChange={(e) =>
                          updateCoupon(coupon.id, 'usedCount', parseInt(e.target.value))
                        }
                        disabled
                        className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg bg-gray-100"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-1">
                      Expira el
                    </label>
                    <input
                      type="date"
                      value={coupon.expiresAt.split('T')[0]}
                      onChange={(e) =>
                        updateCoupon(
                          coupon.id,
                          'expiresAt',
                          new Date(e.target.value).toISOString()
                        )
                      }
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                    />
                  </div>
                </div>
              </div>

              {/* Estado y acciones */}
              <div className="mt-6 pt-6 border-t border-gray-200 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={coupon.active}
                    onChange={(e) =>
                      updateCoupon(coupon.id, 'active', e.target.checked)
                    }
                    className="w-5 h-5"
                  />
                  <label className="text-gray-900 font-semibold">Activo</label>
                </div>

                <div className="text-sm text-gray-600">
                  Disponible: {coupon.maxUses - coupon.usedCount} / {coupon.maxUses}
                </div>

                <button
                  onClick={() => deleteCoupon(coupon.id)}
                  className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition"
                >
                  🗑️ Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
