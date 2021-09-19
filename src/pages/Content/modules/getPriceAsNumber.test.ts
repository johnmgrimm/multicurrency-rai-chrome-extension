import { getPriceAsNumber } from './getPriceAsNumber';

test('getPriceAsNumber', () => {
  // we don't care about negative prices as minus "-" is just skipped when converting the price
  expect(getPriceAsNumber('0')).toBe(0);
  expect(getPriceAsNumber('1.100')).toBe(1.1);
  expect(getPriceAsNumber('123.001')).toBe(123.001);
  expect(getPriceAsNumber('1,123.01')).toBe(1123.01);
  expect(getPriceAsNumber('1,12.00')).toBe(112);
  expect(getPriceAsNumber('1,121,123,111.00')).toBe(1121123111);
});
