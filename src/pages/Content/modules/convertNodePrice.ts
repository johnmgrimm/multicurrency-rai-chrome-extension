import {
  convertSymbolValuePrices,
  convertValueOnlyPrices,
  convertValueSymbolPrices,
  getCurrencyRegexp,
  getSymbolValueRegex,
  getValueSymbolRegex,
} from './regexps';

export const convertNodePrice = (
  currencyId: string,
  conversionRate: number,
  firstNode?: Node | null,
  secondNode?: Node | null
) => {
  const priceNode = firstNode && firstNode.nodeValue ? firstNode : secondNode;

  if (!priceNode || !priceNode.nodeValue) {
    // no price data in first node
    return;
  }

  const fractionNode = firstNode && firstNode.nodeValue ? secondNode : null;

  if (!fractionNode || !fractionNode.nodeValue) {
    // TODO: support the case when symbol also exists in this node
    if (getValueSymbolRegex(currencyId).test(priceNode.nodeValue)) {
      priceNode.nodeValue = convertValueSymbolPrices(
        conversionRate,
        currencyId,
        priceNode.nodeValue
      );
    } else if (getSymbolValueRegex(currencyId).test(priceNode.nodeValue)) {
      priceNode.nodeValue = convertSymbolValuePrices(
        conversionRate,
        currencyId,
        priceNode.nodeValue
      );
    } else {
      // entire price data in one node, without currency symbol at all
      priceNode.nodeValue = convertValueOnlyPrices(
        priceNode.nodeValue,
        conversionRate
      );
    }
  } else {
    // price split across two nodes
    const price = priceNode.nodeValue.trim();
    const fraction = fractionNode.nodeValue.trim();
    // remove currency symbol if any
    const barePrice = (price + '.' + fraction).replace(
      getCurrencyRegexp(currencyId),
      ''
    );
    const priceValue = convertValueOnlyPrices(barePrice, conversionRate);
    const [integerValue, fractionValue] = priceValue.split('.');

    // TODO: use amountRegexp to replace
    priceNode.nodeValue = priceNode.nodeValue.replace(/\d+/, integerValue);
    fractionNode.nodeValue = fractionNode.nodeValue.replace(
      /\d+/,
      fractionValue
    );
  }
};
