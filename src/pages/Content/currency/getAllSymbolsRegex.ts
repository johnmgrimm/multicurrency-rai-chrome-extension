import { CurrencyData } from '../../../shared/consts';

export function getAllSymbolsRegex(currencies: CurrencyData[]) {
  return new RegExp(
    '(?<![A-Za-z])(' +
      currencies.map((currency) => currency.regexp).join('|') +
      ')(?![A-Za-z])',
    'gi'
  );
}
