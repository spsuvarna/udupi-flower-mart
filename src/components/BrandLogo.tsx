import { websiteSettings } from '../data/settings';

interface BrandLogoProps {
  compact?: boolean;
  inverse?: boolean;
}

export function BrandLogo({ compact = false, inverse = false }: BrandLogoProps) {
  return <span className="inline-flex items-center gap-3">
    <img src={websiteSettings.logoPath} alt="" width="64" height="64" className="h-12 w-12 shrink-0 rounded-xl object-cover object-center shadow-sm"/>
    {!compact && <span className="leading-none">
      <strong className={`block font-serif text-[1.22rem] font-bold tracking-tight sm:text-[1.35rem] ${inverse ? 'text-white' : 'text-forest'}`}>{websiteSettings.shopName}</strong>
      <small className={`mt-1 block text-[10px] font-bold uppercase tracking-[.18em] ${inverse ? 'text-white/70' : 'text-saffron'}`}>{websiteSettings.englishName} · {websiteSettings.locationName}</small>
    </span>}
  </span>;
}
