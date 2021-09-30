export function tokenizeContent(text: string, symbolsRegex: RegExp): string[] {
  const matches = text.match(symbolsRegex);
  const splitted = text.split(symbolsRegex);
  const merged: string[] = [];

  while (splitted.length > 0) {
    merged.push(splitted.shift()!);
    if (matches && matches.length > 0) {
      merged.push(matches.shift()!);
    }
  }

  return merged.filter((element) => element !== '');
}
