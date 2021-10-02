import { allCurrencies } from '../../../shared/consts';
import { getStoredData } from '../../../shared/storedData';
import { convertSymbol } from '../currency/convertSymbol';
import { convertSymbolValueMulti } from '../currency/convertSymbolValueMulti';
import { convertValue } from '../currency/convertValue';
import { getAllSymbolsRegex } from '../currency/getAllSymbolsRegex';
import { getCurrencyIdFromSymbol } from '../currency/getCurrencyIdFromSymbol';
import { getIsOnlySymbolRegex } from '../currency/getIsOnlySymbolRegex';
import { getIsSymbolValueMultimatchRegex } from '../currency/getIsSymbolValueRegexMultimatch';
import { getSymbolRegex } from '../currency/getSymbolRegex';
import { valueRegexString } from '../currency/valueRegexString';
import { getClosestMatchingNode } from '../node/getClosestMatchingNode';
import { isNodeEmpty } from '../node/isNodeEmpty';
import { isNodeMatchingRegex } from '../node/isNodeMatchingRegex';

const avoidedTags = [
  'html',
  'head',
  'script',
  'noscript',
  'style',
  'img',
  'textarea',
  'input',
  'audio',
  'video',
];

// TODO: find right regex
const numericNodeRegex = new RegExp(
  `^(\\s*)(${valueRegexString})(\\s*)$`,
  'gi'
);
// const numericNodeRegex = new RegExp(valueRegexString, 'gi'); //new RegExp(/\d+?\.?\d+\s*$/, 'gi');

// Converts currency data within child nodes
export async function convertCurrency(rootNode: Node) {
  // const startTime = Date.now();
  // console.log('conversion start', startTime);
  const storedData = await getStoredData();
  // console.log('storedData', storedData);
  const conversionRates = storedData.conversionRates;
  // const currencies = storedData.enabled;
  // Handler when the DOM is fully loaded
  // Replace current body
  // console.log('searching');
  const currenciesList = allCurrencies.filter((currency) =>
    storedData.enabled.includes(currency.id)
  );
  const allSymbolsRegex = getAllSymbolsRegex(currenciesList);
  const isOnlySymbolRegex = getIsOnlySymbolRegex(currenciesList);
  // const symbolValueRegex = getIsSymbolValueRegex(currenciesList);
  const symbolValueMultimatchRegex =
    getIsSymbolValueMultimatchRegex(currenciesList);
  const treeWalker = document.createTreeWalker(rootNode, NodeFilter.SHOW_TEXT);

  while (treeWalker.nextNode()) {
    const node = treeWalker.currentNode;
    if (!node || !node.parentElement) {
      continue;
    }
    if (avoidedTags.includes(node.parentElement.tagName.toLowerCase())) {
      continue;
    }

    if (isNodeEmpty(node)) continue;

    // has only non-symbol values => skip
    if (!isNodeMatchingRegex(node, allSymbolsRegex)) continue;

    // node has some currency symbol/s

    // has symbol-number or number-symbol only
    // if (isNodeMatchingRegex(node, symbolValueRegex)) {
    //   console.log('symbol-value/value-symbol');
    //   // convert
    //   node.nodeValue = convertSymbolValue(
    //     currenciesList,
    //     conversionRates,
    //     symbolValueRegex,
    //     node.nodeValue!
    //   );

    //   continue;
    // }

    // has only symbol
    if (isNodeMatchingRegex(node, isOnlySymbolRegex)) {
      numericNodeRegex.lastIndex = 0;
      // look around for numeric value
      // TODO: ensure that this is a numeric value node
      const closestNumericNode = getClosestMatchingNode(node, numericNodeRegex);
      if (!closestNumericNode) {
        // no non-empty nodes
        continue;
      }
      const currencyId = getCurrencyIdFromSymbol(
        currenciesList,
        node.nodeValue!
      );
      if (!currencyId) {
        // TODO: highly unlikely to happen, but skip conversion just in case
        continue;
      }
      node.nodeValue = convertSymbol(
        getSymbolRegex(currenciesList),
        node.nodeValue!
      );
      // TODO: convert value and assign to the node
      closestNumericNode.nodeValue = convertValue(
        currencyId,
        conversionRates,
        closestNumericNode.nodeValue!
      );

      // // handle conversion when price is distributes across two different nodes
      // const converted = convertSymbolValue(
      //   currenciesList,
      //   conversionRates,
      //   symbolValueRegex,
      //   node.nodeValue + ' ' + closestNumericNode.nodeValue
      // ).split(' ');
      // node.nodeValue = converted[0];
      // closestNumericNode.nodeValue = converted[1];
      continue;
    }
    // TODO: support dot separated numbers where dot is in
    // a separte node, so three elements integer+dot+fraction

    // has symbol/s but also other characters
    node.nodeValue = convertSymbolValueMulti(
      currenciesList,
      conversionRates,
      symbolValueMultimatchRegex,
      node.nodeValue!
    );
  }
  // console.log('conversion end', Date.now() - startTime);
}
