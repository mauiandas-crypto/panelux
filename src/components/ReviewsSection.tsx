'use client'

import { useState } from 'react'

interface Review {
  id: string
  autor: string
  rating: number
  titulo: string
  comentario: string
  fecha: string
  verificado: boolean
  utiles: number
}

interface ReviewsSectionProps {
  productoCodigo: string
  productNombre: string
}

export default function ReviewsSection({ productoCodigo, productNombre }: ReviewsSectionProps) {
  const [reviews] = useState<Review[]>([
    {
      id: '1',
      autor: 'María García',
      rating: 5,
      titulo: '¡Excelente calidad!',
      comentario: 'Compré esta olla hace 3 meses y es increíble. Calienta muy bien, es resistente y se ve muy profesional.',
      fecha: '2024-08-01',
      verificado: true,
      utiles: 24,
    },
  ])

  const avgRating = (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)

  return (
    <section className="py-12 border-t-2 border-gray-200">
      <div className="max-w-4xl">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Opiniones de Clientes</h2>

        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-8 mb-8">
          <div className="text-center">
            <div className="text-5xl font-bold text-blue-600 mb-2">{avgRating}</div>
            <div className="flex justify-center gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-2xl">
                  {i < Math.round(parseFloat(avgRating)) ? '⭐' : '☆'}
                </span>
              ))}
            </div>
            <p className="text-gray-600 font-semibold">{reviews.length} opiniones verificadas</p>
          </div>
        </div>

        <div className="space-y-6">
          {reviews.map((review) => (
            <div key={review.id} className="border border-gray-200 rounded-lg p-6">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-semibold text-gray-900">{review.autor}</span>
                    {review.verificado && (
                      <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded">
                        ✓ Compra verificada
                      </span>
                    )}
                  </div>
                  <div className="flex gap-2 items-center">
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className="text-lg">
                          {i < review.rating ? '⭐' : '☆'}
                        </span>
                      ))}
                    </div>
                    <span className="text-xs text-gray-500">{review.fecha}</span>
                  </div>
                </div>
              </div>

              <h4 className="font-bold text-gray-900 mb-2">{review.titulo}</h4>
              <p className="text-gray-700 mb-4">{review.comentario}</p>

              <div className="flex items-center gap-4 text-sm text-gray-600">
                <button className="hover:text-blue-600 transition font-semibold">
                  👍 Útil ({review.utiles})
                </button>
                <button className="hover:text-blue-600 transition">
                  👎 No útil
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold mb-2">¿Ya compraste este producto?</h3>
          <p className="mb-6 text-blue-100">Comparte tu experiencia y ayuda a otros clientes</p>
          <button className="bg-white text-blue-600 font-bold px-8 py-3 rounded-lg hover:bg-blue-50 transition">
            ✍️ Escribir opinión
          </button>
        </div>
      </div>
    </section>
  )
}
