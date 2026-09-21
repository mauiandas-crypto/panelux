export interface OrderItem {
  codigo: string
  nombre: string
  pvp: number
  cantidad: number
  imagen: string
  subtotal: number
}

export interface Order {
  id: string
  fecha: string
  cliente: {
    nombre: string
    email: string
    telefono: string
    direccion: string
    ciudad: string
  }
  items: OrderItem[]
  subtotal: number
  descuento: number
  cupon?: string
  costoEnvio?: number
  total: number
  estado: 'pendiente' | 'pagado' | 'en_preparacion' | 'enviado' | 'entregado' | 'cancelado'
  metodoPago: 'mercadopago' | 'transferencia' | 'efectivo'
  numeroSeguimiento?: string
  mpPaymentId?: string
  notas?: string
  // client_id de GA4 (cookie _ga) capturado al crear el pedido, para poder
  // mandar el evento "purchase" real desde el webhook de Mercado Pago
  // cuando el pago se confirma - no en el momento de crear el pedido.
  gaClientId?: string
  fechaActualizacion: string
}

export interface OrderStats {
  totalOrdenes: number
  ventasTotales: number
  ventasDelDia: number
  ordenesPendientes: number
  ordenesEntregadas: number
  ticketPromedio: number
}
