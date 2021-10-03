import { getRightMostTextChildNode } from './getRightMostTextChildNode';

/**
 * Returns previous sibling node, skipping white-space nodes
 */
export function getPrevNonEmptySibling(node: Node): Node | null {
  let currentNode: Node | null = node;

  do {
    while (currentNode.previousSibling) {
      // prev sibling is a text node
      // e.g. sibling<b>start</b>
      if (
        currentNode.previousSibling.nodeType == Node.TEXT_NODE &&
        currentNode.previousSibling.nodeValue &&
        currentNode.previousSibling.nodeValue.trim() !== ''
      ) {
        return currentNode.previousSibling;
      }

      // prev sibling is not a text node loop though its children
      // e.g. <b>sibling</b><b>start</b>
      // e.g. <b><b>sibling</b></b><b>start</b>
      const prevSiblingTextNode = getRightMostTextChildNode(
        currentNode.previousSibling
      );

      if (prevSiblingTextNode) {
        return prevSiblingTextNode;
      }

      // loop over whitespace-only siblings
      // e.g. sibling<b> </b> <b>start</b>
      currentNode = currentNode.previousSibling;
    }

    // dive deeper and look for parent siblings
    // e.g. sibling<b><b><b>start</b></b></b>
    currentNode = currentNode.parentNode;
  } while (currentNode);

  return null;
}
