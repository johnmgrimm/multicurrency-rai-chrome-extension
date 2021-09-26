import { valueRegexString } from '../currency/valueRegexString';
import { getLeftMostTextChildNode } from '../modules/nodesExploration/getLeftMostTextChildNode';
import { getRightMostTextChildNode } from '../modules/nodesExploration/getRightMostTextChildNode';

// Lookup strategy: left, right, parent repeat
export function getClosestMatchingNode(
  node: Node,
  validNodeRegex: RegExp
): Node | null {
  let currentNode: Node | null = node;
  let skipPrevNodes = false;
  let skipNextNodes = false;

  do {
    let prevNode = currentNode.previousSibling;
    let nextNode = currentNode.nextSibling;

    while ((prevNode && !skipPrevNodes) || (nextNode && !skipNextNodes)) {
      // look left if looking left is not yet disabled
      if (prevNode && !skipPrevNodes) {
        if (
          prevNode.nodeType == Node.TEXT_NODE &&
          prevNode.nodeValue &&
          prevNode.nodeValue.trim() !== ''
        ) {
          validNodeRegex.lastIndex = 0;
          if (validNodeRegex.test(prevNode.nodeValue)) {
            // contains numeric value
            return prevNode;
          } else {
            // contains non-numeric value
            prevNode = null;
            // skip further looking left
            skipPrevNodes = true;
          }
        } else {
          // prev sibling is not a text node loop though its children
          // e.g. <b>sibling</b><b>start</b>
          // e.g. <b><b>sibling</b></b><b>start</b>
          const prevSiblingTextNode = getRightMostTextChildNode(prevNode);

          if (prevSiblingTextNode) {
            return prevSiblingTextNode;
          }

          // loop over whitespace-only siblings
          // e.g. sibling<b> </b> <b>start</b>
          prevNode = prevNode.previousSibling;
        }
      }

      // look right
      if (nextNode && !skipNextNodes) {
        // prev sibling is a text node
        // e.g. sibling<b>start</b>
        if (
          nextNode.nodeType == Node.TEXT_NODE &&
          nextNode.nodeValue &&
          nextNode.nodeValue.trim() !== ''
        ) {
          validNodeRegex.lastIndex = 0;
          if (validNodeRegex.test(nextNode.nodeValue)) {
            // contains numeric value
            return nextNode;
          } else {
            // contains non-numeric value
            nextNode = null;
            // skip further looking right
            skipNextNodes = true;
          }
        } else {
          // prev sibling is not a text node loop though its children
          // e.g. <b>sibling</b><b>start</b>
          // e.g. <b><b>sibling</b></b><b>start</b>
          const prevSiblingTextNode = getLeftMostTextChildNode(nextNode);

          if (prevSiblingTextNode) {
            return prevSiblingTextNode;
          }

          // loop over whitespace-only siblings
          // e.g. sibling<b> </b> <b>start</b>
          nextNode = nextNode.nextSibling;
        }
      }
    }

    // dive deeper and look for parent siblings
    // e.g. sibling<b><b><b>start</b></b></b>
    currentNode = currentNode.parentNode;
  } while (currentNode);

  return null;
}
