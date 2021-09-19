import { getLeftMostTextChildNode } from './getLeftMostTextChildNode';

describe('getLeftMostTextChildNode', () => {
  test('simple', () => {
    const html = `<div id="start">
      <span>
        <span>
          <span>
            <span>
            <span> </span><span>first</span><span>neither this</span>
            </span>
          </span>
        </span>
      </span>
      <span>not this one</span>
      start
      </div>`;
    const htmlDom = new DOMParser().parseFromString(html, 'text/html');

    const last = getLeftMostTextChildNode(htmlDom.getElementById('start'));

    expect(last?.nodeValue?.trim()).toBe('first');
  });
  test('simple2', () => {
    const html = `<div id="start"> <span>first</span> </div>`;
    const htmlDom = new DOMParser().parseFromString(html, 'text/html');

    const first = getLeftMostTextChildNode(htmlDom.getElementById('start'));

    expect(first?.nodeValue).toBe('first');
  });
  test('simple3', () => {
    const html = `<div id="start">
      <i> </i><span>first</span>
    </div>`;
    const htmlDom = new DOMParser().parseFromString(html, 'text/html');

    const last = getLeftMostTextChildNode(htmlDom.getElementById('start'));

    expect(last?.nodeValue).toBe('first');
  });
  test('simple4', () => {
    const html = `<div id="start">
      <span>
        <span>
          <span>
            <span>   </span><span>first</span>
          </span>
        </span>
      </span>
      </div>`;
    const htmlDom = new DOMParser().parseFromString(html, 'text/html');

    const last = getLeftMostTextChildNode(htmlDom.getElementById('start'));

    expect(last?.nodeValue).toBe('first');
  });
});
