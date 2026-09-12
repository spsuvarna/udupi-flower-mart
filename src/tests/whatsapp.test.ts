import { describe, expect, it } from 'vitest';
import { generateOrderMessage, createWhatsAppUrl, generateMarketingOptInMessage } from '../utils/whatsapp';
import { products } from '../data/products';
import { deliveryAreas } from '../data/deliveryAreas';
import type { CustomerDetails } from '../types';

const customer: CustomerDetails = {name:'Asha Pai',mobile:'9876543210',address:'12 Temple Road',landmark:'Near temple',locationUrl:'https://www.google.com/maps?q=13.3409,74.7421',deliveryDate:'2030-01-01',deliveryTime:'9:00 AM–12:00 PM'};

describe('WhatsApp generation', () => {
  it('includes items, totals and delivery details', () => {
    const message = generateOrderMessage([{productId:'p1',quantity:2}], products, customer, deliveryAreas[0], 40);
    expect(message).toContain('Mallige — 1 Chendu');
    expect(message).toContain('Rate: TO BE CONFIRMED');
    expect(message).toContain('TOTAL DUE: TO BE CONFIRMED');
    expect(message).toContain('RATE POLICY');
    expect(message).toContain('Asha Pai');
    expect(message).toContain('google.com/maps?q=13.3409,74.7421');
  });
  it('correctly URL-encodes the complete message', () => {
    const url = createWhatsAppUrl('+91 98765 43210', 'Flowers & pooja 🌸');
    expect(url).toBe(`https://wa.me/919876543210?text=${encodeURIComponent('Flowers & pooja 🌸')}`);
  });
  it('creates an explicit and reversible marketing opt-in', () => {
    const message = generateMarketingOptInMessage();
    expect(message).toContain('START WHATSAPP OFFERS');
    expect(message).toContain('I agree to receive');
    expect(message).toContain('reply STOP');
    expect(message).toContain('Udupi Mallige');
  });
});
