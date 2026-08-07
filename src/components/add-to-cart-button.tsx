'use client'

import { useCart } from '@/context/cart-context'
import { Product } from '@/lib/products'
import { useState } from 'react'

interface Props {
  product: Product
}

export default function AddToCartButton({ product }: Props) {
  const { addItem } = useCart()
  const [added, setAdded] = useState(false)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    })
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <button
      onClick={handleAddToCart}
      className={`px-4 py-2 rounded-lg font-bold text-sm transition-all ${
        added
          ? 'bg-green-500 text-white'
          : 'bg-cyan-500 text-white hover:bg-cyan-600'
      }`}
    >
      {added ? '✓ Agregado' : 'Agregar'}
    </button>
  )
}
