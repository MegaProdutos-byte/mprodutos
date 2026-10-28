import ProductCard from './ProductCard.jsx'
import { CloseIcon } from './Icons.jsx'

export const SORT_OPTIONS = [
  { value: 'relevance', label: 'Mais relevantes' },
  { value: 'discount', label: 'Maior desconto' },
  { value: 'price-asc', label: 'Menor preço' },
  { value: 'price-desc', label: 'Maior preço' },
]

export default function ProductGrid({
  title,
  products,
  stores,
  storeCounts,
  store,
  onStoreChange,
  query,
  selected,
  onToggleCategory,
  sort,
  onSortChange,
  onClearFilters,
}) {
  const hasFilters = query || selected.length > 0
  // Só aparecem abas das lojas que têm produtos; com uma loja só, as abas
  // ficam escondidas (voltam sozinhas quando houver produtos de outra loja).
  const storesWithProducts = stores.filter((s) => storeCounts[s.id] > 0)
  const tabs = [{ id: null, name: 'Todas as lojas' }, ...storesWithProducts]

  return (
    <section id="produtos" className="panel products" aria-labelledby="products-title">
      {storesWithProducts.length > 1 ? (
        <div className="store-tabs" role="tablist" aria-label="Escolha a loja">
          {tabs.map((tab) => (
            <button
              key={tab.id ?? 'todas'}
              type="button"
              role="tab"
              aria-selected={store === tab.id}
              className={'store-tab' + (store === tab.id ? ' is-active' : '')}
              onClick={() => onStoreChange(tab.id)}
            >
              {tab.id ? <span className="store-dot" style={{ background: tab.color }} aria-hidden="true" /> : null}
              {tab.name}
            </button>
          ))}
        </div>
      ) : null}

      <div className="products-head">
        <div>
          <h2 id="products-title" className="section-title">{title}</h2>
        </div>

        <div className="products-controls">
          <label className="sort">
            <span>Ordenar por</span>
            <select value={sort} onChange={(e) => onSortChange(e.target.value)}>
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </label>
        </div>
      </div>

      {selected.length > 0 ? (
        <div className="active-filters">
          {selected.map((cat) => (
            <button key={cat} type="button" className="filter-tag" onClick={() => onToggleCategory(cat)}>
              {cat} <CloseIcon size={14} />
              <span className="sr-only">remover filtro</span>
            </button>
          ))}
        </div>
      ) : null}

      {products.length > 0 ? (
        <div className="grid">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      ) : (
        <div className="empty">
          <p className="empty-title">Nenhum produto encontrado</p>
          <p className="empty-text">Revise a busca ou remova alguns filtros.</p>
          {hasFilters ? (
            <button type="button" className="btn-primary" onClick={onClearFilters}>
              Limpar filtros
            </button>
          ) : null}
        </div>
      )}
    </section>
  )
}
