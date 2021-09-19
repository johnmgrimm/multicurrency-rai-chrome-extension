import { getStoredData } from '../../../shared/storedData';
import { searchCurrency } from './searchCurrency';

jest.mock('../../../shared/storedData');

(getStoredData as jest.Mock).mockResolvedValue({
  currencies: [
    { id: 'usd', symbol: 'USD' },
    { id: 'eur', symbol: 'EUR' },
    { id: 'dai', symbol: 'DAI' },
  ],
  conversionRates: {
    usd: 3,
    eur: 4,
    dai: 1,
  },
  enabled: ['usd', 'eur'],
});

describe('searchCurrency', () => {
  describe("don't convert", () => {
    test('disabled currency', async () => {
      const html =
        '<div><span>  1<span>.</span> </span><span> 99DAI</span></div>';

      const htmlDom = new DOMParser().parseFromString(html, 'text/html');
      await searchCurrency(htmlDom);

      expect(htmlDom.body.innerHTML).toBe(
        '<div><span>  1<span>.</span> </span><span> 99DAI</span></div>'
      );
    });

    test('currency symbol without value', async () => {
      const html = '<div><span>EUR currency</span> 10EUR</div>';

      const htmlDom = new DOMParser().parseFromString(html, 'text/html');
      await searchCurrency(htmlDom);

      expect(htmlDom.body.innerHTML).toBe(
        '<div><span>EUR currency</span> 40RAI</div>'
      );
    });
  });

  describe('convert', () => {
    test('simplest case', async () => {
      const htmlString = '<div><span>$15000.5050</span></div>';

      const htmlDom = new DOMParser().parseFromString(htmlString, 'text/html');
      await searchCurrency(htmlDom);

      expect(htmlDom.body.innerHTML).toBe(
        '<div><span>RAI45001.5150</span></div>'
      );
    });

    test('with commas', async () => {
      const htmlString = '<div><span>$15,000.5050</span></div>';

      const htmlDom = new DOMParser().parseFromString(htmlString, 'text/html');
      await searchCurrency(htmlDom);

      expect(htmlDom.body.innerHTML).toBe(
        '<div><span>RAI45,001.5150</span></div>'
      );
    });

    test('multiple prices', async () => {
      const html = '<div>$1 $3.3</div>';

      const htmlDom = new DOMParser().parseFromString(html, 'text/html');
      await searchCurrency(htmlDom);

      expect(htmlDom.body.innerHTML).toBe('<div>RAI3 RAI9.9</div>');
    });

    test('in separate elements', async () => {
      const html = '<div><span>$</span><span>1.50</span></div>';

      const htmlDom = new DOMParser().parseFromString(html, 'text/html');
      await searchCurrency(htmlDom);

      expect(htmlDom.body.innerHTML).toBe(
        '<div><span>RAI</span><span>4.50</span></div>'
      );
    });

    test('prices next to each other', async () => {
      const html = '<div><span>$2.50</span><span>$1.50</span></div>';

      const htmlDom = new DOMParser().parseFromString(html, 'text/html');
      await searchCurrency(htmlDom);

      expect(htmlDom.body.innerHTML).toBe(
        '<div><span>RAI7.50</span><span>RAI4.50</span></div>'
      );
    });

    test('prices next to a regular number', async () => {
      const html = '<div><span>$2.50</span> <span>1.50</span></div>';

      const htmlDom = new DOMParser().parseFromString(html, 'text/html');
      await searchCurrency(htmlDom);

      expect(htmlDom.body.innerHTML).toBe(
        '<div><span>RAI7.50</span> <span>1.50</span></div>'
      );
    });

    test('multielement price case 1', async () => {
      const html =
        '<div><span>$</span><span>1</span><span>.</span><span>99</span></div>';

      const htmlDom = new DOMParser().parseFromString(html, 'text/html');
      await searchCurrency(htmlDom);

      expect(htmlDom.body.innerHTML).toBe(
        '<div><span>RAI</span><span>5</span><span>.</span><span>97</span></div>'
      );
    });

    test('multielement price case 2', async () => {
      const html = '<div><span>$</span>1<span>.</span><span>99</span></div>';

      const htmlDom = new DOMParser().parseFromString(html, 'text/html');
      await searchCurrency(htmlDom);

      expect(htmlDom.body.innerHTML).toBe(
        '<div><span>RAI</span>5<span>.</span><span>97</span></div>'
      );
    });

    test('multielement price case 3', async () => {
      const html =
        '<div><span>$</span><span>1<span>.</span></span><span>99</span></div>';

      const htmlDom = new DOMParser().parseFromString(html, 'text/html');
      await searchCurrency(htmlDom);

      expect(htmlDom.body.innerHTML).toBe(
        '<div><span>RAI</span><span>5<span>.</span></span><span>97</span></div>'
      );
    });

    test('multielement price case 4', async () => {
      const html =
        '<div><span>$ </span> <span>1 <span> . </span></span><span>99</span></div>';

      const htmlDom = new DOMParser().parseFromString(html, 'text/html');
      await searchCurrency(htmlDom);

      expect(htmlDom.body.innerHTML).toBe(
        '<div><span>RAI </span> <span>5 <span> . </span></span><span>97</span></div>'
      );
    });

    test('multielement price case 5', async () => {
      const html =
        '<div><span>  $1<span>.</span> </span><span> 99</span></div>';

      const htmlDom = new DOMParser().parseFromString(html, 'text/html');
      await searchCurrency(htmlDom);

      expect(htmlDom.body.innerHTML).toBe(
        '<div><span>  RAI5<span>.</span> </span><span> 97</span></div>'
      );
    });

    test('multielement price case 6', async () => {
      const html =
        '<div><span>  1<span>.</span> </span><span> 99$</span></div>';

      const htmlDom = new DOMParser().parseFromString(html, 'text/html');
      await searchCurrency(htmlDom);

      expect(htmlDom.body.innerHTML).toBe(
        '<div><span>  5<span>.</span> </span><span> 97RAI</span></div>'
      );
    });

    test('secondary currency', async () => {
      const html =
        '<div><span>  1<span>.</span> </span><span> 99EUR</span></div>';

      const htmlDom = new DOMParser().parseFromString(html, 'text/html');
      await searchCurrency(htmlDom);

      expect(htmlDom.body.innerHTML).toBe(
        '<div><span>  7<span>.</span> </span><span> 96RAI</span></div>'
      );
    });

    // TODO: cover all whitespace possible combinations

    // TODO: test broken prices e.g. with dot without fractions or without integer

    test('amazon prices', async () => {
      const html =
        '<div class="a-row a-size-base a-color-base"><a class="a-size-base a-link-normal a-text-normal" href="/AmazonBasics-Performance-Alkaline-Batteries-Count/dp/B00MNV8E0C/ref=sr_1_3?dchild=1&amp;keywords=amazonbasics&amp;pd_rd_r=d8db3164-db5a-46cb-bbd7-40251d5d4769&amp;pd_rd_w=sK04H&amp;pd_rd_wg=f2Sdq&amp;pf_rd_p=9349ffb9-3aaa-476f-8532-6a4a5c3da3e7&amp;pf_rd_r=Y1M3TMN4QN55TMBM0H0T&amp;qid=1631306918&amp;sr=8-3"><span class="a-price" data-a-size="l" data-a-color="base"><span class="a-offscreen">$14.99</span><span aria-hidden="true"><span class="a-price-symbol">$</span><span class="a-price-whole">14<span class="a-price-decimal">.</span></span><span class="a-price-fraction">99</span></span></span> <span class="a-size-base a-color-secondary">($0.35/Count)</span> </a> </div>';

      const htmlDom = new DOMParser().parseFromString(html, 'text/html');
      await searchCurrency(htmlDom);

      expect(htmlDom.body.innerHTML).toBe(
        '<div class="a-row a-size-base a-color-base"><a class="a-size-base a-link-normal a-text-normal" href="/AmazonBasics-Performance-Alkaline-Batteries-Count/dp/B00MNV8E0C/ref=sr_1_3?dchild=1&amp;keywords=amazonbasics&amp;pd_rd_r=d8db3164-db5a-46cb-bbd7-40251d5d4769&amp;pd_rd_w=sK04H&amp;pd_rd_wg=f2Sdq&amp;pf_rd_p=9349ffb9-3aaa-476f-8532-6a4a5c3da3e7&amp;pf_rd_r=Y1M3TMN4QN55TMBM0H0T&amp;qid=1631306918&amp;sr=8-3"><span class="a-price" data-a-size="l" data-a-color="base"><span class="a-offscreen">RAI44.97</span><span aria-hidden="true"><span class="a-price-symbol">RAI</span><span class="a-price-whole">44<span class="a-price-decimal">.</span></span><span class="a-price-fraction">97</span></span></span> <span class="a-size-base a-color-secondary">(RAI1.05/Count)</span> </a> </div>'
      );
    });
  });
});
