// Lojas exibidas nas abas da lista de produtos e no selo de cada card.
// id      - usado no campo "store" de cada produto em products.js
// name    - nome exibido
// of      - nome com "do/da", para frases ("produtos da Shopee")
// cta     - texto do botão do card
// color / textColor - cores do selo da loja
export const stores = [
  { id: 'mercadolivre', name: 'Mercado Livre', of: 'do Mercado Livre', cta: 'Ver no Mercado Livre', color: '#ffe600', textColor: '#2d3277' },
  { id: 'shopee', name: 'Shopee', of: 'da Shopee', cta: 'Ver na Shopee', color: '#ee4d2d', textColor: '#ffffff' },
  { id: 'amazon', name: 'Amazon', of: 'da Amazon', cta: 'Ver na Amazon', color: '#232f3e', textColor: '#ff9900' },
  { id: 'tiktok', name: 'TikTok Shop', of: 'do TikTok Shop', cta: 'Ver no TikTok Shop', color: '#000000', textColor: '#ffffff' },
]

export const DEFAULT_STORE = 'mercadolivre'

export const getStore = (id) => stores.find((s) => s.id === id) ?? stores[0]

// Lojas cujos dados são buscados por "npm run atualizar".
// As demais têm os dados preenchidos à mão em products.js.
export const AUTO_STORES = ['mercadolivre', 'amazon']

// Loja de um produto: o campo "store" ou, se ausente, deduzida pelo link.
export function detectStore(product) {
  if (product.store) return product.store
  const link = String(product.link ?? '').toLowerCase()
  if (/amzn\.to|amazon\.com/.test(link)) return 'amazon'
  if (/shopee/.test(link)) return 'shopee'
  if (/tiktok/.test(link)) return 'tiktok'
  return DEFAULT_STORE
}
