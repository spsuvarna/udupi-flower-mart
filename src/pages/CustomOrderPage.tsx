import { useState, type FormEvent, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { CalendarDays, Home, MessageCircle } from 'lucide-react';
import { Seo } from '../components/Seo';
import { websiteSettings } from '../data/settings';
import type { EnquiryDetails } from '../types';
import { getMinimumOrderDate, isValidFutureDate, isValidIndianMobile } from '../utils/validation';
import { createWhatsAppUrl, generateEnquiryMessage } from '../utils/whatsapp';

const initial: EnquiryDetails = {name:'', mobile:'', functionType:'', functionDate:'', venue:'', requirements:'', expectedQuantity:'', budget:'', additionalInfo:''};

export function CustomOrderPage() {
  const [form, setForm] = useState(initial);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const set = (key: keyof EnquiryDetails, value: string) => setForm(current => ({...current, [key]:value}));
  const submit = (event: FormEvent) => {
    event.preventDefault();
    const next: Record<string, string> = {};
    if (!form.name.trim()) next.name = 'Enter your name.';
    if (!isValidIndianMobile(form.mobile)) next.mobile = 'Enter a valid 10-digit number.';
    if (!form.functionType) next.functionType = 'Choose a function type.';
    if (!isValidFutureDate(form.functionDate)) next.functionDate = 'Choose tomorrow or later.';
    if (!form.venue.trim()) next.venue = 'Enter the venue.';
    if (!form.requirements.trim()) next.requirements = 'Describe the flowers needed.';
    setErrors(next);
    if (Object.keys(next).length) return;
    window.open(createWhatsAppUrl(websiteSettings.whatsappNumber, generateEnquiryMessage(form)), '_blank', 'noopener,noreferrer');
  };

  return <>
    <Seo title="Custom & Bulk Flower Enquiry" description="Request a custom Udupi Mallige enquiry for weddings, temples and bulk functions."/>
    <header className="bg-forest py-7 text-white"><div className="container-page flex flex-col justify-between gap-3 sm:flex-row sm:items-center"><div><p className="font-bold uppercase tracking-widest text-gold">Need more flowers?</p><h1 className="mt-1 font-serif text-4xl font-bold text-white">Custom & bulk enquiry</h1><p className="mt-2 text-sm text-white/75">Tell us what you need and we’ll reply on WhatsApp.</p></div><Link to="/" className="inline-flex w-fit items-center gap-2 rounded-xl border border-white/40 px-4 py-2 text-sm font-bold text-white hover:bg-white hover:text-forest"><Home size={17}/>Home</Link></div></header>
    <div className="container-page py-6"><form onSubmit={submit} noValidate className="card mx-auto max-w-5xl p-4 sm:p-6 [&_input]:min-h-10 [&_input]:py-2 [&_select]:min-h-10 [&_select]:py-2 [&_textarea]:py-2"><div className="mb-4 flex items-center gap-2 text-xs font-semibold text-slate-500"><CalendarDays size={17} className="text-saffron"/>For planned events, submit at least one day ahead.</div><div className="grid gap-x-4 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
      <Field label="Customer name *" error={errors.name}><input value={form.name} onChange={event => set('name', event.target.value)} autoComplete="name" placeholder="Your name"/></Field>
      <Field label="Mobile number *" error={errors.mobile}><input value={form.mobile} onChange={event => set('mobile', event.target.value)} inputMode="numeric" maxLength={10} placeholder="10-digit number"/></Field>
      <Field label="Function type *" error={errors.functionType}><select value={form.functionType} onChange={event => set('functionType', event.target.value)}><option value="">Choose function</option><option>Wedding</option><option>Engagement</option><option>Housewarming</option><option>Temple function</option><option>Birthday / Anniversary</option><option>Festival / Pooja</option><option>Other</option></select></Field>
      <Field label="Function date *" error={errors.functionDate}><input type="date" min={getMinimumOrderDate()} value={form.functionDate} onChange={event => set('functionDate', event.target.value)}/></Field>
      <Field label="Venue *" error={errors.venue}><input value={form.venue} onChange={event => set('venue', event.target.value)} placeholder="Venue and location"/></Field>
      <Field label="Expected quantity"><input value={form.expectedQuantity} onChange={event => set('expectedQuantity', event.target.value)} placeholder="Example: 20 garlands"/></Field>
      <Field wide label="Flower requirements *" error={errors.requirements}><textarea rows={2} value={form.requirements} onChange={event => set('requirements', event.target.value)} placeholder="Mallige, Jaaji, garlands, preferred colours…"/></Field>
      <Field label="Estimated budget"><input value={form.budget} onChange={event => set('budget', event.target.value)} placeholder="Example: ₹15,000"/></Field>
      <Field wide label="Additional information"><textarea rows={2} value={form.additionalInfo} onChange={event => set('additionalInfo', event.target.value)} placeholder="Ceremony time, setup needs or directions"/></Field>
    </div><button type="submit" className="btn-primary mt-5 w-full sm:w-auto"><MessageCircle/>Send enquiry on WhatsApp</button></form></div>
  </>;
}

function Field({label, error, wide, children}: {label:string; error?:string; wide?:boolean; children:ReactNode}) { return <label className={wide ? 'sm:col-span-2 lg:col-span-2' : ''}><span className="mb-1 block text-xs">{label}</span>{children}{error && <span className="mt-0.5 block text-[11px] font-semibold text-red-700" role="alert">{error}</span>}</label>; }
