import { createContext, useContext, useState, type ReactNode } from 'react';
interface ToastValue { showToast:(message:string)=>void }
const ToastContext=createContext<ToastValue|null>(null);
export function ToastProvider({children}:{children:ReactNode}){const [message,setMessage]=useState(''); const showToast=(next:string)=>{setMessage(next); window.setTimeout(()=>setMessage(''),2600)}; return <ToastContext.Provider value={{showToast}}>{children}{message&&<div role="status" aria-live="polite" className="fixed bottom-24 left-1/2 z-[60] -translate-x-1/2 rounded-xl bg-slate-900 px-5 py-3 text-center font-semibold text-white shadow-xl">{message}</div>}</ToastContext.Provider>}
export const useToast=()=>{const value=useContext(ToastContext); if(!value)throw new Error('useToast must be inside ToastProvider'); return value;};
