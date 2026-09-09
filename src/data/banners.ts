import type { Banner } from '../types';
export const banners: Banner[] = [
  {id:'main',title:'ಉಡುಪಿ ಮಲ್ಲಿಗೆ · Udupi Mallige',subtitle:'Traditional Mallige chendu and atte, plus Jaaji. Book one day in advance; the final rate is confirmed for your delivery day.',imagePath:'/assets/banners/mangalore-mallige-jade.jpg',ctaText:'See today’s prices',ctaLink:'/products'},
  {id:'wedding',title:'Wedding flowers made memorable',subtitle:'Custom varmala, venue flowers and complete floral packages.',imagePath:'/assets/banners/wedding-flowers.svg',ctaText:'Plan a custom order',ctaLink:'/custom-order'},
].map(banner => ({ ...banner, imagePath: `${import.meta.env.BASE_URL}${banner.imagePath.replace(/^\//, '')}` }));
