import { createDomFromString } from './createDomFromString';

export function getStartNodeFromHtmlString(htmlString: string) {
  return createDomFromString(htmlString).getElementById('start');
}
