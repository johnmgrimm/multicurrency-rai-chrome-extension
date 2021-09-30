import React from 'react';
import { FormHelperText, Grid, Typography } from '@mui/material';
import { allCurrencies, StoredData } from '../../shared/consts';
import { getDateStringFromNumber } from '../../shared/getDateStringFromNumber';
import { ConversionRate } from './ConversionRate';

type Props = {
  storedData: StoredData;
};

function Content({ storedData }: Props) {
  const enabledCurrencies = allCurrencies.filter((currency) =>
    storedData.enabled.includes(currency.id)
  );

  return (
    <>
      <Typography variant="h6" component="h1">
        Current RAI prices
      </Typography>
      <FormHelperText>For enabled currencies</FormHelperText>
      <br />
      <Grid container spacing={0}>
        {enabledCurrencies.map((currency) => (
          <Grid item xs={12} key={currency.id}>
            <ConversionRate
              currencyId={currency.id}
              currencySymbol={currency.symbol}
              conversionRate={(
                1 / storedData.conversionRates[currency.id]
              ).toFixed(2)}
              showLink
            />
          </Grid>
        ))}
      </Grid>
      <br />
      <FormHelperText>Values are rounded to 2 decimal places</FormHelperText>
      <FormHelperText>
        Last conversion rates update:
        <br />
        <strong>{getDateStringFromNumber(storedData.lastRatesUpdate)}</strong>
      </FormHelperText>
    </>
  );
}

export default Content;
