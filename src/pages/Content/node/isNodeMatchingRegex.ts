const symbolRegexString = 'EUR|€|euros?';

export function isNodeMatchingRegex(node: Node, regex: RegExp) {
  // treat lack of nodeValue as empty string value
  if (!node || !node.nodeValue) {
    return regex.test('');
  }
  return regex.test(node.nodeValue);
}
