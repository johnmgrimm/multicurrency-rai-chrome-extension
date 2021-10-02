import { convertSymbol } from './convertSymbol';
import { getSymbolRegex } from './getSymbolRegex';

describe('convertSymbol', () => {
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
  const symbolsRegex = getSymbolRegex(allCurrencies);
  describe('convertSymbol', () => {
    test('no spaces', () => {
      expect(convertSymbol(symbolsRegex, '€')).toBe('RAI');
    });
    test('spaces around', () => {
      expect(convertSymbol(symbolsRegex, ' € ')).toBe(' RAI ');
    });
    test('special spaces', () => {
      expect(convertSymbol(symbolsRegex, '\x0a€\t')).toBe('\x0aRAI\t');
    });
  });
});
