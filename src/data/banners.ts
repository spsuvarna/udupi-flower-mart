import type { Banner } from '../types';
export const banners: Banner[] = [
  {id:'main',title:'Udupi’s local flowers, delivered fresh',subtitle:'Mallige, Sevantige, Chendu Hoovu, Kakada, Aboli, roses and zinnias from the flowers Udupi knows best.',imagePath:'/assets/banners/udupi-local-flowers-hero-v2.jpg',ctaText:'Shop local flowers',ctaLink:'/products'},
  {id:'wedding',title:'Wedding flowers made memorable',subtitle:'Custom varmala, venue flowers and complete floral packages.',imagePath:'/assets/banners/wedding-flowers.svg',ctaText:'Plan a custom order',ctaLink:'/custom-order'},
].map(banner => ({ ...banner, imagePath: `${import.meta.env.BASE_URL}${banner.imagePath.replace(/^\//, '')}` }));
