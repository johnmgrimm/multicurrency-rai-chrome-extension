import { createDomFromString } from '../../../test-helpers/createDomFromString';
import { getOuterNode } from '../../../test-helpers/getOuterNode';
import { convertCurrency } from './convertCurrency';

const testCurrencies = {
  usd: {
    id: 'usd',
    symbol: 'USD',
    regexp: 'us\\sdollars?|dollars?|USD|U.S.D.|US\\s?\\$|U.S.\\s?\\$|\\$',
    type: 'fiat',
    conversionRate: 0.5,
  },
  eur: {
    id: 'eur',
    symbol: 'EUR',
    regexp: 'EUR|€|euros?|e',
    type: 'fiat',
    conversionRate: 0.3,
  },
};
describe('convertCurrency', () => {
  describe('not convert', () => {
    test('nothing to convert', () => {
      const htmlDom = createDomFromString('<div> 10.10 abc &nbsp;</div>');
      const node = getOuterNode(htmlDom);

      convertCurrency(node, testCurrencies);

      expect(htmlDom.body.innerHTML).toBe('<div> 10.10 abc &nbsp;</div>');
    });

    test('unconvertable simplest case', () => {
      const htmlDom = createDomFromString('<div>$ then 10.10</div>');
      const node = getOuterNode(htmlDom);

      convertCurrency(node, testCurrencies);

      expect(htmlDom.body.innerHTML).toBe('<div>$ then 10.10</div>');
    });
  });
  describe('convert', () => {
    test('simplest case', () => {
      const htmlDom = createDomFromString('<div>$10.10</div>');
      const node = getOuterNode(htmlDom);

      convertCurrency(node, testCurrencies);

      expect(htmlDom.body.innerHTML).toBe('<div>RAI5.05</div>');
    });

    test('simplest case reversed', () => {
      const htmlDom = createDomFromString('<div>10.10e</div>');
      const node = getOuterNode(htmlDom);

      convertCurrency(node, testCurrencies);

      expect(htmlDom.body.innerHTML).toBe('<div>3.03RAI</div>');
    });

    test('simplest case with whitespaces and commas', () => {
      const htmlDom = createDomFromString('<div>  $\t 11,000.10\x0a</div>');
      const node = getOuterNode(htmlDom);

      convertCurrency(node, testCurrencies);

      expect(htmlDom.body.innerHTML).toBe('<div>  RAI\t 5,500.05\x0a</div>');
    });
  });
  test('two nodes simplest case', () => {
    const htmlDom = createDomFromString('<div><b>$</b><i>10.10</i></div>');
    const node = getOuterNode(htmlDom);

    convertCurrency(node, testCurrencies);

    expect(htmlDom.body.innerHTML).toBe('<div><b>RAI</b><i>5.05</i></div>');
  });

  // describe('non-empty', () => {
  //   test('characters', () => {
  //     const node = getOuterNode('<div>a</div>');
  //     expect(convertCurrency(node, /[b-z]/)).toBe(false);
  //   });
  //   test('special signs', () => {
  //     const node = getOuterNode('<div>;!#</div>');
  //     expect(convertCurrency(node, /[0-9]/)).toBe(false);
  //   });
  //   test('with some whitespaces', () => {
  //     const node = getOuterNode('<div> a </div>');
  //     expect(convertCurrency(node, /[A-Z]/)).toBe(false);
  //   });
  // });
});
