export type ICurrencyData = {
  id: string;
  symbol: string;
  regexp: string;
  type: string;
};
export type IAllCurrencies = { [key: string]: CurrencyData };
