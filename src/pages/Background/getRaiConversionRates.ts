import fetchApi from './fetchApi';

export const getRaiConversionRates = async (): Promise<{
  [key: string]: number;
}> => {
  // It is probably faster to make one API call than two: crypto-usd, rai-fiat
  const response = await fetchApi(
    'https://api.coingecko.com/api/v3/simple/price?ids=rai,dai,usd-coin,nusd,terrausd,payperex,binance-usd,liquity-usd,float-protocol-float&vs_currencies=usd,eur,cny,jpy,gbp,krw,inr'
  ).catch((err) => {
    // console.error(err);
    throw 'Conversion retrieval error';
  });

  if (!response || !response.ok) {
    throw 'Conversion retrieval response error';
  }

  const json = await response.json().catch((err) => {
    throw 'Conversion retrieval json error';
  });

  return convertToRaiConversionRates(json);
};

export function convertToRaiConversionRates(apiResponse: any) {
  return {
    usd: 1 / apiResponse.rai.usd,
    eur: 1 / apiResponse.rai.eur,
    gbp: 1 / apiResponse.rai.gbp,
    jpy: 1 / apiResponse.rai.jpy,
    cny: 1 / apiResponse.rai.cny,
    krw: 1 / apiResponse.rai.krw,
    inr: 1 / apiResponse.rai.inr,
    'usd-coin': 1 / (apiResponse['usd-coin'].usd * apiResponse.rai.usd),
    'binance-usd': 1 / (apiResponse['binance-usd'].usd * apiResponse.rai.usd),
    nusd: 1 / (apiResponse.nusd.usd * apiResponse.rai.usd),
    terrausd: 1 / (apiResponse.terrausd.usd * apiResponse.rai.usd),
    dai: 1 / (apiResponse.dai.usd * apiResponse.rai.usd),
    payperex: 1 / (apiResponse.payperex.usd * apiResponse.rai.usd),
    'float-protocol-float':
      1 / (apiResponse['float-protocol-float'].usd * apiResponse.rai.usd),
    'liquity-usd': 1 / (apiResponse['liquity-usd'].usd * apiResponse.rai.usd),
  };
}
