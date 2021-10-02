import { ConversionRates } from '../../../shared/consts';
import { fiatToRai } from '../modules/fiatToRai';
import { valueRegexString } from './valueRegexString';

const valueRegex = new RegExp(`(\\s*)(${valueRegexString})(\\s*)`, 'gi');
export function convertValue(
  currencyId: string,
  conversionRates: ConversionRates,
  text: string
): string {
  return text.replaceAll(valueRegex, (_match: string, ...groups: string[]) => {
    const convertedValue = fiatToRai(groups[1], conversionRates[currencyId]);

    return groups[0] + convertedValue + groups[2];
  });
}
