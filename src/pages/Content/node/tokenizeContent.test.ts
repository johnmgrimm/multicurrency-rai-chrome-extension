import { tokenizeContent } from './tokenizeContent';

const regex = new RegExp(
  'us\\sdollars?|dollars?|USD|U.S.D.|US\\s?\\$|U.S.\\s?\\$|\\$|EUR|€|euros?|e',
  'gi'
);

describe('tokenizeContent', () => {
  test('nothing to tokenize', () => {
    expect(tokenizeContent('abc abc', regex)).toStrictEqual(['abc abc']);
  });
  test('symbol at start', () => {
    expect(tokenizeContent('$ abc', regex)).toStrictEqual(['$', ' abc']);
  });
  test('symbol at the end', () => {
    expect(tokenizeContent('abc $', regex)).toStrictEqual(['abc ', '$']);
  });
  test('symbol in the middle', () => {
    expect(tokenizeContent('abc $ abc', regex)).toStrictEqual([
      'abc ',
      '$',
      ' abc',
    ]);
  });
  test('multiple symbols', () => {
    expect(
      tokenizeContent('$ abc USD abc xyz abc dollar asd $$', regex)
    ).toStrictEqual([
      '$',
      ' abc ',
      'USD',
      ' abc xyz abc ',
      'dollar',
      ' asd ',
      '$',
      '$',
    ]);
  });
});
