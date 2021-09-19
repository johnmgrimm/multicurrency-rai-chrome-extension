import { getNextNonEmptySibling } from './getNextNonEmptySibling';

describe('getNextNonEmptySibling', () => {
  test('no valid next sibling at all', () => {
    const html =
      '<div><span><span id="start" /></span> <span><span> </span></span></div>';
    const htmlDom = new DOMParser().parseFromString(html, 'text/html');

    const sibling = getNextNonEmptySibling(htmlDom.getElementById('start'));

    expect(sibling).toBe(null);
  });
  test('plain text', () => {
    const html = '<div><span><span id="start" /></span>sibling</div>';
    const htmlDom = new DOMParser().parseFromString(html, 'text/html');

    const sibling = getNextNonEmptySibling(
      // "start" text node selector
      htmlDom.getElementById('start')
    );

    expect(sibling?.nodeValue).toBe('sibling');
  });
  test('simple element', () => {
    const html =
      '<div><span><span id="start" /></span><span>sibling</span></div>';
    const htmlDom = new DOMParser().parseFromString(html, 'text/html');

    const sibling = getNextNonEmptySibling(htmlDom.getElementById('start'));

    expect(sibling?.nodeValue).toBe('sibling');
  });
  test('deeply nested starting point', () => {
    const html =
      '<div><span><span><span id="start" /></span><span>sibling</span></div>';
    const htmlDom = new DOMParser().parseFromString(html, 'text/html');

    const sibling = getNextNonEmptySibling(htmlDom.getElementById('start'));

    expect(sibling?.nodeValue).toBe('sibling');
  });
  test('immediate next sibling is whitespace only', () => {
    const html =
      '<div><span><span id="start" /> </span> <span> <span></span></span> <span>sibling</span></div>';
    const htmlDom = new DOMParser().parseFromString(html, 'text/html');

    const sibling = getNextNonEmptySibling(htmlDom.getElementById('start'));

    expect(sibling?.nodeValue).toBe('sibling');
  });
});
