import { convertSymbolValue } from './convertSymbolValue';
import { getIsSymbolValueRegex } from './getIsSymbolValueRegex';

describe('convertSymbolValue', () => {
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
  const symbolValueRegex = getIsSymbolValueRegex(allCurrencies);
  describe('symbol-value', () => {
    test('many decimal places', () => {
      expect(
        convertSymbolValue(
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
        convertSymbolValue(
          allCurrencies,
          conversionRates,
          symbolValueRegex,
          '  10 ,000 . 00€'
        )
      ).toBe('  5 ,000 . 00RAI');
    });
    test('with invalid comma position', () => {
      expect(
        convertSymbolValue(
          allCurrencies,
          conversionRates,
          symbolValueRegex,
          '  10,00€'
        )
      ).toBe('  500RAI');
    });
    test('simple', () => {
      expect(
        convertSymbolValue(
          allCurrencies,
          conversionRates,
          symbolValueRegex,
          '10€'
        )
      ).toBe('5RAI');
    });
    test('dots, commas and whitespaces', () => {
      expect(
        convertSymbolValue(
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
        convertSymbolValue(
          allCurrencies,
          conversionRates,
          symbolValueRegex,
          '€10'
        )
      ).toBe('RAI5');
    });
    test('dots, commas and whitespaces', () => {
      expect(
        convertSymbolValue(
          allCurrencies,
          conversionRates,
          symbolValueRegex,
          '  €\t10,000.01\x0a '
        )
      ).toBe('  RAI\t5,000.01\x0a ');
    });
    test('another currency', () => {
      expect(
        convertSymbolValue(
          allCurrencies,
          conversionRates,
          symbolValueRegex,
          '  dollar\t10,000.01\x0a '
        )
      ).toBe('  RAI\t1,000.00\x0a ');
    });
  });
});
