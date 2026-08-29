interface BrandLogoProps {
  compact?: boolean;
  inverse?: boolean;
}

export function BrandLogo({ compact = false, inverse = false }: BrandLogoProps) {
  return <span className="inline-flex items-center gap-3">
    <svg viewBox="0 0 64 64" role="img" aria-label="Udupi Hoovu jasmine and temple logo" className="h-12 w-12 shrink-0 drop-shadow-sm">
      <circle cx="32" cy="32" r="30" fill="#FFF8E8" stroke="#E7A72E" strokeWidth="2"/>
      <path d="M13 42c7-13 15-19 27-22-3 9-10 18-27 22Z" fill="#287052"/>
      <path d="M51 42c-7-13-15-19-27-22 3 9 10 18 27 22Z" fill="#41946C"/>
      <path d="M25 24h14l-2-4H27l-2 4Zm3-7h8l-4-7-4 7Z" fill="#E7A72E"/>
      <g fill="#fff" stroke="#E5DED0" strokeWidth=".7">
        <ellipse cx="32" cy="35" rx="5" ry="10"/>
        <ellipse cx="32" cy="35" rx="5" ry="10" transform="rotate(60 32 35)"/>
        <ellipse cx="32" cy="35" rx="5" ry="10" transform="rotate(120 32 35)"/>
      </g>
      <circle cx="32" cy="35" r="4" fill="#D94F70"/>
      <path d="M20 49c7 3 17 3 24 0" fill="none" stroke="#E7A72E" strokeWidth="2" strokeLinecap="round"/>
    </svg>
    {!compact && <span className="leading-none">
      <strong className={`block font-serif text-[1.35rem] font-bold tracking-tight ${inverse ? 'text-white' : 'text-forest'}`}>Udupi Hoovu</strong>
      <small className={`mt-1 block text-[11px] font-bold tracking-[.18em] ${inverse ? 'text-white/70' : 'text-saffron'}`}>ಉಡುಪಿ ಹೂವು</small>
    </span>}
  </span>;
}
