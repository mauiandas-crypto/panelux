'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useCart } from '@/context/CartContext'
import { useOrder } from '@/context/OrderContext'
import { siteConfig } from '@/lib/config'
import { trackCheckout, trackConversion, getGaClientId } from '@/components/AnalyticsTracker'
import { CreditCardIcon, TicketIcon, CheckIcon, BankIcon } from '@/components/icons/Icons'

export default function CheckoutPage() {
  const router = useRouter()
  const { items, total, limpiarCarrito } = useCart()
  const { addOrder } = useOrder()

  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    direccion: '',
    ciudad: 'Montevideo',
  })

  const [metodoPago, setMetodoPago] = useState<'mercadopago' | 'transferencia'>('mercadopago')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [cuponCodigo, setCuponCodigo] = useState('')
  const [cuponAplicado, setCuponAplicado] = useState<any>(null)
  const [cuponError, setCuponError] = useState('')
  const [descuento, setDescuento] = useState(0)

  const totalConDescuento = Math.max(total - descuento, 0)
  const envioGratis = total >= siteConfig.shipping.minOrderForFreeShipping
  const costoEnvio = envioGratis ? 0 : siteConfig.shipping.flatCost
  const totalFinal = totalConDescuento + costoEnvio

  useEffect(() => {
    if (items.length > 0) {
      trackCheckout(totalFinal, items.length)
    }
    // Se dispara una vez al entrar a la página con items en el carrito.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const [validandoCupon, setValidandoCupon] = useState(false)

  const handleAplicarCupon = async () => {
    setCuponError('')

    if (!cuponCodigo.trim()) {
      setCuponError('Ingresa un código de cupón')
      return
    }

    setValidandoCupon(true)
    try {
      const response = await fetch('/api/coupons/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ codigo: cuponCodigo, total }),
      })
      const resultado = await response.json()

      if (!resultado.valido) {
        setCuponError(resultado.error || 'Cupón inválido')
        setCuponAplicado(null)
        setDescuento(0)
        return
      }

      setCuponAplicado(resultado.cupon)
      setDescuento(resultado.cupon.descuento)
      setCuponError('')
    } catch (err) {
      setCuponError('No se pudo validar el cupón. Intenta nuevamente.')
    } finally {
      setValidandoCupon(false)
    }
  }

  const handleQuitarCupon = () => {
    setCuponAplicado(null)
    setDescuento(0)
    setCuponCodigo('')
    setCuponError('')
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-white pt-24 pb-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Tu carrito está vacío</h1>
          <Link
            href="/"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition"
          >
            Volver al catálogo
          </Link>
        </div>
      </div>
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      // Validar formulario
      if (!formData.nombre || !formData.email || !formData.telefono || !formData.direccion) {
        setError('Por favor completa todos los campos')
        setLoading(false)
        return
      }

      // Crear orden
      const now = new Date()
      const orderId = `order-${Date.now()}`
      const order = {
        id: orderId,
        fecha: now.toISOString(),
        cliente: formData,
        items: items.map(item => ({
          codigo: item.codigo,
          nombre: item.nombre,
          pvp: item.pvp,
          cantidad: item.cantidad,
          imagen: item.imagen,
          subtotal: item.pvp * item.cantidad,
        })),
        subtotal: total,
        descuento,
        cupon: cuponAplicado?.codigo || null,
        costoEnvio,
        total: totalFinal,
        estado: 'pendiente' as const,
        metodoPago,
        notas: `Pedido realizado el ${now.toLocaleDateString('es-UY')}`,
        gaClientId: getGaClientId(),
        fechaActualizacion: now.toISOString(),
      }

      // Guardar orden localmente
      await addOrder(order)

      // Nota: para Mercado Pago esto marca la conversión en el momento en
      // que se genera el pedido, no cuando el pago se confirma realmente
      // (eso requeriría trackear desde el webhook con la Measurement
      // Protocol de GA4, del lado servidor). Es una aproximación razonable
      // mientras no esté esa pieza conectada.
      trackConversion(orderId, totalFinal)

      // Enviar emails de confirmación
      try {
        await fetch('/api/emails/send-confirmation', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(order),
        })
      } catch (emailError) {
        console.error('Error enviando emails:', emailError)
        // No interrumpir el flujo si hay error en emails
      }

      // Si es Mercado Pago, crear preference y redirigir
      if (metodoPago === 'mercadopago') {
        const mpResponse = await fetch('/api/payments/create-preference', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            items: [
              ...items.map(item => ({
                name: item.nombre,
                quantity: item.cantidad,
                price: item.pvp,
              })),
              ...(descuento > 0
                ? [{
                    name: `Descuento (${cuponAplicado?.codigo})`,
                    quantity: 1,
                    price: -descuento,
                  }]
                : []),
              ...(costoEnvio > 0
                ? [{
                    name: 'Envío',
                    quantity: 1,
                    price: costoEnvio,
                  }]
                : []),
            ],
            email: formData.email,
            orderId: orderId,
          }),
        })

        if (!mpResponse.ok) {
          setError('Error al procesar el pago. Intenta nuevamente.')
          setLoading(false)
          return
        }

        const mpData = await mpResponse.json()
        const mpUrl = mpData.initPoint || mpData.sandboxInitPoint

        if (!mpUrl) {
          setError('No se pudo obtener URL de pago. Por favor contacta soporte.')
          setLoading(false)
          return
        }

        // Redirigir a Mercado Pago
        window.location.href = mpUrl
      } else {
        // Para otros métodos, ir a confirmación
        limpiarCarrito()
        router.push(`/checkout/confirmacion?metodo=${metodoPago}`)
      }
    } catch (err) {
      console.error('Checkout error:', err)
      setError('Error al procesar tu pedido. Intenta nuevamente.')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white pt-24 pb-20">
      <div className="max-w-6xl mx-auto px-6">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Formulario */}
          <div>
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Datos de envío</h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-1">
                    Nombre completo
                  </label>
                  <input
                    type="text"
                    value={formData.nombre}
                    onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                    placeholder="Tu nombre"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                    placeholder="tu@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-1">
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    value={formData.telefono}
                    onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                    placeholder="+598 9 1234 5678"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-1">
                    Dirección
                  </label>
                  <input
                    type="text"
                    value={formData.direccion}
                    onChange={(e) => setFormData({ ...formData, direccion: e.target.value })}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                    placeholder="Calle y número"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-1">
                    Ciudad
                  </label>
                  <select
                    value={formData.ciudad}
                    onChange={(e) => setFormData({ ...formData, ciudad: e.target.value })}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                  >
                    <option>Montevideo</option>
                    <option>Canelones</option>
                    <option>Maldonado</option>
                    <option>Otra</option>
                  </select>
                </div>

                {/* Método de pago */}
                <div className="border-t-2 border-gray-200 pt-6 mt-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Método de pago</h3>

                  <div className="space-y-3">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="pago"
                        value="mercadopago"
                        checked={metodoPago === 'mercadopago'}
                        onChange={(e) => setMetodoPago(e.target.value as any)}
                        className="w-4 h-4"
                      />
                      <span className="text-gray-900 font-semibold flex items-center gap-2"><CreditCardIcon className="w-5 h-5" /> Mercado Pago (Tarjeta)</span>
                    </label>

                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="pago"
                        value="transferencia"
                        checked={metodoPago === 'transferencia'}
                        onChange={(e) => setMetodoPago(e.target.value as any)}
                        className="w-4 h-4"
                      />
                      <span className="text-gray-900 font-semibold flex items-center gap-2"><BankIcon className="w-5 h-5" /> Transferencia Bancaria</span>
                    </label>

                    {metodoPago === 'transferencia' && (
                      <div className="ml-7 bg-gray-50 border-2 border-gray-200 rounded-lg p-4 space-y-4">
                        <p className="text-sm text-gray-700">
                          Realizá la transferencia por el total del pedido a una de estas cuentas y enviá el comprobante por WhatsApp. Tu pedido se confirma al recibir el pago.
                        </p>
                        {siteConfig.bankAccounts.map((cuenta) => (
                          <div key={cuenta.banco} className="text-sm text-gray-900">
                            <p className="font-bold">{cuenta.banco}</p>
                            <p className="text-gray-700">
                              {cuenta.tipoCuenta}{cuenta.sucursal ? ` · Suc. ${cuenta.sucursal}` : ''} · Titular: {cuenta.titular}
                            </p>
                            {cuenta.cuentas.map((c) => (
                              <p key={c.moneda} className="text-gray-700">
                                {c.moneda}: <span className="font-semibold">{c.numero}</span>
                              </p>
                            ))}
                          </div>
                        ))}
                      </div>
                    )}

                  </div>
                </div>

                {error && (
                  <div className="bg-red-50 border-2 border-red-300 text-red-700 px-4 py-3 rounded-lg">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold py-3 px-6 rounded-lg transition mt-6 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    'Procesando...'
                  ) : metodoPago === 'mercadopago' ? (
                    <><CreditCardIcon className="w-5 h-5" /> Ir a Pagar con Mercado Pago</>
                  ) : (
                    'Completar pedido'
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Resumen de pedido */}
          <div>
            <div className="bg-blue-50 rounded-lg shadow-lg p-8 sticky top-28">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Resumen de pedido</h2>

              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={item.codigo} className="flex justify-between">
                    <span className="text-gray-700">
                      {item.nombre} x{item.cantidad}
                    </span>
                    <span className="font-bold text-gray-900">
                      ${(item.pvp * item.cantidad).toLocaleString('es-UY')}
                    </span>
                  </div>
                ))}
              </div>

              {/* Cupón de descuento */}
              <div className="border-t border-blue-200 pt-4 mb-4">
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  ¿Tenés un cupón?
                </label>
                {cuponAplicado ? (
                  <div className="flex items-center justify-between bg-green-50 border-2 border-green-300 rounded-lg px-4 py-2">
                    <div>
                      <p className="text-sm font-bold text-green-800 flex items-center gap-1.5"><TicketIcon className="w-4 h-4" /> {cuponAplicado.codigo}</p>
                      <p className="text-xs text-green-700">{cuponAplicado.descripcion}</p>
                    </div>
                    <button
                      type="button"
                      onClick={handleQuitarCupon}
                      className="text-red-600 text-sm font-semibold hover:underline"
                    >
                      Quitar
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={cuponCodigo}
                      onChange={(e) => setCuponCodigo(e.target.value.toUpperCase())}
                      placeholder="Código de descuento"
                      className="flex-1 px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 text-sm"
                    />
                    <button
                      type="button"
                      onClick={handleAplicarCupon}
                      disabled={validandoCupon}
                      className="bg-gray-900 hover:bg-gray-700 disabled:bg-gray-400 text-white font-bold px-4 py-2 rounded-lg text-sm transition"
                    >
                      {validandoCupon ? '...' : 'Aplicar'}
                    </button>
                  </div>
                )}
                {cuponError && (
                  <p className="text-red-600 text-xs mt-2">{cuponError}</p>
                )}
              </div>

              <div className="border-t border-blue-200 pt-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal:</span>
                  <span className="font-bold text-gray-900">${total.toLocaleString('es-UY')}</span>
                </div>

                {descuento > 0 && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Descuento:</span>
                    <span className="font-bold text-red-600">-${descuento.toLocaleString('es-UY')}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span className="text-gray-600">Envío:</span>
                  {envioGratis ? (
                    <span className="font-bold text-green-600">Gratis</span>
                  ) : (
                    <span className="font-bold text-gray-900">${costoEnvio.toLocaleString('es-UY')}</span>
                  )}
                </div>

                <div className="border-t border-blue-200 pt-2 flex justify-between text-lg">
                  <span className="font-bold text-gray-900">Total:</span>
                  <span className="font-bold text-blue-600">${totalFinal.toLocaleString('es-UY')}</span>
                </div>
              </div>

              <div className="mt-6 p-4 bg-white rounded-lg border-2 border-blue-200">
                <p className="text-xs text-gray-600 flex items-center gap-1.5">
                  <CheckIcon className="w-3.5 h-3.5 text-green-600 flex-shrink-0" /> Envío gratis en compras mayores a ${siteConfig.shipping.minOrderForFreeShipping.toLocaleString('es-UY')}
                </p>
                <p className="text-xs text-gray-600 mt-2 flex items-center gap-1.5">
                  <CheckIcon className="w-3.5 h-3.5 text-green-600 flex-shrink-0" /> Garantía oficial del fabricante
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
