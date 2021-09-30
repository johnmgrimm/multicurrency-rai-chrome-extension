import { getIsOnlySymbolRegex } from './getIsOnlySymbolRegex';

describe('getIsOnlySymbolRegex', () => {
  test('one symbol', () => {
    const allCurrencies = [
      {
        id: 'eur',
        symbol: 'EUR',
        regexp: 'EUR|€|euros?',
        type: 'fiat',
      },
    ];
    expect(getIsOnlySymbolRegex(allCurrencies).test('EUR')).toBe(true);
    expect(getIsOnlySymbolRegex(allCurrencies).test('EUREUR')).toBe(false);
  });
  test('many symbols', () => {
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
    expect(getIsOnlySymbolRegex(allCurrencies).test('EUR')).toBe(true);
    expect(getIsOnlySymbolRegex(allCurrencies).test('  EUR ')).toBe(true);
    expect(getIsOnlySymbolRegex(allCurrencies).test('pound')).toBe(true);
    expect(getIsOnlySymbolRegex(allCurrencies).test('pound ')).toBe(true);
    expect(getIsOnlySymbolRegex(allCurrencies).test('EURGBP')).toBe(false);
    expect(getIsOnlySymbolRegex(allCurrencies).test('EUR GBP')).toBe(false);
    expect(getIsOnlySymbolRegex(allCurrencies).test('   EUR GBP  ')).toBe(
      false
    );
  });
});
