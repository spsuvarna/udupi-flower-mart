import type { CartItem, CustomerDetails, DeliveryArea, EnquiryDetails, Product } from '../types';
import { calculateSubtotal, itemTotal, productPrice } from './cart';
import { formatCurrency } from './currency';

export const createWhatsAppUrl=(number:string,message:string)=>`https://wa.me/${number.replace(/\D/g,'')}?text=${encodeURIComponent(message)}`;

export const generateOrderMessage=(items:CartItem[],allProducts:Product[],customer:CustomerDetails,area:DeliveryArea,deliveryCharge:number)=>{
  const lines=items.map((item,index)=>{
    const product=allProducts.find(candidate=>candidate.id===item.productId);
    return product?`${index+1}. ${product.name} (${product.productCode})\n   ${item.quantity} × ${formatCurrency(productPrice(product))} = ${formatCurrency(itemTotal(item,product))}`:'';
  }).filter(Boolean);
  const subtotal=calculateSubtotal(items,allProducts);
  return ['🌸 *NEW ORDER — Udupi Hoovu*','', '*Items*',...lines,'',`Subtotal: ${formatCurrency(subtotal)}`,`Delivery (${area.areaName}): ${formatCurrency(deliveryCharge)}`,`*Grand total: ${formatCurrency(subtotal+deliveryCharge)}*`,'','*Customer & delivery*',`Name: ${customer.name}`,`Mobile: ${customer.mobile}`,`Address: ${customer.address}`,`Area: ${customer.city}, ${customer.taluk} - ${customer.pinCode}`,`Landmark: ${customer.landmark||'Not provided'}`,`Delivery: ${customer.deliveryDate}, ${customer.deliveryTime}`,`Occasion: ${customer.occasion||'Not specified'}`,`Payment preference: ${customer.paymentPreference}`,`Instructions: ${customer.instructions||'None'}`,'','Please confirm availability, final delivery time and payment details.'].join('\n');
};

export const generateEnquiryMessage=(enquiry:EnquiryDetails)=>['🌺 *CUSTOM FLOWER ENQUIRY — Udupi Hoovu*','',`Name: ${enquiry.name}`,`Mobile: ${enquiry.mobile}`,`Function: ${enquiry.functionType}`,`Date: ${enquiry.functionDate}`,`Venue: ${enquiry.venue}`,`Requirements: ${enquiry.requirements}`,`Expected quantity: ${enquiry.expectedQuantity||'To be discussed'}`,`Estimated budget: ${enquiry.budget||'To be discussed'}`,`Additional information: ${enquiry.additionalInfo||'None'}`,'','Please contact me with availability and an estimate.'].join('\n');
