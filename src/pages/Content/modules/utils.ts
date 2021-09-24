import {
  getCurrencyRegexp,
  getSymbolValueRegex,
  getValueSymbolRegex,
  getAmountRegex,
  convertSymbolValuePrices,
} from './regexps';

export const hasCurrencySymbol = (
  node: Node | ChildNode | null,
  currencyId: string
): boolean => {
  return Boolean(
    node && node.nodeValue && getCurrencyRegexp(currencyId).test(node.nodeValue)
  );
};

export function hasNoValue(node: Node | ChildNode): boolean {
  return /^\s*$/.test(`${node.nodeValue}`);
}

export function hasNonPriceValue(
  node: Node,
  enabledCurrenciesList: string[]
): boolean {
  const valueString = `${node.nodeValue}`;
  // loop through all enabled currencies symbols and compare with node value
  // TODO: test against all currencies

  return getAmountRegex().test(valueString);
}

export const hasSymbolValuePrice = (
  currencySymbol: string,
  node?: Node | ChildNode | null
): boolean => {
  if (!node || !node.nodeValue) {
    return false;
  }
  return getSymbolValueRegex(currencySymbol).test(node.nodeValue);
};

export const hasValueSymbolPrice = (
  currencySymbol: string,
  node?: Node | ChildNode | null
): boolean => {
  if (!node || !node.nodeValue) {
    return false;
  }
  return getValueSymbolRegex(currencySymbol).test(node.nodeValue);
};

export const hasPriceValue = (node?: Node | ChildNode | null): boolean => {
  if (!node || !node.nodeValue) {
    return false;
  }
  return getAmountRegex().test(node.nodeValue);
};

export function convertNodeSymbolValue(
  node: Node,
  conversionRate: number,
  symbol: string
) {
  return convertSymbolValuePrices(conversionRate, symbol, node.nodeValue!);
}
