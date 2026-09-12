import type { CartItem, CustomerDetails, DeliveryArea, EnquiryDetails, Product } from '../types';
import { websiteSettings } from '../data/settings';
import { daysUntilDate } from './validation';
import { orderPolicy } from '../data/orderPolicy';

export const createWhatsAppUrl=(number:string,message:string)=>`https://wa.me/${number.replace(/\D/g,'')}?text=${encodeURIComponent(message)}`;

export const generateMarketingOptInMessage=()=>[
  '*START WHATSAPP OFFERS*',
  '',
  `I agree to receive flower availability, daily price updates and promotional offers from ${websiteSettings.englishName} on WhatsApp.`,
  'I understand that I can reply STOP at any time to unsubscribe.',
].join('\n');

export const generateOrderMessage=(items:CartItem[],allProducts:Product[],customer:CustomerDetails,area:DeliveryArea,deliveryCharge:number)=>{
  const lines=items.map((item,index)=>{
    const product=allProducts.find(candidate=>candidate.id===item.productId);
    return product?`${index+1}. ${product.name} (${product.productCode})\n   Qty: ${item.quantity} ${product.unit} · Rate: TO BE CONFIRMED · Amount: TO BE CONFIRMED`:'';
  }).filter(Boolean);
  const daysAhead = daysUntilDate(customer.deliveryDate);
  const pricingNote = daysAhead === 1 ? `Tomorrow delivery: check tomorrow’s market rate after ${orderPolicy.priceUpdateHour}:00 and send the final bill before the evening slot.` : `Delivery is ${daysAhead} days away: use the market rate on ${customer.deliveryDate} after the daily update before dispatch.`;
  const requestId = `UM-${customer.deliveryDate.replace(/-/g,'')}-${customer.mobile.slice(-4)}`;
  return [`🌸 *${websiteSettings.shopName.toUpperCase()}*`,`_${websiteSettings.englishName} · Fresh jasmine from Udupi_`,'','*PROVISIONAL BILL / ORDER REQUEST*',`Reference: ${requestId}`,`Issued: ${new Date().toLocaleDateString('en-IN')}`,'','*Items — final rates pending*',...lines,'','*BILLING SUMMARY*','Flower total: TO BE CONFIRMED',`Delivery (${area.areaName}): ${deliveryCharge===0?'FREE AFTER MINIMUM': 'TO BE CONFIRMED'}`,'TOTAL DUE: TO BE CONFIRMED','', '*RATE POLICY*',pricingNote,`Delivery slot: after ${orderPolicy.deliveryStartHour}:00 (6:00 PM onwards).`,'The final bill is shared after the delivery-day rate is checked. If the rate is not suitable, hold dispatch until the customer approves or revises the order. Free delivery applies to orders meeting the ₹2,000 minimum.','','*CUSTOMER & DELIVERY*',`Name: ${customer.name}`,`Mobile: ${customer.mobile}`,`Delivery area: ${area.areaName}`,`Address: ${customer.address}`,`Landmark: ${customer.landmark||'Not provided'}`,`Live location: ${customer.locationUrl||'Not shared'}`,`Delivery: ${customer.deliveryDate}, ${customer.deliveryTime}`,'','Please confirm availability, delivery-day rates, final bill, delivery time and payment details.'].join('\n');
};

export const generateEnquiryMessage=(enquiry:EnquiryDetails)=>[`🌺 *CUSTOM FLOWER ENQUIRY — ${websiteSettings.shopName}*`,'',`Name: ${enquiry.name}`,`Mobile: ${enquiry.mobile}`,`Function: ${enquiry.functionType}`,`Date: ${enquiry.functionDate}`,`Venue: ${enquiry.venue}`,`Requirements: ${enquiry.requirements}`,`Expected quantity: ${enquiry.expectedQuantity||'To be discussed'}`,`Estimated budget: ${enquiry.budget||'To be discussed'}`,`Additional information: ${enquiry.additionalInfo||'None'}`,'','Please contact me with availability and an estimate.'].join('\n');
