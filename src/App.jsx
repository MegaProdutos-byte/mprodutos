import { useDeferredValue, useMemo, useState } from 'react'
import Header from './components/Header.jsx'
import HeroCarousel from './components/HeroCarousel.jsx'
import Benefits from './components/Benefits.jsx'
import CategoryShortcuts from './components/CategoryShortcuts.jsx'
import ProductGrid from './components/ProductGrid.jsx'
import Footer from './components/Footer.jsx'
import { categories } from './data/categories.js'
import { stores, getStore, AUTO_STORES, detectStore } from './data/stores.js'
import { products as productList } from './data/products.js'
// Gerado por "npm run atualizar" a partir dos links em data/products.js.
import generated from './data/products.generated.json'
import { discountPercent, normalize, parsePrice } from './utils/format.js'

// Monta a lista final de produtos:
// - Mercado Livre e Amazon: junta link + categorias com os dados buscados
//   por "npm run atualizar". Produtos ainda sem dados ficam ocultos.
// - Outras lojas: os dados vêm preenchidos à mão em products.js.
const generatedByLink = new Map(generated.map((g) => [g.link, g]))

const products = productList.flatMap((item) => {
  const store = detectStore(item)
  const categories = item.categories ?? []
  const data = AUTO_STORES.includes(store)
    ? generatedByLink.get(item.link)
    : item.name && item.price
      ? { ...item, id: item.link }
      : null
  if (!data) return []
  // Valores usados na busca e na ordenação, calculados uma vez só.
  return [{
    ...data,
    store,
    categories,
    searchText: normalize([data.name, ...categories].join(' ')),
    priceValue: parsePrice(data.price),
    discount: discountPercent(data.price, data.oldPrice),
  }]
})

// Quantidade de produtos por loja, para as abas.
const storeCounts = Object.fromEntries(
  stores.map((s) => [s.id, products.filter((p) => p.store === s.id).length])
)

const SORTERS = {
  discount: (a, b) => b.discount - a.discount,
  'price-asc': (a, b) => a.priceValue - b.priceValue,
  'price-desc': (a, b) => b.priceValue - a.priceValue,
}

export default function App() {
  const [query, setQuery] = useState('')
  // Categorias selecionadas. Array vazio = "Todos" (mostra tudo).
  const [selectedCategories, setSelectedCategories] = useState([])
  const [sort, setSort] = useState('relevance')
  // Loja escolhida nas abas. null = todas as lojas.
  const [store, setStore] = useState(null)
  // A lista filtra com a busca "atrasada", para a digitação nunca travar.
  const deferredQuery = useDeferredValue(query)

  function toggleCategory(category) {
    if (category === 'Todos') {
      setSelectedCategories([])
      return
    }
    setSelectedCategories((current) =>
      current.includes(category)
        ? current.filter((c) => c !== category)
        : [...current, category]
    )
  }

  function clearFilters() {
    setQuery('')
    setSelectedCategories([])
  }

  // Um produto aparece se tiver PELO MENOS UMA das categorias selecionadas.
  const visibleProducts = useMemo(() => {
    const terms = normalize(deferredQuery).split(/\s+/).filter(Boolean)
    const list = products.filter((p) => {
      if (store && p.store !== store) return false
      if (selectedCategories.length > 0 && !p.categories.some((c) => selectedCategories.includes(c))) return false
      if (terms.length > 0 && !terms.every((t) => p.searchText.includes(t))) return false
      return true
    })
    return SORTERS[sort] ? [...list].sort(SORTERS[sort]) : list
  }, [deferredQuery, selectedCategories, sort, store])

  const title = query
    ? 'Resultados da busca'
    : selectedCategories.length === 1
      ? selectedCategories[0]
      : store
        ? `Produtos ${getStore(store).of}`
        : 'Ofertas para você'

  return (
    <>
      <Header
        query={query}
        onQueryChange={setQuery}
        categories={categories}
        selected={selectedCategories}
        onToggleCategory={toggleCategory}
      />

      <main className="container page">
        <HeroCarousel />
        <Benefits />
        <CategoryShortcuts
          categories={categories}
          selected={selectedCategories}
          onToggle={toggleCategory}
        />
        <ProductGrid
          title={title}
          products={visibleProducts}
          stores={stores}
          storeCounts={storeCounts}
          totalCount={products.length}
          store={store}
          onStoreChange={setStore}
          query={query}
          selected={selectedCategories}
          onToggleCategory={toggleCategory}
          sort={sort}
          onSortChange={setSort}
          onClearFilters={clearFilters}
        />
      </main>

      <Footer />
    </>
  )
}
