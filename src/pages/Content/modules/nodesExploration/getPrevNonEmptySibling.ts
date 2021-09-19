import { getRightMostTextChildNode } from './getRightMostTextChildNode';

/**
 * Returns previous sibling node, skipping white-space nodes
 */
export function getPrevNonEmptySibling(node: Node | null): Node | null {
  if (!node) {
    return null;
  }

  let currentNode = node;
  while (currentNode.previousSibling) {
    // prev sibling is a text node
    // e.g. <div>sibling<span>start</span></div>
    if (
      currentNode.previousSibling.nodeType == Node.TEXT_NODE &&
      currentNode.previousSibling.nodeValue &&
      currentNode.previousSibling.nodeValue.trim() !== ''
    ) {
      return currentNode.previousSibling;
    }

    // prev sibling is not a text node loop though its children
    // e.g. <div><span>sibling</span><span>start</span></div>
    // e.g. <div><span><span>sibling</span></span><span>start</span></div>
    const prevSiblingTextNode = getRightMostTextChildNode(
      currentNode.previousSibling
    );

    if (prevSiblingTextNode) {
      return prevSiblingTextNode;
    }

    // loop over whitespace-only siblings
    // e.g. <div>sibling<span> </span> <span>start</span></div>
    currentNode = currentNode.previousSibling;
  }

  // dive deeper and look for parent siblings
  // e.g. <div>sibling<span><span><span>start</span></span></span></div>
  return getPrevNonEmptySibling(node.parentNode);
}
