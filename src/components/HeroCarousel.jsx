import { useEffect, useState } from 'react'
import {
  ArrowRightIcon,
  BoltIcon,
  CardIcon,
  ChevronLeft,
  ChevronRight,
  ExternalIcon,
  SearchIcon,
  ShieldIcon,
  TagIcon,
  TruckIcon,
} from './Icons.jsx'

// Slides do banner principal. Edite os textos aqui.
// theme: "green" | "amber" | "red"   -   art: ilustração da direita
// href: para onde o botão leva
const SLIDES = [
  {
    theme: 'green',
    art: 'deal',
    eyebrow: 'Seleção do dia',
    title: 'As melhores ofertas das maiores lojas',
    text: 'Mercado Livre, Shopee, Amazon e TikTok Shop reunidos em um só lugar.',
    cta: 'Ver ofertas',
    href: '#produtos',
  },
  {
    theme: 'amber',
    art: 'steps',
    eyebrow: 'Como funciona',
    title: 'Escolha aqui, compre onde preferir',
    text: 'Ao clicar no produto você vai direto para a loja, com sua conta, endereço e pagamento.',
    cta: 'Começar',
    href: '#produtos',
  },
  {
    theme: 'red',
    art: 'shipping',
    eyebrow: 'Economize',
    title: 'Frete grátis em milhares de produtos',
    text: 'Procure o selo de frete grátis nos cards.',
    cta: 'Aproveitar',
    href: '#produtos',
  },
]

// Ilustrações decorativas (lado direito de cada slide).
function DealArt() {
  return (
    <div className="art-deal">
      <div className="art-card art-card-back" />
      <div className="art-card">
        <div className="art-card-thumb">
          <TagIcon size={44} />
          <span className="art-card-off">40% OFF</span>
        </div>
        <span className="art-line w70" />
        <span className="art-line w45" />
        <span className="art-card-old">R$ 99,90</span>
        <span className="art-card-price">R$ 59<sup>90</sup></span>
        <span className="art-card-ship">Frete grátis <BoltIcon size={11} /></span>
      </div>
    </div>
  )
}

const STEPS = [
  { Icon: SearchIcon, text: 'Encontre o produto' },
  { Icon: ExternalIcon, text: 'Clique e vá para a loja' },
  { Icon: ShieldIcon, text: 'Compre com a sua conta' },
]

function StepsArt() {
  return (
    <ol className="art-steps">
      {STEPS.map(({ Icon, text }, i) => (
        <li key={text}>
          <span className="art-step-num">{i + 1}</span>
          <span className="art-step-text">{text}</span>
          <Icon size={20} />
        </li>
      ))}
    </ol>
  )
}

function ShippingArt() {
  return (
    <div className="art-shipping">
      <span className="art-ring" />
      <span className="art-truck"><TruckIcon size={84} strokeWidth={1.4} /></span>
      <span className="art-pill p1"><BoltIcon size={14} /> Frete grátis</span>
      <span className="art-pill p2"><CardIcon size={14} /> Parcelamento</span>
    </div>
  )
}

const ART = { deal: DealArt, steps: StepsArt, shipping: ShippingArt }

const INTERVAL = 6000

const COUNT = SLIDES.length

// Carrossel infinito: a trilha recebe uma cópia do último slide no início e
// uma cópia do primeiro no fim ([3, 1, 2, 3, 1]). Ao chegar numa cópia, a
// trilha salta sem animação para o slide verdadeiro, então o movimento
// parece sempre seguir para o mesmo lado.
const TRACK = [SLIDES[COUNT - 1], ...SLIDES, SLIDES[0]]

const prefersReducedMotion = () =>
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

export default function HeroCarousel() {
  // Posição na trilha: 1..COUNT são os slides reais; 0 e COUNT + 1 são as cópias.
  const [pos, setPos] = useState(1)
  const [animate, setAnimate] = useState(true)
  const [paused, setPaused] = useState(false)
  const index = (pos - 1 + COUNT) % COUNT

  useEffect(() => {
    if (paused || prefersReducedMotion()) return
    const id = setInterval(() => go(1), INTERVAL)
    return () => clearInterval(id)
  }, [paused])

  // Pausa quando a aba fica em segundo plano.
  useEffect(() => {
    const onVisibility = () => setPaused(document.hidden)
    document.addEventListener('visibilitychange', onVisibility)
    return () => document.removeEventListener('visibilitychange', onVisibility)
  }, [])

  // Depois do salto sem animação, religa a animação no quadro seguinte.
  useEffect(() => {
    if (animate) return
    const id = requestAnimationFrame(() => requestAnimationFrame(() => setAnimate(true)))
    return () => cancelAnimationFrame(id)
  }, [animate])

  function go(step) {
    if (prefersReducedMotion()) {
      // Sem animação não há transitionend; troca direto entre os slides reais.
      setPos((p) => ((p - 1 + step + COUNT) % COUNT) + 1)
      return
    }
    // Ignora cliques enquanto a trilha está numa cópia (salto pendente).
    setPos((p) => (p === 0 || p === COUNT + 1 ? p : p + step))
    setAnimate(true)
  }

  function goTo(i) {
    setAnimate(true)
    setPos(i + 1)
  }

  function handleTransitionEnd(event) {
    if (event.target !== event.currentTarget) return
    if (pos === COUNT + 1) {
      setAnimate(false)
      setPos(1)
    } else if (pos === 0) {
      setAnimate(false)
      setPos(COUNT)
    }
  }

  return (
    <section
      className="hero"
      aria-roledescription="carrossel"
      aria-label="Destaques"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div
        className="hero-track"
        style={{
          transform: `translateX(-${pos * 100}%)`,
          transition: animate ? undefined : 'none',
        }}
        onTransitionEnd={handleTransitionEnd}
      >
        {TRACK.map((slide, i) => {
          const Art = ART[slide.art]
          return (
          <div
            key={i}
            className={`hero-slide hero-${slide.theme}`}
            aria-hidden={i !== pos}
            aria-roledescription="slide"
            aria-label={`${((i - 1 + COUNT) % COUNT) + 1} de ${COUNT}`}
          >
            <div className="hero-content">
              <span className="hero-eyebrow">{slide.eyebrow}</span>
              <h2 className="hero-title">{slide.title}</h2>
              <p className="hero-text">{slide.text}</p>
              <a className="hero-cta" href={slide.href} tabIndex={i === pos ? 0 : -1}>
                {slide.cta}
                <ArrowRightIcon size={18} />
              </a>
            </div>
            <div className="hero-art" aria-hidden="true">
              {Art ? <Art /> : null}
            </div>
          </div>
          )
        })}
      </div>

      <button type="button" className="hero-arrow prev" onClick={() => go(-1)} aria-label="Slide anterior">
        <ChevronLeft size={22} />
      </button>
      <button type="button" className="hero-arrow next" onClick={() => go(1)} aria-label="Próximo slide">
        <ChevronRight size={22} />
      </button>

      <div className="hero-dots">
        {SLIDES.map((slide, i) => (
          <button
            key={slide.title}
            type="button"
            className={'hero-dot' + (i === index ? ' is-active' : '')}
            onClick={() => goTo(i)}
            aria-label={`Ir para o slide ${i + 1}`}
            aria-current={i === index}
          />
        ))}
      </div>
    </section>
  )
}
