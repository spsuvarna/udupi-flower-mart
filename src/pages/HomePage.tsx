import { ArrowRight, CalendarDays, Clock3, Heart, MapPin, MessageCircle, ShieldCheck, ShoppingBag, Sparkles, Truck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ProductCard } from '../components/ProductCard';
import { Seo } from '../components/Seo';
import { banners } from '../data/banners';
import { products } from '../data/products';
import { websiteSettings } from '../data/settings';
import { formatCurrency } from '../utils/currency';
import { createWhatsAppUrl } from '../utils/whatsapp';

export function HomePage() {
  const whatsapp = createWhatsAppUrl(websiteSettings.whatsappNumber, `Hello ${websiteSettings.shopName}! I would like help ordering Mallige or Jaaji for tomorrow.`);
  const kateelAmmaImage = `${import.meta.env.BASE_URL}assets/banners/kateel-amma.jpg`;

  return <>
    <Seo title="Fresh Mallige & Jaaji in Udupi" description={`Order fresh Mallige and Jaaji one day in advance from ${websiteSettings.shopName}. Final pricing is confirmed for your delivery day.`}/>

    <section className="relative overflow-hidden bg-gradient-to-br from-[#FFF6DC] via-cream to-[#FFE4D6]">
      <div className="absolute -left-24 top-20 h-64 w-64 rounded-full border-[50px] border-gold/10"/>
      <div className="absolute right-[42%] top-8 h-20 w-20 rounded-full bg-floral/10 blur-2xl"/>
      <div className="container-page relative grid items-center gap-6 py-5 lg:grid-cols-[1fr_1.05fr]">
        <div className="z-10">
          <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold text-forest shadow-sm"><MapPin size={17} className="text-saffron"/>Freshly tied in Udupi</span>
          <p className="mt-3 flex items-center gap-2 font-bold uppercase tracking-[.2em] text-saffron"><Sparkles size={17}/>Fragrance made with care</p>
          <h1 className="mt-2 max-w-2xl font-serif text-4xl font-bold leading-[1.04] text-forest sm:text-5xl">Udupi Mallige for <span className="text-floral">beautiful moments.</span></h1>
          <p className="mt-3 max-w-xl text-base leading-relaxed text-slate-600">Traditional Mallige and Jaaji, prepared with care for your pooja, celebrations and everyday traditions.</p>

          <div className="mt-4 grid max-w-2xl grid-cols-1 gap-2 sm:grid-cols-3">
            <div className="rounded-xl border border-gold/30 bg-white/90 p-3 shadow-soft"><span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Today’s Mallige</span><strong className="mt-0.5 block text-2xl text-forest">{formatCurrency(products[0].discountPrice)}</strong><span className="text-[11px] text-slate-500">per {products[0].unit}</span></div>
            <div className="rounded-xl border border-gold/30 bg-white/90 p-3 shadow-soft"><span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Today’s Jaaji</span><strong className="mt-0.5 block text-2xl text-forest">{formatCurrency(products[1].discountPrice)}</strong><span className="text-[11px] text-slate-500">per {products[1].unit}</span></div>
            <div className="rounded-xl border border-gold/30 bg-white/90 p-3 shadow-soft"><span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Mallige 1 Atte</span><strong className="mt-0.5 block text-2xl text-forest">{formatCurrency(products[2].discountPrice)}</strong><span className="text-[11px] text-slate-500">4 chendu</span></div>
          </div>

          <div className="mt-4 flex max-w-xl items-start gap-3 rounded-2xl bg-forest p-4 text-white shadow-lift"><Clock3 className="mt-0.5 shrink-0 text-gold" size={22}/><p className="text-sm leading-relaxed"><strong className="block text-white">₹2,000 minimum with FREE delivery</strong><span className="text-white/75">Book at least one day early. Final flower pricing is confirmed for your delivery day.</span></p></div>

          <div className="mt-4 flex flex-wrap gap-3"><Link to="/products" className="btn-primary"><ShoppingBag size={20}/>Order for tomorrow</Link><a href={whatsapp} target="_blank" rel="noreferrer" className="btn-secondary"><MessageCircle size={19}/>Ask us</a></div>
        </div>

        <div className="relative">
          <div className="absolute -inset-4 rotate-2 rounded-[2.5rem] border-2 border-gold/35"/>
          <img src={banners[0].imagePath} alt="Fresh jasmine flowers lovingly hand-tied at Udupi Mallige" width="800" height="520" className="relative aspect-[3/2] w-full rounded-[2rem] object-cover object-[center_15%] shadow-2xl"/>
          <div className="absolute bottom-3 left-3 flex items-center gap-2 rounded-xl bg-white p-3 shadow-lift sm:left-6"><span className="grid h-9 w-9 place-items-center rounded-full bg-floral/10 text-floral"><Heart fill="currentColor" size={18}/></span><p><strong className="block text-sm text-forest">Tied with care</strong><span className="text-xs text-slate-500">Fresh for your chosen day</span></p></div>
        </div>
      </div>
    </section>

    <section className="container-page py-9">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><p className="font-bold uppercase tracking-widest text-floral">Today’s fresh rates</p><h2 className="section-title mt-2">Choose your jasmine</h2><p className="mt-2 text-slate-500">Displayed prices are estimates; the delivery-day rate is confirmed before dispatch.</p></div><Link to="/products" className="inline-flex items-center gap-1 font-bold text-saffron">View shop <ArrowRight size={18}/></Link></div>
      <div className="mt-5 grid max-w-5xl gap-4 sm:grid-cols-3">{products.map(product => <ProductCard key={product.id} product={product}/>)}</div>
    </section>

    <section className="bg-white py-9"><div className="container-page"><div className="text-center"><p className="font-bold uppercase tracking-widest text-saffron">Easy and personal</p><h2 className="section-title mt-2">Three simple steps</h2></div><div className="mt-5 grid gap-4 md:grid-cols-3">
      {[[ShoppingBag,'1. Build ₹2,000 order','Choose Mallige or Jaaji at the current listed rate.'],[CalendarDays,'2. Choose your date','Book tomorrow or later; rates follow your delivery day.'],[MessageCircle,'3. Confirm','We confirm availability and the final amount before dispatch.']].map(([Icon,title,text]) => <article key={String(title)} className="rounded-2xl border border-forest/10 p-6 transition hover:-translate-y-1 hover:shadow-soft"><span className="grid h-12 w-12 place-items-center rounded-full bg-saffron/10 text-saffron"><Icon size={23}/></span><h3 className="mt-5 text-xl font-bold">{String(title)}</h3><p className="mt-2 leading-relaxed text-slate-500">{String(text)}</p></article>)}
    </div></div></section>

    <section className="bg-white py-8"><div className="container-page grid overflow-hidden rounded-[2rem] bg-[#FFF7E4] shadow-lift lg:grid-cols-[1.05fr_1fr]"><div className="p-6 sm:p-8"><p className="font-bold uppercase tracking-widest text-saffron">Auspicious offering</p><h2 className="mt-2 font-serif text-3xl font-bold text-forest sm:text-4xl">Kateel Amma blessings</h2><p className="mt-2 max-w-xl leading-relaxed text-slate-600">Offer fresh Mallige with devotion for your family pooja or temple visit. We prepare each chendu and atte for your chosen date.</p><Link to="/products" className="btn-primary mt-4">Order pooja Mallige</Link></div><img src={kateelAmmaImage} alt="Kateel Amma shrine decorated with jasmine flowers" width="800" height="600" loading="lazy" className="min-h-56 w-full object-cover lg:min-h-full"/></div></section>

    <section className="container-page py-8"><div className="grid overflow-hidden rounded-[2rem] bg-forest text-white shadow-lift lg:grid-cols-[1fr_auto]">
      <div className="p-6 sm:p-8"><p className="font-bold uppercase tracking-widest text-gold">Udupi Mallige promise</p><h2 className="mt-3 font-serif text-3xl font-bold text-white sm:text-4xl">Freshness you can feel. Service you can trust.</h2><p className="mt-2 max-w-2xl leading-relaxed text-white/75">Every order is personally checked and confirmed. Need another flower? Tell us the name, quantity and date—we will check local availability.</p><div className="mt-5 flex flex-wrap gap-3"><a href={whatsapp} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#25D366] px-5 py-2.5 font-bold text-white"><MessageCircle/>Chat on WhatsApp</a><Link to="/custom-order" className="inline-flex min-h-11 items-center justify-center rounded-xl border-2 border-white px-5 py-2.5 font-bold text-white">Custom flower help</Link></div></div>
      <div className="hidden w-64 place-items-center bg-white/5 lg:grid"><Heart size={96} className="text-gold/70"/></div>
    </div></section>

    <section className="container-page pb-8"><div className="grid gap-4 md:grid-cols-3">{[[Truck,'Local delivery','Delivery charges and timing are shown before you order.'],[Clock3,'Delivery-day pricing','The final flower rate follows your selected delivery date.'],[ShieldCheck,'Human confirmation','Our team confirms availability, final amount and timing.']].map(([Icon,title,text]) => <div key={String(title)} className="flex gap-4 rounded-2xl bg-white p-5 shadow-soft"><span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-gold/15 text-saffron"><Icon size={24}/></span><div><h3 className="font-bold">{String(title)}</h3><p className="mt-1 text-sm text-slate-500">{String(text)}</p></div></div>)}</div></section>
  </>;
}
