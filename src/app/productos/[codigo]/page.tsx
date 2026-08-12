'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { productos } from '@/data/productos'
import { useCart } from '@/context/CartContext'
import ImageCarousel from '@/components/ImageCarousel'
import { ProductSchema, BreadcrumbSchema } from '@/components/SchemaOrg'

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
      <ProductSchema
        codigo={producto.codigo}
        nombre={producto.nombre}
        descripcion={`${producto.nombre} - Marca ${producto.linea}`}
        imagen={producto.imagen}
        pvp={producto.pvp}
        categoria={producto.categoria}
      />
      <BreadcrumbSchema items={[
        { name: "Inicio", url: "https://panelux.com.uy" },
        { name: producto.categoria, url: `https://panelux.com.uy/?categoria=${producto.categoria}` },
        { name: producto.nombre, url: `https://panelux.com.uy/productos/${producto.codigo}` },
      ]} />
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
          {/* Carousel de Imágenes */}
          <div>
            <ImageCarousel imagenBase={producto.imagen} nombre={producto.nombre} />
          </div>

          {/* Detalles */}
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{producto.nombre}</h1>

            <div className="mb-4 space-y-1">
              <p className="text-sm text-gray-600">
                <span className="font-semibold">Línea:</span> {producto.linea}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-semibold">Categoría:</span> {producto.categoria}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-semibold">Código:</span> {producto.codigo}
              </p>
            </div>

            {/* Precio */}
            <div className="mb-6 p-4 bg-blue-50 rounded-lg border-2 border-blue-200">
              <p className="text-xs text-gray-600 mb-1">Precio por unidad</p>
              <p className="text-3xl font-bold text-blue-600">${producto.pvp}</p>
            </div>

            {/* Cantidad */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Cantidad a agregar
              </label>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCantidad(Math.max(1, cantidad - 1))}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-900 font-bold py-1 px-3 rounded transition text-sm"
                >
                  −
                </button>
                <input
                  type="number"
                  value={cantidad}
                  onChange={(e) => setCantidad(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-16 text-center text-lg font-bold border-2 border-gray-300 rounded px-2 py-1 text-black"
                  min="1"
                />
                <button
                  onClick={() => setCantidad(cantidad + 1)}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-900 font-bold py-1 px-3 rounded transition text-sm"
                >
                  +
                </button>
              </div>
            </div>

            {/* Subtotal */}
            <div className="mb-6 p-3 bg-gray-50 rounded-lg border border-gray-200">
              <p className="text-xs text-gray-600 mb-1">Subtotal</p>
              <p className="text-2xl font-bold text-gray-900">
                ${(producto.pvp * cantidad).toLocaleString('es-UY')}
              </p>
            </div>

            {/* Botón Agregar al Carrito */}
            <button
              onClick={handleAgregarAlCarrito}
              className={`w-full py-3 px-4 rounded-lg font-bold text-base transition mb-3 ${
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
              className="block text-center py-2 px-4 border-2 border-gray-300 rounded-lg text-gray-900 font-bold text-sm hover:bg-gray-50 transition"
            >
              Volver al catálogo
            </Link>

            {/* Descripción */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h2 className="text-lg font-bold text-gray-900 mb-3">Descripción del producto</h2>
              <p className="text-sm text-gray-700 whitespace-pre-line leading-relaxed">
                {descripcion}
              </p>
            </div>

            {/* Info adicional */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h3 className="text-base font-bold text-gray-900 mb-3">¿Por qué comprar con Todogastro?</h3>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <span className="text-lg">✅</span>
                  <span className="text-sm text-gray-700">Distribuidor oficial de Panelux en Uruguay</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-lg">✅</span>
                  <span className="text-sm text-gray-700">Garantía oficial del fabricante</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-lg">✅</span>
                  <span className="text-sm text-gray-700">Envíos seguros a todo el país</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-lg">✅</span>
                  <span className="text-sm text-gray-700">Hasta 6 cuotas sin interés</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
