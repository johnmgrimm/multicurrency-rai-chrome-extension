import { autoUpdateInterval, StoredData } from './consts';
import { getUpdatedConversionRates } from './getUpdatedConversionRates';

export function conditionalRatesRefresh(storedData: StoredData) {
  if (storedData.lastRatesUpdate + autoUpdateInterval < Date.now()) {
    // console.log('triggering auto update');
    getUpdatedConversionRates(storedData);
  }
}
