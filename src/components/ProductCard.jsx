import { memo } from 'react'
import { BoltIcon, CheckBadgeIcon, ExternalIcon, ImageIcon } from './Icons.jsx'
import { splitPrice } from '../utils/format.js'
import { getStore } from '../data/stores.js'

// memo: os produtos não mudam, então buscar ou filtrar não redesenha os
// cards que continuam na tela.
export default memo(function ProductCard({ product }) {
  const {
    name,
    link,
    image,
    price,
    oldPrice,
    installment,
    freeShipping,
    highlight,
    officialStore,
    discount: off,
  } = product

  const store = getStore(product.store)
  const { reais, centavos } = splitPrice(price)

  return (
    <article className="card">
      <a className="card-link" href={link} target="_blank" rel="noopener noreferrer sponsored">
        <div className="card-thumb">
          {image ? (
            <img src={image} alt={name} loading="lazy" decoding="async" width="320" height="320" />
          ) : (
            <span className="card-placeholder">
              <ImageIcon size={40} />
              <span>Imagem em breve</span>
            </span>
          )}
          <span className="card-store" style={{ background: store.color, color: store.textColor }}>
            {store.name}
          </span>
        </div>

        <div className="card-body">
          {highlight ? <span className="card-highlight">{highlight}</span> : null}
          <h3 className="card-name">{name}</h3>
          {officialStore ? (
            <p className="card-official">
              Loja oficial <CheckBadgeIcon size={14} />
            </p>
          ) : null}

          {off > 0 ? <span className="card-old">R$ {oldPrice}</span> : null}
          <div className="card-price-row">
            <span className="card-price">
              <span className="currency">R$</span>
              {reais}
              <sup>{centavos}</sup>
            </span>
            {off > 0 ? <span className="card-off">{off}% OFF</span> : null}
          </div>

          {installment ? (
            <p className="card-installment">
              {/* "12x R$ 16,79" vira "em 12x R$ 16,79"; textos como "ou R$ 95,00 em outros meios" ficam como estão */}
              {/^\d/.test(installment) ? `em ${installment}` : installment}
            </p>
          ) : null}

          {freeShipping ? (
            <p className="card-shipping">
              Frete grátis <BoltIcon size={12} />
            </p>
          ) : null}

          <span className="card-cta">
            {store.cta} <ExternalIcon size={14} />
          </span>
        </div>
      </a>
    </article>
  )
})
