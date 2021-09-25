import { conditionalRatesRefresh } from '../../../shared/conditionalRatesRefresh';
import { getStoredData } from '../../../shared/storedData';
import { IAllCurrencies } from '../currency';
import { convertSymbolValue } from '../currency/convertSymbolValue';
import { getAllSymbolsRegex } from '../currency/getAllSymbolsRegex';
import { getCurrencyIdFromSymbol } from '../currency/getCurrencyIdFromSymbol';
import { getIsOnlySymbolRegex } from '../currency/getIsOnlySymbolRegex';
import { getIsSymbolValueRegex } from '../currency/getIsSymbolValueRegex';
import { fiatToRai } from '../modules/fiatToRai';
import { isNodeEmpty } from '../node/isNodeEmpty';
import { isNodeMatchingRegex } from '../node/isNodeMatchingRegex';
// import { analyzeNodes } from './analyzeNodes';
// import { walkNode } from './walkNode';

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

// Converts currency data within child nodes
export async function convertCurrency(
  rootNode: Node,
  currencies: IAllCurrencies
) {
  const currenciesList = Object.values(currencies);
  const allSymbolsRegex = getAllSymbolsRegex(currencies);
  const isOnlySymbolRegex = getIsOnlySymbolRegex(currencies);
  const isSymbolValueRegex = getIsSymbolValueRegex(currencies);
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
    if (isNodeMatchingRegex(node, isSymbolValueRegex)) {
      // convert
      node.nodeValue = convertSymbolValue(
        currenciesList,
        currencies,
        isSymbolValueRegex,
        node.nodeValue!
      );

      continue;
    }

    // has only symbol
    if (isNodeMatchingRegex(node, isOnlySymbolRegex)) {
      // look around for numeric value
      console.log('look around');
      // TODO: implement
      continue;
    }

    // mixed symbols numbers and others

    // TODO: most complex case

    // TODO: continue by adding simplest tests for convertCurrency function

    // for (const currencyId of currencies) {
    // const result = walkNode(conversionRates[currencyId], currencyId, node);
    // if (result === 'converted') {
    //   break;
    // }
    // }
  }
}
