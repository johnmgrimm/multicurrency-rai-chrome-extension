import { CurrencyData } from '../../../shared/consts';

export function getCurrencyIdFromSymbol(
  currenciesList: CurrencyData[],
  currencySymbol: string
) {
  const currency = currenciesList.find((currency) =>
    new RegExp(currency.regexp, 'gi').test(currencySymbol)
  );
  return currency?.id;
}
