import { allCurrencies } from '../../../shared/consts';
import { getStoredData } from '../../../shared/storedData';
import { convertSymbolValueMulti } from '../currency/convertSymbolValueMulti';
import { getAllSymbolsRegex } from '../currency/getAllSymbolsRegex';
import { getIsOnlySymbolRegex } from '../currency/getIsOnlySymbolRegex';
import { getIsSymbolValueMultimatchRegex } from '../currency/getIsSymbolValueRegexMultimatch';
import { isNodeEmpty } from '../node/isNodeEmpty';
import { isNodeMatchingRegex } from '../node/isNodeMatchingRegex';
import { convertSeparateSymbolPrice } from './convertSeparateSymbolPrice';

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

    // has only symbol
    if (isNodeMatchingRegex(node, isOnlySymbolRegex)) {
      convertSeparateSymbolPrice(node, currenciesList, conversionRates);
      continue;
    }

    // node has some currency symbol/s
    // or has symbol/s but also other characters
    node.nodeValue = convertSymbolValueMulti(
      currenciesList,
      conversionRates,
      symbolValueMultimatchRegex,
      node.nodeValue!
    );
  }
  // console.log('conversion end', Date.now() - startTime);
}
