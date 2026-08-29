import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { CartItem } from '../types';
import { loadCart, saveCart } from '../utils/storage';

interface CartContextValue { items:CartItem[]; count:number; addItem:(productId:string,quantity:number)=>void; setQuantity:(productId:string,quantity:number)=>void; removeItem:(productId:string)=>void; clearCart:()=>void }
const CartContext=createContext<CartContextValue|null>(null);
export function CartProvider({children}:{children:ReactNode}){
  const [items,setItems]=useState<CartItem[]>(()=>loadCart());
  useEffect(()=>saveCart(items),[items]);
  const value=useMemo<CartContextValue>(()=>({items,count:items.reduce((n,i)=>n+i.quantity,0),addItem:(productId,quantity)=>setItems(current=>{const found=current.find(i=>i.productId===productId); return found?current.map(i=>i.productId===productId?{...i,quantity:i.quantity+quantity}:i):[...current,{productId,quantity}]}),setQuantity:(productId,quantity)=>setItems(current=>quantity<=0?current.filter(i=>i.productId!==productId):current.map(i=>i.productId===productId?{...i,quantity}:i)),removeItem:productId=>setItems(current=>current.filter(i=>i.productId!==productId)),clearCart:()=>setItems([])}),[items]);
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
export const useCart=()=>{const value=useContext(CartContext); if(!value)throw new Error('useCart must be inside CartProvider'); return value;};
