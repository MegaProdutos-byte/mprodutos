// LISTA DE PRODUTOS
//
// ── MERCADO LIVRE E AMAZON ────────────────────────────────────────────
// Informe só o link de afiliado e as categorias (a loja é reconhecida
// pelo link):
//
//   {
//     link: 'https://meli.la/xxxxx',      // ou https://amzn.to/xxxxx
//     categories: ['Esportes'],
//   },
//
// Os dados são buscados automaticamente. Ao adicionar um produto novo ou
// para atualizar os preços, rode:
//
//   npm run atualizar
//
// Mercado Livre: nome, foto, preço, desconto, parcelamento, frete e selos.
// Amazon: nome, foto, preço e desconto.
//
// ── SHOPEE E TIKTOK SHOP ──────────────────────────────────────────────
// Ainda não há busca automática para essas lojas, então os dados são
// preenchidos à mão. "store" pode ser 'shopee' ou 'tiktok':
//
//   {
//     store: 'shopee',
//     link: 'https://s.shopee.com.br/xxxxx',
//     categories: ['Moda'],
//     name: 'Nome do produto',
//     image: 'https://link-da-foto.jpg',
//     price: '49,90',
//     oldPrice: '79,90',            // ou null
//     installment: '3x sem juros',  // ou null
//     freeShipping: true,
//   },
//
// ── PARA TODAS AS LOJAS ───────────────────────────────────────────────
// categories: mesmos nomes de categories.js. Um produto pode ter várias.
// Mudar categorias ou remover um produto aparece no site na hora.

export const products = [
  // Esportes
  {
    link: 'https://meli.la/1KzAaBQ',
    categories: ['Esportes'],
  },
  {
    link: 'https://meli.la/2DyfHbV',
    categories: ['Esportes'],
  },
  {
    link: 'https://meli.la/2ZAb4FP',
    categories: ['Esportes'],
  },
  {
    link: 'https://meli.la/1WL9rCS',
    categories: ['Esportes'],
  },
  {
    link: 'https://meli.la/2CF2Hzg',
    categories: ['Esportes'],
  },
  {
    link: 'https://meli.la/1sFfS4J',
    categories: ['Esportes'],
  },
  {
    link: 'https://meli.la/2vBC8nY',
    categories: ['Esportes'],
  },
  {
    link: 'https://meli.la/2uAon6V',
    categories: ['Esportes'],
  },
  {
    link: 'https://meli.la/31aptb1',
    categories: ['Esportes'],
  },
  {
    link: 'https://meli.la/2k8GViM',
    categories: ['Esportes'],
  },

  // Games
  {
    link: 'https://meli.la/2ciS6uy',
    categories: ['Games'],
  },
  {
    link: 'https://meli.la/1bJYRM5',
    categories: ['Games'],
  },
  {
    link: 'https://meli.la/2hXtocW',
    categories: ['Games'],
  },
  {
    link: 'https://meli.la/27uJgDv',
    categories: ['Games'],
  },
  {
    link: 'https://meli.la/2xXv6KB',
    categories: ['Games'],
  },
  {
    link: 'https://meli.la/2qeZqD8',
    categories: ['Games'],
  },
  {
    link: 'https://meli.la/2kGEYYU',
    categories: ['Games'],
  },
  {
    link: 'https://meli.la/31RuEVG',
    categories: ['Games'],
  },
  {
    link: 'https://meli.la/1iHha1t',
    categories: ['Games'],
  },
  {
    link: 'https://meli.la/1rNxTqg',
    categories: ['Games'],
  },

  //Eletrodomésticos
  {
    link: 'https://meli.la/24invz4',
    categories: ['Eletrodomésticos'],
  },
  {
    link: 'https://meli.la/2zYUTgh',
    categories: ['Eletrodomésticos'],
  },
  {
    link: 'https://meli.la/2XbfGSh',
    categories: ['Eletrodomésticos'],
  },
  {
    link: 'https://meli.la/1sAjmyd',
    categories: ['Eletrodomésticos'],
  },
  {
    link: 'https://meli.la/2nCC3YV',
    categories: ['Eletrodomésticos'],
  },
  {
    link: 'https://meli.la/1KdNGuE',
    categories: ['Eletrodomésticos'],
  },
  {
    link: 'https://meli.la/1sUSPad',
    categories: ['Eletrodomésticos'],
  },
  {
    link: 'https://meli.la/1SdDe4z',
    categories: ['Eletrodomésticos'],
  },
  {
    link: 'https://meli.la/1j2TFsV',
    categories: ['Eletrodomésticos'],
  },
  {
    link: 'https://meli.la/2T8Dn7R',
    categories: ['Eletrodomésticos'],
  },

  //Ferramentas
  {
    link: 'https://meli.la/1Nh5A9u',
    categories: ['Ferramentas'],
  },
  {
    link: 'https://meli.la/2ZCdz4R',
    categories: ['Ferramentas'],
  },
  {
    link: 'https://meli.la/1Z2Ypyy',
    categories: ['Ferramentas'],
  },
  {
    link: 'https://meli.la/14uxSQ9',
    categories: ['Ferramentas'],
  },
  {
    link: 'https://meli.la/19kY6DN',
    categories: ['Ferramentas'],
  },
  {
    link: 'https://meli.la/1zEvA3p',
    categories: ['Ferramentas'],
  },
  {
    link: 'https://meli.la/1afFZqT',
    categories: ['Ferramentas'],
  },
  {
    link: 'https://meli.la/1Rzhm1o',
    categories: ['Ferramentas'],
  },
  {
    link: 'https://meli.la/1L1X9dp',
    categories: ['Ferramentas'],
  },
  {
    link: 'https://meli.la/2QEr9ZB',
    categories: ['Ferramentas'],
  },

  //Celulares
  {
    link: 'https://meli.la/2SSf1E3',
    categories: ['Celulares'],
  },
  {
    link: 'https://meli.la/2SrrWMu',
    categories: ['Celulares'],
  },
  {
    link: 'https://meli.la/2wfRqrj',
    categories: ['Celulares'],
  },
  {
    link: 'https://meli.la/33Gc1Ny',
    categories: ['Celulares'],
  },
  {
    link: 'https://meli.la/2Y4PfTF',
    categories: ['Celulares'],
  },
  {
    link: 'https://meli.la/2kHLUss',
    categories: ['Celulares'],
  },
  {
    link: 'https://meli.la/13Dk8JA',
    categories: ['Celulares'],
  },
  {
    link: 'https://meli.la/12GBYkW',
    categories: ['Celulares'],
  },
  {
    link: 'https://meli.la/26jehTo',
    categories: ['Celulares'],
  },
  {
    link: 'https://meli.la/1GnWSYf',
    categories: ['Celulares'],
  },

  //Informática
  {
    link: 'https://meli.la/2VCs4Nh',
    categories: ['Informática'],
  },
  {
    link: 'https://meli.la/1ffN1Nk',
    categories: ['Informática'],
  },
  {
    link: 'https://meli.la/2BggEXt',
    categories: ['Informática'],
  },
  {
    link: 'https://meli.la/2cqEBJb',
    categories: ['Informática'],
  },
  {
    link: 'https://meli.la/2D4Yb1s',
    categories: ['Informática'],
  },
  {
    link: 'https://meli.la/2Wbdnpq',
    categories: ['Informática'],
  },
  {
    link: 'https://meli.la/22Z1xwd',
    categories: ['Informática'],
  },
  {
    link: 'https://meli.la/2FWBJRj',
    categories: ['Informática'],
  },
  {
    link: 'https://meli.la/1xtYZnk',
    categories: ['Informática'],
  },
  {
    link: 'https://meli.la/34iv2m3',
    categories: ['Informática'],
  },

  //Moda
  {
    link: 'https://meli.la/1hNSxkP',
    categories: ['Moda'],
  },
  {
    link: 'https://meli.la/1xHJJqr',
    categories: ['Moda'],
  },
  {
    link: 'https://meli.la/2FokmH7',
    categories: ['Moda'],
  },
  {
    link: 'https://meli.la/2UPNHjm',
    categories: ['Moda'],
  },
  {
    link: 'https://meli.la/2G1Hi2X',
    categories: ['Moda'],
  },
  {
    link: 'https://meli.la/1N4RPns',
    categories: ['Moda'],
  },
  {
    link: 'https://meli.la/117XvGz',
    categories: ['Moda'],
  },
  {
    link: 'https://meli.la/1NxGnci',
    categories: ['Moda'],
  },
  {
    link: 'https://meli.la/27UGn2Y',
    categories: ['Moda'],
  },
  {
    link: 'https://meli.la/2uN1a5t',
    categories: ['Moda'],
  },
]
