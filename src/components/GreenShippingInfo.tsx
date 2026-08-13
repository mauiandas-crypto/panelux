'use client'

import { useState } from 'react'

export default function GreenShippingInfo() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

  const sections = [
    {
      title: '♻️ Empaques Eco-Amigables',
      description: 'Nuestros empaques están hechos 100% de materiales reciclables',
      details: 'Utilizamos cartón biodegradable, papel de relleno hecho de almidón de maíz y tintas a base de soja. Cero plástico en nuestros envíos.',
    },
    {
      title: '🌍 Huella de Carbono',
      description: 'Compensamos el 100% de nuestras emisiones',
      details: 'Cada envío genera aproximadamente 0.8kg de CO2. Plantamos 1 árbol por cada 1000kg de CO2 producido. Ya hemos plantado 2000+ árboles.',
    },
    {
      title: '🚚 Envíos Sostenibles',
      description: 'Rutas optimizadas y transportistas certificados',
      details: 'Trabajamos con proveedores de logística que utilizan vehículos de baja emisión y consolidan envíos para reducir impacto ambiental.',
    },
    {
      title: '♻️ Reciclaje',
      description: 'Instrucciones completas para reciclar tu empaque',
      details: 'Separa los materiales: cartón en contenedores de papel, papel en reciclaje, almidón de maíz es compostable. Consulta tu programa local de reciclaje.',
    },
  ]

  return (
    <section className="py-12 border-t-2 border-gray-200">
      <div className="max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">🌱 Comprometidos con el Planeta</h2>
          <p className="text-lg text-gray-600">
            Cada compra en Panelux contribuye a un futuro más sostenible
          </p>
        </div>

        {/* Métricas de Impacto */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-lg p-6 text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">2000+</div>
            <p className="text-sm text-gray-700 font-semibold">Árboles plantados</p>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200 rounded-lg p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">500k</div>
            <p className="text-sm text-gray-700 font-semibold">kg CO2 offset</p>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-violet-50 border-2 border-purple-200 rounded-lg p-6 text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">100%</div>
            <p className="text-sm text-gray-700 font-semibold">Empaques reciclables</p>
          </div>
          <div className="bg-gradient-to-br from-orange-50 to-amber-50 border-2 border-orange-200 rounded-lg p-6 text-center">
            <div className="text-3xl font-bold text-orange-600 mb-2">Cero</div>
            <p className="text-sm text-gray-700 font-semibold">Plástico de un uso</p>
          </div>
        </div>

        {/* Secciones Expandibles */}
        <div className="space-y-3 mb-12">
          {sections.map((section, idx) => (
            <div key={idx} className="border-2 border-gray-200 rounded-lg overflow-hidden">
              <button
                onClick={() => setExpandedIndex(expandedIndex === idx ? null : idx)}
                className="w-full p-6 hover:bg-green-50 transition flex items-center justify-between font-semibold text-gray-900"
              >
                <span>{section.title}</span>
                <span className="text-2xl">{expandedIndex === idx ? '−' : '+'}</span>
              </button>
              {expandedIndex === idx && (
                <div className="px-6 pb-6 bg-green-50 border-t-2 border-green-200">
                  <p className="text-gray-700 mb-2">{section.details}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Certificaciones */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-lg p-8 text-center">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Certificado por</h3>
          <div className="flex flex-wrap justify-center gap-4 mb-4">
            <div className="bg-white rounded-lg px-6 py-3 shadow">
              <p className="text-sm font-bold text-gray-700">♻️ Certificado ISO 14001</p>
              <p className="text-xs text-gray-500">Gestión Ambiental</p>
            </div>
            <div className="bg-white rounded-lg px-6 py-3 shadow">
              <p className="text-sm font-bold text-gray-700">🌍 Carbon Trust</p>
              <p className="text-xs text-gray-500">Reducción de Emisiones</p>
            </div>
            <div className="bg-white rounded-lg px-6 py-3 shadow">
              <p className="text-sm font-bold text-gray-700">♻️ Rainforest Alliance</p>
              <p className="text-xs text-gray-500">Sostenibilidad</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
