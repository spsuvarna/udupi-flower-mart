import type { ReactNode } from 'react';
import { Clock3, ExternalLink, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { Seo } from '../components/Seo';
import { websiteSettings } from '../data/settings';
import { createWhatsAppUrl } from '../utils/whatsapp';

export function ContactPage(){
  const whatsapp=createWhatsAppUrl(websiteSettings.whatsappNumber,`Hello ${websiteSettings.shopName}! I have a question.`);
  return <>
    <Seo title="Contact Us" description={`Call, WhatsApp or visit ${websiteSettings.shopName} for fresh flower orders and custom enquiries.`}/>
    <header className="bg-white py-12"><div className="container-page"><p className="font-bold uppercase tracking-widest text-saffron">We are happy to help</p><h1 className="mt-2 font-serif text-4xl font-bold sm:text-5xl">Talk to Udupi Hoovu</h1><p className="mt-3 text-slate-500">Local guidance, fresh availability and order help from our Udupi team.</p></div></header>
    <div className="container-page grid gap-8 py-10 lg:grid-cols-2">
      <section className="card p-6 sm:p-8"><h2 className="text-2xl font-bold">Shop details</h2><div className="mt-6 space-y-5">
        <Info Icon={MapPin} title="Address"><p>{websiteSettings.address}</p><a href={websiteSettings.googleMapsUrl} target="_blank" rel="noreferrer" className="mt-1 inline-flex items-center gap-1 font-bold text-forest underline">Open in Google Maps <ExternalLink size={15}/></a></Info>
        <Info Icon={Phone} title="Phone"><a href={`tel:${websiteSettings.phone.replace(/\s/g,'')}`} className="font-bold text-forest hover:underline">{websiteSettings.phone}</a></Info>
        <Info Icon={MessageCircle} title="WhatsApp"><a href={whatsapp} target="_blank" rel="noreferrer" className="font-bold text-forest hover:underline">{websiteSettings.phone}</a></Info>
        <Info Icon={Mail} title="Email"><a href={`mailto:${websiteSettings.email}`} className="break-all font-bold text-forest hover:underline">{websiteSettings.email}</a></Info>
        <Info Icon={Clock3} title="Opening hours">{websiteSettings.openingHours.map(hours=><p key={hours}>{hours}</p>)}</Info>
      </div></section>
      <section className="traditional-border rounded-3xl border-t-4 bg-forest p-7 text-white sm:p-10"><p className="font-bold uppercase tracking-widest text-gold">ಉಡುಪಿ ಹೂವು</p><h2 className="mt-3 font-serif text-3xl font-bold text-white">The quickest way to order</h2><p className="mt-4 leading-relaxed text-white/75">Add flowers to your cart for a complete WhatsApp order. For decorations or bulk flowers, send a custom enquiry and our team will guide you.</p><div className="mt-7 grid gap-3"><a href={whatsapp} target="_blank" rel="noreferrer" className="inline-flex min-h-14 items-center justify-center gap-2 rounded-xl bg-[#25D366] px-5 font-bold text-white"><MessageCircle/>Chat on WhatsApp</a><a href={`tel:${websiteSettings.phone.replace(/\s/g,'')}`} className="inline-flex min-h-14 items-center justify-center gap-2 rounded-xl border-2 border-white px-5 font-bold"><Phone/>Call the shop</a></div>
      </section>
    </div>
  </>;
}

function Info({Icon,title,children}:{Icon:typeof MapPin;title:string;children:ReactNode}){return <div className="flex gap-4"><span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-saffron/10 text-saffron"><Icon size={22}/></span><div><h3 className="font-bold">{title}</h3><div className="mt-1 text-slate-600">{children}</div></div></div>}
