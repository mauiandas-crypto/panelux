'use client'

import { useState, useEffect } from 'react'

interface ImageCarouselProps {
  imagenBase: string
  nombre: string
}

export default function ImageCarousel({ imagenBase, nombre }: ImageCarouselProps) {
  const [fotoIndex, setFotoIndex] = useState(0)
  const [fotos, setFotos] = useState<string[]>([imagenBase])
  const [fotosExisten, setFotosExisten] = useState<boolean[]>([true])

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
    // Asumir que todas las imágenes existen por defecto
    setFotosExisten([true, true, true])
  }, [imagenBase])

  const handleImageLoad = (index: number) => {
    // Marcar esta imagen como válida cuando carga
    setFotosExisten((prev) => {
      const newExisten = [...prev]
      newExisten[index] = true
      return newExisten
    })
  }

  const handleImageError = (index: number) => {
    // Marcar como no válida si falla
    setFotosExisten((prev) => {
      const newExisten = [...prev]
      newExisten[index] = false
      return newExisten
    })

    // Si la imagen actual no existe, cambiar a la primera
    if (fotoIndex === index) {
      setFotoIndex(0)
    }
  }

  // Contar cuántas imágenes existen
  const fotosValidasCount = fotosExisten.filter((existe) => existe).length

  return (
    <div>
      {/* Imagen Principal */}
      <div className="bg-white rounded-lg overflow-hidden mb-4 flex items-center justify-center min-h-96">
        <img
          src={fotos[fotoIndex]}
          alt={`${nombre} - Vista ${fotoIndex + 1}`}
          className="w-full h-full object-contain max-h-96 hover:scale-110 transition duration-300"
          onLoad={() => handleImageLoad(fotoIndex)}
          onError={() => handleImageError(fotoIndex)}
        />
      </div>

      {/* Controles - Mostrar todos los que cargan */}
      {fotosValidasCount > 1 && (
        <div className="flex gap-2">
          {fotos.map((foto, index) => (
            fotosExisten[index] && (
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
                  onError={() => handleImageError(index)}
                />
              </button>
            )
          ))}
        </div>
      )}
    </div>
  )
}
