import { lazy, Suspense } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { Flower2 } from 'lucide-react';
import { Layout } from './components/Layout';
import { CartProvider } from './context/CartContext';
import { ToastProvider } from './context/ToastContext';

const HomePage = lazy(() => import('./pages/HomePage').then(module => ({ default: module.HomePage })));
const ProductsPage = lazy(() => import('./pages/ProductsPage').then(module => ({ default: module.ProductsPage })));
const ProductDetailsPage = lazy(() => import('./pages/ProductDetailsPage').then(module => ({ default: module.ProductDetailsPage })));
const CartPage = lazy(() => import('./pages/CartPage').then(module => ({ default: module.CartPage })));
const CheckoutPage = lazy(() => import('./pages/CheckoutPage').then(module => ({ default: module.CheckoutPage })));
const CustomOrderPage = lazy(() => import('./pages/CustomOrderPage').then(module => ({ default: module.CustomOrderPage })));
const DeliveryPage = lazy(() => import('./pages/DeliveryPage').then(module => ({ default: module.DeliveryPage })));
const ContactPage = lazy(() => import('./pages/ContactPage').then(module => ({ default: module.ContactPage })));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage').then(module => ({ default: module.NotFoundPage })));

function LoadingPage() {
  return <div className="container-page grid min-h-[50vh] place-items-center" role="status"><div className="text-center"><Flower2 className="mx-auto animate-pulse text-floral" size={52}/><p className="mt-3 font-bold text-forest">Preparing fresh flowers…</p></div></div>;
}

export default function App() {
  return <HashRouter><CartProvider><ToastProvider><Suspense fallback={<LoadingPage/>}><Routes><Route element={<Layout/>}><Route path="/" element={<HomePage/>}/><Route path="/products" element={<ProductsPage/>}/><Route path="/products/:slug" element={<ProductDetailsPage/>}/><Route path="/cart" element={<CartPage/>}/><Route path="/checkout" element={<CheckoutPage/>}/><Route path="/custom-order" element={<CustomOrderPage/>}/><Route path="/delivery" element={<DeliveryPage/>}/><Route path="/contact" element={<ContactPage/>}/><Route path="*" element={<NotFoundPage/>}/></Route></Routes></Suspense></ToastProvider></CartProvider></HashRouter>;
}
