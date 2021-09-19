import { convertNodePrice } from './convertNodePrice';
import { getNextNonEmptySibling } from './nodesExploration/getNextNonEmptySibling';
import { getPrevNonEmptySibling } from './nodesExploration/getPrevNonEmptySibling';
import {
  convertSymbolOnly,
  convertSymbolValuePrices,
  convertValueSymbolPrices,
  isAlreadyConverted,
} from './regexps';
import {
  hasCurrencySymbol,
  hasSymbolValuePrice,
  hasValueSymbolPrice,
  hasPriceValue,
} from './utils';

export const walkNode = (
  conversionRate: number,
  currencySymbol: string,
  node?: Node
) => {
  // nodeValue has to be present to analyze the node further
  if (!node || !node.nodeValue) return;
  // TODO: find a way to get PREV and NEXT siblings

  if (!hasCurrencySymbol(node, currencySymbol)) {
    // node has no symbol then move to the next node
    return;
  }

  // Value and symbol within one node
  // so convert it

  if (hasSymbolValuePrice(currencySymbol, node)) {
    // node has both value and symbol
    // this is probably not possible for a "next node" to be already converted as in "prev node" case
    let fractionNode: Node | null;
    // look for price spread across multiple elements
    // e.g. <div><span>$1</span><small>99</small></div>
    // e.g. <div><span>$1</span><span>.</span><span>99</span></div>
    const separatorOrFractionNode = getNextNonEmptySibling(node);
    if (separatorOrFractionNode && separatorOrFractionNode.nodeValue) {
      // there is a non-empty node after initial node so price might be spread across multiple nodes
      if (separatorOrFractionNode.nodeValue?.trim() === '.') {
        // if it is a separator then go for the next node
        fractionNode = getNextNonEmptySibling(separatorOrFractionNode);

        convertNodePrice(currencySymbol, conversionRate, node, fractionNode);
        node.nodeValue = convertSymbolOnly(node.nodeValue, currencySymbol);
        // } else if (getValueOnlyRegex().test(separatorOrFractionNode.nodeValue)) {
        //   // if this is a value use it as fraction part
        //   fractionNode = separatorOrFractionNode;

        //   convertNodePrice(node, fractionNode);
        //   node.nodeValue = convertSymbolOnly(node.nodeValue, currencySymbol);
      } else {
        // every other content besides "." or number
        node.nodeValue = convertSymbolValuePrices(
          conversionRate,
          currencySymbol,
          node.nodeValue
        );
      }
    } else {
      // entire price in this node
      node.nodeValue = convertSymbolValuePrices(
        conversionRate,
        currencySymbol,
        node.nodeValue
      );
    }
    return;
  }

  if (hasValueSymbolPrice(currencySymbol, node)) {
    // node has both value and symbol

    let integerNode: Node | null;
    // look for price spread across multiple elements
    // e.g. <div><span>1</span><small>99$</small></div>
    // e.g. <div><span>1</span><span>.</span><span>99$</span></div>
    const separatorOrIntegerNode = getPrevNonEmptySibling(node);
    if (separatorOrIntegerNode && separatorOrIntegerNode.nodeValue) {
      // there is a non-empty node after initial node so price might be spread across multiple nodes
      if (separatorOrIntegerNode.nodeValue?.trim() === '.') {
        // if it is a separator then go for the next node
        integerNode = getPrevNonEmptySibling(separatorOrIntegerNode);

        convertNodePrice(currencySymbol, conversionRate, integerNode, node);
        node.nodeValue = convertSymbolOnly(node.nodeValue, currencySymbol);
        // } else if (getValueOnlyRegex().test(separatorOrIntegerNode.nodeValue)) {
        //   // if this is a value use it as fraction part
        //   integerNode = separatorOrIntegerNode;

        //   convertNodePrice(integerNode, node);
        //   node.nodeValue = convertSymbolOnly(node.nodeValue, currencySymbol);
      } else {
        // every other content besides "." or number
        node.nodeValue = convertValueSymbolPrices(
          conversionRate,
          currencySymbol,
          node.nodeValue
        );
      }
    } else {
      // entire price in this node
      node.nodeValue = convertValueSymbolPrices(
        conversionRate,
        currencySymbol,
        node.nodeValue
      );
    }
    return;
  }

  // Value in a different node than symbol
  // look around to find it

  // look for value in prev node
  const prevNode = getPrevNonEmptySibling(node);
  if (
    prevNode &&
    !hasCurrencySymbol(prevNode, currencySymbol) &&
    hasPriceValue(prevNode) &&
    !isAlreadyConverted(prevNode)
  ) {
    let integerNode: Node | null;
    // look for price spread across multiple elements
    // e.g. <div><span>$</span><span>1</span><small>99</small></div>
    // e.g. <div><span>$</span><span>1</span><span>.</span><span>99</span></div>
    const separatorOrIntegerNode = getPrevNonEmptySibling(prevNode);
    if (
      separatorOrIntegerNode &&
      separatorOrIntegerNode.nodeValue?.trim() === '.'
    ) {
      integerNode = getPrevNonEmptySibling(separatorOrIntegerNode);
    } else {
      integerNode = separatorOrIntegerNode;
    }

    convertNodePrice(currencySymbol, conversionRate, integerNode, prevNode);
    node.nodeValue = convertSymbolOnly(node.nodeValue, currencySymbol);
  }

  // look for value in next node
  const nextNode = getNextNonEmptySibling(node);
  if (
    nextNode &&
    !hasCurrencySymbol(nextNode, currencySymbol) &&
    hasPriceValue(nextNode)
  ) {
    // this is probably not possible for a "next node" to be already converted as in "prev node" case
    let fractionNode: Node | null;
    // look for price spread across multiple elements
    // e.g. <div><span>$</span><span>1</span><small>99</small></div>
    // e.g. <div><span>$</span><span>1</span><span>.</span><span>99</span></div>
    const separatorOrFractionNode = getNextNonEmptySibling(nextNode);
    if (
      separatorOrFractionNode &&
      separatorOrFractionNode.nodeValue?.trim() === '.'
    ) {
      fractionNode = getNextNonEmptySibling(separatorOrFractionNode);
    } else {
      fractionNode = separatorOrFractionNode;
    }

    convertNodePrice(currencySymbol, conversionRate, nextNode, fractionNode);
    node.nodeValue = convertSymbolOnly(node.nodeValue, currencySymbol);
  }

  // TODO: possibly simplify by walking through nodes gathering them in a sliding window
  return;
};
