'use client'

import React, { createContext, useContext, useState, useCallback } from 'react'
import { Order } from '@/lib/orders-types'

interface OrderContextType {
  orders: Order[]
  addOrder: (order: Order) => Promise<void>
  updateOrderStatus: (orderId: string, status: Order['estado']) => Promise<void>
  getOrder: (orderId: string) => Order | undefined
}

const OrderContext = createContext<OrderContextType | undefined>(undefined)

export function OrderProvider({ children }: { children: React.ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([])

  const addOrder = useCallback(async (order: Order) => {
    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(order),
      })

      if (response.ok) {
        const newOrder = await response.json()
        setOrders(prev => [...prev, newOrder])
      }
    } catch (error) {
      console.error('Error adding order:', error)
      throw error
    }
  }, [])

  const updateOrderStatus = useCallback(async (orderId: string, status: Order['estado']) => {
    try {
      const response = await fetch(`/api/orders/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ estado: status }),
      })

      if (response.ok) {
        setOrders(prev =>
          prev.map(order =>
            order.id === orderId ? { ...order, estado: status } : order
          )
        )
      }
    } catch (error) {
      console.error('Error updating order:', error)
      throw error
    }
  }, [])

  const getOrder = useCallback((orderId: string) => {
    return orders.find(order => order.id === orderId)
  }, [orders])

  return (
    <OrderContext.Provider value={{ orders, addOrder, updateOrderStatus, getOrder }}>
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
