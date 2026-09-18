'use client'

// Contenido técnico real de la línea Velutto Ceramic (catálogo Panelux Brasil
// 2026), traducido al español. Panelux Uruguay va a incorporar esta línea
// recién en enero — este componente queda listo en el código pero todavía
// NO se usa en ningún producto del sitio (hoy solo se vende la línea
// Magnific, que no tiene este revestimiento). Conectarlo a una ficha de
// producto cuando Velutto esté disponible para la venta.

export default function TripleLayerCoatingInfo() {
  return (
    <section className="py-12 border-t-2 border-gray-200">
      <div className="max-w-4xl">
        <div className="mb-2">
          <span className="inline-block bg-orange-100 text-orange-700 text-xs font-bold px-3 py-1 rounded-full">
            Línea Velutto Ceramic
          </span>
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Triple capa de alta performance</h2>
        <p className="text-gray-600 mb-8">
          Diseñado con tecnología de triple capa para un desempeño superior.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-8">
          <div className="space-y-4 text-gray-700">
            <p>
              El secreto está en su poderoso revestimiento cerámico antiadherente{' '}
              <strong>EcoStone</strong>, que forma una superficie de cocción
              ultraeficaz donde nada se pega.
            </p>
            <p>
              Esta construcción avanzada garantiza una retención y distribución
              de calor impecable, cocinando de forma rápida y homogénea.
            </p>
            <p>
              El resultado es siempre un sellado superior, máxima durabilidad y
              la certeza de una cocción eficiente.
            </p>
          </div>

          {/* Diagrama de capas */}
          <div className="bg-gray-50 rounded-xl p-6 space-y-3">
            <div className="bg-white border-2 border-gray-300 rounded-lg p-3 text-center">
              <p className="font-bold text-gray-900 text-sm">Superficie con revestimiento cerámico antiadherente EcoStone</p>
            </div>
            <div className="flex justify-center text-gray-400">↓</div>
            <div className="bg-white border-2 border-gray-300 rounded-lg p-3 text-center">
              <p className="font-bold text-gray-900 text-sm">Capa de cerámica</p>
            </div>
            <div className="flex justify-center text-gray-400">↓</div>
            <div className="bg-white border-2 border-gray-300 rounded-lg p-3 text-center">
              <p className="font-bold text-gray-900 text-sm">Primer súper resistente</p>
            </div>
          </div>
        </div>

        <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6">
          <h3 className="font-bold text-gray-900 mb-2">✅ Libre de PFOA y PFOS</h3>
          <p className="text-sm text-gray-700">
            PFOA y PFOS son sustancias químicas utilizadas en el pasado en
            procesos de fabricación de revestimientos. Este producto sigue los
            estándares actuales de la industria y no utiliza estos compuestos.
          </p>
        </div>
      </div>
    </section>
  )
}
