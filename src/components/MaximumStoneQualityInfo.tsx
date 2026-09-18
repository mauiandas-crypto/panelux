'use client'

// Contenido técnico real de la línea Maximum Stone (catálogo Panelux
// Brasil 2026), traducido al español.

export default function MaximumStoneQualityInfo() {
  const caracteristicas = [
    {
      icon: '🍳',
      titulo: 'No se pega, fácil de limpiar',
      descripcion: 'Antiadherente interno y externo, con 7 capas de recubrimiento.',
    },
    {
      icon: '📏',
      titulo: 'Aluminio de 1,9mm de espesor',
      descripcion: 'Mayor espesura y resistencia que garantiza durabilidad.',
    },
    {
      icon: '🖐️',
      titulo: 'Mangos y asas de baquelita',
      descripcion: 'No se calientan, haciendo el manejo fácil y seguro.',
    },
    {
      icon: '🫒',
      titulo: 'Menos aceite',
      descripcion: 'La superficie antiadherente permite cocinar con menos materia grasa.',
    },
  ]

  return (
    <section className="py-12 border-t-2 border-gray-200">
      <div className="max-w-4xl">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Calidad Maximum Stone</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {caracteristicas.map((c, idx) => (
            <div key={idx} className="flex gap-4 bg-gray-50 rounded-lg p-5">
              <div className="text-3xl">{c.icon}</div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">{c.titulo}</h3>
                <p className="text-sm text-gray-600">{c.descripcion}</p>
              </div>
            </div>
          ))}
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
            <p className="font-bold text-gray-900 mb-1">✅ Libre de PFOA y PFOS</p>
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
