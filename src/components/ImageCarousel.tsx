'use client'

import { useState, useEffect } from 'react'

interface ImageCarouselProps {
  imagenBase: string
  nombre: string
}

export default function ImageCarousel({ imagenBase, nombre }: ImageCarouselProps) {
  const [fotoIndex, setFotoIndex] = useState(0)
  const [fotos, setFotos] = useState<string[]>([imagenBase])
  const [fotosValidas, setFotosValidas] = useState<number[]>([0])

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
    setFotoIndex(0)
    // Solo la primera imagen se considera válida por defecto
    setFotosValidas([0])
  }, [imagenBase])

  const handleImageLoad = (index: number) => {
    // Marcar esta imagen como válida
    setFotosValidas((prev) => {
      if (!prev.includes(index)) {
        return [...prev, index].sort((a, b) => a - b)
      }
      return prev
    })
  }

  const handleImageError = (index: number) => {
    // Si la imagen actual no carga, cambiar a la primera válida
    if (fotoIndex === index && fotosValidas.length > 0) {
      setFotoIndex(fotosValidas[0])
    }
  }

  return (
    <div>
      {/* Imagen Principal */}
      <div className="bg-white rounded-lg overflow-hidden mb-4 flex items-center justify-center min-h-96">
        <img
          src={fotos[fotoIndex]}
          alt={`${nombre} - Vista ${fotoIndex + 1}`}
          className="w-full h-full object-contain max-h-96 hover:scale-110 transition duration-300"
          onError={() => handleImageError(fotoIndex)}
        />
      </div>

      {/* Controles - Solo mostrar si hay más de 1 foto válida */}
      {fotosValidas.length > 1 && (
        <div className="flex gap-2">
          {fotosValidas.map((index) => (
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
                src={fotos[index]}
                alt={`Miniatura ${index + 1}`}
                className="w-full h-full object-contain bg-gray-50"
                onLoad={() => handleImageLoad(index)}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
