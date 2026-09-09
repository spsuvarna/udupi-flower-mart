import { Link } from 'react-router-dom';
import { CalendarDays, Clock3, MessageCircle } from 'lucide-react';
import { ProductCard } from '../components/ProductCard';
import { Seo } from '../components/Seo';
import { products } from '../data/products';
import { websiteSettings } from '../data/settings';

export function ProductsPage() {
  return <>
    <Seo title="Today’s Mallige Chendu, Atte & Jaaji" description={`See today’s Mallige chendu, Mallige atte and Jaaji rates from ${websiteSettings.shopName}. Final pricing follows the delivery date.`}/>
    <header className="border-b border-forest/5 bg-gradient-to-r from-white via-[#FFF9EA] to-[#FFF0E8] py-5"><div className="container-page"><p className="font-bold uppercase tracking-widest text-saffron">Udupi Mallige’s fresh jasmine</p><h1 className="mt-1 font-serif text-3xl font-bold sm:text-4xl">Mallige Chendu, Atte & Jaaji</h1><p className="mt-2 max-w-3xl text-sm text-slate-500">One chendu ₹150 · One atte (4 chendu) ₹600 · Jaaji ₹120. Build a flower order of ₹2,000 or more for free delivery.</p><div className="mt-3 flex max-w-3xl flex-wrap gap-2 rounded-2xl bg-forest p-2.5 text-white"><span className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-3 py-1.5 text-xs font-bold"><Clock3 className="text-gold" size={16}/>Delivery-day final rate</span><span className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-3 py-1.5 text-xs font-bold"><CalendarDays className="text-gold" size={16}/>Order one day in advance</span></div></div></header>
    <div className="container-page py-4">
      <p className="mb-3 text-sm font-semibold text-slate-500">{products.length} flowers available · Choose quantity, then continue to checkout</p>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{products.map(product => <ProductCard key={product.id} product={product}/>)}</div>
      <aside className="mt-5 flex flex-col items-start justify-between gap-3 rounded-2xl bg-gold/15 p-4 sm:flex-row sm:items-center"><div><p className="font-bold uppercase tracking-widest text-saffron">Please remember</p><h2 className="mt-1 text-xl font-bold">Book today for tomorrow or later.</h2><p className="mt-1 text-sm text-slate-600">This helps us source and tie your jasmine at its freshest.</p></div><Link to="/custom-order" className="btn-primary min-h-10 shrink-0 px-4 py-2 text-sm"><MessageCircle size={17}/>Need help?</Link></aside>
    </div>
  </>;
}
