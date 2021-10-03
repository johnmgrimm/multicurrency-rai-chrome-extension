import { convertSymbolValueMulti } from './convertSymbolValueMulti';
import { getIsSymbolValueMultimatchRegex } from './getIsSymbolValueRegexMultimatch';

describe('convertSymbolValueMulti', () => {
  const allCurrencies = [
    {
      id: 'eur',
      symbol: 'EUR',
      regexp: 'EUR|€|euros?',
      type: 'fiat',
    },
    {
      id: 'usd',
      symbol: 'USD',
      regexp: 'us\\sdollars?|dollars?|USD|U.S.D.|US\\s?\\$|U.S.\\s?\\$|\\$',
      type: 'fiat',
    },
  ];
  const conversionRates = { eur: 0.5, usd: 0.1 };
  const symbolValueRegex = getIsSymbolValueMultimatchRegex(allCurrencies);
  describe('symbol-value', () => {
    test('many decimal places', () => {
      expect(
        convertSymbolValueMulti(
          allCurrencies,
          conversionRates,
          symbolValueRegex,
          '  10.0000€'
        )
      ).toBe('  5.0000RAI');
    });
    test.skip('spaces in between value', () => {
      // TODO: add support
      expect(
        convertSymbolValueMulti(
          allCurrencies,
          conversionRates,
          symbolValueRegex,
          '  10 ,000 . 00€'
        )
      ).toBe('  5 ,000 . 00RAI');
    });
    test('with invalid comma position', () => {
      expect(
        convertSymbolValueMulti(
          allCurrencies,
          conversionRates,
          symbolValueRegex,
          '  10,00€'
        )
      ).toBe('  500RAI');
    });
    test('simple', () => {
      expect(
        convertSymbolValueMulti(
          allCurrencies,
          conversionRates,
          symbolValueRegex,
          '10€'
        )
      ).toBe('5RAI');
    });
    test('dots, commas and whitespaces', () => {
      expect(
        convertSymbolValueMulti(
          allCurrencies,
          conversionRates,
          symbolValueRegex,
          '  10,000.01\x0a€\t'
        )
      ).toBe('  5,000.01\x0aRAI\t');
    });
  });
  describe('value-symbol', () => {
    test('simple', () => {
      expect(
        convertSymbolValueMulti(
          allCurrencies,
          conversionRates,
          symbolValueRegex,
          '€10'
        )
      ).toBe('RAI5');
    });
    test('dots, commas and whitespaces', () => {
      expect(
        convertSymbolValueMulti(
          allCurrencies,
          conversionRates,
          symbolValueRegex,
          '  €\t10,000.01\x0a '
        )
      ).toBe('  RAI\t5,000.01\x0a ');
    });
    test('another currency', () => {
      expect(
        convertSymbolValueMulti(
          allCurrencies,
          conversionRates,
          symbolValueRegex,
          '  dollar\t10,000.01\x0a '
        )
      ).toBe('  RAI\t1,000.00\x0a ');
    });
  });
  describe('multiple matches', () => {
    test('all valid', () => {
      expect(
        convertSymbolValueMulti(
          allCurrencies,
          conversionRates,
          symbolValueRegex,
          '  €\t10,000.01\x0a 10$'
        )
      ).toBe('  RAI\t5,000.01\x0a 1RAI');
      expect(
        convertSymbolValueMulti(
          allCurrencies,
          conversionRates,
          symbolValueRegex,
          ' 10$ asbsdf €10,000 1$ $$'
        )
      ).toBe(' 1RAI asbsdf RAI5,000 0RAI $$');
      expect(
        convertSymbolValueMulti(
          allCurrencies,
          conversionRates,
          symbolValueRegex,
          '22,222.22 $ - 55 $'
        )
      ).toBe('2,222.22 RAI - 6 RAI');
    });
    test.skip('invalid first and last case 1', () => {
      expect(
        convertSymbolValueMulti(
          allCurrencies,
          conversionRates,
          symbolValueRegex,
          '$ 10$ asbsdf 10,000€ 10'
        )
      ).toBe('$ 1RAI asbsdf 5,000RAI 10');
    });
    test.skip('invalid first and last case 2', () => {
      expect(
        convertSymbolValueMulti(
          allCurrencies,
          conversionRates,
          symbolValueRegex,
          '10 $10 asbsdf €10,000 €'
        )
      ).toBe('10 RAI1 asbsdf RAI5,000 €');
    });
  });
});
