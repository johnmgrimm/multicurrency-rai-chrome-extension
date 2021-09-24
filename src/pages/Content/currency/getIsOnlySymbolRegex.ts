import { IAllCurrencies } from '.';

export function getIsOnlySymbolRegex(currencies: IAllCurrencies) {
  return new RegExp(
    '(^\\s*(' +
      Object.values(currencies)
        .map((currency) => currency.regexp)
        .join('|') +
      ')\\s*$)'
  );
}
