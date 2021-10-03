import { getStartNodeFromHtmlString } from '../../../test-helpers/getStartNodeFromHtmlString';
import { valueRegexString } from '../currency/valueRegexString';
import { getClosestMatchingNode } from './getClosestMatchingNode';

const numericNodeRegex = new RegExp(/\d*\.?\d+\s*/, 'gi');
const validNodeRegex = new RegExp(valueRegexString, 'gi');

describe('getClosestMatchingNode', () => {
  describe('empty', () => {
    test.skip('immediate sibling - impossible case as symbol has to be inside its own node', () => {
      const node = getStartNodeFromHtmlString('10<i id="start"></i>');
      expect(getClosestMatchingNode(node, validNodeRegex).node.nodeValue).toBe(
        '10'
      );
    });
    test('only start', () => {
      const node = getStartNodeFromHtmlString('<i id="start"></i>');
      expect(getClosestMatchingNode(node, validNodeRegex).node).toBe(null);
    });
    // plain
    test('parent immediate prev sibling', () => {
      const node = getStartNodeFromHtmlString('10<b><i id="start"></i></b>');
      expect(getClosestMatchingNode(node, validNodeRegex).node.nodeValue).toBe(
        '10'
      );
    });
    test('parent immediate next sibling', () => {
      const node = getStartNodeFromHtmlString('<b><i id="start"></i></b>10');
      expect(getClosestMatchingNode(node, validNodeRegex).node.nodeValue).toBe(
        '10'
      );
    });
    test('parent ignore next sibling', () => {
      const node = getStartNodeFromHtmlString(
        '9<a> </a> <b> <i id="start"></i>a</b>10'
      );
      expect(getClosestMatchingNode(node, validNodeRegex).node.nodeValue).toBe(
        '9'
      );
    });
    // wrapped
    test('parent immediate next sibling child', () => {
      const node = getStartNodeFromHtmlString(
        '<b><i id="start"></i></b><b>10</b>'
      );
      expect(getClosestMatchingNode(node, validNodeRegex).node.nodeValue).toBe(
        '10'
      );
    });
    test('parent immediate prev sibling child', () => {
      const node = getStartNodeFromHtmlString(
        '<b>10</b><b><i id="start"></i></b>'
      );
      //TODO: this should pass
      expect(getClosestMatchingNode(node, validNodeRegex).node.nodeValue).toBe(
        '10'
      );
    });
    test('parent ignore prev sibling pick deeply nested next', () => {
      const node = getStartNodeFromHtmlString(
        '10<a></a><b><i id="start"></i></b><b><i><u>9</u></i></b>'
      );
      expect(getClosestMatchingNode(node, validNodeRegex).node.nodeValue).toBe(
        '9'
      );
    });
    // whitespace and wrapped
    test('parent immediate next next sibling child', () => {
      const node = getStartNodeFromHtmlString(
        '<b><i id="start"></i></b> <b>10</b>'
      );
      expect(getClosestMatchingNode(node, validNodeRegex).node.nodeValue).toBe(
        '10'
      );
    });
    test('parent immediate next next next sibling child', () => {
      const node = getStartNodeFromHtmlString(
        '<b><i id="start"></i></b> <b> </b><b>10</b>'
      );
      expect(getClosestMatchingNode(node, validNodeRegex).node.nodeValue).toBe(
        '10'
      );
    });

    // double wrapped
    test('parent immediate prev sibling nested child', () => {
      const node = getStartNodeFromHtmlString(
        '<b>321<b>10</b></b><b><i id="start"></i></b>'
      );
      expect(getClosestMatchingNode(node, validNodeRegex).node.nodeValue).toBe(
        '10'
      );
    });
    test('parent immediate next sibling nested child', () => {
      const node = getStartNodeFromHtmlString(
        '<b><i id="start"></i></b><b><b>10</b>321</b>'
      );
      expect(getClosestMatchingNode(node, validNodeRegex).node.nodeValue).toBe(
        '10'
      );
    });
  });
  describe('multipart number', () => {
    test('parent immediate next sibling nested child', () => {
      const node = getStartNodeFromHtmlString(
        '<b><i id="start"></i></b><b><b>11</b>.<a>10</a></b>'
      );
      expect(
        getClosestMatchingNode(node, numericNodeRegex).node.nodeValue
      ).toBe('11');
    });
  });
  describe('return null', () => {
    test('non-numeric is closest next', () => {
      const node = getStartNodeFromHtmlString(
        '<b><i id="start"></i><i>$</i>10</b>'
      );
      expect(getClosestMatchingNode(node, numericNodeRegex).node).toBe(null);
    });
    test('non-numeric is closest next after whitespace', () => {
      const node = getStartNodeFromHtmlString(
        '<b><i id="start"></i><i> </i><a>sth</a></b>'
      );
      expect(getClosestMatchingNode(node, numericNodeRegex).node).toBe(null);
    });
    test('non-numeric is closest prev', () => {
      const node = getStartNodeFromHtmlString(
        '<b>10<i>$</i><i id="start"></i></b>'
      );
      expect(getClosestMatchingNode(node, numericNodeRegex).node).toBe(null);
    });
    test('non-numeric is closest prev after whitespace', () => {
      const node = getStartNodeFromHtmlString(
        '<b><i>sth</i><a> </a><i id="start"></i></b>'
      );
      expect(getClosestMatchingNode(node, numericNodeRegex).node).toBe(null);
    });
  });
  describe('direction param', () => {
    test('analyze only one direction', () => {
      const node = getStartNodeFromHtmlString(
        '<b>9<i id="start"></i><i>$</i>10</b>'
      );
      expect(getClosestMatchingNode(node, numericNodeRegex, 'next').node).toBe(
        null
      );
      expect(
        getClosestMatchingNode(node, numericNodeRegex, 'prev').node.nodeValue
      ).toBe('9');
    });
  });
});
