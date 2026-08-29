import { describe, expect, it } from 'vitest';
import { products } from '../data/products';

describe('local flower catalogue', () => {
  it('contains only the six requested flower groups', () => {
    expect(products.map(product => product.name)).toEqual([
      'Udupi Mallige (Shankarapura Jasmine)',
      'Sevantige (Chrysanthemum)',
      'Chendu Hoovu (Marigold)',
      'Kakada',
      'Aboli (Firecracker Flower)',
      'Local Roses & Zinnias',
    ]);
  });
});
