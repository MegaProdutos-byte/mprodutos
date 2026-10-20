import { CategoryIcon } from './Icons.jsx'

export default function CategoryShortcuts({ categories, selected, onToggle }) {
  const items = categories.filter((c) => c !== 'Todos')

  return (
    <section className="panel shortcuts" aria-labelledby="shortcuts-title">
      <h2 id="shortcuts-title" className="section-title">Navegue por categoria</h2>
      <div className="shortcuts-list">
        {items.map((cat) => (
          <button
            key={cat}
            type="button"
            className={'shortcut' + (selected.includes(cat) ? ' is-active' : '')}
            aria-pressed={selected.includes(cat)}
            onClick={() => onToggle(cat)}
          >
            <span className="shortcut-icon"><CategoryIcon name={cat} size={28} /></span>
            <span className="shortcut-label">{cat}</span>
          </button>
        ))}
      </div>
    </section>
  )
}
