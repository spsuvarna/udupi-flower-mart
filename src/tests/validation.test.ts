import { describe, expect, it } from 'vitest';
import { getMinimumOrderDate, isValidFutureDate, isValidPinCode } from '../utils/validation';

describe('PIN-code validation', () => {
  it('accepts a six-digit Karnataka PIN', () => expect(isValidPinCode('576101')).toBe(true));
  it('rejects malformed or non-Karnataka PINs', () => {
    expect(isValidPinCode('12345')).toBe(false);
    expect(isValidPinCode('400001')).toBe(false);
    expect(isValidPinCode('57610A')).toBe(false);
  });
});

describe('advance-order date validation', () => {
  it('accepts tomorrow as the earliest order date', () => {
    expect(isValidFutureDate(getMinimumOrderDate())).toBe(true);
  });

  it('rejects today', () => {
    const today = new Date();
    const value = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    expect(isValidFutureDate(value)).toBe(false);
  });
});
