'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function FAQ() {
  const [abierto, setAbierto] = useState<number | null>(0)

  const faqs = [
    {
      pregunta: '¿Cuál es la diferencia entre los modelos de ollas a presión?',
      respuesta: 'Las ollas a presión Panelux vienen en diferentes capacidades: 3L, 4.5L, 7L y 10L. La diferencia principal es el volumen que pueden contener. Para 1-2 personas recomendamos 3-4.5L, para familias 7L, y para grandes preparaciones 10L. Todos tienen garantía oficial del fabricante.',
    },
    {
      pregunta: '¿Cómo es el proceso de compra?',
      respuesta: 'Es muy simple: 1) Selecciona el producto en nuestro catálogo, 2) Agrega a carrito, 3) Completa tus datos de envío, 4) Elige método de pago (Mercado Pago, tarjeta, efectivo, transferencia), 5) Recibes confirmación por email. El envío tarda 3-5 días hábiles.',
    },
    {
      pregunta: '¿Qué métodos de pago aceptan?',
      respuesta: 'Aceptamos: Mercado Pago (tarjetas de crédito/débito, efectivo, transferencia), hasta 12 cuotas sin interés en tarjetas participantes, y pago al recibir con POS Herby en Montevideo y Ciudad de la Costa.',
    },
    {
      pregunta: '¿Tienen envío gratis?',
      respuesta: 'Sí, ofrecemos envío gratis en Montevideo y Ciudad de la Costa. Para otras zonas el costo varía según la ubicación. Consulta en WhatsApp al 092 715 555 para obtener el costo exacto de tu zona.',
    },
    {
      pregunta: '¿Cuánta garantía tienen los productos?',
      respuesta: 'Todos nuestros productos incluyen garantía oficial del fabricante Panelux. El período varía según el producto (generalmente 1-3 años). Para reclamaciones de garantía contáctanos por WhatsApp o email con los datos de tu compra.',
    },
    {
      pregunta: '¿Puedo devolver un producto?',
      respuesta: 'Sí, aceptamos devoluciones dentro de 10 días de recibido el producto. Debe estar sin usar y con embalaje original. El reembolso se procesa dentro de 5-7 días hábiles después de recibida la devolución.',
    },
    {
      pregunta: '¿Los productos son originales?',
      respuesta: 'Somos el distribuidor oficial de Panelux en Uruguay. Todos nuestros productos son 100% originales y auténticos, con garantía oficial. Rechazamos cualquier producto que no sea genuino.',
    },
    {
      pregunta: '¿Cuál es la diferencia entre Magnific y Maximum Stone?',
      respuesta: 'Magnific es la línea clásica de Panelux con excelente relación precio-calidad. Maximum Stone es la línea premium con mayor grosor de material y acabado superior. Ambas tienen garantía oficial y excelente durabilidad.',
    },
    {
      pregunta: '¿Venden al por mayor o distribuidor?',
      respuesta: 'Sí, tenemos precios especiales para negocios, restaurantes y distribuidores. Contáctanos por WhatsApp (092 715 555) o email (info@panelux.com.uy) para consultar sobre volúmenes y precios mayoristas.',
    },
    {
      pregunta: '¿Ofrecen servicio técnico?',
      respuesta: 'Sí, contamos con servicio técnico propio. Si tienes problemas con tu producto, contáctanos y te ayudaremos. Además, todos nuestros utensilios tienen garantía oficial que cubre defectos de fabricación.',
    },
    {
      pregunta: '¿Cómo puedo contactarlos?',
      respuesta: 'Puedes contactarnos por: WhatsApp (092 715 555), Email (info@panelux.com.uy), Teléfono (+598 9271 5555). Estamos disponibles Lun-Vie 9:00-18:00 y Sábado 10:00-14:00.',
    },
    {
      pregunta: '¿Tienen showroom físico?',
      respuesta: 'Sí, puedes visitarnos en Yaguarón 1764, Montevideo. Atendemos Lun-Vie 9:00-18:00 y Sábado 10:00-14:00. Te recomendamos consultar antes de pasar para asegurarte disponibilidad de stock.',
    },
  ]

  return (
    <div className="min-h-screen bg-white pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Preguntas Frecuentes</h1>
          <p className="text-xl text-gray-600">Respuestas a las dudas más comunes</p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div key={idx} className="border-2 border-gray-200 rounded-lg overflow-hidden hover:border-blue-300 transition">
              <button
                onClick={() => setAbierto(abierto === idx ? null : idx)}
                className="w-full px-6 py-4 flex items-center justify-between bg-white hover:bg-gray-50 transition"
              >
                <h3 className="text-lg font-bold text-gray-900 text-left">{faq.pregunta}</h3>
                <span className="text-2xl text-blue-600 flex-shrink-0 ml-4">
                  {abierto === idx ? '−' : '+'}
                </span>
              </button>

              {abierto === idx && (
                <div className="px-6 py-4 bg-blue-50 border-t-2 border-blue-200">
                  <p className="text-gray-700 leading-relaxed">{faq.respuesta}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-xl p-12 mt-16 text-center">
          <h2 className="text-3xl font-bold mb-4">¿No encuentras tu respuesta?</h2>
          <p className="text-lg mb-8 text-blue-100">
            Contáctanos directamente por WhatsApp y te ayudaremos al instante
          </p>
          <a
            href="https://wa.me/59892715555"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-white text-blue-600 font-bold px-8 py-4 rounded-lg hover:bg-blue-50 transition"
          >
            💬 Hablar por WhatsApp
          </a>
        </div>

        {/* Volver */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <Link href="/" className="text-blue-600 font-semibold hover:text-blue-800">
            ← Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  )
}
