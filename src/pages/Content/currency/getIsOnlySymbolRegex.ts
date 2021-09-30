import { IAllCurrencies } from '.';
import { CurrencyData } from '../../../shared/consts';

export function getIsOnlySymbolRegex(currencies: CurrencyData[]) {
  return new RegExp(
    '(^\\s*(' +
      // Object.values(currencies)
      currencies.map((currency) => currency.regexp).join('|') +
      ')\\s*$)',
    'gi'
  );
}
