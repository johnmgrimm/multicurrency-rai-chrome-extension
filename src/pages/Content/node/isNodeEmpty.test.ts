import { createDomFromString } from '../../../test-helpers/createDomFromString';
import { getOuterNodeValue } from '../../../test-helpers/getOuterNodeValue';
import { isNodeEmpty } from './isNodeEmpty';

describe('isNodeEmpty', () => {
  describe('empty', () => {
    test('no values', () => {
      const node = getOuterNodeValue(createDomFromString('<div></div>'));
      expect(isNodeEmpty(node)).toBe(true);
    });
    test('only whitespaces', () => {
      const node = getOuterNodeValue(
        createDomFromString('<div> &nbsp; </div>')
      );
      expect(isNodeEmpty(node)).toBe(true);
    });
  });
  describe('non-empty', () => {
    test('characters', () => {
      const node = getOuterNodeValue(createDomFromString('<div>a</div>'));
      expect(isNodeEmpty(node)).toBe(false);
    });
    test('special signs', () => {
      const node = getOuterNodeValue(createDomFromString('<div>;!#</div>'));
      expect(isNodeEmpty(node)).toBe(false);
    });
    test('with some whitespaces', () => {
      const node = getOuterNodeValue(createDomFromString('<div> a </div>'));
      expect(isNodeEmpty(node)).toBe(false);
    });
  });
});
