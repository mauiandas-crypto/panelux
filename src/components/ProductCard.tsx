'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useCart } from '@/context/CartContext'

interface ProductCardProps {
  codigo: string
  nombre: string
  imagen: string
  linea: string
  pvp: number
}

export default function ProductCard({ codigo, nombre, imagen, linea, pvp }: ProductCardProps) {
  const [cantidad, setCantidad] = useState(1)
  const [agregado, setAgregado] = useState(false)
  const { agregarAlCarrito } = useCart()

  const handleAgregar = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    agregarAlCarrito(
      {
        codigo,
        nombre,
        pvp,
        imagen,
      },
      cantidad
    )

    setAgregado(true)
    setCantidad(1)
    setTimeout(() => setAgregado(false), 2000)
  }

  return (
    <Link href={`/productos/${codigo}`}>
      <div className="bg-white rounded-lg shadow-lg hover:shadow-2xl transition overflow-hidden group h-full cursor-pointer">
        {/* Imagen */}
        <div className="relative h-56 bg-white overflow-hidden">
          <img
            src={imagen}
            alt={nombre}
            className="w-full h-full object-cover group-hover:scale-125 transition duration-500"
            loading="lazy"
          />
        </div>

        {/* Contenido */}
        <div className="p-4">
          <h3 className="text-sm font-bold text-gray-900 mb-1 line-clamp-2 group-hover:text-blue-600 transition">
            {nombre}
          </h3>
          <p className="text-xs text-gray-600 mb-2">{linea}</p>
          <p className="text-xs text-gray-500 mb-3">Código: {codigo}</p>

          {/* Precio y acciones */}
          <div className="border-t pt-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xl font-bold text-blue-600">${pvp}</span>
            </div>

            {/* Selector de cantidad y botón */}
            <div className="flex items-center gap-2" onClick={(e) => e.preventDefault()}>
              {/* Cantidad */}
              <div className="flex items-center bg-gray-100 rounded">
                <button
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    setCantidad(Math.max(1, cantidad - 1))
                  }}
                  className="px-2 py-1 hover:bg-gray-200 transition font-bold text-gray-700"
                >
                  −
                </button>
                <span className="px-2 py-1 font-bold text-gray-900 min-w-8 text-center">
                  {cantidad}
                </span>
                <button
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    setCantidad(cantidad + 1)
                  }}
                  className="px-2 py-1 hover:bg-gray-200 transition font-bold text-gray-700"
                >
                  +
                </button>
              </div>

              {/* Botón Agregar */}
              <button
                onClick={handleAgregar}
                className={`flex-1 py-2 px-3 rounded font-bold text-sm transition text-white ${
                  agregado
                    ? 'bg-green-600'
                    : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                {agregado ? '✓ Agregado' : '🛒 Agregar'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
