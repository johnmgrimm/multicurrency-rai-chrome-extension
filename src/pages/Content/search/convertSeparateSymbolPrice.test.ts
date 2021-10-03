import { createDomFromString } from '../../../test-helpers/createDomFromString';
import { convertSeparateSymbolPrice } from './convertSeparateSymbolPrice';
import { allCurrencies } from '../../../shared/consts';
import { getCurrencyIdFromSymbol } from '../currency/getCurrencyIdFromSymbol';

import { convertSymbol } from '../currency/convertSymbol';

jest.mock('../currency/getCurrencyIdFromSymbol');
(getCurrencyIdFromSymbol as jest.Mock).mockReturnValue('usd');

jest.mock('../currency/convertSymbol');
(convertSymbol as jest.Mock).mockReturnValue('RAI');

const conversionRates = { usd: 0.5, eur: 0.3 };

describe('convertSeparateSymbolPrice', () => {
  test('no values', () => {
    const htmlDom = createDomFromString('<p><a><i id="start"></i></a></p>');
    const node = htmlDom.getElementById('start');

    convertSeparateSymbolPrice(node, allCurrencies, conversionRates);

    expect(htmlDom.body.innerHTML).toBe('<p><a><i id="start"></i></a></p>');
  });
  describe('one node value', () => {
    test('before symbol', () => {
      const htmlDom = createDomFromString('<p>9<a><i id="start"></i></a></p>');
      const node = htmlDom.getElementById('start');

      convertSeparateSymbolPrice(node, allCurrencies, conversionRates);

      expect(htmlDom.body.innerHTML).toBe('<p>5<a><i id="start"></i></a></p>');
    });

    test('after symbol', () => {
      const htmlDom = createDomFromString('<p><a><i id="start"></i></a>10</p>');
      const node = htmlDom.getElementById('start');

      convertSeparateSymbolPrice(node, allCurrencies, conversionRates);

      expect(htmlDom.body.innerHTML).toBe('<p><a><i id="start"></i></a>5</p>');
    });
  });

  describe('two node value', () => {
    test('before symbol', () => {
      const htmlDom = createDomFromString(
        '<p> 9 <i> 10 </i><a><i id="start"></i></a></p>'
      );
      const node = htmlDom.getElementById('start');

      convertSeparateSymbolPrice(node, allCurrencies, conversionRates);

      expect(htmlDom.body.innerHTML).toBe(
        '<p> 4 <i> 55 </i><a><i id="start"></i></a></p>'
      );
    });
    test('after symbol', () => {
      const htmlDom = createDomFromString(
        '<p><a><i id="start"></i></a>9<i>10</i></p>'
      );
      const node = htmlDom.getElementById('start');

      convertSeparateSymbolPrice(node, allCurrencies, conversionRates);

      expect(htmlDom.body.innerHTML).toBe(
        '<p><a><i id="start"></i></a>4<i>55</i></p>'
      );
    });
  });
  describe('three node value', () => {
    test('before symbol', () => {
      const htmlDom = createDomFromString(
        '<p>9,009<i>.</i><i>10</i><a><i id="start"></i></a></p>'
      );
      const node = htmlDom.getElementById('start');

      convertSeparateSymbolPrice(node, allCurrencies, conversionRates);

      expect(htmlDom.body.innerHTML).toBe(
        '<p>4,504<i>.</i><i>55</i><a><i id="start"></i></a></p>'
      );
    });

    test('after symbol', () => {
      const htmlDom = createDomFromString(
        '<p><a><i id="start"></i></a>9<i>.</i><i>10</i></p>'
      );
      const node = htmlDom.getElementById('start');

      convertSeparateSymbolPrice(node, allCurrencies, conversionRates);

      expect(htmlDom.body.innerHTML).toBe(
        '<p><a><i id="start"></i></a>4<i>.</i><i>55</i></p>'
      );
    });
  });
  describe('three node value deeply nested', () => {
    test('before symbol', () => {
      const htmlDom = createDomFromString(
        '<p>9,009<i>.</i><i><i><i><i>10</i></i></i></i><a><i id="start"></i></a></p>'
      );
      const node = htmlDom.getElementById('start');

      convertSeparateSymbolPrice(node, allCurrencies, conversionRates);

      expect(htmlDom.body.innerHTML).toBe(
        '<p>4,504<i>.</i><i><i><i><i>55</i></i></i></i><a><i id="start"></i></a></p>'
      );
    });

    test('after symbol', () => {
      const htmlDom = createDomFromString(
        '<p><a><i id="start"></i></a>9<i><u>.</u></i><i><i><i><i>10</i></i></i></i></p>'
      );
      const node = htmlDom.getElementById('start');

      convertSeparateSymbolPrice(node, allCurrencies, conversionRates);

      expect(htmlDom.body.innerHTML).toBe(
        '<p><a><i id="start"></i></a>4<i><u>.</u></i><i><i><i><i>55</i></i></i></i></p>'
      );
    });
  });
  describe('three node incomplete price', () => {
    test('before symbol', () => {
      const htmlDom = createDomFromString(
        '<p><i>.</i><i>10</i><a><i id="start"></i></a></p>'
      );
      const node = htmlDom.getElementById('start');

      convertSeparateSymbolPrice(node, allCurrencies, conversionRates);

      expect(htmlDom.body.innerHTML).toBe(
        '<p><i>.</i><i>05</i><a><i id="start"></i></a></p>'
      );
    });

    test('after symbol', () => {
      const htmlDom = createDomFromString(
        '<p><a><i id="start"></i></a>9<i>.</i><i></i></p>'
      );
      const node = htmlDom.getElementById('start');

      convertSeparateSymbolPrice(node, allCurrencies, conversionRates);

      expect(htmlDom.body.innerHTML).toBe(
        '<p><a><i id="start"></i></a>4<i>.</i><i></i></p>'
      );
    });
  });
});
