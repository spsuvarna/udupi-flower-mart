import { type FormEvent, useState } from 'react';
import { ArrowRight, CalendarDays, ChevronRight, Clock3, HeartHandshake, MapPin, MessageCircle, Search, ShieldCheck, Sparkles, Truck } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { banners } from '../data/banners';
import { occasions } from '../data/occasions';
import { products } from '../data/products';
import { testimonials } from '../data/testimonials';
import { websiteSettings } from '../data/settings';
import { ProductCard } from '../components/ProductCard';
import { Seo } from '../components/Seo';
import { createWhatsAppUrl } from '../utils/whatsapp';

const flowerTypes = [
  {label:'Mallige',sub:'Fragrant local jasmine',image:products[0].imagePath,query:'Mallige'},
  {label:'Sevantige',sub:'Yellow & white blooms',image:products[1].imagePath,query:'Sevantige'},
  {label:'Chendu',sub:'Pooja marigolds',image:products[2].imagePath,query:'Chendu'},
  {label:'Kakada',sub:'Traditional jasmine',image:products[3].imagePath,query:'Kakada'},
  {label:'Aboli',sub:'Coastal orange blooms',image:products[4].imagePath,query:'Aboli'},
  {label:'Roses',sub:'Local seasonal mix',image:products[5].imagePath,query:'Roses'},
];

export function HomePage() {
  const [search,setSearch]=useState('');
  const navigate=useNavigate();
  const banner=banners[0];
  const whatsapp=createWhatsAppUrl(websiteSettings.whatsappNumber,`Hello ${websiteSettings.shopName}! I need help choosing fresh flowers.`);
  const submit=(event:FormEvent)=>{event.preventDefault(); const query=search.trim(); navigate(query?`/products?q=${encodeURIComponent(query)}`:'/products');};

  return <>
    <Seo title="Fresh Local Flower Delivery" description={`Order Udupi Mallige, Sevantige, Chendu Hoovu, Kakada, Aboli, roses and zinnias from ${websiteSettings.shopName}.`}/>

    <section className="relative overflow-hidden bg-gradient-to-br from-[#FFF4D6] via-cream to-[#FCE2D7]">
      <div className="absolute -left-16 top-20 h-52 w-52 rounded-full border-[42px] border-gold/10"/>
      <div className="container-page relative grid min-h-[560px] items-center gap-8 py-10 lg:grid-cols-[1.02fr_.98fr] lg:py-14">
        <div className="z-10">
          <button onClick={()=>navigate('/delivery')} className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold text-forest shadow-sm"><MapPin size={17} className="text-saffron"/>Delivering across Udupi district <ChevronRight size={16}/></button>
          <p className="mt-7 font-bold uppercase tracking-[.22em] text-saffron">Kepula · Rooted in Udupi tradition</p>
          <h1 className="mt-3 max-w-2xl font-serif text-4xl font-bold leading-[1.08] text-forest sm:text-6xl">Fresh local flowers,<br/><span className="text-floral">at your doorstep.</span></h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-slate-600">From fragrant Shankarapura Mallige to bright Chendu Hoovu—order Udupi’s everyday traditions in a few simple taps.</p>
          <form onSubmit={submit} className="mt-7 flex max-w-xl gap-2 rounded-2xl bg-white p-2 shadow-lift">
            <Search className="ml-3 mt-3 shrink-0 text-slate-400" size={22}/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="What flowers do you need today?" className="min-w-0 flex-1 border-0 px-2 shadow-none focus:ring-0" aria-label="Search flowers"/><button className="rounded-xl bg-saffron px-5 font-bold text-white transition hover:bg-temple" type="submit">Search</button>
          </form>
          <div className="mt-5 flex flex-wrap gap-2 text-xs font-bold text-slate-600"><span>Popular:</span>{['Mallige','Pooja','Wedding','Same-day'].map(item=><button key={item} onClick={()=>navigate(`/products?q=${encodeURIComponent(item)}`)} className="rounded-full bg-white/70 px-3 py-1 hover:bg-white">{item}</button>)}</div>
        </div>
        <div className="relative">
          <div className="absolute -inset-4 rotate-2 rounded-[2.5rem] border-2 border-gold/30"/>
          <img src={banner.imagePath} alt={`Fresh local flowers arranged at ${websiteSettings.shopName}`} width="800" height="600" className="relative aspect-[4/3] w-full rounded-[2rem] object-cover shadow-2xl"/>
          <div className="absolute -bottom-4 left-4 flex items-center gap-3 rounded-2xl bg-white p-3 pr-5 shadow-lift sm:left-8"><span className="grid h-11 w-11 place-items-center rounded-full bg-green-100 text-leaf"><Clock3 size={22}/></span><span><strong className="block text-sm text-forest">Freshly prepared</strong><small className="text-slate-500">Delivery slots from 6 AM</small></span></div>
        </div>
      </div>
    </section>

    <section className="container-page py-14">
      <div className="flex items-end justify-between"><div><p className="font-bold uppercase tracking-widest text-floral">What are you looking for?</p><h2 className="section-title mt-2">Shop by flower</h2></div><Link to="/products" className="hidden items-center gap-1 font-bold text-saffron sm:flex">See all <ArrowRight size={18}/></Link></div>
      <div className="hide-scrollbar -mx-4 mt-7 flex snap-x gap-4 overflow-x-auto px-4 pb-4 sm:mx-0 sm:grid sm:grid-cols-3 sm:px-0 lg:grid-cols-6">
        {flowerTypes.map(type=><button key={type.label} onClick={()=>navigate(`/products?q=${encodeURIComponent(type.query)}`)} className="group w-36 shrink-0 snap-start text-left sm:w-auto"><span className="block overflow-hidden rounded-[1.4rem] border-2 border-white bg-white shadow-soft"><img src={type.image} alt="" className="aspect-square w-full object-cover transition duration-300 group-hover:scale-105"/></span><strong className="mt-3 block text-center text-forest">{type.label}</strong><small className="block text-center text-slate-500">{type.sub}</small></button>)}
      </div>
    </section>

    <section className="container-page pb-14">
      <div className="hide-scrollbar grid gap-4 overflow-x-auto sm:grid-cols-3">
        <Link to="/products?occasion=daily" className="min-w-[280px] rounded-3xl bg-forest p-6 text-white shadow-soft"><span className="grid h-11 w-11 place-items-center rounded-full bg-white/15"><Sparkles/></span><p className="mt-5 text-xs font-bold uppercase tracking-widest text-gold">Morning ritual</p><h3 className="mt-1 font-serif text-2xl font-bold text-white">Daily pooja flowers</h3><p className="mt-2 text-sm text-white/70">Fresh picks prepared every morning.</p><span className="mt-5 inline-flex items-center gap-1 font-bold">Shop now <ArrowRight size={17}/></span></Link>
        <Link to="/products?occasion=festival" className="min-w-[280px] rounded-3xl bg-saffron p-6 text-white shadow-soft"><span className="grid h-11 w-11 place-items-center rounded-full bg-white/15"><CalendarDays/></span><p className="mt-5 text-xs font-bold uppercase tracking-widest text-white/70">Plan ahead</p><h3 className="mt-1 font-serif text-2xl font-bold text-white">Festival essentials</h3><p className="mt-2 text-sm text-white/80">Traditional flowers for every celebration.</p><span className="mt-5 inline-flex items-center gap-1 font-bold">Explore <ArrowRight size={17}/></span></Link>
        <Link to="/custom-order" className="min-w-[280px] rounded-3xl bg-floral p-6 text-white shadow-soft"><span className="grid h-11 w-11 place-items-center rounded-full bg-white/15"><HeartHandshake/></span><p className="mt-5 text-xs font-bold uppercase tracking-widest text-white/70">Made for you</p><h3 className="mt-1 font-serif text-2xl font-bold text-white">Wedding & bulk orders</h3><p className="mt-2 text-sm text-white/80">Tell us your date, quantity and tradition.</p><span className="mt-5 inline-flex items-center gap-1 font-bold">Enquire <ArrowRight size={17}/></span></Link>
      </div>
    </section>

    <section className="border-y border-forest/5 bg-white py-14">
      <div className="container-page"><div className="flex items-end justify-between gap-4"><div><p className="font-bold uppercase tracking-widest text-floral">Udupi’s favourites</p><h2 className="section-title mt-2">Bestsellers near you</h2><p className="mt-2 text-slate-500">Popular fresh picks, ready for today’s orders.</p></div><Link to="/products" className="hidden font-bold text-saffron sm:block">View full menu →</Link></div>
      <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">{products.map(product=><ProductCard key={product.id} product={product}/>)}</div></div>
    </section>

    <section className="container-page py-14">
      <div className="overflow-hidden rounded-[2rem] bg-[#F4E4BD] p-7 sm:p-10"><div className="grid items-center gap-10 lg:grid-cols-[.8fr_1.2fr]"><div><p className="font-bold uppercase tracking-[.2em] text-temple">Choose by tradition</p><h2 className="mt-3 font-serif text-3xl font-bold sm:text-4xl">Flowers for every meaningful moment</h2><p className="mt-3 leading-relaxed text-slate-600">Pooja at dawn, a temple seve, a family festival or a wedding—start with the occasion and we’ll show you what fits.</p></div><div className="grid grid-cols-2 gap-3">{occasions.map((occasion,index)=><Link key={occasion.id} to={`/products?occasion=${occasion.id}`} className="group rounded-2xl bg-white/75 p-4 transition hover:-translate-y-1 hover:bg-white hover:shadow-soft"><span className="text-xs font-extrabold text-saffron">0{index+1}</span><h3 className="mt-2 font-bold">{occasion.name}</h3><p className="mt-1 text-xs leading-relaxed text-slate-500">{occasion.description}</p><ChevronRight className="mt-3 text-forest transition group-hover:translate-x-1" size={18}/></Link>)}</div></div></div>
    </section>

    <section className="container-page pb-14"><div className="grid gap-4 md:grid-cols-3">{[[Truck,'Udupi-wide delivery','Clear delivery charges and same-day options by area.'],[Clock3,'Prepared to your slot','Choose a date and preferred delivery time at checkout.'],[ShieldCheck,'Human confirmation','Our team checks freshness and confirms every order.']].map(([Icon,title,text])=><div key={String(title)} className="flex gap-4 rounded-2xl bg-white p-5 shadow-soft"><span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-gold/15 text-saffron"><Icon size={24}/></span><div><h3 className="font-bold">{String(title)}</h3><p className="mt-1 text-sm text-slate-500">{String(text)}</p></div></div>)}</div></section>

    <section className="bg-forest py-14 text-white"><div className="container-page"><div className="flex items-end justify-between"><div><p className="font-bold uppercase tracking-widest text-gold">From our community</p><h2 className="mt-2 font-serif text-3xl font-bold text-white">Loved across Udupi</h2></div></div><div className="hide-scrollbar mt-7 flex gap-4 overflow-x-auto pb-3 md:grid md:grid-cols-3">{testimonials.map(testimonial=><blockquote key={testimonial.id} className="min-w-[285px] rounded-2xl bg-white/10 p-6"><div className="text-gold" aria-label={`${testimonial.rating} out of 5 stars`}>{'★'.repeat(testimonial.rating)}</div><p className="mt-3 leading-relaxed text-white/80">“{testimonial.quote}”</p><footer className="mt-4 font-bold">{testimonial.name} <span className="font-normal text-white/55">· {testimonial.location}</span></footer></blockquote>)}</div></div></section>

    <section className="container-page py-14"><div className="flex flex-col items-start justify-between gap-6 rounded-3xl bg-white p-7 shadow-lift md:flex-row md:items-center"><div><p className="font-bold uppercase tracking-widest text-floral">Need help choosing?</p><h2 className="mt-2 font-serif text-3xl font-bold">Talk to someone who knows the flowers.</h2><p className="mt-2 text-slate-500">Tell us the occasion, date and budget—we’ll guide you.</p></div><a href={whatsapp} target="_blank" rel="noreferrer" className="inline-flex min-h-14 items-center justify-center gap-2 rounded-xl bg-[#25D366] px-6 font-bold text-white"><MessageCircle/>WhatsApp us</a></div></section>
  </>;
}
