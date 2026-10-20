# MegaProdutos (mprodutos)

Vitrine de produtos do Mercado Livre, Shopee, Amazon e TikTok Shop em React + Vite. Não há login,
carrinho nem pagamento: o site só mostra as informações do produto (preço,
desconto, frete grátis, parcelamento) e, ao clicar no card, a pessoa é levada
ao anúncio na loja, onde finaliza a compra com a própria conta.

## Como rodar

```
npm install
npm run atualizar   # busca os dados dos produtos
npm run dev
```

Abre em http://localhost:5173

## Estrutura de pastas

```
comercio/
├── index.html                    -> ponto de entrada do Vite (título, fonte)
├── public/
│   ├── favicon.png               -> ícone da aba do navegador
│   └── logo.png                  -> logo do topo e do rodapé
├── scripts/
│   └── atualizar.mjs             -> busca os dados dos produtos (npm run atualizar)
└── src/
    ├── main.jsx                  -> monta o app na página
    ├── App.jsx                   -> busca, filtros, ordenação e abas de lojas
    ├── components/
    │   ├── Header.jsx            -> topo: logo, busca e menu de categorias
    │   ├── HeroCarousel.jsx      -> banner rotativo (edite os textos em SLIDES)
    │   ├── Benefits.jsx          -> faixa de vantagens (frete, parcelamento...)
    │   ├── CategoryShortcuts.jsx -> atalhos de categoria com ícone
    │   ├── ProductGrid.jsx       -> lista de produtos, abas de lojas e ordenação
    │   ├── ProductCard.jsx       -> um card de produto (o link fica aqui)
    │   ├── Footer.jsx            -> rodapé
    │   └── Icons.jsx             -> ícones SVG (inclusive o de cada categoria)
    ├── data/
    │   ├── products.js           -> LISTA DE PRODUTOS: link de afiliado + categorias
    │   ├── products.generated.json -> dados buscados no Mercado Livre (automático)
    │   ├── stores.js             -> lojas (nome, cores, texto do botão)
    │   └── categories.js         -> lista de categorias
    ├── utils/
    │   └── format.js             -> preço, desconto, busca
    └── styles/
        ├── global.css            -> cores (variáveis), fonte, base
        ├── layout.css            -> topo e rodapé
        ├── home.css              -> banner, vantagens, categorias, lista
        └── cards.css             -> visual dos cards de produto
```

## Adicionar ou remover um produto

Edite `src/data/products.js`. Cada produto precisa só do link de afiliado e
das categorias:

```js
{
  link: 'https://meli.la/xxxxx',
  categories: ['Esporte'],
},
```

Depois rode:

```
npm run atualizar
```

O script abre cada link, lê o produto em destaque na página de afiliado do
Mercado Livre e salva nome, foto, preço, preço antigo, parcelamento, frete
grátis, selo (ex: "MAIS VENDIDO") e loja oficial em
`src/data/products.generated.json`, que é o arquivo que o site exibe. Não
edite esse arquivo à mão: ele é sobrescrito a cada atualização.

Rode o mesmo comando sempre que quiser atualizar os preços e depois publique o
site de novo.

Observações:

- Se um produto falhar, o script mantém os últimos dados salvos dele (e avisa
  no terminal). Um produto novo que falhar fica oculto até dar certo.
- "Frete grátis" só aparece quando vale para todos. Se o Mercado Livre der frete
  grátis apenas "por ser sua primeira compra", o selo não é exibido.
- O desconto (ex: `-38%`) é calculado a partir do preço e do preço antigo.
- Esse método lê a página pública do Mercado Livre (não é uma API oficial). Se
  o Mercado Livre mudar a página, o script pode precisar de ajuste. Rode-o no
  seu computador; servidores na nuvem têm mais chance de serem bloqueados.

## Produtos da Amazon

Funcionam igual aos do Mercado Livre: cole o link de afiliado (`amzn.to/...`)
e as categorias em `src/data/products.js` e rode `npm run atualizar`. A loja
é reconhecida pelo link.

```js
{
  link: 'https://amzn.to/xxxxx',
  categories: ['Informática'],
},
```

Da Amazon vêm nome, foto, preço e preço antigo. O preço usado é o de compra
avulsa: o preço em destaque na Amazon às vezes é o do "Programe e Poupe"
(assinatura com desconto), que não vale para quem compra uma vez.
Parcelamento e frete grátis não aparecem nos produtos da Amazon, porque a
página não informa esses dados de forma confiável (o frete depende do Prime).
Se a Amazon pedir captcha, o script mantém os últimos dados e é só tentar de
novo mais tarde.

## Produtos da Shopee e TikTok Shop

A lista de produtos tem abas por loja ("Todas as lojas", "Mercado Livre",
"Shopee", "Amazon", "TikTok Shop"). Lojas ainda sem produtos aparecem como
"em breve".

Para essas lojas ainda não há busca automática, então os dados são
preenchidos à mão em `src/data/products.js`:

```js
{
  store: 'shopee',              // 'shopee' ou 'tiktok'
  link: 'https://s.shopee.com.br/xxxxx',
  categories: ['Moda'],
  name: 'Nome do produto',
  image: 'https://link-da-foto.jpg',
  price: '49,90',
  oldPrice: '79,90',            // ou null
  installment: '3x sem juros',  // ou null
  freeShipping: true,
},
```

Esses produtos aparecem no site na hora, sem rodar `npm run atualizar`.
Nome, cores e texto do botão de cada loja ficam em `src/data/stores.js`.

## Mudar categorias

Edite o array em `src/data/categories.js`. Para dar um ícone a uma categoria nova,
adicione-a em `CATEGORY_ICONS` dentro de `src/components/Icons.jsx` (sem isso ela
usa um ícone padrão).

## Atualizar o projeto no GitHub

Depois de mudar produtos ou preços:

```
npm run atualizar
git add .
git commit -m "Atualiza produtos"
git push
```
