import { convertNodePrice } from './convertNodePrice';

describe('convertNodePrice', () => {
  test('entire price in first element', () => {
    const html = '<span id="integer"> 1.99 </span>';

    const htmlDom = new DOMParser().parseFromString(html, 'text/html');

    convertNodePrice('usd', 3, htmlDom.getElementById('integer')?.firstChild);

    expect(htmlDom.body.innerHTML).toBe('<span id="integer"> 5.97 </span>');
  });

  test('entire price in second element', () => {
    const html = '<span id="integer"> 1.99  </span>';

    const htmlDom = new DOMParser().parseFromString(html, 'text/html');

    convertNodePrice(
      'usd',
      3,
      null,
      htmlDom.getElementById('integer')?.firstChild
    );

    expect(htmlDom.body.innerHTML).toBe('<span id="integer"> 5.97  </span>');
  });

  test('price in two elements', () => {
    const html =
      '<span id="integer">  1 </span><span id="fraction"> 99  </span>';

    const htmlDom = new DOMParser().parseFromString(html, 'text/html');

    convertNodePrice(
      'usd',
      3,
      htmlDom.getElementById('integer')?.firstChild,
      htmlDom.getElementById('fraction')?.firstChild
    );

    expect(htmlDom.body.innerHTML).toBe(
      '<span id="integer">  5 </span><span id="fraction"> 97  </span>'
    );
  });

  test('price in two elements first with symbol', () => {
    const html =
      '<span id="integer">  $1 </span><span id="fraction"> 99  </span>';

    const htmlDom = new DOMParser().parseFromString(html, 'text/html');

    convertNodePrice(
      'usd',
      3,
      htmlDom.getElementById('integer')?.firstChild,
      htmlDom.getElementById('fraction')?.firstChild
    );

    expect(htmlDom.body.innerHTML).toBe(
      '<span id="integer">  $5 </span><span id="fraction"> 97  </span>'
    );
  });

  test('price in two elements second with symbol', () => {
    const html =
      '<span id="integer">  1 </span><span id="fraction"> 99$  </span>';

    const htmlDom = new DOMParser().parseFromString(html, 'text/html');

    convertNodePrice(
      'usd',
      3,
      htmlDom.getElementById('integer')?.firstChild,
      htmlDom.getElementById('fraction')?.firstChild
    );

    expect(htmlDom.body.innerHTML).toBe(
      '<span id="integer">  5 </span><span id="fraction"> 97$  </span>'
    );
  });

  test('multiple matches in one node', () => {
    const html =
      '<span id="integer"> 4,444.44 US DOLLARS - 55 dollars  </span>';

    const htmlDom = new DOMParser().parseFromString(html, 'text/html');

    convertNodePrice('usd', 3, htmlDom.getElementById('integer')?.firstChild);

    expect(htmlDom.body.innerHTML).toBe(
      '<span id="integer"> 13,333.32 RAI - 165 RAI  </span>'
    );
  });

  test('multiple mixed matches in one node', () => {
    const html = '<span id="integer"> 4,444.44 US DOLLARS - $ 55  </span>';

    const htmlDom = new DOMParser().parseFromString(html, 'text/html');

    convertNodePrice('usd', 3, htmlDom.getElementById('integer')?.firstChild);

    expect(htmlDom.body.innerHTML).toBe(
      '<span id="integer"> 13,333.32 RAI - $ 55  </span>'
    );
  });
});
