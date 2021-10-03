import { CurrencyData } from '../../../shared/consts';
import { valueRegexString } from './valueRegexString';

export function getIsSymbolValueMultimatchRegex(currencies: CurrencyData[]) {
  const allCurrenciesRegex = currencies
    .map((currency) => currency.regexp)
    .join('|');

  // TODO: support 10k 10m etc.
  // TODO: support values with whitespaces e.g. "10. 10" or "10 . 10"
  // ?: non capturing group
  return new RegExp(
    '(?:' +
      '([A-Za-z]*)' +
      '(\\s*)' +
      `(${allCurrenciesRegex})` +
      '(\\s*)' +
      `(${valueRegexString})` +
      '(\\s*)' +
      '([A-Za-z]*)' +
      ')|(?:' +
      '([A-Za-z]*)' +
      '(\\s*)' +
      `(${valueRegexString})` +
      '(\\s*)' +
      `(${allCurrenciesRegex})` +
      '(\\s*)' +
      '([A-Za-z]*)' +
      ')',
    'gi'
  );
}
