import { getPrevNonEmptySibling } from './getPrevNonEmptySibling';

describe('getPrevNonEmptySibling', () => {
  test('no valid prev sibling at all', () => {
    const html = '<b><b> </b></b> <b><i id="start" /> </b>';
    const htmlDom = new DOMParser().parseFromString(html, 'text/html');

    const sibling = getPrevNonEmptySibling(htmlDom.getElementById('start'));

    expect(sibling).toBe(null);
  });
  test('immediate sibling', () => {
    const html = 'stop<i id="start" />';
    const htmlDom = new DOMParser().parseFromString(html, 'text/html');

    const sibling = getPrevNonEmptySibling(
      // "start" text node selector
      htmlDom.getElementById('start')
    );

    expect(sibling?.nodeValue).toBe('stop');
  });
  test('parent node sibling', () => {
    const html = 'stop<b><i id="start" /> </b>';
    const htmlDom = new DOMParser().parseFromString(html, 'text/html');

    const sibling = getPrevNonEmptySibling(
      // "start" text node selector
      htmlDom.getElementById('start')
    );

    expect(sibling?.nodeValue).toBe('stop');
  });
  test('simple element', () => {
    const html = '<b>stop</b><b><i id="start" /> </b>';
    const htmlDom = new DOMParser().parseFromString(html, 'text/html');

    const sibling = getPrevNonEmptySibling(htmlDom.getElementById('start'));

    expect(sibling?.nodeValue).toBe('stop');
  });
  test('deeply nested starting point', () => {
    const html = '<b>stop</b><b><b><i id="start" /> </b></b>';
    const htmlDom = new DOMParser().parseFromString(html, 'text/html');

    const sibling = getPrevNonEmptySibling(htmlDom.getElementById('start'));

    expect(sibling?.nodeValue).toBe('stop');
  });
  test('immediate prev sibling is whitespace only', () => {
    const html = '<b>stop</b> <b><b></b> </b> <b> <i id="start" /></b>';
    const htmlDom = new DOMParser().parseFromString(html, 'text/html');

    const sibling = getPrevNonEmptySibling(htmlDom.getElementById('start'));

    expect(sibling?.nodeValue).toBe('stop');
  });
});
