import { getPricePrecision } from './getPricePrecision';

test('getPricePrecision', () => {
  expect(getPricePrecision('1')).toBe(0);
  expect(getPricePrecision('1.0')).toBe(1);
  expect(getPricePrecision('1.00')).toBe(2);
  expect(getPricePrecision('11.00')).toBe(2);
  expect(getPricePrecision('1231.00123')).toBe(5);
  expect(getPricePrecision('1231.00123')).toBe(5);
});
