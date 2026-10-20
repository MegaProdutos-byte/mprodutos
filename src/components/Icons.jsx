// Ícones SVG usados no site (traço simples, herdam a cor do texto).
function Svg({ size = 24, children, ...rest }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...rest}
    >
      {children}
    </svg>
  )
}

export const SearchIcon = (p) => (
  <Svg {...p}><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></Svg>
)
export const TruckIcon = (p) => (
  <Svg {...p}><path d="M2 6h11v10H2zM13 9h4.5L21 12.5V16h-8z" /><circle cx="6" cy="17.5" r="1.8" /><circle cx="17" cy="17.5" r="1.8" /></Svg>
)
export const ShieldIcon = (p) => (
  <Svg {...p}><path d="M12 3 4 6v6c0 4.5 3.4 8 8 9 4.6-1 8-4.5 8-9V6z" /><path d="m8.5 12 2.5 2.5 4.5-5" /></Svg>
)
export const TagIcon = (p) => (
  <Svg {...p}><path d="M3 12V4a1 1 0 0 1 1-1h8l9 9-9 9z" /><circle cx="8" cy="8" r="1.5" /></Svg>
)
export const CardIcon = (p) => (
  <Svg {...p}><rect x="2.5" y="5" width="19" height="14" rx="2" /><path d="M2.5 10h19M6 15h4" /></Svg>
)
export const ChevronLeft = (p) => <Svg {...p}><path d="m15 5-7 7 7 7" /></Svg>
export const ChevronRight = (p) => <Svg {...p}><path d="m9 5 7 7-7 7" /></Svg>
export const CloseIcon = (p) => <Svg {...p}><path d="M6 6l12 12M18 6 6 18" /></Svg>
export const BoltIcon = (p) => (
  <Svg {...p} fill="currentColor" stroke="none"><path d="M13 2 4 14h7l-1 8 9-12h-7z" /></Svg>
)
export const CheckBadgeIcon = (p) => (
  <Svg {...p} fill="currentColor" stroke="none"><path d="M12 2.5 14.6 4.4l3.2-.1 1 3 2.6 1.9-1 3.1 1 3-2.6 1.9-1 3-3.2-.1L12 21.5l-2.6-1.9-3.2.1-1-3-2.6-1.9 1-3-1-3.1 2.6-1.9 1-3 3.2.1z" /><path d="m8.5 12 2.3 2.3 4.7-4.7" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></Svg>
)
export const ArrowRightIcon = (p) => <Svg {...p}><path d="M5 12h14M13 6l6 6-6 6" /></Svg>
export const ExternalIcon =(p) => (
  <Svg {...p}><path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" /></Svg>
)
export const ImageIcon = (p) => (
  <Svg {...p}><rect x="3" y="4" width="18" height="16" rx="2" /><circle cx="9" cy="10" r="1.8" /><path d="m21 16-5-5-9 9" /></Svg>
)
export const GridIcon =(p) => (
  <Svg {...p}><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /></Svg>
)

// Ícone de cada categoria. Categorias sem ícone aqui usam o GridIcon.
export const CATEGORY_ICONS = {
  Games: (p) => (
    <Svg {...p}><path d="M7 7h10a4.5 4.5 0 0 1 4.4 5.5l-1 4.3a2.6 2.6 0 0 1-4.5 1.1L14 16h-4l-1.9 1.9a2.6 2.6 0 0 1-4.5-1.1l-1-4.3A4.5 4.5 0 0 1 7 7Z" /><path d="M8 10v4M6 12h4M15.5 11h.01M17.5 13h.01" /></Svg>
  ),
  Eletrodomésticos: (p) => (
    <Svg {...p}><rect x="4" y="2.5" width="16" height="19" rx="2" /><path d="M4 7h16M7 4.8h.01M10 4.8h.01" /><circle cx="12" cy="14" r="4.5" /><path d="M9.5 14.5c1-.8 1.8.8 2.8 0s1.6-.6 2.2 0" /></Svg>
  ),
  Ferramentas: (p) => (
    <Svg {...p}><path d="M14.7 6.3a4 4 0 0 0 5 5L21 10a5 5 0 0 1-6.6-6.6L13 4.7a4 4 0 0 0 1.7 1.6Z" /><path d="m14.5 9.5-10 10a1.8 1.8 0 0 1-2.5-2.5l10-10" /></Svg>
  ),
  Celulares: (p) => (
    <Svg {...p}><rect x="6" y="2.5" width="12" height="19" rx="2.5" /><path d="M10.5 18.5h3" /></Svg>
  ),
  Informática: (p) => (
    <Svg {...p}><rect x="4" y="4.5" width="16" height="11" rx="1.5" /><path d="M2 19.5h20M9.5 17.5h5" /></Svg>
  ),
  Esportes: (p) => (
    <Svg {...p}><circle cx="12" cy="12" r="9" /><path d="m12 7 4 3-1.5 4.5h-5L8 10z" /><path d="M12 3v4M21 10.5 16 10M3 10.5 8 10M7 19.5l2.5-5M17 19.5l-2.5-5" /></Svg>
  ),
  Moda: (p) => (
    <Svg {...p}><path d="M8 3 3 6l2 4 2-1v12h10V9l2 1 2-4-5-3c-.5 1.7-2 3-4 3S8.5 4.7 8 3Z" /></Svg>
  ),
}

export function CategoryIcon({ name, ...p }) {
  const Icon = CATEGORY_ICONS[name] ?? GridIcon
  return <Icon {...p} />
}
