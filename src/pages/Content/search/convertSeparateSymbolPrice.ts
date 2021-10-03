import { CurrencyData, ConversionRates } from '../../../shared/consts';
import { convertSymbol } from '../currency/convertSymbol';
import { convertValue } from '../currency/convertValue';
import { getCurrencyIdFromSymbol } from '../currency/getCurrencyIdFromSymbol';
import { getSymbolRegex } from '../currency/getSymbolRegex';
import { valueRegexString } from '../currency/valueRegexString';
import { getClosestMatchingNode } from '../node/getClosestMatchingNode';

// TODO: find right regex
const numericRegex = new RegExp(`^(\\s*)(${valueRegexString})(\\s*)$`, 'gi');

const numerciOrDotRegex = new RegExp(
  `^(\\s*)(${valueRegexString}|.)(\\s*)$`,
  'gi'
);

export function convertSeparateSymbolPrice(
  node: Node,
  currenciesList: CurrencyData[],
  conversionRates: ConversionRates
) {
  numericRegex.lastIndex = 0;
  // look around for numeric value
  // TODO: ensure that this is a numeric value node
  const { node: firstNumericNode, dir } = getClosestMatchingNode(
    node,
    numericRegex
  );
  if (!firstNumericNode || !dir) {
    // no non-empty nodes around
    return;
  }

  // convert currency symbol
  const currencyId = getCurrencyIdFromSymbol(currenciesList, node.nodeValue!);
  if (!currencyId) {
    // TODO: highly unlikely to happen, but skip conversion just in case
    return;
  }

  node.nodeValue = convertSymbol(
    getSymbolRegex(currenciesList),
    node.nodeValue!
  );

  // look for separator or number
  const { node: secondNumericNode } = getClosestMatchingNode(
    firstNumericNode,
    numerciOrDotRegex,
    dir
  );
  if (secondNumericNode && secondNumericNode.nodeValue) {
    let integerNode = null;
    let fractionNode = null;
    if (secondNumericNode.nodeValue.trim() === '.') {
      // with dot separator
      // convert 3 node type price e.g. <>$</>10<>.</>10
      const { node: thirdNumericNode } = getClosestMatchingNode(
        secondNumericNode,
        numericRegex,
        dir
      );
      if (!thirdNumericNode || !thirdNumericNode.nodeValue) {
        // some kind of strange looking price e.g.  <>$</>10<>.</> or  <>.</>10<>$</>
        if (dir === 'next') {
          integerNode = firstNumericNode;
        } else {
          fractionNode = firstNumericNode;
        }
      } else {
        // regular 3 element price
        integerNode = dir === 'next' ? firstNumericNode : thirdNumericNode;
        fractionNode = dir === 'next' ? thirdNumericNode : firstNumericNode;
      }
    } else {
      // without dot separator
      // convert 2 node type price e.g. <>$</>10<>10</>
      integerNode = dir === 'next' ? firstNumericNode : secondNumericNode;
      fractionNode = dir === 'next' ? secondNumericNode : firstNumericNode;
    }
    convertValueInNodes(integerNode, fractionNode, currencyId, conversionRates);
  } else {
    // 1 node type price e.g. <>$</>10
    firstNumericNode.nodeValue = convertValue(
      currencyId,
      conversionRates,
      firstNumericNode.nodeValue!
    );
  }
}

function getWhitespacesAndValue(node: Node | null): string[] {
  if (!node) {
    return ['', '0', ''];
  }
  const matches = node.nodeValue!.match(/(\s*)(\S+)(\s*)/);
  if (!matches) {
    console.error('Unexpected lack of matches');
    return ['', '0', ''];
  }
  // get rid of first element that is a full match as it is not used
  matches.shift();
  if (matches.length !== 3) {
    console.error('Unexpected number of matches');
    return ['', '0', ''];
  }
  return matches;
}

function convertValueInNodes(
  firstNode: Node | null,
  secondNode: Node | null,
  currencyId: string,
  conversionRates: ConversionRates
) {
  const whitespacesAndValue1 = getWhitespacesAndValue(firstNode);
  const whitespacesAndValue2 = getWhitespacesAndValue(secondNode);
  const price = whitespacesAndValue1[1] + '.' + whitespacesAndValue2[1];
  const converted = convertValue(currencyId, conversionRates, price).split('.');
  if (firstNode) {
    firstNode.nodeValue =
      whitespacesAndValue1[0] + converted[0] + whitespacesAndValue1[2];
  }
  if (secondNode) {
    secondNode.nodeValue =
      whitespacesAndValue2[0] + converted[1] + whitespacesAndValue2[2];
  }
}
