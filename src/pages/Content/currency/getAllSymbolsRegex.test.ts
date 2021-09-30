import { getAllSymbolsRegex } from './getAllSymbolsRegex';

describe('getAllSymbolsRegex', () => {
  test('one symbol', () => {
    const allCurrencies = [
      {
        id: 'eur',
        symbol: 'EUR',
        regexp: 'EUR|€|euros?',
        type: 'fiat',
      },
    ];
    expect(getAllSymbolsRegex(allCurrencies)).toStrictEqual(
      /(?<![A-Za-z])(EUR|€|euros?)(?![A-Za-z])/gi
    );
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
    expect(getAllSymbolsRegex(allCurrencies)).toStrictEqual(
      /(?<![A-Za-z])(EUR|€|euros?|GBP|£|pounds?|quids?)(?![A-Za-z])/gi
    );
    expect(
      'EUR test 10pound, euros10'.match(getAllSymbolsRegex(allCurrencies))
    ).toStrictEqual(['EUR', 'pound', 'euros']);
    expect(
      '10 EUR, 12 €'.match(getAllSymbolsRegex(allCurrencies))
    ).toStrictEqual(['EUR', '€']);
  });
});
