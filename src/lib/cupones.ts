// Estructura de cupones disponibles
interface Cupon {
  codigo: string
  descripcion: string
  descuento: number
  tipo: 'porcentaje' | 'fijo' | 'envio'
  minimo: number | null
  maximo: number | null
  activo: boolean
  usoUnico: boolean
}

export const cupones: Cupon[] = [
  {
    codigo: 'BIENVENIDA10',
    descripcion: 'Descuento de bienvenida',
    descuento: 10, // porcentaje
    tipo: 'porcentaje',
    minimo: 1000,
    maximo: null,
    activo: true,
    usoUnico: false,
  },
  {
    codigo: 'NAVIDAD20',
    descripcion: 'Descuento navideño',
    descuento: 20,
    tipo: 'porcentaje',
    minimo: 2000,
    maximo: null,
    activo: true,
    usoUnico: false,
  },
  {
    codigo: 'ENVIOGRATIS',
    descripcion: 'Envío gratis (ya aplicado)',
    descuento: 0,
    tipo: 'envio',
    minimo: 3000,
    maximo: null,
    activo: true,
    usoUnico: false,
  },
]

export function validarCupon(codigo: string, total: number) {
  const cupon = cupones.find(c => c.codigo.toUpperCase() === codigo.toUpperCase())
  
  if (!cupon) {
    return {
      valido: false,
      error: 'Cupón no encontrado',
    }
  }

  if (!cupon.activo) {
    return {
      valido: false,
      error: 'Cupón inactivo',
    }
  }

  if (cupon.minimo && total < cupon.minimo) {
    return {
      valido: false,
      error: `Monto mínimo: $${cupon.minimo.toLocaleString('es-UY')}`,
    }
  }

  if (cupon.maximo && total > cupon.maximo) {
    return {
      valido: false,
      error: `Monto máximo: $${cupon.maximo.toLocaleString('es-UY')}`,
    }
  }

  return {
    valido: true,
    cupon: {
      codigo: cupon.codigo,
      descripcion: cupon.descripcion,
      descuento: cupon.descuento,
      tipo: cupon.tipo,
    },
  }
}

export function calcularDescuento(cupon: any, total: number) {
  if (cupon.tipo === 'porcentaje') {
    return (total * cupon.descuento) / 100
  } else if (cupon.tipo === 'fijo') {
    return cupon.descuento
  }
  return 0
}
