export function createDomFromString(htmlString: string) {
  return new DOMParser().parseFromString(htmlString, 'text/html');
}
