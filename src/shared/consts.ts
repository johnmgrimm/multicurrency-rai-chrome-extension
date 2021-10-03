export type CurrencyData = {
  id: string;
  symbol: string;
  regexp: string;
  type: string;
};

export const autoUpdateInterval = 10 * 60 * 1000; // 10 min in ms

export const allCurrencies: CurrencyData[] = [
  {
    id: 'usd',
    symbol: 'USD',
    regexp: 'us\\sdollars?|dollars?|USD|U.S.D.|US\\s?\\$|U.S.\\s?\\$|\\$',
    type: 'fiat',
  },
  {
    id: 'eur',
    symbol: 'EUR',
    regexp: 'EUR|€|euros?',
    type: 'fiat',
  },
  {
    id: 'gbp',
    symbol: 'GBP',
    regexp: 'GBP|£|pounds?|quids?',
    type: 'fiat',
  },
  {
    id: 'jpy',
    symbol: 'JPY',
    regexp: 'JPY|JP¥|¥|yens?',
    type: 'fiat',
  },
  {
    id: 'cny',
    symbol: 'CNY',
    regexp: 'CNY|CN¥|元|¥|yuans?|yuáns?',
    type: 'fiat',
  },
  {
    id: 'krw',
    symbol: 'KRW',
    regexp: 'KRW|₩|wons?',
    type: 'fiat',
  },
  {
    id: 'inr',
    symbol: 'INR',
    regexp: 'INR|₹|rs|rupees?',
    type: 'fiat',
  },
  {
    id: 'dai',
    symbol: 'DAI',
    regexp: 'dais?',
    type: 'crypto',
  },
  {
    id: 'terrausd',
    symbol: 'UST',
    regexp: 'usts?',
    type: 'crypto',
  },
  {
    id: 'binance-usd',
    symbol: 'BUSD',
    regexp: 'busds?',
    type: 'crypto',
  },
  {
    id: 'usd-coin',
    symbol: 'USDC',
    regexp: 'usdcs?',
    type: 'crypto',
  },
  {
    id: 'nusd',
    symbol: 'sUSD',
    regexp: 'susds?',
    type: 'crypto',
  },
  // {
  //   id: 'paxos-standard',
  //   symbol: 'USDP',
  //   regexp: 'usdps?',
  //   type: 'crypto',
  // },
  {
    id: 'payperex',
    symbol: 'PAX',
    regexp: 'paxs?',
    type: 'crypto',
  },
  // {
  //   id: 'pax-gold',
  //   symbol: 'PAXG',
  //   regexp: 'paxgs?',
  //   type: 'crypto',
  // },
  {
    id: 'float-protocol-float',
    symbol: 'FLOAT',
    regexp: 'floats?',
    type: 'crypto',
  },
  {
    id: 'liquity-usd',
    symbol: 'LUSD',
    regexp: 'lusds?',
    type: 'crypto',
  },
];

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
