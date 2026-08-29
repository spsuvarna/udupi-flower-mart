import type { CartItem, DeliveryArea, Product } from '../types';
export const productPrice = (product:Product) => product.discountPrice || product.originalPrice;
export const itemTotal = (item:CartItem, product:Product) => item.quantity * productPrice(product);
export const calculateSubtotal = (items:CartItem[], allProducts:Product[]) => items.reduce((sum,item) => { const p=allProducts.find(product=>product.id===item.productId); return sum+(p?itemTotal(item,p):0); },0);
export const calculateDeliveryCharge = (area:DeliveryArea|undefined, subtotal:number) => !area || subtotal <= 0 ? 0 : area.deliveryCharge;
export const meetsMinimumOrder = (area:DeliveryArea|undefined, subtotal:number) => !area || subtotal >= area.minimumOrderAmount;
