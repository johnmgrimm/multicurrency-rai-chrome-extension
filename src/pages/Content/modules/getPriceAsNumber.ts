// parseFloat() vs Number() https://stackoverflow.com/questions/12227594/which-is-better-numberx-or-parsefloatx
export const getPriceAsNumber = (price: string) => {
  return parseFloat(price.replaceAll(',', ''));
};
