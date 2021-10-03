import { getUpdatedConversionRates } from './getUpdatedConversionRates';
import { getStoredData, setStoredData } from './storedData';
import { getRaiConversionRates } from '../pages/Background/getRaiConversionRates';

jest.mock('./storedData');
jest.mock('../pages/Background/getRaiConversionRates');
let dateNowSpy: any;

beforeAll(() => {
  dateNowSpy = jest.spyOn(Date, 'now').mockImplementation(() => 1487076708000);
});

afterAll(() => {
  dateNowSpy.mockRestore();
});

describe('getUpdatedConversionRates', () => {
  test('happy path', async () => {
    (getStoredData as jest.Mock).mockResolvedValue({
      conversionRates: {
        usd: 1,
        dai: 1.01,
      },
      enabled: ['usd'],
      lastRatesUpdate: 123,
    });
    (getRaiConversionRates as jest.Mock).mockResolvedValue({
      usd: 1.23,
      dai: 4.56,
    });

    await getUpdatedConversionRates();
    expect(setStoredData).toBeCalledWith({
      conversionRates: {
        usd: 1.23,
        dai: 4.56,
        'binance-usd': undefined,
        cny: undefined,
        eur: undefined,
        'float-protocol-float': undefined,
        gbp: undefined,
        inr: undefined,
        jpy: undefined,
        krw: undefined,
        'liquity-usd': undefined,
        nusd: undefined,
        payperex: undefined,
        terrausd: undefined,
        'usd-coin': undefined,
      },
      enabled: ['usd'],
      lastRatesUpdate: 1487076708000,
    });
  });
});
