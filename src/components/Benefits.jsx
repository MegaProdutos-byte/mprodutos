import { TruckIcon, ShieldIcon, TagIcon, CardIcon } from './Icons.jsx'

const ITEMS = [
  { Icon: TagIcon, title: 'Ofertas selecionadas', text: 'Atualizadas todos os dias' },
  { Icon: TruckIcon, title: 'Frete grátis', text: 'Veja o selo em cada produto' },
  { Icon: CardIcon, title: 'Parcelamento', text: 'Informado em cada produto' },
  { Icon: ShieldIcon, title: 'Compra no Mercado Livre', text: 'Com a sua conta e segurança' },
]

export default function Benefits() {
  return (
    <section className="benefits" aria-label="Vantagens">
      {ITEMS.map(({ Icon, title, text }) => (
        <div className="benefit" key={title}>
          <span className="benefit-icon"><Icon size={24} /></span>
          <div>
            <strong>{title}</strong>
            <span>{text}</span>
          </div>
        </div>
      ))}
    </section>
  )
}
