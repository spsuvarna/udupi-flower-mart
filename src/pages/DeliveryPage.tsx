import { CalendarDays, Clock3, MapPin, Truck } from 'lucide-react';
import { Seo } from '../components/Seo';
import { deliveryAreas } from '../data/deliveryAreas';
import { orderPolicy } from '../data/orderPolicy';
import { formatCurrency } from '../utils/currency';

export function DeliveryPage() {
  return <>
    <Seo title="Delivery Areas" description="View scheduled flower delivery charges and minimum order values across Udupi district."/>
    <header className="bg-white py-12"><div className="container-page"><p className="font-bold uppercase tracking-widest text-floral">Clear local delivery</p><h1 className="mt-2 font-serif text-4xl font-bold sm:text-5xl">Where we deliver</h1><p className="mt-3 max-w-2xl text-lg text-slate-600">Please book at least one day in advance. We confirm the exact delivery time on WhatsApp.</p></div></header>
    <div className="container-page py-10">
      <div className="mb-8 flex items-start gap-3 rounded-2xl bg-gold/15 p-5 text-forest"><CalendarDays className="mt-0.5 shrink-0 text-saffron"/><p><strong className="block">₹2,000 minimum · FREE delivery</strong><span className="text-sm text-slate-600">Choose tomorrow or a later date during checkout.</span></p></div>
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">{deliveryAreas.map(area => <article key={area.id} className="card p-6"><div className="flex items-start justify-between gap-3"><div><h2 className="text-2xl font-bold">{area.areaName}</h2><p className="mt-1 flex items-center gap-2 text-slate-500"><MapPin size={16}/>{area.taluk} Taluk</p></div><span className="rounded-xl bg-forest/10 p-3 text-forest"><Truck/></span></div><dl className="mt-5 space-y-3 border-y border-slate-100 py-5"><div className="flex justify-between gap-4"><dt className="text-slate-500">PIN codes</dt><dd className="text-right font-semibold">{area.pinCodes.join(', ')}</dd></div><div className="flex justify-between"><dt className="text-slate-500">Delivery</dt><dd className="font-extrabold text-green-700">FREE</dd></div><div className="flex justify-between"><dt className="text-slate-500">Minimum order</dt><dd className="font-semibold">{formatCurrency(orderPolicy.minimumFlowerTotal)}</dd></div></dl><p className="mt-5 flex items-center gap-2 font-semibold"><Clock3 size={18} className="text-floral"/>{area.estimatedDeliveryTime}</p><p className="mt-3 flex items-center gap-2 text-sm font-bold text-slate-500"><CalendarDays size={18}/> Advance booking required</p></article>)}</div>
      <div className="mt-10 rounded-2xl bg-gold/15 p-6"><h2 className="text-xl font-bold">Outside these areas?</h2><p className="mt-2 text-slate-600">Send a custom enquiry with your venue. We may be able to arrange scheduled delivery for bulk orders elsewhere in Udupi district.</p></div>
    </div>
  </>;
}
