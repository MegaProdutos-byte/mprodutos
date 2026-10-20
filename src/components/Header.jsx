import { SearchIcon, CloseIcon } from './Icons.jsx'

export default function Header({
  query,
  onQueryChange,
  categories,
  selected,
  onToggleCategory,
}) {
  function handleSubmit(event) {
    event.preventDefault()
    document.getElementById('produtos')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header className="site-header">
      <div className="topstrip">
        <div className="container">
          <span>Frete grátis em milhares de produtos</span>
          <span className="topstrip-sep" aria-hidden="true">•</span>
          <span>Ofertas atualizadas todos os dias</span>
        </div>
      </div>

      <div className="header-main">
        <div className="container header-row">
          <a className="logo" href={import.meta.env.BASE_URL} aria-label="MegaProdutos, página inicial">
            <img className="logo-img" src={`${import.meta.env.BASE_URL}logo.png`} alt="MegaProdutos" width="641" height="240" />
          </a>

          <form className="search" role="search" onSubmit={handleSubmit}>
            <input
              type="search"
              value={query}
              onChange={(e) => onQueryChange(e.target.value)}
              placeholder="Buscar produtos, marcas e muito mais…"
              aria-label="Buscar produtos"
            />
            {query ? (
              <button type="button" className="search-clear" onClick={() => onQueryChange('')} aria-label="Limpar busca">
                <CloseIcon size={16} />
              </button>
            ) : null}
            <button type="submit" className="search-submit" aria-label="Buscar">
              <SearchIcon size={20} />
            </button>
          </form>
        </div>

        <nav className="container header-nav" aria-label="Categorias">
          {categories.map((cat) => {
            const isActive = cat === 'Todos' ? selected.length === 0 : selected.includes(cat)
            return (
              <button
                key={cat}
                type="button"
                className={'nav-link' + (isActive ? ' is-active' : '')}
                aria-pressed={isActive}
                onClick={() => onToggleCategory(cat)}
              >
                {cat}
              </button>
            )
          })}
        </nav>
      </div>
    </header>
  )
}
