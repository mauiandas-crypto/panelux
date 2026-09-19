'use client'

import Link from 'next/link'
import { useState } from 'react'
import { CheckIcon, PinIcon, ClockIcon, ChatIcon, PhoneIcon, MailIcon } from '@/components/icons/Icons'

export default function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setEmail('')
      setTimeout(() => setSubscribed(false), 3000)
    }
  }

  return (
    <footer className="bg-gray-900 text-gray-100 pt-12 pb-6">
      {/* Newsletter */}
      <div className="bg-gray-800 py-8 mb-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-md mx-auto text-center">
            <h2 className="text-2xl font-bold text-white mb-2">Recibí todas las noticias</h2>
            <p className="text-sm text-gray-300 mb-4">
              Entérate antes que nadie de las ofertas, los mejores tips y los artículos más relevantes.
            </p>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input
                type="email"
                placeholder="Tu correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 py-3 bg-gray-700 text-white rounded-lg text-sm placeholder-gray-400 outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <button
                type="submit"
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition text-sm"
              >
                {subscribed ? (
                  <span className="inline-flex items-center gap-1.5">
                    <CheckIcon className="w-4 h-4" /> Suscrito
                  </span>
                ) : 'Suscribirse'}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Tips Gastronómicos */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Tips Gastronómicos</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/blog" className="hover:text-blue-400 transition">Blog</Link></li>
              <li><Link href="/guia-compra" className="hover:text-blue-400 transition">Guía de Compra</Link></li>
              <li><Link href="/testimonios" className="hover:text-blue-400 transition">Testimonios</Link></li>
            </ul>
          </div>

          {/* Planifica tu Compra */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Planifica tu Compra</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="hover:text-blue-400 transition">Todos los productos</Link></li>
              <li><Link href="/buscar" className="hover:text-blue-400 transition">Buscar</Link></li>
              <li><Link href="/promociones" className="hover:text-blue-400 transition">Promociones</Link></li>
            </ul>
          </div>

          {/* Servicios */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Servicios</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/faq" className="hover:text-blue-400 transition">Preguntas Frecuentes</Link></li>
              <li><Link href="/guia-compra" className="hover:text-blue-400 transition">Guía de Capacidades</Link></li>
              <li><Link href="/testimonios" className="hover:text-blue-400 transition">Opiniones</Link></li>
              <li><Link href="/blog" className="hover:text-blue-400 transition">Blog de Consejos</Link></li>
            </ul>
          </div>

          {/* Visitanos */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Visitanos</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <PinIcon className="w-4 h-4 text-blue-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold">Uruguay</p>
                  <p className="text-gray-400 text-xs">Distribuidor oficial Panelux</p>
                </div>
              </li>
              <li className="flex items-center gap-2">
                <ClockIcon className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <div className="text-xs">
                  <p>Lun-Vie: 08:30-17:15</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Contáctanos */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Contáctanos</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <ChatIcon className="w-4 h-4 text-green-400 flex-shrink-0" />
                <a href="https://wa.me/59892715555" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition">
                  WhatsApp
                </a>
              </li>
              <li className="flex items-center gap-2">
                <PhoneIcon className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <a href="tel:+59892715555" className="hover:text-blue-400 transition">092 715 555</a>
              </li>
              <li className="flex items-center gap-2">
                <MailIcon className="w-4 h-4 text-gray-400 flex-shrink-0" />
                <a href="mailto:info@panelux.com.uy" className="hover:text-blue-400 transition text-xs">
                  info@panelux.com.uy
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Social Media & Payments */}
      <div className="border-t border-gray-700 pt-8 mb-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Redes Sociales */}
            <div>
              <h4 className="text-sm font-bold text-white mb-3 uppercase tracking-wide">Síguenos en Redes</h4>
              <div className="flex gap-4">
                <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="w-10 h-10 bg-gray-700 hover:bg-blue-600 rounded-full flex items-center justify-center transition">
                  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor"><path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.1 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12z"/></svg>
                </a>
                <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-10 h-10 bg-gray-700 hover:bg-blue-600 rounded-full flex items-center justify-center transition">
                  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2}><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>
                </a>
                <a href="#" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="w-10 h-10 bg-gray-700 hover:bg-blue-600 rounded-full flex items-center justify-center transition">
                  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor"><path d="M23 12s0-3.6-.46-5.2a2.9 2.9 0 0 0-2-2C18.9 4.3 12 4.3 12 4.3s-6.9 0-8.54.5a2.9 2.9 0 0 0-2 2C1 8.4 1 12 1 12s0 3.6.46 5.2a2.9 2.9 0 0 0 2 2c1.64.5 8.54.5 8.54.5s6.9 0 8.54-.5a2.9 2.9 0 0 0 2-2C23 15.6 23 12 23 12zM9.8 15.5V8.5l6.2 3.5z"/></svg>
                </a>
                <a href="#" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)" className="w-10 h-10 bg-gray-700 hover:bg-blue-600 rounded-full flex items-center justify-center transition">
                  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor"><path d="M18.9 2H22l-7.6 8.7L23 22h-6.9l-5.4-6.8L4.4 22H1.3l8.1-9.3L1 2h7.1l4.9 6.2zM17.6 20h1.9L6.5 3.9H4.4z"/></svg>
                </a>
              </div>
            </div>

            {/* Métodos de Pago */}
            <div>
              <h4 className="text-sm font-bold text-white mb-3 uppercase tracking-wide">Compra Segura</h4>
              <div className="flex flex-wrap gap-3 items-center">
                <span className="text-xs bg-gray-700 px-3 py-1 rounded">Mercado Pago</span>
                <span className="text-xs bg-gray-700 px-3 py-1 rounded">Tarjetas</span>
                <span className="text-xs bg-gray-700 px-3 py-1 rounded">Efectivo</span>
                <span className="text-xs bg-gray-700 px-3 py-1 rounded">Hasta 12 cuotas</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-700 pt-6">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-400">
            <p>© 2026 Todogastro SAS - Representante oficial de Panelux en Uruguay | RUT 219825770010</p>
            <div className="flex gap-4 flex-wrap justify-center">
              <Link href="/privacidad" className="hover:text-gray-200 transition">Privacidad</Link>
              <Link href="/terminos" className="hover:text-gray-200 transition">Términos</Link>
              <Link href="/faq" className="hover:text-gray-200 transition">FAQ</Link>
              <Link href="/testimonios" className="hover:text-gray-200 transition">Testimonios</Link>
              <Link href="/promociones" className="hover:text-gray-200 transition">Ofertas</Link>
              <a href="https://wa.me/59892715555" target="_blank" rel="noopener noreferrer" className="hover:text-gray-200 transition">Contacto</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
