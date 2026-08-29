import { describe, expect, it } from 'vitest';
import { generateOrderMessage, createWhatsAppUrl } from '../utils/whatsapp';
import { products } from '../data/products';
import { deliveryAreas } from '../data/deliveryAreas';
import type { CustomerDetails } from '../types';

const customer: CustomerDetails = {name:'Asha Pai',mobile:'9876543210',address:'12 Temple Road',city:'Udupi',taluk:'Udupi',pinCode:'576101',landmark:'Near temple',deliveryDate:'2030-01-01',deliveryTime:'9:00 AM–12:00 PM',occasion:'Pooja',instructions:'White flowers',paymentPreference:'Cash on delivery'};

describe('WhatsApp generation', () => {
  it('includes items, totals and delivery details', () => {
    const message = generateOrderMessage([{productId:'p1',quantity:2}], products, customer, deliveryAreas[0], 40);
    expect(message).toContain('Udupi Mallige (Shankarapura Jasmine)');
    expect(message).toContain('₹320');
    expect(message).toContain('Grand total: ₹360');
    expect(message).toContain('Asha Pai');
    expect(message).toContain('576101');
  });

  it('correctly URL-encodes the complete message', () => {
    const url = createWhatsAppUrl('+91 98765 43210', 'Flowers & pooja 🌸');
    expect(url).toBe(`https://wa.me/919876543210?text=${encodeURIComponent('Flowers & pooja 🌸')}`);
  });
});
