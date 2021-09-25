export function createDomFromString(htmlString: string): Document {
  return new DOMParser().parseFromString(htmlString, 'text/html');
}
