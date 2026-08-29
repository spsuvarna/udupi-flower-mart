import { Clock3, Minus, Plus, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Product } from '../types';
import { formatCurrency } from '../utils/currency';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';

export function ProductCard({product}:{product:Product}){
  const {items,addItem,setQuantity}=useCart();
  const {showToast}=useToast();
  const item=items.find(entry=>entry.productId===product.id);
  const quantity=item?.quantity??0;
  const rating=Math.min(4.9,4.2+(product.popularity/100)*.7).toFixed(1);
  const discount=Math.round((1-product.discountPrice/product.originalPrice)*100);
  const add=()=>{addItem(product.id,product.minimumOrderQuantity);showToast(`${product.name} added to cart`)};

  return <article className="group flex h-full min-w-0 flex-col overflow-hidden rounded-2xl bg-white transition duration-300 hover:-translate-y-1 hover:shadow-lift">
    <Link to={`/products/${product.slug}`} className="relative block overflow-hidden bg-rose-50">
      <img src={product.imagePath} alt={`${product.name} from Udupi Hoovu`} width="600" height="450" loading="lazy" className="aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-105"/>
      {discount>0&&<span className="absolute left-2 top-2 rounded-lg bg-temple px-2 py-1 text-[10px] font-extrabold text-white sm:left-3 sm:top-3 sm:text-xs">{discount}% OFF</span>}
      {!product.available&&<span className="absolute inset-0 grid place-items-center bg-slate-900/55 text-center text-sm font-bold text-white">Temporarily unavailable</span>}
    </Link>
    <div className="flex flex-1 flex-col p-3 sm:p-4">
      <div className="flex items-center gap-2 text-[11px] font-bold text-slate-500"><span className="inline-flex items-center gap-1 text-leaf"><Star size={12} fill="currentColor"/> {rating}</span><span>·</span><span className="inline-flex items-center gap-1"><Clock3 size={12}/> Same-day</span></div>
      <Link to={`/products/${product.slug}`}><h3 className="mt-2 line-clamp-2 text-sm font-bold leading-snug hover:text-floral sm:text-base">{product.name}</h3></Link>
      <p className="mt-1 text-xs text-slate-400">{product.minimumOrderQuantity} {product.unit} minimum</p>
      <div className="mt-auto flex items-end justify-between gap-2 pt-3">
        <div><span className="block text-base font-extrabold text-forest sm:text-lg">{formatCurrency(product.discountPrice)}</span>{product.originalPrice>product.discountPrice&&<del className="text-[11px] text-slate-400">{formatCurrency(product.originalPrice)}</del>}</div>
        {quantity>0?<div className="flex h-9 items-center overflow-hidden rounded-lg border border-saffron bg-white font-extrabold text-saffron shadow-sm"><button onClick={()=>setQuantity(product.id,quantity-1)} className="grid h-full w-8 place-items-center hover:bg-orange-50" aria-label={`Remove one ${product.name}`}><Minus size={15}/></button><span className="min-w-6 text-center text-sm">{quantity}</span><button onClick={()=>setQuantity(product.id,quantity+1)} className="grid h-full w-8 place-items-center hover:bg-orange-50" aria-label={`Add one more ${product.name}`}><Plus size={15}/></button></div>:<button type="button" onClick={add} disabled={!product.available} className="h-9 min-w-16 rounded-lg border border-saffron bg-white px-3 text-xs font-extrabold text-saffron shadow-sm transition hover:bg-saffron hover:text-white disabled:opacity-40 sm:min-w-20 sm:text-sm">ADD</button>}
      </div>
    </div>
  </article>;
}
