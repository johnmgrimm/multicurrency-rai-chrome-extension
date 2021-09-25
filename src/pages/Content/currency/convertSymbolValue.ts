import { IAllCurrencies } from '.';
import { CurrencyData } from '../../../shared/consts';
import { fiatToRai } from '../modules/fiatToRai';
import { getCurrencyIdFromSymbol } from './getCurrencyIdFromSymbol';

export function convertSymbolValue(
  currenciesList: CurrencyData[],
  currencies: IAllCurrencies,
  symbolValueRegex: RegExp,
  text: string
): string {
  return text.replaceAll(
    symbolValueRegex,
    (_match: string, ...groups: string[]) => {
      const currencySymbol = groups[1] || groups[8];
      const currencyId = getCurrencyIdFromSymbol(
        currenciesList,
        currencySymbol
      );
      if (!currencyId) {
        // TODO: this is edge case but should be handled in some clever way
        return '';
      }
      const convertedValue = fiatToRai(
        groups[3] || groups[6],
        currencies[currencyId].conversionRate
      );

      if (groups[1]) {
        // symbol-value case
        return groups[0] + 'RAI' + groups[2] + convertedValue + groups[4];
      }
      // value-symbol case
      return groups[5] + convertedValue + groups[7] + 'RAI' + groups[9];
    }
  );
}
