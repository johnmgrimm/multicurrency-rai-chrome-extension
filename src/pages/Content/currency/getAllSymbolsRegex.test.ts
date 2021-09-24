import { getAllSymbolsRegex } from './getAllSymbolsRegex';

describe('getAllSymbolsRegex', () => {
  test('one symbol', () => {
    const allCurrencies = {
      eur: {
        id: 'eur',
        symbol: 'EUR',
        regexp: 'EUR|€|euros?',
        type: 'fiat',
      },
    };
    expect(getAllSymbolsRegex(allCurrencies)).toStrictEqual(
      /(?<![A-Za-z])(EUR|€|euros?)(?![A-Za-z])/
    );
  });
  test('many symbols', () => {
    const allCurrencies = {
      eur: {
        id: 'eur',
        symbol: 'EUR',
        regexp: 'EUR|€|euros?',
        type: 'fiat',
      },
      gbp: {
        id: 'gbp',
        symbol: 'GBP',
        regexp: 'GBP|£|pounds?|quids?',
        type: 'fiat',
      },
    };
    expect(getAllSymbolsRegex(allCurrencies)).toStrictEqual(
      /(?<![A-Za-z])(EUR|€|euros?|GBP|£|pounds?|quids?)(?![A-Za-z])/
    );
  });
});
