'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useAdmin } from '@/context/AdminContext'

export default function BannerCarousel() {
  const { data } = useAdmin()
  const [current, setCurrent] = useState(0)

  // Filtrar solo los banners activos y ordenarlos
  const activeBanners = data.banners
    .filter(b => b.active)
    .sort((a, b) => a.order - b.order)

  useEffect(() => {
    if (activeBanners.length === 0) return

    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % activeBanners.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [activeBanners.length])

  if (activeBanners.length === 0) {
    return null
  }

  const banner = activeBanners[current]

  return (
    <div className="relative w-full h-96 bg-gray-900 overflow-hidden">
      {/* Imagen del banner */}
      <img
        src={banner.imageUrl}
        alt={banner.title}
        className="w-full h-full object-cover"
      />

      {/* Overlay con contenido */}
      <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white text-center">
        <h2 className="text-5xl font-bold mb-4">{banner.title}</h2>
        <p className="text-2xl mb-8">{banner.subtitle}</p>
        {banner.link && (
          <Link
            href={banner.link}
            className="px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-lg font-bold text-lg transition"
          >
            Explorar
          </Link>
        )}
      </div>

      {/* Controles de navegación */}
      {activeBanners.length > 1 && (
        <>
          <button
            onClick={() => setCurrent(c => (c - 1 + activeBanners.length) % activeBanners.length)}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-black font-bold py-2 px-3 rounded-lg transition"
          >
            ←
          </button>
          <button
            onClick={() => setCurrent(c => (c + 1) % activeBanners.length)}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-black font-bold py-2 px-3 rounded-lg transition"
          >
            →
          </button>

          {/* Indicadores */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {activeBanners.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                className={`w-3 h-3 rounded-full transition ${
                  index === current ? 'bg-white' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
