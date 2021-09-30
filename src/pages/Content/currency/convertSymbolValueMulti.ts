import { IAllCurrencies } from '.';
import { ConversionRates, CurrencyData } from '../../../shared/consts';
import { fiatToRai } from '../modules/fiatToRai';
import { getCurrencyIdFromSymbol } from './getCurrencyIdFromSymbol';

export function convertSymbolValueMulti(
  currenciesList: CurrencyData[],
  conversionRates: ConversionRates,
  symbolValueRegex: RegExp,
  text: string
): string {
  return text.replaceAll(
    symbolValueRegex,
    (_match: string, ...groups: string[]) => {
      const currencySymbol = groups[2] || groups[11];
      const currencyId = getCurrencyIdFromSymbol(
        currenciesList,
        currencySymbol
      );
      if (!currencyId) {
        // TODO: this is edge case but should be handled in some clever way
        return '';
      }
      const convertedValue = fiatToRai(
        groups[4] || groups[9],
        conversionRates[currencyId]
      );

      if (groups[2]) {
        // symbol-value case
        return (
          (!groups[0] ? '' : groups[0]) +
          (!groups[1] ? '' : groups[1]) +
          'RAI' +
          (!groups[3] ? '' : groups[3]) +
          convertedValue +
          (!groups[5] ? '' : groups[5]) +
          (!groups[6] ? '' : groups[6])
        );
      }
      // value-symbol case
      return (
        (!groups[7] ? '' : groups[7]) +
        (!groups[8] ? '' : groups[8]) +
        convertedValue +
        (!groups[10] ? '' : groups[10]) +
        'RAI' +
        (!groups[12] ? '' : groups[12]) +
        (!groups[13] ? '' : groups[13])
      );
    }
  );
}
