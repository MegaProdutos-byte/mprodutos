// Atualiza os dados dos produtos a partir dos links de afiliado.
//
//   npm run atualizar
//
// Lojas com atualização automática:
// - Mercado Livre: abre a página de afiliado (para onde o meli.la
//   redireciona) e lê o produto em destaque: nome, foto, preço, preço
//   antigo, parcelamento, frete, selo e loja oficial.
// - Amazon: abre a página do produto (para onde o amzn.to redireciona) e
//   lê nome, foto, preço e preço antigo.
//
// O resultado vai para src/data/products.generated.json, que é o que o
// site exibe. Se um produto falhar, os últimos dados salvos dele são mantidos.
// Produtos das outras lojas têm os dados preenchidos à mão em products.js.

import { readFile, writeFile } from 'node:fs/promises'
import { products as allProducts } from '../src/data/products.js'
import { AUTO_STORES, detectStore } from '../src/data/stores.js'

const products = allProducts.filter((p) => AUTO_STORES.includes(detectStore(p)))

const OUTPUT = new URL('../src/data/products.generated.json', import.meta.url)
const USER_AGENT =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130 Safari/537.36'
// Quantos produtos são buscados ao mesmo tempo, a pausa entre buscas de
// cada fila e a espera antes de tentar de novo um produto que falhou.
// Valores baixos de propósito, para não sobrecarregar as lojas.
const CONCURRENCY = 4
const DELAY_MS = 800
const RETRY_DELAY_MS = 3000

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

async function loadPrevious() {
  try {
    return JSON.parse(await readFile(OUTPUT, 'utf8'))
  } catch {
    return []
  }
}

async function fetchPage(url) {
  const res = await fetch(url, {
    redirect: 'follow',
    headers: {
      'User-Agent': USER_AGENT,
      'Accept-Language': 'pt-BR,pt;q=0.9',
      Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
    },
  })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return res.text()
}

const formatMoney = (value) =>
  value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

// "R$ 1.299,90" -> 1299.9
const parseMoney = (text) => {
  const n = Number(String(text ?? '').replace(/[^\d,]/g, '').replace(',', '.'))
  return Number.isFinite(n) && n > 0 ? n : null
}

const decodeHtml = (text) =>
  text
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/\s+/g, ' ')
    .trim()

// Lê o objeto JSON que começa em `start` (um "{"), respeitando strings.
function readJsonObject(text, start) {
  let depth = 0
  let inString = false
  for (let i = start; i < text.length; i++) {
    const ch = text[i]
    if (inString) {
      if (ch === '\\') i++
      else if (ch === '"') inString = false
    } else if (ch === '"') {
      inString = true
    } else if (ch === '{') {
      depth++
    } else if (ch === '}') {
      depth--
      if (depth === 0) return JSON.parse(text.slice(start, i + 1))
    }
  }
  throw new Error('JSON incompleto')
}

// ── Mercado Livre ─────────────────────────────────────────────────────

// O produto do link fica no bloco "card-featured" da página de afiliado.
function findFeaturedCard(html) {
  const block = html.indexOf('"id":"card-featured"')
  if (block === -1) throw new Error('produto em destaque não encontrado na página')
  const list = html.indexOf('"polycards":[', block)
  if (list === -1) throw new Error('dados do produto não encontrados')
  return readJsonObject(html, html.indexOf('{', list))
}

function parseMercadoLivre(html) {
  const card = findFeaturedCard(html)
  const parts = Object.fromEntries((card.components ?? []).map((c) => [c.type, c[c.type]]))
  const price = parts.price ?? {}
  const current = price.current_price?.value
  const previous = price.previous_price?.value
  if (!parts.title?.text || typeof current !== 'number') {
    throw new Error('nome ou preço ausente')
  }

  // Parcelamento / outras formas de pagamento. O texto vem com campos entre
  // chaves que são trocados pelos valores, por exemplo:
  //   "12x {price}"                           -> "12x R$ 16,79"
  //   "ou {price_total} em outros meios"      -> "ou R$ 95,00 em outros meios"
  //   "{o} {price_total} {en} 5x {price} ..." -> "ou R$ 169,90 em 5x R$ 33,98 ..."
  // (nos dois últimos, o preço em destaque é o do Pix ou de um meio específico)
  let installment = null
  const inst = price.installments
  if (inst?.text) {
    const values = Object.fromEntries((inst.values ?? []).map((v) => [v.key, v]))
    installment = inst.text
      .replace(/\{(\w+)\}/g, (_, key) => {
        const v = values[key]
        if (typeof v?.price?.value === 'number') return `R$ ${formatMoney(v.price.value)}`
        return v?.label?.text ?? v?.text ?? ''
      })
      .replace(/\s+/g, ' ')
      .trim()
    if (inst.no_interest && !/sem juros/i.test(installment)) installment += ' sem juros'
  }

  // Frete grátis só conta quando vale para todos (não "por ser sua primeira compra").
  const shipping = parts.shipping ?? {}
  const freeShipping =
    /gr[aá]tis/i.test(shipping.text ?? '') && !/primeira compra/i.test(shipping.additional_text ?? '')

  const pictureId = card.pictures?.pictures?.[0]?.id

  return {
    id: card.metadata?.product_id ?? card.metadata?.id,
    name: parts.title.text,
    // "-V" = 640px de altura: nítida no card (inclusive em telas de alta
    // resolução) e com menos da metade do peso da versão "-F" (1200px).
    image: pictureId ? `https://http2.mlstatic.com/D_NQ_NP_2X_${pictureId}-V.webp` : null,
    price: formatMoney(current),
    oldPrice: typeof previous === 'number' && previous > current ? formatMoney(previous) : null,
    installment,
    freeShipping,
    highlight: parts.highlight?.text ?? null,
    officialStore: /icon_cockade/.test(parts.seller?.text ?? ''),
  }
}

// ── Amazon ────────────────────────────────────────────────────────────

function parseAmazon(html) {
  if (/validateCaptcha|Digite os caracteres que você vê/i.test(html)) {
    throw new Error('a Amazon pediu captcha; tente de novo mais tarde')
  }

  const asin = html.match(/data-csa-c-asin="([A-Z0-9]{10})"/)?.[1] ?? html.match(/\/dp\/([A-Z0-9]{10})/)?.[1]
  const titleHtml = html.match(/id="productTitle"[^>]*>([\s\S]*?)<\/span>/)?.[1]
  const name = titleHtml ? decodeHtml(titleHtml) : null

  // Preço de compra avulsa (oferta principal). O preço em destaque na página
  // pode ser o do "Programe e Poupe" (assinatura com desconto), que não vale
  // para quem compra uma vez, por isso ele só é usado se a oferta não existir.
  let current = null
  const offersAt = html.indexOf('twister-plus-buying-options-price-data')
  if (offersAt !== -1) {
    try {
      const offers = readJsonObject(html, html.indexOf('{', offersAt))
      const first = Object.values(offers).flat().find((o) => typeof o?.priceAmount === 'number')
      current = first?.priceAmount ?? null
    } catch {
      // segue para o preço exibido na página
    }
  }

  // Bloco de preço principal: preço exibido e preço antigo riscado ("De:").
  const coreAt = html.indexOf('id="corePriceDisplay_desktop_feature_div"')
  const core = coreAt !== -1 ? html.slice(coreAt, coreAt + 15000) : ''
  if (current == null) {
    current = parseMoney(core.match(/priceToPay[\s\S]*?class="a-offscreen">\s*([^<]+?)\s*</)?.[1])
  }
  const previous = parseMoney(core.match(/data-a-strike="true"[^>]*>\s*<span class="a-offscreen">([^<]+)</)?.[1])

  if (!name) throw new Error('nome do produto não encontrado')
  if (current == null) throw new Error('preço não encontrado (produto indisponível?)')

  const image =
    html.match(/data-old-hires="(https:[^"]+)"/)?.[1] ??
    html.match(/"hiRes":"(https:[^"]+)"/)?.[1] ??
    html.match(/id="landingImage"[^>]*src="(https:[^"]+)"/)?.[1] ??
    null

  return {
    id: asin ? `amazon-${asin}` : null,
    name,
    image,
    price: formatMoney(current),
    oldPrice: previous && previous > current ? formatMoney(previous) : null,
    // A página não informa parcelamento e frete grátis de forma confiável
    // (o frete depende do Prime), então eles ficam de fora.
    installment: null,
    freeShipping: false,
    highlight: null,
    officialStore: false,
  }
}

const PARSERS = { mercadolivre: parseMercadoLivre, amazon: parseAmazon }

// ── Execução ──────────────────────────────────────────────────────────

// Busca e lê um produto; se falhar, tenta mais uma vez após uma pausa
// (falhas de rede ou bloqueios momentâneos costumam passar).
async function fetchProduct(product, store) {
  try {
    return PARSERS[store](await fetchPage(product.link))
  } catch {
    await sleep(RETRY_DELAY_MS)
    return PARSERS[store](await fetchPage(product.link))
  }
}

async function main() {
  const started = Date.now()
  const previous = new Map((await loadPrevious()).map((p) => [p.link, p]))
  // Mantém a ordem de products.js mesmo buscando vários ao mesmo tempo.
  const result = new Array(products.length)
  let ok = 0
  let failed = 0
  let next = 0

  async function worker() {
    while (next < products.length) {
      const i = next++
      const product = products[i]
      const store = detectStore(product)
      const label = `[${i + 1}/${products.length}] ${product.link}`
      const saved = previous.get(product.link)
      try {
        const data = await fetchProduct(product, store)
        result[i] = {
          ...data,
          id: data.id ?? product.link,
          store,
          link: product.link,
          categories: product.categories ?? [],
          updatedAt: new Date().toISOString(),
        }
        ok++
        console.log(`✔ ${label}\n    ${data.name} — R$ ${data.price}`)
      } catch (err) {
        failed++
        if (saved) {
          result[i] = { ...saved, store, categories: product.categories ?? saved.categories ?? [] }
          console.log(`✖ ${label}\n    ${err.message} (mantidos os dados de ${saved.updatedAt?.slice(0, 10)})`)
        } else {
          console.log(`✖ ${label}\n    ${err.message} (produto ficará oculto até a próxima atualização)`)
        }
      }
      await sleep(DELAY_MS)
    }
  }

  await Promise.all(Array.from({ length: CONCURRENCY }, worker))

  await writeFile(OUTPUT, JSON.stringify(result.filter(Boolean), null, 2) + '\n')
  const seconds = Math.round((Date.now() - started) / 1000)
  console.log(`\n${ok} atualizado(s), ${failed} com erro em ${seconds}s. Dados salvos em src/data/products.generated.json`)
}

main()
