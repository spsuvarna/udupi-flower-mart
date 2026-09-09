import { describe, expect, it } from 'vitest';
import { calculateDeliveryCharge, calculateSubtotal, meetsMinimumOrder } from '../utils/cart';
import { products } from '../data/products';
import { deliveryAreas } from '../data/deliveryAreas';

describe('cart calculations', () => {
  it('calculates the separate chendu and Jaaji prices', () => {
    expect(calculateSubtotal([{productId:'p1',quantity:2},{productId:'p2',quantity:1}], products)).toBe(420);
  });
  it('ignores missing product IDs', () => expect(calculateSubtotal([{productId:'missing',quantity:10}], products)).toBe(0));
  it('makes qualifying orders free delivery', () => {
    expect(calculateDeliveryCharge(deliveryAreas[0], 500)).toBe(40);
    expect(calculateDeliveryCharge(deliveryAreas[0], 2000)).toBe(0);
    expect(calculateDeliveryCharge(undefined, 500)).toBe(0);
  });
  it('requires a ₹2,000 flower minimum', () => {
    expect(meetsMinimumOrder(deliveryAreas[1], 1999)).toBe(false);
    expect(meetsMinimumOrder(deliveryAreas[1], 2000)).toBe(true);
  });
});
