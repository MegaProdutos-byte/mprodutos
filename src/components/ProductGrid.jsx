import ProductCard from './ProductCard.jsx'
import { CloseIcon } from './Icons.jsx'
import { getStore } from '../data/stores.js'

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
  totalCount,
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
  const storeIsEmpty = store && storeCounts[store] === 0
  const tabs = [{ id: null, name: 'Todas as lojas', count: totalCount }, ...stores.map((s) => ({ ...s, count: storeCounts[s.id] }))]

  return (
    <section id="produtos" className="panel products" aria-labelledby="products-title">
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
            {tab.count === 0 ? <span className="store-count">em breve</span> : null}
          </button>
        ))}
      </div>

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
          {storeIsEmpty ? (
            <>
              <p className="empty-title">Em breve, produtos {getStore(store).of}</p>
              <p className="empty-text">Enquanto isso, confira as ofertas das outras lojas.</p>
              <button type="button" className="btn-primary" onClick={() => onStoreChange(null)}>
                Ver todas as lojas
              </button>
            </>
          ) : (
            <>
              <p className="empty-title">Nenhum produto encontrado</p>
              <p className="empty-text">Revise a busca ou remova alguns filtros.</p>
              {hasFilters ? (
                <button type="button" className="btn-primary" onClick={onClearFilters}>
                  Limpar filtros
                </button>
              ) : null}
            </>
          )}
        </div>
      )}
    </section>
  )
}
