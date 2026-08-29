import type { CartItem } from '../types';
export const CART_STORAGE_KEY='udupi-flower-mart-cart';
export const loadCart=(storage:Pick<Storage,'getItem'>=localStorage):CartItem[]=>{ try { const raw=storage.getItem(CART_STORAGE_KEY); if(!raw)return[]; const value:unknown=JSON.parse(raw); return Array.isArray(value)?value.filter((item):item is CartItem=>typeof item==='object'&&item!==null&&typeof (item as CartItem).productId==='string'&&Number.isFinite((item as CartItem).quantity)&&(item as CartItem).quantity>0):[]; } catch { return []; } };
export const saveCart=(items:CartItem[],storage:Pick<Storage,'setItem'>=localStorage)=>storage.setItem(CART_STORAGE_KEY,JSON.stringify(items));
export const clearStoredCart=(storage:Pick<Storage,'removeItem'>=localStorage)=>storage.removeItem(CART_STORAGE_KEY);
