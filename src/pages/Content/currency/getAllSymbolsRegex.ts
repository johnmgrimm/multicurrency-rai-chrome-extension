import { IAllCurrencies } from '.';

export function getAllSymbolsRegex(currencies: IAllCurrencies) {
  return new RegExp(
    '(?<![A-Za-z])(' +
      Object.values(currencies)
        .map((currency) => currency.regexp)
        .join('|') +
      ')(?![A-Za-z])'
  );
}
