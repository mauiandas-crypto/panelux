'use client'

// Contenido técnico real de la línea Magnific (catálogo Panelux Brasil
// 2026), traducido al español. A diferencia de Velutto Ceramic, esta línea
// SÍ es la que vende hoy Panelux Uruguay.

import { FlameIcon, RulerIcon, HandIcon, DropletIcon, CheckIcon } from '@/components/icons/Icons'

export default function MagnificQualityInfo() {
  const caracteristicas = [
    {
      Icon: FlameIcon,
      titulo: 'No se pega, fácil de limpiar',
      descripcion: 'Antiadherente interno y externo, con 5 capas de recubrimiento.',
    },
    {
      Icon: RulerIcon,
      titulo: 'Aluminio de 1mm de espesor',
      descripcion: 'Mayor espesura y resistencia que garantiza durabilidad.',
    },
    {
      Icon: HandIcon,
      titulo: 'Mangos y asas de baquelita',
      descripcion: 'No se calientan, haciendo el manejo fácil y seguro.',
    },
    {
      Icon: DropletIcon,
      titulo: 'Menos aceite',
      descripcion: 'La superficie antiadherente permite cocinar con menos materia grasa.',
    },
  ]

  return (
    <section className="py-12 border-t-2 border-gray-200">
      <div className="max-w-4xl">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Calidad Magnific</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {caracteristicas.map((c, idx) => (
            <div key={idx} className="flex gap-4 bg-gray-50 rounded-lg p-5">
              <div className="w-10 h-10 flex-shrink-0 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                <c.Icon className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">{c.titulo}</h3>
                <p className="text-sm text-gray-600">{c.descripcion}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gray-50 rounded-lg p-5 mb-6 flex items-center justify-center gap-8 flex-wrap">
          <span className="text-sm font-semibold text-gray-700 flex items-center gap-1.5"><FlameIcon className="w-4 h-4" /> Apto para:</span>
          <span className="text-sm text-gray-700">Gas</span>
          <span className="text-sm text-gray-700">Vitrocerámica</span>
          <span className="text-sm text-gray-700">Eléctrica</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white border-2 border-gray-200 rounded-lg p-6 text-center">
            <p className="font-bold text-gray-900 mb-1">Certificación INMETRO</p>
            <p className="text-sm text-gray-600">
              Antiadherente certificado con Clasificación A (Óptima) por INMETRO,
              el instituto oficial de metrología de Brasil.
            </p>
          </div>
          <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6 text-center">
            <p className="font-bold text-gray-900 mb-1 flex items-center justify-center gap-1.5"><CheckIcon className="w-4 h-4 text-green-600" /> Libre de PFOA y PFOS</p>
            <p className="text-sm text-gray-700">
              PFOA y PFOS son sustancias químicas utilizadas en el pasado en
              procesos de fabricación de revestimientos. Este producto sigue
              los estándares actuales de la industria y no utiliza estos
              compuestos.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
