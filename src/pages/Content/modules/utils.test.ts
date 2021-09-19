import { hasCurrencySymbol } from './utils';

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
