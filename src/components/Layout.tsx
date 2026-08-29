import { type FormEvent, useState } from 'react';
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { HeartHandshake, Home, MapPin, MessageCircle, PackageSearch, Phone, Search, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { websiteSettings } from '../data/settings';
import { createWhatsAppUrl } from '../utils/whatsapp';
import { BrandLogo } from './BrandLogo';

const desktopLinks = [['/products','Flowers'],['/custom-order','Custom order'],['/delivery','Delivery'],['/contact','Contact']];
const mobileLinks = [
  {to:'/',label:'Home',Icon:Home},
  {to:'/products',label:'Browse',Icon:PackageSearch},
  {to:'/custom-order',label:'Custom',Icon:HeartHandshake},
  {to:'/cart',label:'Cart',Icon:ShoppingBag},
];

export function Layout(){
  const [search,setSearch]=useState('');
  const {count}=useCart();
  const location=useLocation();
  const navigate=useNavigate();
  const whatsApp=createWhatsAppUrl(websiteSettings.whatsappNumber,`Hello ${websiteSettings.shopName}! I would like help choosing flowers.`);
  const submitSearch=(event:FormEvent)=>{event.preventDefault(); const query=search.trim(); navigate(query?`/products?q=${encodeURIComponent(query)}`:'/products');};

  return <div className="flex min-h-screen flex-col bg-cream">
    <a href="#main-content" className="sr-only z-[100] bg-white p-3 focus:not-sr-only focus:fixed focus:left-3 focus:top-3">Skip to main content</a>
    <div className="traditional-border border-t-4 bg-forest text-white">
      <div className="container-page flex min-h-9 items-center justify-center gap-2 py-1.5 text-center text-xs font-semibold sm:justify-between sm:text-sm">
        <span>Fresh flowers from 6 AM · Same-day delivery available</span>
        <a href={`tel:${websiteSettings.phone.replace(/\s/g,'')}`} className="hidden items-center gap-1.5 hover:underline sm:flex"><Phone size={14}/> {websiteSettings.phone}</a>
      </div>
    </div>
    <header className="sticky top-0 z-50 border-b border-forest/10 bg-cream/95 shadow-[0_4px_20px_rgba(20,63,50,.06)] backdrop-blur-xl">
      <div className="container-page flex min-h-[76px] items-center gap-4 py-2">
        <Link to="/" aria-label="Udupi Hoovu home" className="shrink-0"><BrandLogo/></Link>
        <button type="button" onClick={()=>navigate('/delivery')} className="hidden min-w-0 items-center gap-2 border-l border-forest/15 pl-4 text-left md:flex">
          <MapPin className="shrink-0 text-saffron" size={20}/><span className="min-w-0"><small className="block font-bold text-slate-500">DELIVER TO</small><strong className="block max-w-40 truncate text-sm text-forest">Udupi district</strong></span>
        </button>
        <form onSubmit={submitSearch} className="relative ml-auto hidden max-w-md flex-1 lg:block">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={19}/>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search Mallige, marigold, pooja flowers…" className="w-full border-0 bg-white pl-11 shadow-sm" aria-label="Search flowers"/>
        </form>
        <nav className="ml-auto hidden items-center gap-1 lg:flex" aria-label="Main navigation">
          {desktopLinks.map(([to,label])=><NavLink key={to} to={to} className={({isActive})=>`rounded-full px-3 py-2 text-sm font-bold transition ${isActive?'bg-forest text-white':'text-slate-700 hover:bg-white hover:text-forest'}`}>{label}</NavLink>)}
        </nav>
        <Link to="/cart" aria-label={`Shopping cart with ${count} items`} className="relative ml-auto grid min-h-12 min-w-12 place-items-center rounded-full bg-white text-forest shadow-sm transition hover:-translate-y-0.5 hover:shadow-soft lg:ml-1">
          <ShoppingBag/>{count>0&&<span className="absolute -right-1 -top-1 min-w-5 rounded-full bg-floral px-1 text-center text-xs font-bold leading-5 text-white">{count}</span>}
        </Link>
      </div>
    </header>
    <main id="main-content" key={`${location.pathname}${location.search}`} className="flex-1"><Outlet/></main>
    <footer className="mt-16 bg-forest text-white">
      <div className="traditional-border border-t-4"><div className="container-page grid gap-10 py-12 md:grid-cols-3">
        <div><BrandLogo inverse/><p className="mt-4 max-w-sm text-white/75">Udupi’s local flowers, thoughtfully prepared for pooja, celebrations and everyday traditions.</p></div>
        <div><h2 className="font-bold text-white">Explore</h2><div className="mt-3 grid grid-cols-2 gap-2 text-white/75">{desktopLinks.map(([to,label])=><Link key={to} to={to} className="hover:text-white hover:underline">{label}</Link>)}</div></div>
        <div><h2 className="font-bold text-white">Order with us</h2><a href={`tel:${websiteSettings.phone.replace(/\s/g,'')}`} className="mt-3 flex items-center gap-2 text-white/75 hover:text-white"><Phone size={18}/>{websiteSettings.phone}</a><a href={whatsApp} target="_blank" rel="noreferrer" className="mt-2 flex items-center gap-2 text-white/75 hover:text-white"><MessageCircle size={18}/>WhatsApp us</a><p className="mt-4 text-sm text-white/55">Availability and delivery time are confirmed personally by our team.</p></div>
      </div></div>
      <div className="border-t border-white/10 py-4 text-center text-sm text-white/55">© {new Date().getFullYear()} {websiteSettings.shopName}. Made for Udupi, with tradition.</div>
    </footer>
    <a href={whatsApp} target="_blank" rel="noreferrer" className="fixed bottom-24 right-4 z-40 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-xl transition hover:scale-105 md:bottom-6 md:right-6 md:h-16 md:w-16" aria-label={`Chat with ${websiteSettings.shopName} on WhatsApp`}><MessageCircle size={28}/></a>
    <nav className="fixed inset-x-0 bottom-0 z-50 grid h-[72px] grid-cols-4 border-t border-forest/10 bg-white/95 px-2 pb-[env(safe-area-inset-bottom)] shadow-[0_-6px_24px_rgba(20,63,50,.1)] backdrop-blur md:hidden" aria-label="Mobile navigation">
      {mobileLinks.map(({to,label,Icon})=><NavLink key={to} to={to} end={to==='/'} className={({isActive})=>`relative flex flex-col items-center justify-center gap-1 text-[11px] font-bold ${isActive?'text-saffron':'text-slate-500'}`}><Icon size={21}/><span>{label}</span>{label==='Cart'&&count>0&&<span className="absolute right-[22%] top-2 min-w-4 rounded-full bg-floral px-1 text-[10px] leading-4 text-white">{count}</span>}</NavLink>)}
    </nav>
  </div>;
}
