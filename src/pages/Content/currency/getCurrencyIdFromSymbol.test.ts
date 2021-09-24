import { getCurrencyIdFromSymbol } from './getCurrencyIdFromSymbol';

describe('getCurrencyIdFromSymbol', () => {
  test('one symbol', () => {
    const currenciesList = [
      {
        id: 'eur',
        symbol: 'EUR',
        regexp: 'EUR|€|euros?',
        type: 'fiat',
      },
    ];
    expect(getCurrencyIdFromSymbol(currenciesList, '€')).toBe('eur');
    expect(getCurrencyIdFromSymbol(currenciesList, 'EUR')).toBe('eur');
    expect(getCurrencyIdFromSymbol(currenciesList, 'EURo')).toBe('eur');
  });
  test('many symbols', () => {
    const currenciesList = [
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
    expect(getCurrencyIdFromSymbol(currenciesList, '£')).toBe('gbp');
    expect(getCurrencyIdFromSymbol(currenciesList, '€')).toBe('eur');
    expect(getCurrencyIdFromSymbol(currenciesList, '?')).toBe(undefined);
  });
});
