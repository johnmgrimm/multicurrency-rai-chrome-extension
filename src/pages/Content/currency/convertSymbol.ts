export function convertSymbol(symbolRegex: RegExp, text: string): string {
  return text.replaceAll(symbolRegex, (_match: string, ...groups: string[]) => {
    return groups[0] + 'RAI' + groups[2];
  });
}
