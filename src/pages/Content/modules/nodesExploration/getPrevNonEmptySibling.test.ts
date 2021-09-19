import { getPrevNonEmptySibling } from './getPrevNonEmptySibling';

describe('getPrevNonEmptySibling', () => {
  test('no valid prev sibling at all', () => {
    const html =
      '<div><span><span> </span></span> <span><span id="start" /> </span></div>';
    const htmlDom = new DOMParser().parseFromString(html, 'text/html');

    const sibling = getPrevNonEmptySibling(htmlDom.getElementById('start'));

    expect(sibling).toBe(null);
  });
  test('plain text', () => {
    const html = '<div>sibling<span><span id="start" /> </span></div>';
    const htmlDom = new DOMParser().parseFromString(html, 'text/html');

    const sibling = getPrevNonEmptySibling(
      // "start" text node selector
      htmlDom.getElementById('start')
    );

    expect(sibling?.nodeValue).toBe('sibling');
  });
  test('simple element', () => {
    const html =
      '<div><span>sibling</span><span><span id="start" /> </span></div>';
    const htmlDom = new DOMParser().parseFromString(html, 'text/html');

    const sibling = getPrevNonEmptySibling(htmlDom.getElementById('start'));

    expect(sibling?.nodeValue).toBe('sibling');
  });
  test('deeply nested starting point', () => {
    const html =
      '<div><span>sibling</span><span><span><span id="start" /> </span></span></div>';
    const htmlDom = new DOMParser().parseFromString(html, 'text/html');

    const sibling = getPrevNonEmptySibling(htmlDom.getElementById('start'));

    expect(sibling?.nodeValue).toBe('sibling');
  });
  test('immediate prev sibling is whitespace only', () => {
    const html =
      '<div><span>sibling</span> <span><span></span> </span> <span> <span id="start" /></span></div>';
    const htmlDom = new DOMParser().parseFromString(html, 'text/html');

    const sibling = getPrevNonEmptySibling(htmlDom.getElementById('start'));

    expect(sibling?.nodeValue).toBe('sibling');
  });
});
