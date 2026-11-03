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

// Data da última atualização (a mais recente entre os produtos), exibida no rodapé.
const lastUpdate =generated.reduce((max, g) => (g.updatedAt > max ? g.updatedAt : max), '')

// Produto que ficou mais de 3 dias sem atualizar em relação aos outros
// (link quebrado ou anúncio fora do ar) é escondido: o preço dele pode não
// valer mais no Mercado Livre. Volta sozinho quando o link for corrigido.
const STALE_MS = 3 * 24 * 60 * 60 * 1000
const isFresh = (g) => g && Date.parse(lastUpdate) - Date.parse(g.updatedAt) <= STALE_MS

let products = productList.flatMap((item) => {
  const store = detectStore(item)
  const categories = item.categories ?? []
  const data = AUTO_STORES.includes(store)
    ? [generatedByLink.get(item.link)].find(isFresh)
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

// Se dois links levarem ao mesmo produto (o Mercado Livre às vezes troca um
// anúncio que saiu do ar por outro), ele aparece uma vez só: vale o primeiro.
// O mesmo vale para um link colado duas vezes em products.js. Cards repetidos
// confundem o React e fazem o card "grudar" e se multiplicar na tela.
const seen = new Set()
products = products.filter((p) => {
  if (seen.has(p.id) || seen.has(p.link)) return false
  seen.add(p.id).add(p.link)
  return true
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

  // Uma categoria por vez: clicar em outra troca o filtro; clicar na mesma
  // de novo (ou em "Todos") volta a mostrar tudo.
  function toggleCategory(category) {
    setSelectedCategories((current) =>
      category === 'Todos' || current.includes(category) ? [] : [category]
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

      <Footer lastUpdate={lastUpdate} />
    </>
  )
}
