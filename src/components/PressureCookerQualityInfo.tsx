'use client'

// Contenido real de la línea Panela de Pressão (catálogo Panelux Brasil
// 2026), traducido al español. Se muestra en Classic, Classic Pró y
// Magnific - las tres venden hoy. La variante Magnific tiene revestimiento
// antiadherente (grafito); Classic y Classic Pró son de aluminio pulido sin
// revestimiento, así que esas dos características se muestran condicionadas.

import { HandIcon, FlameIcon, ShieldIcon, CheckIcon } from '@/components/icons/Icons'

export default function PressureCookerQualityInfo({ conRevestimiento }: { conRevestimiento: boolean }) {
  return (
    <section className="py-12 border-t-2 border-gray-200">
      <div className="max-w-4xl">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Calidad y seguridad</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="flex gap-4 bg-gray-50 rounded-lg p-5">
            <div className="w-10 h-10 flex-shrink-0 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
              <HandIcon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-1">Mango de baquelita</h3>
              <p className="text-sm text-gray-600">No se calienta, haciendo el manejo fácil y seguro.</p>
            </div>
          </div>

          <div className="flex gap-4 bg-gray-50 rounded-lg p-5">
            <div className="w-10 h-10 flex-shrink-0 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
              <ShieldIcon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-1">Sistema de seguridad</h3>
              <p className="text-sm text-gray-600">Válvula de seguridad y traba en acero para un cierre firme durante la cocción a presión.</p>
            </div>
          </div>

          <div className="flex gap-4 bg-gray-50 rounded-lg p-5">
            <div className="w-10 h-10 flex-shrink-0 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
              <FlameIcon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-1">Economía y rapidez</h3>
              <p className="text-sm text-gray-600">El aluminio, con su excelente conducción térmica, logra una cocción uniforme y rápida, ahorrando tiempo y energía.</p>
            </div>
          </div>

          {conRevestimiento && (
            <div className="flex gap-4 bg-gray-50 rounded-lg p-5">
              <div className="w-10 h-10 flex-shrink-0 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                <CheckIcon className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Antiadherente de 5 capas</h3>
                <p className="text-sm text-gray-600">No se pega y es fácil de limpiar.</p>
              </div>
            </div>
          )}
        </div>

        {conRevestimiento && (
          <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6">
            <p className="font-bold text-gray-900 mb-1 flex items-center gap-1.5">
              <CheckIcon className="w-4 h-4 text-green-600" /> Libre de PFOA y PFOS
            </p>
            <p className="text-sm text-gray-700">
              Producida en aluminio reforzado, libre de metales pesados, para una cocción más saludable y segura.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
