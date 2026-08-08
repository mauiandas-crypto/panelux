'use client'

import { useCart } from '@/context/cart-context'
import { Product } from '@/lib/products'
import { useState } from 'react'

interface Props {
  product: Product
}

export default function AddToCartButton({ product }: Props) {
  const { addItem } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()

    // Agregar el producto con la cantidad seleccionada
    for (let i = 0; i < quantity; i++) {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
      })
    }

    setAdded(true)
    setQuantity(1) // Resetear cantidad después de agregar
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div className="flex items-center gap-2">
      {/* Selector de cantidad */}
      <div className="flex items-center border border-gray-300 rounded-lg bg-white">
        <button
          onClick={() => setQuantity(Math.max(1, quantity - 1))}
          disabled={quantity <= 1}
          className="px-3 py-2 text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed font-bold"
        >
          −
        </button>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
          min="1"
          max={product.stock}
          className="w-12 text-center border-0 focus:outline-none focus:ring-0 font-bold text-gray-900"
        />
        <button
          onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
          disabled={quantity >= product.stock}
          className="px-3 py-2 text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed font-bold"
        >
          +
        </button>
      </div>

      {/* Botón Agregar */}
      <button
        onClick={handleAddToCart}
        disabled={quantity > product.stock}
        className={`px-6 py-2 rounded-lg font-bold text-sm transition-all whitespace-nowrap ${
          added
            ? 'bg-green-500 text-white'
            : quantity > product.stock
            ? 'bg-gray-400 text-white cursor-not-allowed'
            : 'bg-cyan-500 text-white hover:bg-cyan-600'
        }`}
      >
        {added ? '✓ Agregado' : 'Agregar'}
      </button>
    </div>
  )
}
