import { IAllCurrencies } from '.';
import { CurrencyData } from '../../../shared/consts';
import { valueRegexString } from './valueRegexString';

export function getIsSymbolValueRegex(currencies: CurrencyData[]) {
  const allCurrenciesRegex = currencies
    .map((currency) => currency.regexp)
    .join('|');

  // TODO: support 10k 10m etc.
  // TODO: support values with whitespaces e.g. "10. 10" or "10 . 10"
  // ?: non capturing group
  return new RegExp(
    '^(?:(\\s*)(' +
      allCurrenciesRegex +
      ')(\\s*)(' +
      valueRegexString +
      ')(\\s*))|(?:(\\s*)(' +
      valueRegexString +
      ')(\\s*)(' +
      allCurrenciesRegex +
      ')(\\s*))$',
    'gi'
  );
}
