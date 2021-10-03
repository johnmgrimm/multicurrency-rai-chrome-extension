import { convertCurrency } from '../search/convertCurrency';

// https://stackoverflow.com/questions/8882502/how-to-track-dom-change-in-chrome-extension
const observer = new MutationObserver((mutations) => {
  mutations.forEach(function (mutation) {
    console.log('mutation', mutation);
    if (mutation.type === 'characterData' && mutation.target) {
      console.log('mutation characterData, search in', mutation.target);
      convertCurrency(mutation.target);
    } else if (
      mutation.type === 'childList' &&
      mutation.addedNodes.length > 0
    ) {
      // console.log('mutation childList');
      mutation.addedNodes.forEach((node) => {
        // console.log('search in', node.parentNode);
        // if (node.parentNode) {
        //   convertCurrency(node.parentNode);
        // } else {
        convertCurrency(node);
        // }
      });
    }
  });
});

// Start observation
export const startObserver = () => {
  observer.observe(window.document, {
    childList: true,
    subtree: true,
    characterData: true,
  });
};

// End observation
export const disconnectObserver = () => {
  observer.disconnect();
};
