export const getPricePrecision = (price: string) => {
  const dotIndex = price.indexOf('.');
  if (dotIndex <= 0) {
    return 0;
  }

  return price.length - dotIndex - 1;
};
