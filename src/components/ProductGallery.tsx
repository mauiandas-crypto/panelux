'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'

interface ProductGalleryProps {
  imagenBase: string
  nombre: string
  colores?: Array<{ nombre: string; imagen: string }>
}

export default function ProductGallery({ imagenBase, nombre, colores }: ProductGalleryProps) {
  const [fotoIndex, setFotoIndex] = useState(0)
  const [zoomLevel, setZoomLevel] = useState(1)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isZoomed, setIsZoomed] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const imgRef = useRef<HTMLDivElement>(null)

  const fotos = [
    imagenBase,
    imagenBase.replace(/\.(jpg|png)$/i, '_B.$1'),
    imagenBase.replace(/\.(jpg|png)$/i, '_CX.$1'),
  ]

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imgRef.current || !isZoomed) return

    const rect = imgRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100

    setMousePos({ x, y })
  }

  const handleZoom = (delta: number) => {
    setZoomLevel((prev) => Math.max(1, Math.min(3, prev + delta)))
  }

  return (
    <div className="space-y-4">
      {/* Imagen Principal con Zoom */}
      <div
        ref={imgRef}
        className="relative bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl overflow-hidden group cursor-zoom-in h-96 md:h-[500px]"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsZoomed(true)}
        onMouseLeave={() => {
          setIsZoomed(false)
          setZoomLevel(1)
        }}
      >
        <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
          <Image
            src={fotos[fotoIndex]}
            alt={`${nombre} - Vista ${fotoIndex + 1}`}
            fill
            className="w-full h-full object-contain transition-transform duration-200"
            style={{
              transform: isZoomed ? `scale(${zoomLevel})` : 'scale(1)',
              transformOrigin: `${mousePos.x}% ${mousePos.y}%`,
            }}
            quality={90}
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>

        {isZoomed && (
          <div className="absolute top-4 right-4 bg-black/60 text-white px-3 py-2 rounded-lg text-sm font-semibold">
            🔍 {Math.round(zoomLevel * 100)}%
          </div>
        )}

        {isZoomed && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 bg-black/60 rounded-lg p-2">
            <button
              onClick={() => handleZoom(-0.5)}
              className="px-3 py-1 bg-white text-black rounded hover:bg-gray-200 transition font-bold"
            >
              −
            </button>
            <button
              onClick={() => handleZoom(0.5)}
              className="px-3 py-1 bg-white text-black rounded hover:bg-gray-200 transition font-bold"
            >
              +
            </button>
          </div>
        )}

        <button
          onClick={() => setShowModal(true)}
          className="absolute top-4 left-4 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition opacity-0 group-hover:opacity-100"
          title="Ver en pantalla completa"
        >
          ⛶ Ampliar
        </button>
      </div>

      {/* Miniaturas */}
      <div className="flex gap-2">
        {fotos.map((foto, index) => (
          <button
            key={index}
            onClick={() => setFotoIndex(index)}
            className={`relative h-20 w-20 rounded-lg overflow-hidden border-2 transition ${
              fotoIndex === index
                ? 'border-blue-600 shadow-lg ring-2 ring-blue-300'
                : 'border-gray-200 hover:border-blue-400'
            }`}
            title={`Vista ${index + 1}`}
          >
            <Image
              src={foto}
              alt={`Miniatura ${index + 1}`}
              fill
              className="w-full h-full object-contain bg-gray-50"
              quality={60}
              sizes="80px"
            />
          </button>
        ))}
      </div>

      {/* Modal Pantalla Completa */}
      {showModal && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="relative w-full h-full flex items-center justify-center">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-white bg-black/50 hover:bg-black/70 p-3 rounded-full z-10 text-2xl"
            >
              ✕
            </button>

            <Image
              src={fotos[fotoIndex]}
              alt={`${nombre} - Vista ampliada`}
              fill
              className="w-full h-full object-contain"
              quality={95}
              sizes="100vw"
            />

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-4">
              <button
                onClick={() => setFotoIndex((prev) => (prev - 1 + fotos.length) % fotos.length)}
                className="bg-white/90 hover:bg-white text-black px-4 py-2 rounded-lg font-bold transition"
              >
                ← Anterior
              </button>
              <button
                onClick={() => setFotoIndex((prev) => (prev + 1) % fotos.length)}
                className="bg-white/90 hover:bg-white text-black px-4 py-2 rounded-lg font-bold transition"
              >
                Siguiente →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
