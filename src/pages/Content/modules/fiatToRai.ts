import { getPriceAsNumber } from './getPriceAsNumber';
import { getPricePrecision } from './getPricePrecision';

function numberWithCommas(priceString: string) {
  return priceString.replace(/^[+-]?\d+/, function (int) {
    return int.replace(/(\d)(?=(\d{3})+$)/g, '$1,');
  });
}

function hasCommas(priceString: string) {
  return priceString.includes(',');
}

export const fiatToRai = (
  fiatPrice: string,
  conversionRate: number
): string => {
  const priceString = (getPriceAsNumber(fiatPrice) * conversionRate).toFixed(
    getPricePrecision(fiatPrice)
  );

  if (hasCommas(fiatPrice)) {
    return numberWithCommas(priceString);
  }

  return priceString;
};
