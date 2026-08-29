import type { DeliveryArea } from '../types';
export const deliveryAreas: DeliveryArea[] = [
  {id:'udupi',areaName:'Udupi',taluk:'Udupi',pinCodes:['576101','576102','576103'],deliveryCharge:40,minimumOrderAmount:250,sameDayDelivery:true,estimatedDeliveryTime:'1–2 hours'},
  {id:'manipal',areaName:'Manipal',taluk:'Udupi',pinCodes:['576104'],deliveryCharge:60,minimumOrderAmount:300,sameDayDelivery:true,estimatedDeliveryTime:'2–3 hours'},
  {id:'malpe',areaName:'Malpe',taluk:'Udupi',pinCodes:['576108'],deliveryCharge:70,minimumOrderAmount:350,sameDayDelivery:true,estimatedDeliveryTime:'2–3 hours'},
  {id:'kaup',areaName:'Kaup',taluk:'Kaup',pinCodes:['574106'],deliveryCharge:100,minimumOrderAmount:500,sameDayDelivery:true,estimatedDeliveryTime:'3–4 hours'},
  {id:'brahmavar',areaName:'Brahmavar',taluk:'Brahmavar',pinCodes:['576213'],deliveryCharge:100,minimumOrderAmount:500,sameDayDelivery:true,estimatedDeliveryTime:'3–4 hours'},
  {id:'kundapura',areaName:'Kundapura',taluk:'Kundapura',pinCodes:['576201'],deliveryCharge:160,minimumOrderAmount:800,sameDayDelivery:false,estimatedDeliveryTime:'Next-day / scheduled'},
  {id:'karkala',areaName:'Karkala',taluk:'Karkala',pinCodes:['574104'],deliveryCharge:160,minimumOrderAmount:800,sameDayDelivery:false,estimatedDeliveryTime:'Next-day / scheduled'},
  {id:'hebri',areaName:'Hebri',taluk:'Hebri',pinCodes:['576112'],deliveryCharge:180,minimumOrderAmount:900,sameDayDelivery:false,estimatedDeliveryTime:'Next-day / scheduled'},
  {id:'byndoor',areaName:'Byndoor',taluk:'Byndoor',pinCodes:['576214'],deliveryCharge:250,minimumOrderAmount:1200,sameDayDelivery:false,estimatedDeliveryTime:'Scheduled delivery'},
];
