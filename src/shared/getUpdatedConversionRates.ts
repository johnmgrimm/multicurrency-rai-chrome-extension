import { getStoredData, setStoredData } from './storedData';
import { getRaiConversionRates } from '../pages/Background/getRaiConversionRates';
import { allCurrencies, StoredData } from './consts';

const currenciesList = Object.values(allCurrencies);

// Updates conversion rates for all currencies
export async function getUpdatedConversionRates(
  storedDataFromContext?: StoredData
) {
  const storedData = storedDataFromContext
    ? storedDataFromContext
    : await getStoredData();

  try {
    const newRates = await getRaiConversionRates();
    console.log('getUpdatedConversionRates', newRates);
    // console.log('new rates', newRates);
    for (const currency of currenciesList) {
      // console.log('updating', currencySymbol, newRates[currencySymbol]);

      storedData.conversionRates[currency.id] = newRates[currency.id];
    }
    storedData.lastRatesUpdate = Date.now();
    // console.log('new storedData', storedData);

    await setStoredData(storedData);
  } catch (error) {
    // skip failures and log error to console
    console.error('Conversion rates update failed', error);
    throw error;
  }

  // TODO: trigger tabs update

  // if (retrievedConversion) {
  //   storedData.usd.conversionRate = retrievedConversion;

  //   // Store current conversion
  //   // await setStoredData(storedData);

  //   // Send new conversion to the popup
  //   chrome.runtime.sendMessage({ conversionRate: retrievedConversion });

  //   // Send new conversion to the foreground
  //   chrome.tabs.query({}, (tabs) => {
  //     for (const tab of tabs) {
  //       chrome.tabs.sendMessage(tab.id!, storedData);
  //     }
  //   });
  // }
}

/**
 * Gets last redemption price form RAI subgraph API
 * https://docs.reflexer.finance/api/api-endpoints
 */
// async function getRedemptionPrice() {
//   const data = JSON.stringify({
//     query: `{
//               systemState(id: "current") {
//                 currentRedemptionPrice {
//                   value
//                 }
//               }
//             }`,
//   });

//   const response = await fetch(
//     'https://api.thegraph.com/subgraphs/name/reflexer-labs/rai-mainnet',
//     {
//       method: 'post',
//       body: data,
//       headers: {
//         'Content-Type': 'application/json',
//         'Content-Length': data.length.toString(),
//       },
//     }
//   ).catch((err) => {
//     console.log(err);
//     return null;
//   });

//   if (response?.ok) {
//     const json = await response.json();
//     return json.data.systemState.currentRedemptionPrice.value;
//   } else {
//     return null;
//   }
// }
