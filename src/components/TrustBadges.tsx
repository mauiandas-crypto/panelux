import { LockIcon, CheckIcon, ShieldIcon, TruckIcon } from './icons/Icons'

export default function TrustBadges() {
  const badges = [
    {
      icon: LockIcon,
      titulo: 'Compra Segura',
      descripcion: 'Encriptación SSL y Mercado Pago',
    },
    {
      icon: CheckIcon,
      titulo: 'Distribuidor Oficial',
      descripcion: 'Panelux Brasil certificado',
    },
    {
      icon: ShieldIcon,
      titulo: 'Garantía Oficial',
      descripcion: 'Todos los productos cubiertos',
    },
    {
      icon: TruckIcon,
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
              <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                <badge.icon className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-gray-900 mb-1">{badge.titulo}</h3>
              <p className="text-sm text-gray-600">{badge.descripcion}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
