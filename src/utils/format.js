// Converte um preço em texto ("1.299,90") para número (1299.9).
export function parsePrice(value) {
  if (value == null) return 0
  if (typeof value === 'number') return value
  return Number(String(value).replace(/\./g, '').replace(',', '.')) || 0
}

// Separa o preço em reais e centavos para exibir os centavos menores.
export function splitPrice(value) {
  const [reais, centavos = '00'] = String(value ?? '0').split(',')
  return { reais, centavos: centavos.padEnd(2, '0').slice(0, 2) }
}

// Percentual de desconto entre o preço antigo e o atual (0 se não houver).
export function discountPercent(price, oldPrice) {
  const now = parsePrice(price)
  const before = parsePrice(oldPrice)
  if (!before || !now || now >= before) return 0
  return Math.floor((1 - now / before) * 100)
}

// Remove acentos e deixa minúsculo, para a busca ignorar "é" x "e".
export function normalize(text) {
  return String(text ?? '')
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .toLowerCase()
}
