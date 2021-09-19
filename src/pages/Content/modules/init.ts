import { searchCurrency } from './searchCurrency';
import { startObserver } from './mutationObserver';

const callback = () => {
  // Handler when the DOM is fully loaded
  // Replace current body
  // console.log('searching');
  searchCurrency(window.document);
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
