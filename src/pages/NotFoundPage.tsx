import { Link } from 'react-router-dom';
import { Seo } from '../components/Seo';
import { websiteSettings } from '../data/settings';

export function NotFoundPage(){return <div className="container-page py-24 text-center"><Seo title="Page Not Found" description={`This page could not be found at ${websiteSettings.shopName}.`}/><div className="text-7xl">🌸</div><p className="mt-5 font-bold uppercase tracking-widest text-floral">404 error</p><h1 className="mt-2 font-serif text-4xl font-bold">This path has no flowers</h1><p className="mt-3 text-slate-600">The page may have moved, but fresh flowers are still close by.</p><div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row"><Link to="/" className="btn-primary">Return home</Link><Link to="/products" className="btn-secondary">Browse flowers</Link></div></div>}
