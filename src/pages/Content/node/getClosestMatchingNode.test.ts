import { createDomFromString } from '../../../test-helpers/createDomFromString';
import { valueRegexString } from '../currency/valueRegexString';
import { getClosestMatchingNode } from './getClosestMatchingNode';

function getStartNodeFromHtmlString(htmlString: string) {
  return createDomFromString(htmlString).getElementById('start');
}
const numericNodeRegex = new RegExp(/\d*\.?\d+\s*/, 'gi');
const validNodeRegex = new RegExp(valueRegexString, 'gi');

describe('getClosestMatchingNode', () => {
  describe('empty', () => {
    test.skip('immediate sibling - impossible case as symbol has to be inside its own node', () => {
      const node = getStartNodeFromHtmlString('10<i id="start"></i>');
      expect(getClosestMatchingNode(node, validNodeRegex).nodeValue).toBe('10');
    });
    test('only start', () => {
      const node = getStartNodeFromHtmlString('<i id="start"></i>');
      expect(getClosestMatchingNode(node, validNodeRegex)).toBe(null);
    });
    // plain
    test('parent immediate prev sibling', () => {
      const node = getStartNodeFromHtmlString('10<b><i id="start"></i></b>');
      expect(getClosestMatchingNode(node, validNodeRegex).nodeValue).toBe('10');
    });
    test('parent immediate next sibling', () => {
      const node = getStartNodeFromHtmlString('<b><i id="start"></i></b>10');
      expect(getClosestMatchingNode(node, validNodeRegex).nodeValue).toBe('10');
    });
    test('parent ignore next sibling', () => {
      const node = getStartNodeFromHtmlString(
        '9<a> </a> <b> <i id="start"></i>a</b>10'
      );
      expect(getClosestMatchingNode(node, validNodeRegex).nodeValue).toBe('9');
    });
    // wrapped
    test('parent immediate next sibling child', () => {
      const node = getStartNodeFromHtmlString(
        '<b><i id="start"></i></b><b>10</b>'
      );
      expect(getClosestMatchingNode(node, validNodeRegex).nodeValue).toBe('10');
    });
    test('parent immediate prev sibling child', () => {
      const node = getStartNodeFromHtmlString(
        '<b>10</b><b><i id="start"></i></b>'
      );
      expect(getClosestMatchingNode(node, validNodeRegex).nodeValue).toBe('10');
    });
    test('parent ignore prev sibling pick deeply nested next', () => {
      const node = getStartNodeFromHtmlString(
        '10<a></a><b><i id="start"></i></b><b><i><u>9</u></i></b>'
      );
      expect(getClosestMatchingNode(node, validNodeRegex).nodeValue).toBe('9');
    });
    // whitespace and wrapped
    test('parent immediate next next sibling child', () => {
      const node = getStartNodeFromHtmlString(
        '<b><i id="start"></i></b> <b>10</b>'
      );
      expect(getClosestMatchingNode(node, validNodeRegex).nodeValue).toBe('10');
    });
    test('parent immediate next next next sibling child', () => {
      const node = getStartNodeFromHtmlString(
        '<b><i id="start"></i></b> <b> </b><b>10</b>'
      );
      expect(getClosestMatchingNode(node, validNodeRegex).nodeValue).toBe('10');
    });

    // double wrapped
    test('parent immediate prev sibling nested child', () => {
      const node = getStartNodeFromHtmlString(
        '<b>321<b>10</b></b><b><i id="start"></i></b>'
      );
      expect(getClosestMatchingNode(node, validNodeRegex).nodeValue).toBe('10');
    });
    test('parent immediate next sibling nested child', () => {
      const node = getStartNodeFromHtmlString(
        '<b><i id="start"></i></b><b><b>10</b>321</b>'
      );
      expect(getClosestMatchingNode(node, validNodeRegex).nodeValue).toBe('10');
    });
  });
  describe('multipart number', () => {
    test('parent immediate next sibling nested child', () => {
      const node = getStartNodeFromHtmlString(
        '<b><i id="start"></i></b><b><b>11</b>.<a>10</a></b>'
      );
      expect(getClosestMatchingNode(node, numericNodeRegex).nodeValue).toBe(
        '11'
      );
    });
  });
});