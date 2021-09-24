import { getOuterNode } from './getOuterNode';

export function getOuterNodeValue(document: Document) {
  return getOuterNode(document).firstChild;
}
