import { getLeftMostTextChildNode } from './getLeftMostTextChildNode';

/**
 * Gets next sibling node, skipping white-space nodes
 */
export function getNextNonEmptySibling(node: Node | null): Node | null {
  if (!node) {
    return null;
  }

  let currentNode = node;
  while (currentNode.nextSibling) {
    // prev sibling is a text node
    // e.g. <div>sibling<span>start</span></div>
    if (
      currentNode.nextSibling.nodeType == Node.TEXT_NODE &&
      currentNode.nextSibling.nodeValue &&
      currentNode.nextSibling.nodeValue.trim() !== ''
    ) {
      return currentNode.nextSibling;
    }

    // prev sibling is not a text node loop though its children
    // e.g. <div><span>sibling</span><span>start</span></div>
    // e.g. <div><span><span>sibling</span></span><span>start</span></div>
    const nextSiblingTextNode = getLeftMostTextChildNode(
      currentNode.nextSibling
    );

    if (nextSiblingTextNode) {
      return nextSiblingTextNode;
    }

    // loop over whitespace-only siblings
    // e.g. <div>sibling<span> </span> <span>start</span></div>
    currentNode = currentNode.nextSibling;
  }

  // dive deeper and look for parent siblings
  // e.g. <div>sibling<span><span><span>start</span></span></span></div>
  return getNextNonEmptySibling(node.parentNode);
}
