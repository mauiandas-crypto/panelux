export default function TrustBadges() {
  const badges = [
    {
      icon: '🔒',
      titulo: 'Compra Segura',
      descripcion: 'Encriptación SSL y Mercado Pago',
    },
    {
      icon: '✅',
      titulo: 'Distribuidor Oficial',
      descripcion: 'Panelux Brasil certificado',
    },
    {
      icon: '🛡️',
      titulo: 'Garantía Oficial',
      descripcion: 'Todos los productos cubiertos',
    },
    {
      icon: '🚚',
      titulo: 'Envío Rápido',
      descripcion: '3-5 días hábiles',
    },
  ]

  return (
    <section className="bg-gray-50 py-12 px-6 border-y border-gray-200">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {badges.map((badge, idx) => (
            <div key={idx} className="text-center">
              <div className="text-4xl mb-3">{badge.icon}</div>
              <h3 className="font-bold text-gray-900 mb-1">{badge.titulo}</h3>
              <p className="text-sm text-gray-600">{badge.descripcion}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
