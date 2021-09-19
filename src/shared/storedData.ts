import { defaultData, StoredData } from './consts';

export const setStoredData = async (data: StoredData): Promise<void> => {
  return new Promise((resolve, reject) => {
    // console.log('setStoredData', data);
    // ensure that only currently supported keys are set (filter out any obsolete keys)
    const filteredData = {
      conversionRates: data.conversionRates,
      enabled: data.enabled,
      lastRatesUpdate: data.lastRatesUpdate,
    };

    chrome.storage.sync.set({ data: filteredData }, () => {
      if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError);
        reject();
      }
      resolve();
    });
  });
};

export const getStoredData = async (): Promise<StoredData> => {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.get('data', (res) => {
      if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError);
        reject();
      }
      const data = { ...defaultData, ...res.data };
      // console.log('getStoredData', data);
      resolve(data);
    });
  });
};
