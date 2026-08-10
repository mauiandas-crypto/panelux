'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

export interface CartItem {
  codigo: string
  nombre: string
  pvp: number
  cantidad: number
  imagen: string
}

interface CartContextType {
  items: CartItem[]
  agregarAlCarrito: (producto: Omit<CartItem, 'cantidad'>, cantidad: number) => void
  removerDelCarrito: (codigo: string) => void
  actualizarCantidad: (codigo: string, cantidad: number) => void
  limpiarCarrito: () => void
  totalItems: number
  total: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [mounted, setMounted] = useState(false)

  // Cargar carrito del localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('panelux-carrito')
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart))
      } catch (e) {
        console.error('Error al cargar carrito:', e)
      }
    }
    setMounted(true)
  }, [])

  // Guardar carrito en localStorage
  useEffect(() => {
    if (mounted) {
      localStorage.setItem('panelux-carrito', JSON.stringify(items))
    }
  }, [items, mounted])

  const agregarAlCarrito = (producto: Omit<CartItem, 'cantidad'>, cantidad: number) => {
    setItems((prevItems) => {
      const existe = prevItems.find((item) => item.codigo === producto.codigo)
      if (existe) {
        return prevItems.map((item) =>
          item.codigo === producto.codigo
            ? { ...item, cantidad: item.cantidad + cantidad }
            : item
        )
      }
      return [...prevItems, { ...producto, cantidad }]
    })
  }

  const removerDelCarrito = (codigo: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.codigo !== codigo))
  }

  const actualizarCantidad = (codigo: string, cantidad: number) => {
    if (cantidad <= 0) {
      removerDelCarrito(codigo)
      return
    }
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.codigo === codigo ? { ...item, cantidad } : item
      )
    )
  }

  const limpiarCarrito = () => {
    setItems([])
  }

  const totalItems = items.reduce((acc, item) => acc + item.cantidad, 0)
  const total = items.reduce((acc, item) => acc + item.pvp * item.cantidad, 0)

  return (
    <CartContext.Provider
      value={{
        items,
        agregarAlCarrito,
        removerDelCarrito,
        actualizarCantidad,
        limpiarCarrito,
        totalItems,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart debe ser usado dentro de CartProvider')
  }
  return context
}
