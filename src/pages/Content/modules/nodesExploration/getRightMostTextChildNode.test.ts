import { getRightMostTextChildNode } from './getRightMostTextChildNode';

describe('getRightMostTextChildNode', () => {
  test('simple', () => {
    const html = `<div id="start">
      start
      <span>not this one</span>
      <span>
        <span>
          <span>
            <span>
              <span>neither this</span><span>last</span><span> </span>
            </span>
          </span>
        </span>
      </span>
      </div>`;
    const htmlDom = new DOMParser().parseFromString(html, 'text/html');

    const last = getRightMostTextChildNode(htmlDom.getElementById('start'));

    expect(last?.nodeValue).toBe('last');
  });
  test('simple2', () => {
    const html = `<div id="start"> <span>last</span> </div>`;
    const htmlDom = new DOMParser().parseFromString(html, 'text/html');

    const last = getRightMostTextChildNode(htmlDom.getElementById('start'));

    expect(last?.nodeValue).toBe('last');
  });
  test('simple3', () => {
    const html = `<div id="start">
      <span>last</span><i> </i>
    </div>`;
    const htmlDom = new DOMParser().parseFromString(html, 'text/html');

    const last = getRightMostTextChildNode(htmlDom.getElementById('start'));

    expect(last?.nodeValue).toBe('last');
  });
  test('simple4', () => {
    const html = `<div id="start">
      <span>
        <span>
          <span>
            <span>
              <span>not last</span>
            </span>
            <span>last</span><span>      </span>
          </span>
        </span>
      </span>
      </div>`;
    const htmlDom = new DOMParser().parseFromString(html, 'text/html');

    const last = getRightMostTextChildNode(htmlDom.getElementById('start'));

    expect(last?.nodeValue).toBe('last');
  });
});
