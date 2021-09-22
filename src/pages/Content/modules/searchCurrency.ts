import { conditionalRatesRefresh } from '../../../shared/conditionalRatesRefresh';
import { getStoredData } from '../../../shared/storedData';
import { walkNode } from './walkNode';

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

/**
 * Searches nodes for currency symbols
 */
export const searchCurrency = async (rootNode?: Node) => {
  if (!rootNode) {
    return;
  }
  const storedData = await getStoredData();
  // console.log('storedData', storedData);
  const conversionRates = storedData.conversionRates;
  const currencies = storedData.enabled;
  // console.log('currencies', currencies);

  const treeWalker = document.createTreeWalker(rootNode, NodeFilter.SHOW_TEXT);

  while (treeWalker.nextNode()) {
    const node = treeWalker.currentNode;
    if (!node || !node.parentElement) {
      continue;
    }
    if (avoidedTags.includes(node.parentElement.tagName.toLowerCase())) {
      continue;
    }
    for (const currencyId of currencies) {
      const result = walkNode(conversionRates[currencyId], currencyId, node);
      if (result === 'converted') {
        break;
      }
    }
  }

  // post-refresh rates if necessary
  conditionalRatesRefresh(storedData);
};
