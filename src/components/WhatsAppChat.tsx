'use client'

import { useState } from 'react'
import { siteConfig } from '@/lib/config'
import { CloseIcon, BoxIcon, CartIcon, TruckIcon, ChatIcon, PhoneIcon, MailIcon } from '@/components/icons/Icons'

export default function WhatsAppChat() {
  const [abierto, setAbierto] = useState(false)
  const whatsappNumber = siteConfig.contact.whatsapp

  return (
    <>
      {/* Botón flotante */}
      <button
        onClick={() => setAbierto(!abierto)}
        className="fixed bottom-4 right-4 w-12 h-12 sm:bottom-6 sm:right-6 sm:w-16 sm:h-16 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg flex items-center justify-center z-40 transition transform hover:scale-110"
        title="Chat con WhatsApp"
      >
        {abierto ? (
          <CloseIcon className="w-6 h-6 sm:w-8 sm:h-8" />
        ) : (
          <svg viewBox="0 0 32 32" className="w-6 h-6 sm:w-8 sm:h-8" fill="currentColor" aria-hidden="true">
            <path d="M16.004 3C9.376 3 4 8.373 4 15c0 2.386.7 4.61 1.91 6.478L4 29l7.72-1.862A11.94 11.94 0 0 0 16.004 27C22.63 27 28 21.627 28 15S22.63 3 16.004 3Zm6.98 16.57c-.3.85-1.49 1.56-2.45 1.76-.65.13-1.5.24-4.36-.94-3.66-1.52-6.02-5.24-6.2-5.48-.18-.24-1.48-1.97-1.48-3.76 0-1.79.94-2.67 1.27-3.04.33-.37.72-.46.96-.46.24 0 .48 0 .69.01.22.01.52-.08.81.62.3.72 1.02 2.51 1.11 2.69.09.18.15.4.03.64-.12.24-.18.4-.36.61-.18.21-.38.47-.54.63-.18.18-.37.38-.16.75.21.37.93 1.53 2 2.48 1.37 1.22 2.53 1.6 2.9 1.78.37.18.58.15.8-.09.22-.24.93-1.08 1.18-1.45.24-.37.49-.31.82-.19.34.12 2.15 1.01 2.52 1.2.37.18.61.27.7.43.09.15.09.85-.21 1.7Z" />
          </svg>
        )}
      </button>

      {/* Widget de chat */}
      {abierto && (
        <div className="fixed bottom-24 right-6 w-80 bg-white rounded-xl shadow-2xl overflow-hidden z-40 animate-in">
          {/* Header */}
          <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-4">
            <h3 className="font-bold text-lg">¡Hola!</h3>
            <p className="text-sm text-green-100">Estamos aquí para ayudarte</p>
          </div>

          {/* Contenido */}
          <div className="p-4 space-y-4">
            <div className="bg-green-50 rounded-lg p-4">
              <p className="text-sm text-gray-700 mb-4">
                <strong>¿En qué te podemos ayudar?</strong>
              </p>
              <p className="text-xs text-gray-600 mb-4">
                Disponibles Lun-Vie 8:30-17:15
              </p>
            </div>

            {/* Opciones rápidas */}
            <div className="space-y-2">
              <a
                href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent('Hola Panelux, me gustaría consultar sobre disponibilidad de productos')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center gap-2 bg-blue-50 hover:bg-blue-100 text-blue-900 font-semibold py-2 px-3 rounded-lg text-sm transition"
              >
                <BoxIcon className="w-4 h-4 flex-shrink-0" /> Consultar Disponibilidad
              </a>
              <a
                href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent('Hola Panelux, tengo una pregunta sobre guía de compra')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center gap-2 bg-blue-50 hover:bg-blue-100 text-blue-900 font-semibold py-2 px-3 rounded-lg text-sm transition"
              >
                <CartIcon className="w-4 h-4 flex-shrink-0" /> Guía de Compra
              </a>
              <a
                href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent('Hola Panelux, tengo una consulta sobre envíos')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center gap-2 bg-blue-50 hover:bg-blue-100 text-blue-900 font-semibold py-2 px-3 rounded-lg text-sm transition"
              >
                <TruckIcon className="w-4 h-4 flex-shrink-0" /> Consultar Envíos
              </a>
              <a
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-3 rounded-lg text-sm transition"
              >
                <ChatIcon className="w-4 h-4 flex-shrink-0" /> Escribir Mensaje
              </a>
            </div>

            {/* Info contacto */}
            <div className="text-center pt-4 border-t border-gray-200 space-y-1">
              <p className="text-xs text-gray-600 flex items-center justify-center gap-1.5">
                <PhoneIcon className="w-3.5 h-3.5" /> {siteConfig.contact.phone}
              </p>
              <p className="text-xs text-gray-600 flex items-center justify-center gap-1.5">
                <MailIcon className="w-3.5 h-3.5" /> {siteConfig.contact.email}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
