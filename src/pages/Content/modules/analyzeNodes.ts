export function analyzeNodes(
  nodes: { nodeType: string; node: Node; value: string }[]
) {
  const tNodes = nodes.map((n) => tokenize(n.value));

  return nodes;
}

function tokenize(text: string) {
  return text
    .replaceAll(/symbolregex/, 'S')
    .replaceAll(/numberregex/, 'N')
    .replaceAll(/\s+/, 'W');
}
