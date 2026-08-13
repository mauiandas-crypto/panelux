'use client'

import { useState } from 'react'
import { siteConfig } from '@/lib/config'

export default function WhatsAppChat() {
  const [abierto, setAbierto] = useState(false)
  const whatsappNumber = siteConfig.contact.whatsapp

  return (
    <>
      {/* Botón flotante */}
      <button
        onClick={() => setAbierto(!abierto)}
        className="fixed bottom-6 right-6 w-16 h-16 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg flex items-center justify-center text-2xl z-40 transition transform hover:scale-110"
        title="Chat con WhatsApp"
      >
        {abierto ? '✕' : '💬'}
      </button>

      {/* Widget de chat */}
      {abierto && (
        <div className="fixed bottom-24 right-6 w-80 bg-white rounded-xl shadow-2xl overflow-hidden z-40 animate-in">
          {/* Header */}
          <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-4">
            <h3 className="font-bold text-lg">¡Hola! 👋</h3>
            <p className="text-sm text-green-100">Estamos aquí para ayudarte</p>
          </div>

          {/* Contenido */}
          <div className="p-4 space-y-4">
            <div className="bg-green-50 rounded-lg p-4">
              <p className="text-sm text-gray-700 mb-4">
                <strong>¿En qué te podemos ayudar?</strong>
              </p>
              <p className="text-xs text-gray-600 mb-4">
                Disponibles Lun-Vie 9:00-18:00 | Sáb 10:00-14:00
              </p>
            </div>

            {/* Opciones rápidas */}
            <div className="space-y-2">
              <a
                href="https://wa.me/${whatsappNumber}?text=Hola%20Panelux%2C%20me%20gustar%C3%ADa%20consultar%20sobre%20disponibilidad%20de%20productos"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full block bg-blue-50 hover:bg-blue-100 text-blue-900 font-semibold py-2 px-3 rounded-lg text-sm transition"
              >
                📦 Consultar Disponibilidad
              </a>
              <a
                href="https://wa.me/${whatsappNumber}?text=Hola%20Panelux%2C%20tengo%20una%20pregunta%20sobre%20gu%C3%ADa%20de%20compra"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full block bg-blue-50 hover:bg-blue-100 text-blue-900 font-semibold py-2 px-3 rounded-lg text-sm transition"
              >
                🛒 Guía de Compra
              </a>
              <a
                href="https://wa.me/${whatsappNumber}?text=Hola%20Panelux%2C%20tengo%20una%20consulta%20sobre%20enviios"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full block bg-blue-50 hover:bg-blue-100 text-blue-900 font-semibold py-2 px-3 rounded-lg text-sm transition"
              >
                🚚 Consultar Envíos
              </a>
              <a
                href="https://wa.me/${whatsappNumber}"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full block bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-3 rounded-lg text-sm transition"
              >
                💬 Escribir Mensaje
              </a>
            </div>

            {/* Info contacto */}
            <div className="text-center pt-4 border-t border-gray-200">
              <p className="text-xs text-gray-600">
                📞 {siteConfig.contact.phone} <br />
                ✉️ {siteConfig.contact.email}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
