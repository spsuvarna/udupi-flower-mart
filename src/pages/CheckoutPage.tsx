import { useMemo, useState, type FormEvent, type ReactNode } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CalendarCheck2, Clock3, Gift, MessageCircle, ShieldCheck, Sparkles } from 'lucide-react';
import { Seo } from '../components/Seo';
import { useCart } from '../context/CartContext';
import { deliveryAreas } from '../data/deliveryAreas';
import { occasions } from '../data/occasions';
import { orderPolicy } from '../data/orderPolicy';
import { products } from '../data/products';
import type { CustomerDetails } from '../types';
import { calculateDeliveryCharge, calculateSubtotal, meetsMinimumOrder } from '../utils/cart';
import { formatCurrency } from '../utils/currency';
import { daysUntilDate, getMinimumOrderDate, isValidFutureDate, isValidIndianMobile, isValidPinCode } from '../utils/validation';
import { createWhatsAppUrl, generateOrderMessage } from '../utils/whatsapp';
import { websiteSettings } from '../data/settings';

const initial: CustomerDetails = {name:'',mobile:'',address:'',city:'',taluk:'',pinCode:'',landmark:'',deliveryDate:'',deliveryTime:'',occasion:'',instructions:'',paymentPreference:''};

export function CheckoutPage() {
  const {items, clearCart} = useCart();
  const navigate = useNavigate();
  const [form, setForm] = useState(initial);
  const [areaId, setAreaId] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const subtotal = calculateSubtotal(items, products);
  const area = deliveryAreas.find(item => item.id === areaId);
  const delivery = calculateDeliveryCharge(area, subtotal);
  const total = subtotal + delivery;
  const minimumOk = meetsMinimumOrder(area, subtotal);
  const amountNeeded = Math.max(0, orderPolicy.minimumFlowerTotal - subtotal);
  const progress = Math.min(100, (subtotal / orderPolicy.minimumFlowerTotal) * 100);
  const daysAhead = daysUntilDate(form.deliveryDate);
  const advanceBooking = daysAhead >= 1;
  const minDate = useMemo(() => getMinimumOrderDate(), []);
  const set = (key: keyof CustomerDetails, value: string) => setForm(current => ({...current, [key]:value}));

  const submit = (event: FormEvent) => {
    event.preventDefault();
    const next: Record<string, string> = {};
    if (!form.name.trim()) next.name = 'Enter your name.';
    if (!isValidIndianMobile(form.mobile)) next.mobile = 'Enter a valid 10-digit number.';
    if (!form.address.trim()) next.address = 'Enter the delivery address.';
    if (!form.city.trim()) next.city = 'Enter the town or city.';
    if (!form.taluk.trim()) next.taluk = 'Enter the taluk.';
    if (!isValidPinCode(form.pinCode)) next.pinCode = 'Enter a valid Karnataka PIN.';
    if (!isValidFutureDate(form.deliveryDate)) next.deliveryDate = 'Choose tomorrow or later.';
    if (!form.deliveryTime) next.deliveryTime = 'Choose a time.';
    if (!form.paymentPreference) next.paymentPreference = 'Choose a payment preference.';
    if (!area) next.area = 'Choose a delivery area.';
    if (!minimumOk) next.order = `Add ${formatCurrency(amountNeeded)} to reach the ${formatCurrency(orderPolicy.minimumFlowerTotal)} minimum.`;
    setErrors(next);
    if (Object.keys(next).length || !area) {
      document.getElementById('checkout-form')?.scrollIntoView({behavior:'smooth'});
      return;
    }
    window.open(createWhatsAppUrl(websiteSettings.whatsappNumber, generateOrderMessage(items, products, form, area, delivery)), '_blank', 'noopener,noreferrer');
    clearCart();
    navigate('/cart', {replace:true, state:{ordered:true}});
  };

  if (!items.length) return <div className="container-page py-24 text-center"><Seo title="Checkout" description="Complete your Udupi Mallige order."/><h1 className="font-serif text-4xl font-bold">Your cart is empty</h1><p className="mt-3 text-slate-600">Add Mallige or Jaaji to begin your order.</p><Link to="/products" className="btn-primary mt-7">Browse flowers</Link></div>;

  return <>
    <Seo title="Quick Checkout" description="Complete a minimum ₹2,000 Udupi Mallige order with free delivery."/>
    <header className="border-b border-forest/10 bg-gradient-to-r from-white via-[#FFF9EA] to-[#FFF0E8] py-4">
      <div className="container-page flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div><p className="text-xs font-bold uppercase tracking-[.18em] text-saffron">Quick, secure checkout</p><div className="flex items-center gap-3"><h1 className="mt-1 font-serif text-3xl font-bold">Complete your order</h1><Link to="/" className="inline-flex rounded-full border border-forest/20 bg-white px-3 py-1.5 text-xs font-bold text-forest hover:bg-forest hover:text-white">← Home</Link></div></div>
        <div className="flex flex-wrap gap-2 text-xs font-bold"><span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-2 text-forest shadow-sm"><Gift size={16} className="text-floral"/>₹2,000 minimum</span><span className="inline-flex items-center gap-1.5 rounded-full bg-forest px-3 py-2 text-white"><Sparkles size={16} className="text-gold"/>FREE delivery</span></div>
      </div>
    </header>

    <form id="checkout-form" onSubmit={submit} noValidate className="container-page grid gap-5 py-5 lg:grid-cols-[minmax(0,1fr)_340px]">
      <section className="card p-4 sm:p-5 [&_input]:min-h-10 [&_input]:py-2 [&_select]:min-h-10 [&_select]:py-2 [&_textarea]:py-2">
        <div className="mb-4 flex items-center justify-between gap-3"><div><h2 className="text-xl font-bold">Delivery details</h2><p className="text-xs text-slate-500">All required fields are marked * · Delivery is scheduled after 6:00 PM</p></div><span className="hidden items-center gap-1.5 text-xs font-bold text-leaf sm:flex"><ShieldCheck size={17}/>Private WhatsApp order</span></div>
        <div className="grid gap-x-4 gap-y-3 sm:grid-cols-2 lg:grid-cols-6">
          <Field label="Customer name *" error={errors.name} className="lg:col-span-2"><input value={form.name} onChange={event => set('name', event.target.value)} autoComplete="name" placeholder="Your name"/></Field>
          <Field label="Mobile number *" error={errors.mobile} className="lg:col-span-2"><input value={form.mobile} onChange={event => set('mobile', event.target.value)} inputMode="numeric" autoComplete="tel" maxLength={10} placeholder="10-digit number"/></Field>
          <Field label="Delivery area *" error={errors.area} className="lg:col-span-2"><select value={areaId} onChange={event => setAreaId(event.target.value)}><option value="">Choose area</option>{deliveryAreas.map(item => <option key={item.id} value={item.id}>{item.areaName}</option>)}</select></Field>

          <Field label="Delivery address *" error={errors.address} className="sm:col-span-2 lg:col-span-4"><textarea value={form.address} onChange={event => set('address', event.target.value)} rows={2} autoComplete="street-address" placeholder="House, street and locality"/></Field>
          <Field label="Landmark" className="lg:col-span-2"><input value={form.landmark} onChange={event => set('landmark', event.target.value)} placeholder="Nearby place"/></Field>

          <Field label="Town / city *" error={errors.city} className="lg:col-span-2"><input value={form.city} onChange={event => set('city', event.target.value)} autoComplete="address-level2"/></Field>
          <Field label="Taluk *" error={errors.taluk} className="lg:col-span-2"><input value={form.taluk} onChange={event => set('taluk', event.target.value)}/></Field>
          <Field label="PIN code *" error={errors.pinCode} className="lg:col-span-2"><input value={form.pinCode} onChange={event => set('pinCode', event.target.value)} inputMode="numeric" maxLength={6} autoComplete="postal-code"/></Field>

          <Field label="Delivery date *" error={errors.deliveryDate} className="lg:col-span-2"><input type="date" min={minDate} value={form.deliveryDate} onChange={event => set('deliveryDate', event.target.value)}/></Field>
          <Field label="Preferred time *" error={errors.deliveryTime} className="lg:col-span-2"><select value={form.deliveryTime} onChange={event => set('deliveryTime', event.target.value)}><option value="">Choose evening slot</option><option>6:00 PM–8:00 PM</option></select></Field>
          <Field label="Occasion" className="lg:col-span-2"><select value={form.occasion} onChange={event => set('occasion', event.target.value)}><option value="">Optional</option>{occasions.map(occasion => <option key={occasion.id}>{occasion.name}</option>)}</select></Field>

          <Field label="Payment preference *" error={errors.paymentPreference} className="lg:col-span-2"><select value={form.paymentPreference} onChange={event => set('paymentPreference', event.target.value)}><option value="">Choose payment</option><option>Cash on delivery</option><option>UPI after confirmation</option><option>Bank transfer after confirmation</option></select></Field>
          <Field label="Instructions" className="sm:col-span-2 lg:col-span-4"><textarea value={form.instructions} onChange={event => set('instructions', event.target.value)} rows={2} placeholder="Quantity notes, directions or ceremony time"/></Field>
        </div>

        {advanceBooking && <div className="mt-4 flex items-start gap-3 rounded-xl border border-gold/30 bg-gold/10 p-3"><CalendarCheck2 className="mt-0.5 shrink-0 text-saffron" size={20}/><div><strong className="text-sm text-forest">Delivery-day pricing</strong><p className="mt-0.5 text-xs leading-relaxed text-slate-600">{daysAhead === 1 ? 'For tomorrow, the listed amount is an estimate. We confirm the final rate before dispatch.' : `For delivery in ${daysAhead} days, the rate on that delivery day will apply. We confirm the final amount before dispatch.`} If the final rate does not suit you, you can revise or cancel before dispatch.</p></div></div>}
      </section>

      <aside className="h-fit rounded-2xl bg-forest p-5 text-white shadow-lift lg:sticky lg:top-24">
        <div className="flex items-center justify-between"><h2 className="text-xl font-bold text-white">Provisional bill</h2><span className="rounded-full bg-white/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider">Final rate pending</span></div>
        <div className="mt-4 space-y-2.5 border-b border-white/15 pb-4">{items.map(item => {const product = products.find(entry => entry.id === item.productId); return product ? <div key={item.productId} className="flex justify-between gap-3 text-xs"><span className="line-clamp-2 text-white/75">{product.name} × {item.quantity}</span><strong className="shrink-0 text-white">{formatCurrency(product.discountPrice * item.quantity)}</strong></div> : null;})}</div>

        <div className="mt-4"><div className="flex items-end justify-between"><span className="text-sm text-white/70">Minimum progress</span><strong>{Math.round(progress)}%</strong></div><div className="mt-2 h-2 overflow-hidden rounded-full bg-white/15"><div className={`h-full rounded-full transition-all ${minimumOk?'bg-[#46D889]':'bg-gold'}`} style={{width:`${progress}%`}}/></div>{minimumOk ? <p className="mt-2 flex items-center gap-1.5 text-xs font-bold text-[#7CF0B1]"><Gift size={15}/>Minimum reached—delivery is free!</p> : <p className="mt-2 text-xs text-gold">Add {formatCurrency(amountNeeded)} more to order</p>}</div>

        <dl className="mt-4 space-y-2 text-sm"><div className="flex justify-between"><dt className="text-white/65">Listed flower value</dt><dd className="font-bold">{formatCurrency(subtotal)}</dd></div><div className="flex justify-between"><dt className="text-white/65">Delivery</dt><dd className={minimumOk?'font-extrabold text-[#7CF0B1]':'font-bold'}>{minimumOk?'FREE':area?formatCurrency(delivery):'—'}</dd></div><div className="flex justify-between border-t border-white/15 pt-3 text-xl"><dt className="font-bold">Provisional total</dt><dd className="font-extrabold text-gold">{formatCurrency(total)}</dd></div></dl>

        {errors.order && <p className="mt-3 rounded-xl bg-red-400/15 p-3 text-xs font-bold text-red-100" role="alert">{errors.order}</p>}
        <button type="submit" className="mt-4 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] px-4 py-2.5 font-bold text-white transition hover:bg-[#20bd5a] disabled:cursor-not-allowed disabled:opacity-40" disabled={!minimumOk}><MessageCircle size={19}/>Confirm on WhatsApp</button>
        <p className="mt-3 flex gap-2 text-[11px] leading-relaxed text-white/55"><Clock3 size={22} className="shrink-0 text-gold"/>This is a planning value only. The final bill is sent after the delivery-day rate is confirmed.</p>
      </aside>
    </form>
  </>;
}

function Field({label, error, className = '', children}: {label:string; error?:string; className?:string; children:ReactNode}) {
  return <label className={className}><span className="mb-1 block text-xs">{label}</span>{children}{error && <span className="mt-0.5 block text-[11px] font-semibold text-red-700" role="alert">{error}</span>}</label>;
}
