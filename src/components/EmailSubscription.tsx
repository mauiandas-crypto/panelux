'use client'

import { useState, Suspense } from 'react'

function SubscriptionForm() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const [loading, setLoading] = useState(false)
  const [preferences, setPreferences] = useState({
    promotions: true,
    tips: true,
    newProducts: true,
    events: false,
  })

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 500))
      setSubscribed(true)
      setEmail('')
      setTimeout(() => setSubscribed(false), 3000)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubscribe} className="space-y-4">
      <div className="flex gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="tu@email.com"
          required
          className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 font-medium text-gray-900"
        />
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 text-white font-bold rounded-lg transition"
        >
          {loading ? '⏳' : '✉️'} Suscribir
        </button>
      </div>

      <div className="space-y-2">
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={preferences.promotions}
            onChange={(e) => setPreferences({ ...preferences, promotions: e.target.checked })}
            className="w-5 h-5 rounded"
          />
          <span className="text-sm text-gray-700">
            <strong>Ofertas especiales</strong> - Descuentos y promociones
          </span>
        </label>
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={preferences.tips}
            onChange={(e) => setPreferences({ ...preferences, tips: e.target.checked })}
            className="w-5 h-5 rounded"
          />
          <span className="text-sm text-gray-700">
            <strong>Consejos de cocina</strong> - Recetas y tips
          </span>
        </label>
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={preferences.newProducts}
            onChange={(e) => setPreferences({ ...preferences, newProducts: e.target.checked })}
            className="w-5 h-5 rounded"
          />
          <span className="text-sm text-gray-700">
            <strong>Productos nuevos</strong> - Lanzamientos exclusivos
          </span>
        </label>
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={preferences.events}
            onChange={(e) => setPreferences({ ...preferences, events: e.target.checked })}
            className="w-5 h-5 rounded"
          />
          <span className="text-sm text-gray-700">
            <strong>Eventos</strong> - Webinars y eventos especiales
          </span>
        </label>
      </div>

      {subscribed && (
        <div className="bg-green-100 border-2 border-green-600 text-green-700 px-4 py-3 rounded-lg font-semibold text-center">
          ✅ ¡Te has suscrito exitosamente! Revisa tu email.
        </div>
      )}
    </form>
  )
}

export default function EmailSubscription() {
  return (
    <section className="py-12 border-t-2 border-gray-200">
      <div className="max-w-2xl">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-bold mb-3">📬 Suscríbete a Nuestro Newsletter</h2>
          <p className="text-lg text-blue-100 mb-8">
            Recibe ofertas exclusivas, consejos de cocina y lanzamientos de nuevos productos
          </p>

          <Suspense
            fallback={
              <div className="bg-white/20 rounded-lg p-6 text-blue-100 font-semibold">
                Cargando formulario...
              </div>
            }
          >
            <div className="bg-white text-gray-900 rounded-lg p-8">
              <SubscriptionForm />
            </div>
          </Suspense>

          <p className="text-xs text-blue-200 mt-4">
            No compartimos tu email. Puedes desuscribirte en cualquier momento.
          </p>
        </div>
      </div>
    </section>
  )
}
