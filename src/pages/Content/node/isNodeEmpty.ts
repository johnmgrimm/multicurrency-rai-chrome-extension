export function isNodeEmpty(node: Node): boolean {
  return (
    !Boolean(node) || !Boolean(node.nodeValue) || /^\s*$/.test(node.nodeValue!)
  );
}
