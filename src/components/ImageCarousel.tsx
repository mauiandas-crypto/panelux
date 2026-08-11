'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

interface ImageCarouselProps {
  imagenBase: string
  nombre: string
}

export default function ImageCarousel({ imagenBase, nombre }: ImageCarouselProps) {
  const [fotoIndex, setFotoIndex] = useState(0)
  const [fotos, setFotos] = useState<string[]>([imagenBase])
  const [loadedFotos, setLoadedFotos] = useState<boolean[]>([true])

  useEffect(() => {
    const imagenSinExtension = imagenBase.substring(0, imagenBase.lastIndexOf('.'))
    const extension = imagenBase.substring(imagenBase.lastIndexOf('.'))

    // Las 3 variantes posibles
    const variantes = [
      imagenBase,
      `${imagenSinExtension}_B${extension}`,
      `${imagenSinExtension}_CX${extension}`,
    ]

    setFotos(variantes)
    setLoadedFotos(new Array(variantes.length).fill(false))
    setLoadedFotos((prev) => {
      const newLoaded = [...prev]
      newLoaded[0] = true // La primera siempre existe
      return newLoaded
    })
  }, [imagenBase])

  const handleImageLoad = (index: number) => {
    setLoadedFotos((prev) => {
      const newLoaded = [...prev]
      newLoaded[index] = true
      return newLoaded
    })
  }

  const fotosActuales = fotos.filter((_, i) => loadedFotos[i])

  return (
    <div>
      {/* Imagen Principal */}
      <div className="bg-white rounded-lg overflow-hidden mb-4 flex items-center justify-center min-h-96">
        <img
          src={fotos[fotoIndex]}
          alt={`${nombre} - Vista ${fotoIndex + 1}`}
          className="w-full h-full object-contain max-h-96 hover:scale-110 transition duration-300"
          onError={() => {
            if (fotoIndex !== 0) {
              setFotoIndex(0)
            }
          }}
        />
      </div>

      {/* Controles - Solo mostrar si hay más de 1 foto */}
      {fotos.length > 1 && (
        <div className="flex gap-2">
          {fotos.map((foto, index) => (
            <button
              key={index}
              onClick={() => setFotoIndex(index)}
              className={`flex-1 h-20 rounded-lg overflow-hidden border-2 transition ${
                fotoIndex === index
                  ? 'border-blue-600 shadow-lg'
                  : 'border-gray-200 hover:border-gray-400'
              }`}
              title={`Vista ${index + 1}`}
            >
              <img
                src={foto}
                alt={`Miniatura ${index + 1}`}
                className="w-full h-full object-contain bg-gray-50"
                onLoad={() => handleImageLoad(index)}
                onError={() => {
                  // Si no carga, simplemente no lo mostraremos
                }}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
