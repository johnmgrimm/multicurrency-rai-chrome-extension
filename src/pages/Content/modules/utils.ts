import {
  getCurrencyRegexp,
  getSymbolValueRegex,
  getValueSymbolRegex,
  getAmountRegex,
} from './regexps';

export const hasCurrencySymbol = (
  node: Node | ChildNode | null,
  currencyId: string
): boolean => {
  return Boolean(
    node && node.nodeValue && getCurrencyRegexp(currencyId).test(node.nodeValue)
  );
};

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
