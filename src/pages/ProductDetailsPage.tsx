import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Check, MessageCircle, ShoppingCart, Star, Truck } from 'lucide-react';
import { products } from '../data/products';
import { websiteSettings } from '../data/settings';
import { formatCurrency } from '../utils/currency';
import { createWhatsAppUrl } from '../utils/whatsapp';
import { QuantitySelector } from '../components/QuantitySelector';
import { ProductCard } from '../components/ProductCard';
import { Seo } from '../components/Seo';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';

export function ProductDetailsPage(){
  const {slug}=useParams();
  const product=products.find(item=>item.slug===slug);
  const [quantity,setQuantity]=useState(product?.minimumOrderQuantity||1);
  const [selectedImage,setSelectedImage]=useState(product?.imagePath||'');
  const {addItem}=useCart();
  const {showToast}=useToast();
  if(!product)return <ProductNotFound/>;
  const related=products.filter(item=>item.id!==product.id&&(item.categoryId===product.categoryId||item.occasionIds.some(id=>product.occasionIds.includes(id)))).slice(0,4);
  const buyMessage=`Hello ${websiteSettings.shopName}! I would like to order:\n${product.name} (${product.productCode})\nQuantity: ${quantity} ${product.unit}\nEstimated product total: ${formatCurrency(product.discountPrice*quantity)}\nPlease confirm availability and delivery.`;
  const rating=Math.min(4.9,4.2+(product.popularity/100)*.7).toFixed(1);

  return <>
    <Seo title={product.name} description={product.description}/>
    <div className="container-page py-7">
      <Link to="/products" className="inline-flex items-center gap-2 font-bold text-forest hover:underline"><ArrowLeft size={18}/>Back to flowers</Link>
      <div className="mt-6 grid gap-9 lg:grid-cols-2">
        <div><img src={selectedImage} alt={`${product.name}, fresh flower product`} width="900" height="675" className="aspect-[4/3] w-full rounded-3xl bg-white object-cover shadow-lift"/>{product.additionalImagePaths.length>0&&<div className="mt-3 flex gap-3">{[product.imagePath,...product.additionalImagePaths].map((src,index)=><button key={src} onClick={()=>setSelectedImage(src)} className={`overflow-hidden rounded-xl border-2 ${selectedImage===src?'border-saffron':'border-transparent'}`} aria-label={`View ${product.name} image ${index+1}`}><img src={src} alt="" width="100" height="75" className="h-20 w-24 object-cover"/></button>)}</div>}</div>
        <div className="lg:py-3">
          <div className="flex flex-wrap gap-2"><span className={`badge ${product.available?'bg-green-100 text-green-800':'bg-slate-200 text-slate-700'}`}>{product.available?'Fresh & available':'Unavailable'}</span>{product.sameDayDelivery&&<span className="badge bg-orange-100 text-orange-800"><Truck size={14} className="mr-1"/>Same-day eligible</span>}</div>
          <h1 className="mt-4 font-serif text-4xl font-bold sm:text-5xl">{product.name}</h1>
          <div className="mt-3 flex items-center gap-3 text-sm"><span className="inline-flex items-center gap-1 rounded-full bg-leaf px-2.5 py-1 font-bold text-white"><Star size={13} fill="currentColor"/> {rating}</span><span className="text-slate-400">Product code: {product.productCode}</span></div>
          <p className="mt-5 text-lg leading-relaxed text-slate-600">{product.description}</p>
          <div className="mt-6 flex items-baseline gap-3"><span className="text-3xl font-extrabold text-forest">{formatCurrency(product.discountPrice)}</span>{product.originalPrice>product.discountPrice&&<><del className="text-lg text-slate-400">{formatCurrency(product.originalPrice)}</del><span className="badge bg-floral/10 text-floral">Save {formatCurrency(product.originalPrice-product.discountPrice)}</span></>}</div>
          <p className="mt-2 font-semibold text-slate-500">Price per {product.unit} · Minimum order: {product.minimumOrderQuantity}</p>
          <div className="mt-7"><label className="mb-2 block">Quantity ({product.unit})</label><QuantitySelector value={quantity} onChange={setQuantity} min={product.minimumOrderQuantity}/></div>
          <div className="mt-7 grid gap-3 sm:grid-cols-2"><button disabled={!product.available} onClick={()=>{addItem(product.id,quantity);showToast(`${quantity} ${product.unit} added to cart`)}} className="btn-primary"><ShoppingCart/>Add to cart</button><a href={createWhatsAppUrl(websiteSettings.whatsappNumber,buyMessage)} target="_blank" rel="noreferrer" className="btn-secondary"><MessageCircle/>Buy on WhatsApp</a></div>
          <ul className="mt-7 space-y-2 border-t border-slate-200 pt-6 text-sm text-slate-600"><li className="flex gap-2"><Check className="text-leaf" size={20}/>Freshness and final availability confirmed personally</li><li className="flex gap-2"><Check className="text-leaf" size={20}/>Delivery slot chosen during checkout</li></ul>
        </div>
      </div>
      {related.length>0&&<section className="mt-16"><h2 className="section-title">You may also need</h2><div className="mt-7 grid grid-cols-2 gap-4 md:grid-cols-4">{related.map(item=><ProductCard key={item.id} product={item}/>)}</div></section>}
    </div>
  </>;
}

function ProductNotFound(){return <div className="container-page py-24 text-center"><Seo title="Product Not Found" description="The requested flower product could not be found."/><div className="text-7xl">🌼</div><h1 className="mt-5 font-serif text-4xl font-bold">Product not found</h1><p className="mt-3 text-slate-600">It may have been renamed or removed from our seasonal catalogue.</p><Link to="/products" className="btn-primary mt-7">Browse available flowers</Link></div>}
