import { Gift, ShoppingBag, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { QuantitySelector } from '../components/QuantitySelector';
import { Seo } from '../components/Seo';
import { useCart } from '../context/CartContext';
import { orderPolicy } from '../data/orderPolicy';
import { products } from '../data/products';
import { calculateSubtotal } from '../utils/cart';
import { formatCurrency } from '../utils/currency';

export function CartPage() {
  const {items, setQuantity, removeItem, clearCart} = useCart();
  const subtotal = calculateSubtotal(items, products);
  const populated = items.map(item => ({item, product:products.find(product => product.id === item.productId)})).filter(row => row.product);
  const amountNeeded = Math.max(0, orderPolicy.minimumFlowerTotal - subtotal);
  const minimumReached = subtotal >= orderPolicy.minimumFlowerTotal;
  const progress = Math.min(100, (subtotal / orderPolicy.minimumFlowerTotal) * 100);
  const clear = () => {if (window.confirm('Clear every item from your cart?')) clearCart();};

  return <>
    <Seo title="Shopping Cart" description="Build a minimum ₹2,000 flower order and receive free delivery."/>
    <header className="bg-white py-8"><div className="container-page"><p className="font-bold uppercase tracking-widest text-saffron">Free delivery on every accepted order</p><h1 className="mt-2 font-serif text-4xl font-bold">Your flower cart</h1><p className="mt-2 text-slate-600">Minimum flower total: {formatCurrency(orderPolicy.minimumFlowerTotal)}</p></div></header>
    <div className="container-page py-8">
      {!populated.length ? <div className="py-16 text-center"><ShoppingBag className="mx-auto text-floral" size={70}/><h2 className="mt-5 text-3xl font-bold">Your cart is waiting for flowers</h2><p className="mt-3 text-slate-600">Choose fresh Mallige or Jaaji to begin.</p><Link to="/products" className="btn-primary mt-7">Start shopping</Link></div> : <div className="grid gap-7 lg:grid-cols-[1fr_360px]">
        <div className="space-y-4">{populated.map(({item, product}) => product && <article key={item.productId} className="card flex gap-4 p-4 sm:items-center"><Link to={`/products/${product.slug}`}><img src={product.imagePath} alt={product.name} width="140" height="105" className="h-24 w-24 rounded-xl object-cover sm:h-28 sm:w-32"/></Link><div className="min-w-0 flex-1"><Link to={`/products/${product.slug}`}><h2 className="line-clamp-2 text-lg font-bold">{product.name}</h2></Link><p className="mt-1 text-sm text-slate-500">{formatCurrency(product.discountPrice)} / {product.unit}</p><div className="mt-3 flex flex-wrap items-center justify-between gap-3"><QuantitySelector value={item.quantity} min={product.minimumOrderQuantity} onChange={value => setQuantity(product.id, value)}/><span className="font-extrabold text-forest">{formatCurrency(product.discountPrice * item.quantity)}</span><button onClick={() => removeItem(product.id)} aria-label={`Remove ${product.name}`} className="grid min-h-11 min-w-11 place-items-center rounded-xl text-red-600 hover:bg-red-50"><Trash2 size={20}/></button></div></div></article>)}<button onClick={clear} className="font-bold text-red-700 underline">Clear cart</button></div>

        <aside className="h-fit rounded-2xl bg-forest p-6 text-white shadow-lift lg:sticky lg:top-28"><div className="flex items-center justify-between"><h2 className="text-2xl font-bold text-white">Order summary</h2><Gift className="text-gold"/></div><div className="mt-5 flex justify-between border-b border-white/15 pb-4"><span className="text-white/70">Flower total</span><strong className="text-xl">{formatCurrency(subtotal)}</strong></div><div className="mt-4"><div className="flex justify-between text-sm"><span className="text-white/70">₹2,000 minimum</span><strong>{Math.round(progress)}%</strong></div><div className="mt-2 h-2 overflow-hidden rounded-full bg-white/15"><div className={`h-full rounded-full ${minimumReached?'bg-[#46D889]':'bg-gold'}`} style={{width:`${progress}%`}}/></div>{minimumReached ? <p className="mt-3 rounded-xl bg-[#46D889]/15 p-3 text-sm font-bold text-[#7CF0B1]">✓ Minimum reached · FREE delivery</p> : <p className="mt-3 rounded-xl bg-gold/15 p-3 text-sm font-bold text-gold">Add {formatCurrency(amountNeeded)} more to checkout</p>}</div>{minimumReached ? <Link to="/checkout" className="mt-5 inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-[#25D366] px-5 py-3 font-bold text-white hover:bg-[#20bd5a]">Continue to checkout</Link> : <button disabled className="mt-5 min-h-12 w-full rounded-xl bg-white/15 px-5 py-3 font-bold text-white/50">Minimum not reached</button>}<Link to="/products" className="mt-3 block text-center font-bold text-white/75 hover:text-white hover:underline">← Continue shopping</Link></aside>
      </div>}
    </div>
  </>;
}
