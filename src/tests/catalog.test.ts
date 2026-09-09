import { describe, expect, it } from 'vitest';
import { products } from '../data/products';

describe('local flower catalogue', () => {
  it('contains separate Mallige chendu, atte and Jaaji products', () => {
    expect(products.map(product => product.name)).toEqual(['Mallige — 1 Chendu', 'Jaaji (Jasmine)', 'Mallige — 1 Atte (4 Chendu)']);
  });
});
