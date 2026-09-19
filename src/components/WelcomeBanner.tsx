'use client'

import { useEffect, useState } from 'react'
import { CloseIcon, GiftIcon } from '@/components/icons/Icons'

const SESSION_KEY = 'panelux_welcome_shown'

export default function WelcomeBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    try {
      const yaSeMostro = sessionStorage.getItem(SESSION_KEY)
      if (yaSeMostro) return
    } catch {
      // sessionStorage puede fallar (modo privado, etc.) - mostramos igual
    }

    const timer = setTimeout(() => setVisible(true), 1500)
    return () => clearTimeout(timer)
  }, [])

  const cerrar = () => {
    setVisible(false)
    try {
      sessionStorage.setItem(SESSION_KEY, '1')
    } catch {
      // no pasa nada si no se puede guardar
    }
  }

  const copiarCupon = () => {
    navigator.clipboard?.writeText('BIENVENIDA10').catch(() => {})
  }

  if (!visible) return null

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-[100]"
      onClick={cerrar}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-sm w-full overflow-hidden relative animate-in"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={cerrar}
          className="absolute top-3 right-3 text-white/90 hover:text-white leading-none z-10"
          aria-label="Cerrar"
        >
          <CloseIcon className="w-6 h-6" />
        </button>

        <div className="bg-gradient-to-br from-blue-600 to-blue-800 text-white px-6 pt-10 pb-8 text-center">
          <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-white/15 flex items-center justify-center">
            <GiftIcon className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold mb-2">¡Bienvenido a Panelux!</h2>
          <p className="text-blue-100 text-sm">
            Tenés 10% de descuento en tu primera compra
          </p>
        </div>

        <div className="px-6 py-6 text-center">
          <p className="text-xs text-gray-500 mb-2">Usá el código al pagar</p>
          <button
            onClick={copiarCupon}
            className="w-full border-2 border-dashed border-blue-400 rounded-lg py-3 mb-4 font-mono font-bold text-lg text-blue-700 hover:bg-blue-50 transition"
            title="Copiar código"
          >
            BIENVENIDA10
          </button>
          <button
            onClick={cerrar}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition"
          >
            Empezar a comprar
          </button>
        </div>
      </div>
    </div>
  )
}
