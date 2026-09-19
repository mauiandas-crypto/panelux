'use client'

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react'
import { Order } from '@/lib/orders-types'

interface OrderContextType {
  orders: Order[]
  addOrder: (order: Order) => Promise<void>
  getOrder: (orderId: string) => Order | undefined
}

const OrderContext = createContext<OrderContextType | undefined>(undefined)

const STORAGE_KEY = 'panelux-mis-pedidos'

export function OrderProvider({ children }: { children: React.ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([])

  // No hay login de clientes: guardamos los pedidos que este navegador hizo
  // en localStorage (persiste entre recargas) y, al entrar, re-consultamos
  // cada uno al servidor para traer el estado real (ej. si el webhook de
  // Mercado Pago ya lo marcó como pagado).
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (!saved) return

    try {
      const savedOrders: Order[] = JSON.parse(saved)
      setOrders(savedOrders)

      savedOrders.forEach(async (order) => {
        try {
          const res = await fetch(
            `/api/orders/${order.id}?email=${encodeURIComponent(order.cliente.email)}`
          )
          if (res.ok) {
            const fresh: Order = await res.json()
            setOrders((prev) => {
              const updated = prev.map((o) => (o.id === fresh.id ? fresh : o))
              localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
              return updated
            })
          }
        } catch {
          // Si falla la consulta, se queda con la versión guardada localmente
        }
      })
    } catch (e) {
      console.error('Error al cargar pedidos guardados:', e)
    }
  }, [])

  const addOrder = useCallback(async (order: Order) => {
    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(order),
      })

      if (response.ok) {
        const newOrder = await response.json()
        setOrders((prev) => {
          const updated = [...prev, newOrder]
          localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
          return updated
        })
      }
    } catch (error) {
      console.error('Error adding order:', error)
      throw error
    }
  }, [])

  const getOrder = useCallback((orderId: string) => {
    return orders.find(order => order.id === orderId)
  }, [orders])

  return (
    <OrderContext.Provider value={{ orders, addOrder, getOrder }}>
      {children}
    </OrderContext.Provider>
  )
}

export function useOrder() {
  const context = useContext(OrderContext)
  if (!context) {
    throw new Error('useOrder must be used within OrderProvider')
  }
  return context
}
