import { createDomFromString } from '../../../test-helpers/createDomFromString';
import { getOuterNode } from '../../../test-helpers/getOuterNode';
import { isNodeMatchingRegex } from './isNodeMatchingRegex';

describe('isNodeMatchingRegex', () => {
  describe('empty', () => {
    test('no values', () => {
      const node = getOuterNode(createDomFromString('<div></div>'));
      expect(isNodeMatchingRegex(node, /s*/)).toBe(true);
    });
    test('only whitespaces', () => {
      const node = getOuterNode(createDomFromString('<div> &nbsp; </div>'));
      expect(isNodeMatchingRegex(node, /s*/)).toBe(true);
    });
  });
  describe('non-empty', () => {
    test('characters', () => {
      const node = getOuterNode(createDomFromString('<div>a</div>'));
      expect(isNodeMatchingRegex(node, /[b-z]/)).toBe(false);
    });
    test('special signs', () => {
      const node = getOuterNode(createDomFromString('<div>;!#</div>'));
      expect(isNodeMatchingRegex(node, /[0-9]/)).toBe(false);
    });
    test('with some whitespaces', () => {
      const node = getOuterNode(createDomFromString('<div> a </div>'));
      expect(isNodeMatchingRegex(node, /[A-Z]/)).toBe(false);
    });
  });
});
