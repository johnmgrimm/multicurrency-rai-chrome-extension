import { searchCurrency } from './searchCurrency';

// https://stackoverflow.com/questions/8882502/how-to-track-dom-change-in-chrome-extension
const observer = new MutationObserver((mutations) => {
  mutations.forEach(function (mutation) {
    if (
      mutation.type === 'characterData' &&
      mutation.target &&
      mutation.target.parentNode
    ) {
      // console.log(
      //   'mutation characterData, search in',
      //   mutation.target.parentNode
      // );
      searchCurrency(mutation.target.parentNode);
    } else if (mutation.type === 'childList') {
      // console.log('mutation childList');
      mutation.addedNodes.forEach((node) => {
        // console.log('search in', node.parentNode);
        if (node.parentNode) {
          searchCurrency(node.parentNode);
        } else {
          searchCurrency(node);
        }
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
