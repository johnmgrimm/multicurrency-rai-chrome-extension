import { getOuterNode } from './getOuterNode.test';
import { isNodeEmpty } from './isNodeEmpty';

describe('isNodeEmpty', () => {
  describe('empty', () => {
    test('no values', () => {
      const node = getOuterNode('<div></div>');
      expect(isNodeEmpty(node)).toBe(true);
    });
    test('only whitespaces', () => {
      const node = getOuterNode('<div> &nbsp; </div>');
      expect(isNodeEmpty(node)).toBe(true);
    });
  });
  describe('non-empty', () => {
    test('characters', () => {
      const node = getOuterNode('<div>a</div>');
      expect(isNodeEmpty(node)).toBe(false);
    });
    test('special signs', () => {
      const node = getOuterNode('<div>;!#</div>');
      expect(isNodeEmpty(node)).toBe(false);
    });
    test('with some whitespaces', () => {
      const node = getOuterNode('<div> a </div>');
      expect(isNodeEmpty(node)).toBe(false);
    });
  });
});
