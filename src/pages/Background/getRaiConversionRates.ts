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
    ...apiResponse.rai,
    'usd-coin': apiResponse['usd-coin'].usd * apiResponse.rai.usd,
    'binance-usd': apiResponse['binance-usd'].usd * apiResponse.rai.usd,
    nusd: apiResponse.nusd.usd * apiResponse.rai.usd,
    terrausd: apiResponse.terrausd.usd * apiResponse.rai.usd,
    dai: apiResponse.dai.usd * apiResponse.rai.usd,
    payperex: apiResponse.payperex.usd * apiResponse.rai.usd,
    'float-protocol-float':
      apiResponse['float-protocol-float'].usd * apiResponse.rai.usd,
    'liquity-usd': apiResponse['liquity-usd'].usd * apiResponse.rai.usd,
  };
}
