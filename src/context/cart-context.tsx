'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

export interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image?: string
}

interface CartContextType {
  items: CartItem[]
  addItem: (item: Omit<CartItem, 'quantity'>) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  total: number
  itemCount: number
  coupon: string | null
  discount: number
  applyCoupon: (code: string) => boolean
  removeCoupon: () => void
  subtotal: number
}

// Cupones válidos (código: descuento%)
const VALID_COUPONS: Record<string, number> = {
  'PANELUX10': 10,
  'DESCUENTO15': 15,
  'ENVIO5': 5,
  'VERANO20': 20,
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [coupon, setCoupon] = useState<string | null>(null)
  const [discount, setDiscount] = useState(0)

  const addItem = (item: Omit<CartItem, 'quantity'>) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.id === item.id)
      if (existingItem) {
        return prevItems.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        )
      }
      return [...prevItems, { ...item, quantity: 1 }]
    })
  }

  const removeItem = (id: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id))
  }

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id)
      return
    }
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    )
  }

  const clearCart = () => {
    setItems([])
  }

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const discountAmount = (subtotal * discount) / 100
  const total = subtotal - discountAmount
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)

  const applyCoupon = (code: string): boolean => {
    const upperCode = code.toUpperCase().trim()
    if (VALID_COUPONS[upperCode]) {
      setCoupon(upperCode)
      setDiscount(VALID_COUPONS[upperCode])
      return true
    }
    return false
  }

  const removeCoupon = () => {
    setCoupon(null)
    setDiscount(0)
  }

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        total,
        itemCount,
        coupon,
        discount,
        applyCoupon,
        removeCoupon,
        subtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within CartProvider')
  }
  return context
}
