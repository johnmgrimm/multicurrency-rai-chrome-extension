export function getLeftMostTextChildNode(node: Node | null): ChildNode | null {
  const children = node?.childNodes;
  if (!children) return null;

  for (let i = 0; i < children.length; i++) {
    const child = children[i];

    if (child.childNodes.length > 0) {
      const first = getLeftMostTextChildNode(child);
      if (first && first.nodeValue && first.nodeValue.trim() !== '') {
        return first;
      }
    }

    if (child.nodeValue && child.nodeValue.trim() !== '') {
      return child;
    }
  }
  return null;
}
