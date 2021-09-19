import { getStoredData } from './storedData';

jest.enableAutomock();

// (chrome.storage.sync as jest.Mock).

describe('getStoredData', () => {
  test('simple', async () => {
    // jest
    //   .spyOn(chrome.storage, 'sync', 'get')
    //   .mockImplementation((param: string, callback: (res: any) => void) => {
    //     callback(res);
    // });
    // const data = await getStoredData();
    // expect(data).toStrictEqual({ test: '123' });
  });
});
