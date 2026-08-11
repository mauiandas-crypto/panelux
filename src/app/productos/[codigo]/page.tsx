'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { productos } from '@/data/productos'
import { useCart } from '@/context/CartContext'

export default function ProductoDetail() {
  const params = useParams()
  const router = useRouter()
  const codigo = params.codigo as string
  const [cantidad, setCantidad] = useState(1)
  const [agregado, setAgregado] = useState(false)
  const { agregarAlCarrito } = useCart()

  const producto = productos.find((p) => p.codigo === codigo)

  if (!producto) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Producto no encontrado</h1>
          <Link href="/" className="text-blue-600 hover:underline">
            Volver al catálogo
          </Link>
        </div>
      </div>
    )
  }

  const handleAgregarAlCarrito = () => {
    agregarAlCarrito(
      {
        codigo: producto.codigo,
        nombre: producto.nombre,
        pvp: producto.pvp,
        imagen: producto.imagen,
      },
      cantidad
    )
    setAgregado(true)
    setTimeout(() => setAgregado(false), 2000)
  }

  const descripcion = `${producto.nombre}

Marca: ${producto.linea}
Código: ${producto.codigo}
Precio: $${producto.pvp}

Este es un producto de calidad premium de la marca brasileña Panelux.
Distribuido por Todogastro, distribuidor oficial en Uruguay.
Incluye garantía oficial del fabricante y envíos seguros a todo el país.`

  return (
    <div className="min-h-screen bg-white pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Breadcrumb */}
        <div className="mb-8 text-sm text-gray-600">
          <Link href="/" className="hover:text-blue-600">Inicio</Link>
          <span className="mx-2">/</span>
          <Link href={`/?categoria=${producto.categoria}`} className="hover:text-blue-600">
            {producto.categoria}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900 font-semibold">{producto.nombre}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Imagen */}
          <div className="flex items-center justify-center bg-white rounded-lg overflow-hidden h-96 md:h-full min-h-96">
            <img
              src={producto.imagen}
              alt={producto.nombre}
              className="w-full h-full object-contain hover:scale-110 transition duration-300"
            />
          </div>

          {/* Detalles */}
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-3">{producto.nombre}</h1>

            <div className="mb-6 space-y-2">
              <p className="text-lg text-gray-600">
                <span className="font-semibold">Línea:</span> {producto.linea}
              </p>
              <p className="text-lg text-gray-600">
                <span className="font-semibold">Categoría:</span> {producto.categoria}
              </p>
              <p className="text-lg text-gray-600">
                <span className="font-semibold">Código:</span> {producto.codigo}
              </p>
            </div>

            {/* Precio */}
            <div className="mb-8 p-6 bg-blue-50 rounded-lg border-2 border-blue-200">
              <p className="text-gray-600 mb-2">Precio por unidad</p>
              <p className="text-5xl font-bold text-blue-600">${producto.pvp}</p>
            </div>

            {/* Cantidad */}
            <div className="mb-8">
              <label className="block text-lg font-semibold text-gray-900 mb-3">
                Cantidad a agregar
              </label>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setCantidad(Math.max(1, cantidad - 1))}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-900 font-bold py-2 px-4 rounded transition"
                >
                  −
                </button>
                <input
                  type="number"
                  value={cantidad}
                  onChange={(e) => setCantidad(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-20 text-center text-2xl font-bold border-2 border-gray-300 rounded px-3 py-2"
                  min="1"
                />
                <button
                  onClick={() => setCantidad(cantidad + 1)}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-900 font-bold py-2 px-4 rounded transition"
                >
                  +
                </button>
              </div>
            </div>

            {/* Subtotal */}
            <div className="mb-8 p-4 bg-gray-50 rounded-lg">
              <p className="text-gray-600 mb-2">Subtotal</p>
              <p className="text-3xl font-bold text-gray-900">
                ${(producto.pvp * cantidad).toLocaleString('es-UY')}
              </p>
            </div>

            {/* Botón Agregar al Carrito */}
            <button
              onClick={handleAgregarAlCarrito}
              className={`w-full py-4 px-6 rounded-lg font-bold text-lg transition mb-4 ${
                agregado
                  ? 'bg-green-600 text-white'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              {agregado ? '✓ Agregado al carrito!' : '🛒 Agregar al carrito'}
            </button>

            {/* Volver */}
            <Link
              href="/"
              className="block text-center py-3 px-6 border-2 border-gray-300 rounded-lg text-gray-900 font-bold hover:bg-gray-50 transition"
            >
              Volver al catálogo
            </Link>

            {/* Descripción */}
            <div className="mt-12 pt-8 border-t-2 border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Descripción del producto</h2>
              <p className="text-gray-700 whitespace-pre-line leading-relaxed">
                {descripcion}
              </p>
            </div>

            {/* Info adicional */}
            <div className="mt-8 pt-8 border-t-2 border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-4">¿Por qué comprar con Todogastro?</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <span className="text-2xl">✅</span>
                  <span className="text-gray-700">Distribuidor oficial de Panelux en Uruguay</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-2xl">✅</span>
                  <span className="text-gray-700">Garantía oficial del fabricante</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-2xl">✅</span>
                  <span className="text-gray-700">Envíos seguros a todo el país</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-2xl">✅</span>
                  <span className="text-gray-700">Hasta 6 cuotas sin interés</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
