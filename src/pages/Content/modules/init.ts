import { startObserver } from './mutationObserver';
import { convertCurrency } from '../search/convertCurrency';

const callback = async () => {
  await convertCurrency(window.document);
};

export const init = () => {
  // console.log('multi-rai-chrome initialized');

  if (
    document.readyState === 'complete' ||
    (document.readyState !== 'loading' &&
      !(document.documentElement as any).doScroll)
  ) {
    callback();
  } else {
    document.addEventListener('DOMContentLoaded', callback);
  }

  // console.log('observer started');
  // Replace any future modifications to the document
  startObserver();

  // chrome.runtime.onMessage.addListener(onOptionsChange);
};
