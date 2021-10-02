import { createDomFromString } from '../../../test-helpers/createDomFromString';
import { getOuterNode } from '../../../test-helpers/getOuterNode';
import { convertCurrency } from './convertCurrency';
import { getStoredData } from '../../../shared/storedData';

jest.mock('../../../shared/storedData');
(getStoredData as jest.Mock).mockResolvedValue({
  enabled: ['usd', 'eur'],
  conversionRates: { usd: 0.5, eur: 0.3 },
});

describe('convertCurrency', () => {
  describe('not convert', () => {
    test('nothing to convert', async () => {
      const htmlDom = createDomFromString('<div> 10.10 abc &nbsp;</div>');
      const node = getOuterNode(htmlDom);

      await convertCurrency(node);

      expect(htmlDom.body.innerHTML).toBe('<div> 10.10 abc &nbsp;</div>');
    });

    test('unconvertable simplest case', async () => {
      const htmlDom = createDomFromString('<div>$ then 10.10</div>');
      const node = getOuterNode(htmlDom);

      await convertCurrency(node);

      expect(htmlDom.body.innerHTML).toBe('<div>$ then 10.10</div>');
    });

    test.only('non-numeric node', async () => {
      const htmlDom = createDomFromString('<div><i>$</i><i>abc</i></div>');
      const node = getOuterNode(htmlDom);

      await convertCurrency(node);

      expect(htmlDom.body.innerHTML).toBe('<div><i>$</i><i>abc</i></div>');
    });
  });
  describe('convert', () => {
    test('multiple simple matches', async () => {
      const htmlDom = createDomFromString(
        '<div><div>EUR 10.10</div><div>11 US Dollar</div><div>11 $</div></div>'
      );
      const node = getOuterNode(htmlDom);

      await convertCurrency(node);

      expect(htmlDom.body.innerHTML).toBe(
        '<div><div>RAI 3.03</div><div>6 RAI</div><div>6 RAI</div></div>'
      );
    });

    test('simplest case reversed', async () => {
      const htmlDom = createDomFromString('<div>10.10eur</div>');
      const node = getOuterNode(htmlDom);

      await convertCurrency(node);

      expect(htmlDom.body.innerHTML).toBe('<div>3.03RAI</div>');
    });

    test('simplest case with whitespaces and commas', async () => {
      const htmlDom = createDomFromString('<div>  $\t 11,000.10\x0a</div>');
      const node = getOuterNode(htmlDom);

      await convertCurrency(node);

      expect(htmlDom.body.innerHTML).toBe('<div>  RAI\t 5,500.05\x0a</div>');
    });

    test('multiple values in one node', async () => {
      const htmlDom = createDomFromString('<div>10 $ - 10 eur</div>');
      const node = getOuterNode(htmlDom);

      await convertCurrency(node);

      expect(htmlDom.body.innerHTML).toBe('<div>5 RAI - 3 RAI</div>');
    });
  });

  test('two nodes simplest case', async () => {
    const htmlDom = createDomFromString(
      '<div><span> $ </span> <span> 222.22 </span></div>'
    );
    const node = getOuterNode(htmlDom);

    await convertCurrency(node);

    expect(htmlDom.body.innerHTML).toBe(
      '<div><span> RAI </span> <span> 111.11 </span></div>'
    );
  });

  test('two nodes ignore non-empty non-numeric value', async () => {
    const htmlDom = createDomFromString(
      '<div><i>10.10</i>a<b>$</b><i>10.10</i></div>'
    );
    const node = getOuterNode(htmlDom);

    await convertCurrency(node);

    expect(htmlDom.body.innerHTML).toBe(
      '<div><i>10.10</i>a<b>RAI</b><i>5.05</i></div>'
    );
  });

  test('two nodes ignore empty value, pick left first', async () => {
    const htmlDom = createDomFromString(
      '<div><i>10.10</i> <b>$</b> <i>10.10</i></div>'
    );
    const node = getOuterNode(htmlDom);

    await convertCurrency(node);

    expect(htmlDom.body.innerHTML).toBe(
      '<div><i>5.05</i> <b>RAI</b> <i>10.10</i></div>'
    );
  });

  test('mixed data in node', async () => {
    const htmlDom = createDomFromString(
      '<div><i>10,000.10$ something 5$ else</i></div>'
    );
    const node = getOuterNode(htmlDom);

    await convertCurrency(node);

    expect(htmlDom.body.innerHTML).toBe(
      '<div><i>5,000.05RAI something 3RAI else</i></div>'
    );
  });

  // TODO: support that
  test.skip('two nodes ignore empty value, pick left first', async () => {
    const htmlDom = createDomFromString(
      '<div><i>10</i><a>.10</a> <b>$</b> <a></a><i>10.10</i></div>'
    );
    const node = getOuterNode(htmlDom);

    await convertCurrency(node);

    expect(htmlDom.body.innerHTML).toBe(
      '<div><i>5</i><a>.05</a> <b>RAI</b> <a></a><i>10.10</i></div>'
    );
  });
  test.skip('three nodes ignore empty value, pick left first', async () => {
    const htmlDom = createDomFromString(
      '<div><i>10,000</i> . <a>10</a> <b>$</b> <a></a><i>10.10</i></div>'
    );
    const node = getOuterNode(htmlDom);

    await convertCurrency(node);

    expect(htmlDom.body.innerHTML).toBe(
      '<div><i>5,000</i> . <a>05</a> <b>RAI</b> <a></a><i>10.10</i></div>'
    );
  });

  // describe('non-empty', () => {
  //   test('characters', () => {
  //     const node = getOuterNode('<div>a</div>');
  //     expect(await convertCurrency(node, /[b-z]/)).toBe(false);
  //   });
  //   test('special signs', () => {
  //     const node = getOuterNode('<div>;!#</div>');
  //     expect(await convertCurrency(node, /[0-9]/)).toBe(false);
  //   });
  //   test('with some whitespaces', () => {
  //     const node = getOuterNode('<div> a </div>');
  //     expect(await convertCurrency(node, /[A-Z]/)).toBe(false);
  //   });
  // });
});
