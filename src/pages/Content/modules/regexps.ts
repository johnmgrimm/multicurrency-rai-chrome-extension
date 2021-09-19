import { fiatToRai } from './fiatToRai';
import { allCurrencies } from '../../../shared/consts';

const amountRegexpString = '(-?\\d+(?:\\.\\d+)?(?:,\\d+(?:\\.\\d+)?)*)';
// export const amountRegexpString = `-?\d+\.?\d+`;
// export const amountRegexp = new RegExp(amountRegexpString, 'gi');

// Using regexp literal can improve performance https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
const amountRegexp = new RegExp(amountRegexpString, 'gi');

export const getAmountRegex = () => {
  // Avoid "lastIndex" trap https://stackoverflow.com/questions/1520800/why-does-a-regexp-with-global-flag-give-wrong-results
  amountRegexp.lastIndex = 0;
  return amountRegexp;
};

export const getCurrencyRegexp = (currencyId: string) => {
  return new RegExp(allCurrencies[currencyId].regexp, 'gi');
};

export const getValueSymbolRegex = (currencyId: string) => {
  // console.log(amountRegexpString + allCurrencies[currencyId]);
  return new RegExp(
    amountRegexpString + '(\\s*)' + allCurrencies[currencyId].regexp,
    'gi'
  );
};

// const raiLeftRegexp = new RegExp('(RAI)' + amountRegexpString, 'gi');
// const raiRightRegexp = new RegExp(amountRegexpString + '(RAI)', 'gi');
const raiRegexp = new RegExp(
  '((RAI)' + amountRegexpString + '|' + amountRegexpString + '(RAI))',
  'gi'
);

export const isAlreadyConverted = (node?: Node | null) => {
  if (node && node.nodeValue && raiRegexp.test(node.nodeValue)) {
    return true;
  }
  return false;
};

export const getValueOnlyRegex = () => {
  return new RegExp(amountRegexpString, 'gi');
};

export const getSymbolValueRegex = (currencyId: string) => {
  // console.log(allCurrencies[currencyId].regexp + amountRegexpString);
  return new RegExp(
    allCurrencies[currencyId].regexp + '(\\s*)' + amountRegexpString,
    'gi'
  );
};

export const convertSymbolOnly = (text: string, currencyId: string) => {
  return text.replaceAll(getCurrencyRegexp(currencyId), 'RAI');
};

export const convertValueOnlyPrices = (
  text: string,
  conversionRate: number
) => {
  return text.replaceAll(
    getValueOnlyRegex(),
    (_match: string, value: string) => {
      // console.log(match, group, group2);
      return fiatToRai(value, conversionRate);
    }
  );
};

export const convertSymbolValuePrices = (
  conversionRate: number,
  currencySymbol: string,
  textWithPrice: string
) => {
  return textWithPrice.replaceAll(
    getSymbolValueRegex(currencySymbol),
    (_match: string, _symbol: string, whitespace: string, value: string) => {
      // console.log(match, group, group2);
      return 'RAI' + whitespace + fiatToRai(value, conversionRate);
    }
  );
};

export const convertValueSymbolPrices = (
  conversionRate: number,
  currencySymbol: string,
  textWithPrice: string
) => {
  return textWithPrice.replaceAll(
    getValueSymbolRegex(currencySymbol),
    (_match: string, value: string, whitespace: string, _symbol: string) => {
      // console.log(_match, _symbol, value);
      return fiatToRai(value, conversionRate) + whitespace + 'RAI';
    }
  );
};

// const currencyRegexp = '(USD|U.S.D.|US\\s?\\$|U.S.\\s?\\$|\\$)';
// const excludedChars = '[a-zA-Z0-9$]';
// export const regexpJoin =
//   '(?<!' +
//   excludedChars +
//   ')(' +
//   amountRegexpString +
//   '(' +
//   currencyRegexp +
//   '(?!' +
//   excludedChars +
//   ')))|(((?<!' +
//   excludedChars +
//   ')' +
//   currencyRegexp +
//   ')' +
//   amountRegexpString +
//   ')(?!' +
//   excludedChars +
//   ')'; // Amount and currency without space
// export const regexpShort =
//   '(?<!' + excludedChars + ')' + currencyRegexp + '(?!' + excludedChars + ')'; // Currency (amount can be at left or right)
// export const regexpLong = '((^|(?<=\\s))((U\\.?S\\.?\\s*)?Dollar[s]?)\\b)'; // Currency (amount can be at left)
