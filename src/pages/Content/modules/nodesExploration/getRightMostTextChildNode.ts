export function getRightMostTextChildNode(node: Node | null): Node | null {
  const children = node?.childNodes;
  if (!children) return null;

  for (let i = children.length - 1; i >= 0; i--) {
    const child = children[i];

    if (child.childNodes.length > 0) {
      const last = getRightMostTextChildNode(child);
      if (last && last.nodeValue && last.nodeValue.trim() !== '') {
        return last;
      }
    }

    if (child.nodeValue && child.nodeValue.trim() !== '') {
      return child;
    }
  }
  return null;
}
