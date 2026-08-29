import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { ProductCard } from '../components/ProductCard';
import { Seo } from '../components/Seo';
import { products } from '../data/products';
import { categories } from '../data/categories';
import { occasions } from '../data/occasions';
import { websiteSettings } from '../data/settings';

export function ProductsPage(){
  const [params]=useSearchParams();
  const [search,setSearch]=useState(params.get('q')||'');
  const [category,setCategory]=useState(params.get('category')||'');
  const [occasion,setOccasion]=useState(params.get('occasion')||'');
  const [price,setPrice]=useState('all');
  const [sort,setSort]=useState('popular');
  const hasFilters=Boolean(search||category||occasion||price!=='all');
  const clear=()=>{setSearch('');setCategory('');setOccasion('');setPrice('all')};
  const filtered=useMemo(()=>products.filter(product=>{
    const term=search.toLowerCase();
    const matchesText=product.name.toLowerCase().includes(term)||product.description.toLowerCase().includes(term)||product.occasionIds.some(id=>id.includes(term));
    return matchesText&&(!category||product.categoryId===category)&&(!occasion||product.occasionIds.includes(occasion))&&(price==='all'||(price==='under500'?product.discountPrice<500:price==='500to1500'?product.discountPrice>=500&&product.discountPrice<=1500:product.discountPrice>1500));
  }).sort((a,b)=>sort==='name'?a.name.localeCompare(b.name):sort==='low'?a.discountPrice-b.discountPrice:sort==='high'?b.discountPrice-a.discountPrice:b.popularity-a.popularity),[search,category,occasion,price,sort]);

  return <>
    <Seo title="Browse Fresh Flowers" description={`Shop Udupi Mallige, Sevantige, Chendu Hoovu, Kakada, Aboli, roses and zinnias from ${websiteSettings.shopName}.`}/>
    <header className="border-b border-forest/5 bg-white py-9"><div className="container-page"><p className="font-bold uppercase tracking-widest text-saffron">Fresh today in Udupi</p><h1 className="mt-2 font-serif text-4xl font-bold sm:text-5xl">Find your flowers</h1><p className="mt-3 max-w-2xl text-slate-500">Browse local favourites, filter by tradition, and add what you need in a tap.</p></div></header>
    <div className="container-page py-8">
      <div className="sticky top-[76px] z-30 -mx-4 border-y border-forest/5 bg-cream/95 px-4 py-4 backdrop-blur sm:static sm:mx-0 sm:rounded-2xl sm:border sm:bg-white sm:p-5 sm:shadow-soft">
        <div className="grid gap-3 lg:grid-cols-5">
          <label className="relative lg:col-span-2"><span className="sr-only">Search products</span><Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20}/><input value={search} onChange={event=>setSearch(event.target.value)} placeholder="Search Mallige, pooja, wedding…" className="w-full bg-white pl-12"/>{search&&<button onClick={()=>setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" aria-label="Clear search"><X size={18}/></button>}</label>
          <label><span className="sr-only">Filter by category</span><select value={category} onChange={event=>setCategory(event.target.value)} className="w-full"><option value="">All flower types</option>{categories.map(item=><option value={item.id} key={item.id}>{item.name}</option>)}</select></label>
          <label><span className="sr-only">Filter by occasion</span><select value={occasion} onChange={event=>setOccasion(event.target.value)} className="w-full"><option value="">Every occasion</option>{occasions.map(item=><option value={item.id} key={item.id}>{item.name}</option>)}</select></label>
          <label><span className="sr-only">Filter by price</span><select value={price} onChange={event=>setPrice(event.target.value)} className="w-full"><option value="all">Any price</option><option value="under500">Under ₹500</option><option value="500to1500">₹500–₹1,500</option><option value="over1500">Over ₹1,500</option></select></label>
        </div>
        <div className="mt-4 flex items-center justify-between gap-3 border-t border-slate-100 pt-4"><p className="text-sm font-semibold text-slate-500"><SlidersHorizontal className="mr-1.5 inline" size={16}/>{filtered.length} item{filtered.length===1?'':'s'} found</p><div className="flex items-center gap-3">{hasFilters&&<button onClick={clear} className="text-sm font-bold text-floral">Clear all</button>}<label className="hidden items-center gap-2 text-sm font-semibold sm:flex">Sort <select value={sort} onChange={event=>setSort(event.target.value)} className="min-h-10 py-2"><option value="popular">Popular</option><option value="name">Name</option><option value="low">Price: low</option><option value="high">Price: high</option></select></label></div></div>
      </div>
      {filtered.length?<div className="mt-7 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">{filtered.map(product=><ProductCard key={product.id} product={product}/>)}</div>:<div className="py-20 text-center"><div className="text-6xl">🌼</div><h2 className="mt-4 text-2xl font-bold">No flowers match that search</h2><p className="mt-2 text-slate-500">Try a flower name or browse the full fresh selection.</p><button className="btn-secondary mt-5" onClick={clear}>Show all flowers</button></div>}
    </div>
  </>;
}
