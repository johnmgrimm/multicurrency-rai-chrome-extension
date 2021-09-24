import { createDomFromString } from './createDomFromString';

export function createTextNode(htmlString: string) {
  return createDomFromString(htmlString).getElementsByTagName('div')[0]
    .firstChild;
}
