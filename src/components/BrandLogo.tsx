import { websiteSettings } from '../data/settings';

interface BrandLogoProps {
  compact?: boolean;
  inverse?: boolean;
}

export function BrandLogo({ compact = false, inverse = false }: BrandLogoProps) {
  return <span className="inline-flex items-center gap-3">
    <img src={websiteSettings.logoPath} alt="" width="64" height="64" className="h-14 w-14 shrink-0 rounded-full object-cover shadow-sm ring-1 ring-gold/40"/>
    {!compact && <span className="leading-none">
      <strong className={`block font-serif text-[1.22rem] font-bold tracking-tight sm:text-[1.35rem] ${inverse ? 'text-white' : 'text-forest'}`}>{websiteSettings.shopName}</strong>
      <small className={`mt-1 block text-[11px] font-bold uppercase tracking-[.22em] ${inverse ? 'text-white/70' : 'text-saffron'}`}>{websiteSettings.locationName}</small>
    </span>}
  </span>;
}
