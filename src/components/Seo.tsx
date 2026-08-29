import { useEffect } from 'react';
export function Seo({title,description}:{title:string;description:string}){useEffect(()=>{document.title=`${title} | Udupi Hoovu`; const meta=document.querySelector('meta[name="description"]'); meta?.setAttribute('content',description);},[title,description]); return null;}
