import { createTextNode } from '../../../test-helpers/createTextNode';
import {
  convertNodeSymbolValue,
  hasCurrencySymbol,
  hasSymbolValuePrice,
} from './utils';

describe('hasCurrencySymbol', () => {
  test('usd', () => {
    const htmlString = '<div>$</div>';

    const node = new DOMParser()
      .parseFromString(htmlString, 'text/html')
      .getElementsByTagName('div')[0].firstChild;
    expect(hasCurrencySymbol(node, 'usd')).toBe(true);
  });
  test('eur', () => {
    const htmlString = '<div>EUR</div>';

    const node = new DOMParser()
      .parseFromString(htmlString, 'text/html')
      .getElementsByTagName('div')[0].firstChild;
    expect(hasCurrencySymbol(node, 'eur')).toBe(true);
  });
});

describe('convertNodeSymbolValue', () => {
  test('usd', () => {
    const node = createTextNode('<div>$&nbsp;3,000.80</div>');
    node.nodeValue = convertNodeSymbolValue(node, 2, 'usd');
    expect(node.parentElement.outerHTML).toBe('<div>RAI&nbsp;1,500.40</div>');
  });
});
