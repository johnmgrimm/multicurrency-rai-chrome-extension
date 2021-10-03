import { CurrencyData } from '../../../shared/consts';

export function getSymbolRegex(currencies: CurrencyData[]) {
  const allCurrenciesRegex = currencies
    .map((currency) => currency.regexp)
    .join('|');

  // ?: non capturing group
  return new RegExp('^(?:(\\s*)(' + allCurrenciesRegex + ')(\\s*))$', 'gi');
}
