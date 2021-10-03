export function isNodeMatchingRegex(node: Node, regex: RegExp) {
  // required to avoid regex lastIndex issues
  regex.lastIndex = 0;
  // treat lack of nodeValue as empty string value
  if (!node || !node.nodeValue) {
    return regex.test('');
  }
  return regex.test(node.nodeValue);
}
