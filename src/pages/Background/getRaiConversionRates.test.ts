import {
  convertToRaiConversionRates,
  getRaiConversionRates,
} from './getRaiConversionRates';
import fetchApi from './fetchApi';

jest.mock('./fetchApi');
const apiResponseJson = {
  'usd-coin': {
    usd: 1.0,
    eur: 0.856371,
    cny: 6.49,
    jpy: 110.39,
    gbp: 0.730812,
    krw: 1186.95,
    inr: 74.01,
  },
  'binance-usd': {
    usd: 1.0,
    eur: 0.855596,
    cny: 6.49,
    jpy: 110.29,
    gbp: 0.730151,
    krw: 1185.88,
    inr: 73.94,
  },
  nusd: {
    usd: 0.993711,
    eur: 0.84745,
    cny: 6.43,
    jpy: 109.24,
    gbp: 0.723199,
    krw: 1174.59,
    inr: 73.24,
  },
  terrausd: {
    usd: 1.01,
    eur: 0.859628,
    cny: 6.52,
    jpy: 110.81,
    gbp: 0.733592,
    krw: 1191.47,
    inr: 74.29,
  },
  dai: {
    usd: 1.0,
    eur: 0.856572,
    cny: 6.49,
    jpy: 110.41,
    gbp: 0.730984,
    krw: 1187.23,
    inr: 74.02,
  },
  payperex: {
    usd: 9.45,
    eur: 8.01,
    cny: 60.85,
    jpy: 1033.22,
    gbp: 6.83,
    krw: 11073.99,
    inr: 693.19,
  },
  'float-protocol-float': {
    usd: 1.44,
    eur: 1.23,
    cny: 9.29,
    jpy: 157.95,
    gbp: 1.05,
    krw: 1698.33,
    inr: 105.89,
  },
  rai: {
    usd: 3.02,
    eur: 2.57,
    cny: 19.5,
    jpy: 331.57,
    gbp: 2.2,
    krw: 3565.28,
    inr: 222.29,
  },
  'liquity-usd': {
    usd: 1.0,
    eur: 0.854793,
    cny: 6.48,
    jpy: 110.18,
    gbp: 0.729466,
    krw: 1184.76,
    inr: 73.87,
  },
};

describe('getConversionRate', () => {
  test('happy path', async () => {
    (fetchApi as jest.Mock).mockResolvedValue({
      ok: 'ok',
      json: () => Promise.resolve(apiResponseJson),
    });

    const rates = await getRaiConversionRates();
    expect(fetchApi).toBeCalledWith(
      'https://api.coingecko.com/api/v3/simple/price?ids=rai,dai,usd-coin,nusd,terrausd,payperex,binance-usd,liquity-usd,float-protocol-float&vs_currencies=usd,eur,cny,jpy,gbp,krw,inr'
    );
    expect(rates).toStrictEqual({
      'binance-usd': 0.33112582781456956,
      cny: 0.05128205128205128,
      dai: 0.33112582781456956,
      eur: 0.38910505836575876,
      'float-protocol-float': 0.2299484915378955,
      gbp: 0.45454545454545453,
      inr: 0.004498627918484863,
      jpy: 0.0030159543987694905,
      krw: 0.00028048287932504597,
      'liquity-usd': 0.33112582781456956,
      nusd: 0.3332214575611718,
      payperex: 0.03503977013910789,
      terrausd: 0.327847354271851,
      usd: 0.33112582781456956,
      'usd-coin': 0.33112582781456956,
    });
  });
});

describe('convertToRaiConversionRates', () => {
  test('happy path', () => {
    expect(convertToRaiConversionRates(apiResponseJson)).toStrictEqual({
      'binance-usd': 0.33112582781456956,
      cny: 0.05128205128205128,
      dai: 0.33112582781456956,
      eur: 0.38910505836575876,
      'float-protocol-float': 0.2299484915378955,
      gbp: 0.45454545454545453,
      inr: 0.004498627918484863,
      jpy: 0.0030159543987694905,
      krw: 0.00028048287932504597,
      'liquity-usd': 0.33112582781456956,
      nusd: 0.3332214575611718,
      payperex: 0.03503977013910789,
      terrausd: 0.327847354271851,
      usd: 0.33112582781456956,
      'usd-coin': 0.33112582781456956,
    });
  });
});
