import {
  getCurrencyRegexp,
  getAmountRegex,
  convertSymbolValuePrices,
  convertValueSymbolPrices,
} from './regexps';

describe('getCurrencyRegexp', () => {
  describe('usd', () => {
    test('valid symbols', () => {
      expect(getCurrencyRegexp('usd').test('1USD')).toBe(true);
      expect(getCurrencyRegexp('usd').test('1 USD')).toBe(true);
      expect(getCurrencyRegexp('usd').test('1 something USD')).toBe(true);
      expect(getCurrencyRegexp('usd').test('this 1 something USD that')).toBe(
        true
      );
      expect(getCurrencyRegexp('usd').test('1.1 USD')).toBe(true);
      expect(getCurrencyRegexp('usd').test('0.1 USD')).toBe(true);
      expect(getCurrencyRegexp('usd').test('usd')).toBe(true);
      expect(getCurrencyRegexp('usd').test('U.S.D.')).toBe(true);
      expect(getCurrencyRegexp('usd').test('US$')).toBe(true);
      expect(getCurrencyRegexp('usd').test('US $')).toBe(true);
      expect(getCurrencyRegexp('usd').test('U.S. $')).toBe(true);
      expect(getCurrencyRegexp('usd').test('$')).toBe(true);
      expect(getCurrencyRegexp('usd').test('us dollar')).toBe(true);
      expect(getCurrencyRegexp('usd').test('us dollars')).toBe(true);
      expect(getCurrencyRegexp('usd').test('US Dollar')).toBe(true);
      expect(getCurrencyRegexp('usd').test('US Dollars')).toBe(true);
      expect(getCurrencyRegexp('usd').test('Dollar')).toBe(true);
      expect(getCurrencyRegexp('usd').test('Dollars')).toBe(true);
    });
    test('invalid symbols', () => {
      expect(getCurrencyRegexp('usd').test('USDC')).toBe(false);
      expect(getCurrencyRegexp('usd').test('USDT')).toBe(false);
      expect(getCurrencyRegexp('usd').test('UST')).toBe(false);
      expect(getCurrencyRegexp('usd').test('aUSD')).toBe(false);
    });
  });
  describe('eur', () => {
    test('valid symbols', () => {
      expect(getCurrencyRegexp('eur').test('eur')).toBe(true);
      expect(getCurrencyRegexp('eur').test('eur')).toBe(true);
      expect(getCurrencyRegexp('eur').test('€')).toBe(true);
      expect(getCurrencyRegexp('eur').test('Euro')).toBe(true);
      expect(getCurrencyRegexp('eur').test('euro')).toBe(true);
      expect(getCurrencyRegexp('eur').test('euros')).toBe(true);
      expect(getCurrencyRegexp('eur').test('Euros')).toBe(true);
    });
    test('invalid symbols', () => {
      expect(getCurrencyRegexp('eur').test('aEUR')).toBe(false);
      expect(getCurrencyRegexp('eur').test('EURa')).toBe(false);
    });
  });
  describe('gbp', () => {
    test('valid symbols', () => {
      expect(getCurrencyRegexp('gbp').test('gbp')).toBe(true);
      expect(getCurrencyRegexp('gbp').test('GBP')).toBe(true);
      expect(getCurrencyRegexp('gbp').test('£')).toBe(true);
      expect(getCurrencyRegexp('gbp').test('pound')).toBe(true);
      expect(getCurrencyRegexp('gbp').test('pounds')).toBe(true);
      expect(getCurrencyRegexp('gbp').test('Pound')).toBe(true);
      expect(getCurrencyRegexp('gbp').test('Pounds')).toBe(true);
      expect(getCurrencyRegexp('gbp').test('quid')).toBe(true);
      expect(getCurrencyRegexp('gbp').test('quids')).toBe(true);
    });
    test('invalid symbols', () => {
      expect(getCurrencyRegexp('gbp').test('aGBP')).toBe(false);
      expect(getCurrencyRegexp('gbp').test('gbpa')).toBe(false);
      expect(getCurrencyRegexp('gbp').test('apound')).toBe(false);
      expect(getCurrencyRegexp('gbp').test('pounda')).toBe(false);
    });
  });
  describe('jpy', () => {
    test('valid symbols', () => {
      expect(getCurrencyRegexp('jpy').test('jpy')).toBe(true);
      expect(getCurrencyRegexp('jpy').test('JPY')).toBe(true);
      expect(getCurrencyRegexp('jpy').test('JP¥')).toBe(true);
      expect(getCurrencyRegexp('jpy').test('¥')).toBe(true);
      expect(getCurrencyRegexp('jpy').test('yen')).toBe(true);
      expect(getCurrencyRegexp('jpy').test('yens')).toBe(true);
      expect(getCurrencyRegexp('jpy').test('Yen')).toBe(true);
      expect(getCurrencyRegexp('jpy').test('Yens')).toBe(true);
    });
    test('invalid symbols', () => {
      expect(getCurrencyRegexp('jpy').test('aJPY')).toBe(false);
      expect(getCurrencyRegexp('jpy').test('jpya')).toBe(false);
      expect(getCurrencyRegexp('jpy').test('ayen')).toBe(false);
      expect(getCurrencyRegexp('jpy').test('yena')).toBe(false);
    });
  });
  describe('cny', () => {
    test('valid symbols', () => {
      expect(getCurrencyRegexp('cny').test('cny')).toBe(true);
      expect(getCurrencyRegexp('cny').test('CN¥')).toBe(true);
      expect(getCurrencyRegexp('cny').test('元')).toBe(true);
      expect(getCurrencyRegexp('cny').test('¥')).toBe(true);
      expect(getCurrencyRegexp('cny').test('yuan')).toBe(true);
      expect(getCurrencyRegexp('cny').test('yuans')).toBe(true);
      expect(getCurrencyRegexp('cny').test('yuán')).toBe(true);
      expect(getCurrencyRegexp('cny').test('yuáns')).toBe(true);
    });
    test('invalid symbols', () => {
      expect(getCurrencyRegexp('cny').test('aCNY')).toBe(false);
      expect(getCurrencyRegexp('cny').test('uCNY')).toBe(false);
      expect(getCurrencyRegexp('cny').test('yuansy')).toBe(false);
      expect(getCurrencyRegexp('cny').test('ayuans')).toBe(false);
    });
  });
  describe('krw', () => {
    test('valid symbols', () => {
      expect(getCurrencyRegexp('krw').test('krw')).toBe(true);
      expect(getCurrencyRegexp('krw').test('KRW')).toBe(true);
      expect(getCurrencyRegexp('krw').test('₩')).toBe(true);
      expect(getCurrencyRegexp('krw').test('won')).toBe(true);
      expect(getCurrencyRegexp('krw').test('wons')).toBe(true);
      expect(getCurrencyRegexp('krw').test('Won')).toBe(true);
      expect(getCurrencyRegexp('krw').test('Wons')).toBe(true);
    });
    test('invalid symbols', () => {
      expect(getCurrencyRegexp('krw').test('aKRW')).toBe(false);
      expect(getCurrencyRegexp('krw').test('krwa')).toBe(false);
      expect(getCurrencyRegexp('krw').test('awon')).toBe(false);
      expect(getCurrencyRegexp('krw').test('wona')).toBe(false);
    });
  });
  describe('krw', () => {
    test('valid symbols', () => {
      expect(getCurrencyRegexp('krw').test('krw')).toBe(true);
      expect(getCurrencyRegexp('krw').test('KRW')).toBe(true);
      expect(getCurrencyRegexp('krw').test('₩')).toBe(true);
      expect(getCurrencyRegexp('krw').test('won')).toBe(true);
      expect(getCurrencyRegexp('krw').test('wons')).toBe(true);
      expect(getCurrencyRegexp('krw').test('Won')).toBe(true);
      expect(getCurrencyRegexp('krw').test('Wons')).toBe(true);
    });
    test('invalid symbols', () => {
      expect(getCurrencyRegexp('krw').test('aKRW')).toBe(false);
      expect(getCurrencyRegexp('krw').test('krwa')).toBe(false);
      expect(getCurrencyRegexp('krw').test('awon')).toBe(false);
      expect(getCurrencyRegexp('krw').test('wona')).toBe(false);
    });
  });
  describe('inr', () => {
    test('valid symbols', () => {
      expect(getCurrencyRegexp('inr').test('inr')).toBe(true);
      expect(getCurrencyRegexp('inr').test('INR')).toBe(true);
      expect(getCurrencyRegexp('inr').test('₹')).toBe(true);
      expect(getCurrencyRegexp('inr').test('Rs')).toBe(true);
      expect(getCurrencyRegexp('inr').test('rs')).toBe(true);
      expect(getCurrencyRegexp('inr').test('rupee')).toBe(true);
      expect(getCurrencyRegexp('inr').test('rupees')).toBe(true);
      expect(getCurrencyRegexp('inr').test('Rupee')).toBe(true);
      expect(getCurrencyRegexp('inr').test('Rupees')).toBe(true);
    });
    test('invalid symbols', () => {
      expect(getCurrencyRegexp('inr').test('aINR')).toBe(false);
      expect(getCurrencyRegexp('inr').test('inra')).toBe(false);
      expect(getCurrencyRegexp('inr').test('arupee')).toBe(false);
      expect(getCurrencyRegexp('inr').test('rupeea')).toBe(false);
    });
  });
  describe('dai', () => {
    test('valid symbols', () => {
      expect(getCurrencyRegexp('dai').test('dai')).toBe(true);
      expect(getCurrencyRegexp('dai').test('DAI')).toBe(true);
      expect(getCurrencyRegexp('dai').test('DAIs')).toBe(true);
    });
  });
});

describe('getAmountRegex', () => {
  test('test()', () => {
    expect(getAmountRegex().test('abc')).toBe(false);
    expect(getAmountRegex().test('a1bc')).toBe(true);
    expect(getAmountRegex().test('abc1')).toBe(true);

    expect(getAmountRegex().test('123')).toBe(true);
    expect(getAmountRegex().test('123.0')).toBe(true);
    expect(getAmountRegex().test('123.1123')).toBe(true);
    expect(getAmountRegex().test('0.123')).toBe(true);
    expect(getAmountRegex().test('1,11.123')).toBe(true);

    expect(getAmountRegex().test('-123')).toBe(true);
    expect(getAmountRegex().test('-123.0')).toBe(true);
    expect(getAmountRegex().test('-123.1123')).toBe(true);
    expect(getAmountRegex().test('-0.123')).toBe(true);
    expect(getAmountRegex().test('-1,11.123')).toBe(true);
  });
  test('match()', () => {
    expect('asdf'.match(getAmountRegex())).toEqual(null);
    expect('1abc'.match(getAmountRegex())).toEqual(['1']);
    expect('aa1abc'.match(getAmountRegex())).toEqual(['1']);
    expect('aa12.23aa12.12'.match(getAmountRegex())).toEqual([
      '12.23',
      '12.12',
    ]);
  });
});

test('convertSymbolValuePrices', () => {
  expect(
    convertSymbolValuePrices(
      3,
      'usd',
      'some USD -1 value $1.50 and US$1 or US $1'
    )
  ).toBe('some RAI -3 value RAI4.50 and RAI3 or RAI3');
  expect(convertSymbolValuePrices(3, 'usd', '$1.50')).toBe('RAI4.50');
});

test('convertValueSymbolPrices', () => {
  expect(
    convertValueSymbolPrices(
      3,
      'usd',
      'some 1USD value 1.50$ and 1US$ or 1US $'
    )
  ).toBe('some 3RAI value 4.50RAI and 3RAI or 3RAI');
});
