'use client'

// Contenido real de la línea Magnific Alto Brilho (catálogo Panelux Brasil
// 2026), traducido al español. Es la línea de aluminio pulido sin
// revestimiento antiadherente, por eso estas características no mencionan
// "no se pega" ni PFOA/PFOS (esos son atributos de las líneas con
// revestimiento, como Magnific AA o Maximum Stone).

import { HandIcon, BoxIcon } from '@/components/icons/Icons'

export default function AltoBrilhoQualityInfo() {
  return (
    <section className="py-12 border-t-2 border-gray-200">
      <div className="max-w-4xl">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Calidad Alto Brilho</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex gap-4 bg-gray-50 rounded-lg p-5">
            <div className="w-10 h-10 flex-shrink-0 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
              <BoxIcon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-1">Aluminio pulido</h3>
              <p className="text-sm text-gray-600">Estructura de aluminio que garantiza una cocción uniforme y rápida.</p>
            </div>
          </div>

          <div className="flex gap-4 bg-gray-50 rounded-lg p-5">
            <div className="w-10 h-10 flex-shrink-0 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
              <HandIcon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-1">Mango de baquelita</h3>
              <p className="text-sm text-gray-600">No se calienta, haciendo el manejo fácil y seguro.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
