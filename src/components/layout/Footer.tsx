'use client'

import Link from 'next/link'
import { useState } from 'react'

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
                {subscribed ? '✓ Suscrito' : 'Suscribirse'}
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
                <span className="text-blue-400 mt-1">📍</span>
                <div>
                  <p className="font-semibold">Uruguay</p>
                  <p className="text-gray-400 text-xs">Distribuidor oficial Panelux</p>
                </div>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-blue-400">🕐</span>
                <div className="text-xs">
                  <p>Lun-Vie: 09:00-18:00</p>
                  <p className="text-gray-400">Sáb: 10:00-14:00</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Contáctanos */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Contáctanos</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <span className="text-green-400">💬</span>
                <a href="https://wa.me/598095244593" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition">
                  WhatsApp
                </a>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-blue-400">☎️</span>
                <a href="tel:+598095244593" className="hover:text-blue-400 transition">095 244 593</a>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-gray-400">✉️</span>
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
                <a href="#" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-700 hover:bg-blue-600 rounded-full flex items-center justify-center transition text-xl">
                  📘
                </a>
                <a href="#" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-700 hover:bg-blue-600 rounded-full flex items-center justify-center transition text-xl">
                  📷
                </a>
                <a href="#" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-700 hover:bg-blue-600 rounded-full flex items-center justify-center transition text-xl">
                  🎥
                </a>
                <a href="#" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-700 hover:bg-blue-600 rounded-full flex items-center justify-center transition text-xl">
                  𝕏
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
                <span className="text-xs bg-gray-700 px-3 py-1 rounded">Hasta 6 cuotas</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-700 pt-6">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-400">
            <p>© 2026 Panelux SAS - Distribuidor oficial en Uruguay | RUT 21999001001</p>
            <div className="flex gap-4 flex-wrap justify-center">
              <Link href="/privacidad" className="hover:text-gray-200 transition">Privacidad</Link>
              <Link href="/terminos" className="hover:text-gray-200 transition">Términos</Link>
              <Link href="/faq" className="hover:text-gray-200 transition">FAQ</Link>
              <Link href="/testimonios" className="hover:text-gray-200 transition">Testimonios</Link>
              <Link href="/promociones" className="hover:text-gray-200 transition">Ofertas</Link>
              <a href="https://wa.me/598095244593" target="_blank" rel="noopener noreferrer" className="hover:text-gray-200 transition">Contacto</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
