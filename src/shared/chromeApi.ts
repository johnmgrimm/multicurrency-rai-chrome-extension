export function getExtensionAssetURL(path: string) {
  return chrome.runtime.getURL(path);
}
