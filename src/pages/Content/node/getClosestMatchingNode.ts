import { getLeftMostTextChildNode } from '../modules/nodesExploration/getLeftMostTextChildNode';
import { getRightMostTextChildNode } from '../modules/nodesExploration/getRightMostTextChildNode';

// Lookup strategy: left, right, parent repeat
export function getClosestMatchingNode(
  node: Node,
  validNodeRegex: RegExp,
  direction?: 'next' | 'prev'
): { node: Node | null; dir: 'prev' | 'next' | null } {
  let currentNode: Node | null = node;
  let skipPrevNodes = direction == 'next' ? true : false;
  let skipNextNodes = direction == 'prev' ? true : false;

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
            // contains matching value
            return { node: prevNode, dir: 'prev' };
          } else {
            // contains non-matching value
            prevNode = null;
            // skip further looking left
            skipPrevNodes = true;
          }
        } else {
          // prev sibling is not a text node loop though its children
          // e.g. <b>sibling</b><b>start</b>
          // e.g. <b><b>sibling</b></b><b>start</b>
          const prevSiblingTextNode = getRightMostTextChildNode(prevNode);

          if (prevSiblingTextNode && prevSiblingTextNode.nodeValue) {
            validNodeRegex.lastIndex = 0;
            if (validNodeRegex.test(prevSiblingTextNode.nodeValue)) {
              // contains matchin value
              return { node: prevSiblingTextNode, dir: 'prev' };
            } else {
              // contains non-matching value
              return { node: null, dir: 'prev' };
            }
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
            // contains matching value
            return { node: nextNode, dir: 'next' };
          } else {
            // contains non-matching value
            nextNode = null;
            // skip further looking right
            skipNextNodes = true;
          }
        } else {
          // prev sibling is not a text node loop though its children
          // e.g. <b>sibling</b><b>start</b>
          // e.g. <b><b>sibling</b></b><b>start</b>
          const nextSiblingTextNode = getLeftMostTextChildNode(nextNode);

          if (nextSiblingTextNode && nextSiblingTextNode.nodeValue) {
            validNodeRegex.lastIndex = 0;
            if (validNodeRegex.test(nextSiblingTextNode.nodeValue)) {
              // contains matching value
              return { node: nextSiblingTextNode, dir: 'next' };
            } else {
              return { node: null, dir: 'next' };
            }
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

  return { node: null, dir: null };
}
