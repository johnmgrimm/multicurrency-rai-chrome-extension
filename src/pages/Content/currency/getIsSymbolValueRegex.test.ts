import { getIsSymbolValueRegex } from './getIsSymbolValueRegex';

describe('getIsSymbolValueRegex', () => {
  test('one symbol', () => {
    const allCurrencies = [
      {
        id: 'eur',
        symbol: 'EUR',
        regexp: 'EUR|€|euros?',
        type: 'fiat',
      },
    ];
    expect(getIsSymbolValueRegex(allCurrencies).test('EUR1')).toBe(true);
    expect(getIsSymbolValueRegex(allCurrencies).test(' EUR     1 ')).toBe(true);
    expect(getIsSymbolValueRegex(allCurrencies).test('EUR')).toBe(false);
  });
  describe('many symbols', () => {
    const allCurrencies = [
      {
        id: 'eur',
        symbol: 'EUR',
        regexp: 'EUR|€|euros?',
        type: 'fiat',
      },
      {
        id: 'gbp',
        symbol: 'GBP',
        regexp: 'GBP|£|pounds?|quids?',
        type: 'fiat',
      },
    ];
    test('matches', () => {
      expect(getIsSymbolValueRegex(allCurrencies).test('EUR2')).toBe(true);
      expect(getIsSymbolValueRegex(allCurrencies).test('pounds 10')).toBe(true);
      expect(getIsSymbolValueRegex(allCurrencies).test('  pounds   10  ')).toBe(
        true
      );
      expect(getIsSymbolValueRegex(allCurrencies).test('10\xa0eur')).toBe(true);
      expect(
        getIsSymbolValueRegex(allCurrencies).test('  10  \xa0  \t  euro   ')
      ).toBe(true);
    });
    test('not match', () => {
      expect(
        getIsSymbolValueRegex(allCurrencies).test('  pounds euro  10  ')
      ).toBe(false);
      expect(getIsSymbolValueRegex(allCurrencies).test('10a')).toBe(false);
      expect(getIsSymbolValueRegex(allCurrencies).test('10k  EUR')).toBe(false);
      expect(getIsSymbolValueRegex(allCurrencies).test('10EURz')).toBe(false);
    });
  });
});
