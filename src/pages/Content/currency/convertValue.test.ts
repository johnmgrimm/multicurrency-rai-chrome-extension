import { convertValue } from './convertValue';

describe('convertValue', () => {
  const conversionRates = { usd: 0.5, eur: 0.3 };
  describe('convertValue', () => {
    test('no spaces', () => {
      expect(convertValue('usd', conversionRates, '10')).toBe('5');
    });
    test('spaces around', () => {
      expect(convertValue('eur', conversionRates, ' -10 ')).toBe(' -3 ');
    });
    test('special spaces', () => {
      expect(convertValue('usd', conversionRates, '\x0a10\t')).toBe('\x0a5\t');
    });
    test('complex case', () => {
      expect(convertValue('usd', conversionRates, '\x0a- 10,001.05\t')).toBe(
        '\x0a- 5,000.52\t'
      );
    });
  });
});
