import { useEffect } from 'react';
import { websiteSettings } from '../data/settings';
export function Seo({title,description}:{title:string;description:string}){useEffect(()=>{document.title=`${title} | ${websiteSettings.shopName}`; const meta=document.querySelector('meta[name="description"]'); meta?.setAttribute('content',description);},[title,description]); return null;}
