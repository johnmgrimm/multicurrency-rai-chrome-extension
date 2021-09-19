export type CurrencyData = {
  id: string;
  symbol: string;
  regexp: string;
  type: string;
};

export const autoUpdateInterval = 10 * 60 * 1000; // 10 min in ms

export const allCurrencies: { [key: string]: CurrencyData } = {
  usd: {
    id: 'usd',
    symbol: 'USD',
    regexp:
      '(?<![A-Za-z])(us\\sdollars?|dollars?|USD|U.S.D.|US\\s?\\$|U.S.\\s?\\$|\\$)(?![A-Za-z])',
    type: 'fiat',
  },
  eur: {
    id: 'eur',
    symbol: 'EUR',
    regexp: '(?<![A-Za-z])(EUR|€|euros?)(?![A-Za-z])',
    type: 'fiat',
  },
  gbp: {
    id: 'gbp',
    symbol: 'GBP',
    regexp: '(?<![A-Za-z])(GBP|£|pounds?|quids?)(?![A-Za-z])',
    type: 'fiat',
  },
  jpy: {
    id: 'jpy',
    symbol: 'JPY',
    regexp: '(?<![A-Za-z])(JPY|JP¥|¥|yens?)(?![A-Za-z])',
    type: 'fiat',
  },
  cny: {
    id: 'cny',
    symbol: 'CNY',
    regexp: '(?<![A-Za-z])(CNY|CN¥|元|¥|yuans?|yuáns?)(?![A-Za-z])',
    type: 'fiat',
  },
  krw: {
    id: 'krw',
    symbol: 'KRW',
    regexp: '(?<![A-Za-z])(KRW|₩|wons?)(?![A-Za-z])',
    type: 'fiat',
  },
  inr: {
    id: 'inr',
    symbol: 'INR',
    regexp: '(?<![A-Za-z])(INR|₹|rs|rupees?)(?![A-Za-z])',
    type: 'fiat',
  },
  dai: {
    id: 'dai',
    symbol: 'DAI',
    regexp: '(?<![A-Za-z])(dais?)(?![A-Za-z])',
    type: 'crypto',
  },
  terrausd: {
    id: 'terrausd',
    symbol: 'UST',
    regexp: '(?<![A-Za-z])(usts?)(?![A-Za-z])',
    type: 'crypto',
  },
  'binance-usd': {
    id: 'binance-usd',
    symbol: 'BUSD',
    regexp: '(?<![A-Za-z])(busds?)(?![A-Za-z])',
    type: 'crypto',
  },
  'usd-coin': {
    id: 'usd-coin',
    symbol: 'USDC',
    regexp: '(?<![A-Za-z])(usdcs?)(?![A-Za-z])',
    type: 'crypto',
  },
  nusd: {
    id: 'nusd',
    symbol: 'sUSD',
    regexp: '(?<![A-Za-z])(susds?)(?![A-Za-z])',
    type: 'crypto',
  },
  // usdp: {
  //   id: 'paxos-standard',
  //   symbol: 'USDP',
  //   regexp: '(?<![A-Za-z])(usdps?)(?![A-Za-z])',
  //   type: 'crypto',
  // },
  payperex: {
    id: 'payperex',
    symbol: 'PAX',
    regexp: '(?<![A-Za-z])(paxs?)(?![A-Za-z])',
    type: 'crypto',
  },
  // 'pax-gold': {
  //   id: 'pax-gold',
  //   symbol: 'PAXG',
  //   regexp: '(?<![A-Za-z])(paxgs?)(?![A-Za-z])',
  //   type: 'crypto',
  // },
  'float-protocol-float': {
    id: 'float-protocol-float',
    symbol: 'FLOAT',
    regexp: '(?<![A-Za-z])(floats?)(?![A-Za-z])',
    type: 'crypto',
  },
  'liquity-usd': {
    id: 'liquity-usd',
    symbol: 'LUSD',
    regexp: '(?<![A-Za-z])(lusds?)(?![A-Za-z])',
    type: 'crypto',
  },
};

export type ConversionRates = { [key: string]: number };

export type StoredData = {
  conversionRates: ConversionRates;
  lastRatesUpdate: number;
  // enabled: { [key: string]: boolean };
  enabled: string[];
};
// decimals: number;
// conversion: number;
// refreshConversionTime: number;
// enabled: boolean;
// marketPrice: false;
//   usd: CurrencyData;
//   eur: CurrencyData;
//   dai: CurrencyData;
// };

// id - coingecko currency ID
// currencies and conversionRates should be kept in-sync
export const defaultData: StoredData = {
  conversionRates: {
    usd: 1,
    eur: 1,
    dai: 1,
    terrausd: 1,
    'binance-usd': 1,
  },
  // enabled: {
  //   usd: true,
  //   eur: true,
  //   dai: false,
  //   terrausd: false,
  //   'binance-usd': false,
  // },
  enabled: ['usd', 'eur'],
  lastRatesUpdate: 0,
};

// 'usd-coin': 3.02,
// 'binance-usd': 3.02,
// nusd: 0.993711 * 3.02,
// terrausd: 1.01 * 3.02,
// dai: 3.02,
// payperex: 9.45 * 3.02,
// 'float-protocol-float': 1.44 * 3.02,
// 'liquity-usd': 3.02,
// usd: 3.02,
// eur: 2.57,
// cny: 19.5,
// jpy: 331.57,
// gbp: 2.2,
// krw: 3565.28,
// inr: 222.29,
