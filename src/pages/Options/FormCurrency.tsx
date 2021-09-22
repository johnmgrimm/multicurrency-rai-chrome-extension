import React from 'react';
import { Grid, FormControlLabel, Switch } from '@mui/material';
import { Control, Controller, ControllerRenderProps } from 'react-hook-form';
import { FormData } from './Options';
import { CurrencyData, StoredData } from '../../shared/consts';
import { ConversionRate } from '../Popup/ConversionRate';

type Props = {
  currency: CurrencyData;
  storedData?: StoredData;
  control: Control<FormData, object>;
  color: 'primary' | 'secondary';
};

export const FormCurrency = ({
  currency,
  storedData,
  control,
  color,
}: Props) => {
  const conversionRates = storedData
    ? ' ' + storedData.conversionRates[currency.id]
    : '';
  return (
    <Grid container spacing={0} alignItems="center">
      <ConversionRate
        currencyId={currency.id}
        currencySymbol={currency.symbol}
        conversionRate={conversionRates}
        showLink
      >
        <Controller
          name={`enabled.${currency.id}`}
          control={control}
          render={({ field }: { field: ControllerRenderProps }) => (
            <FormControlLabel
              control={
                <Switch
                  checked={Boolean(field.value)}
                  {...field}
                  color={color}
                />
              }
              label={currency.symbol}
              sx={{ minWidth: '110px', marginRight: 0 }}
            />
          )}
        />
      </ConversionRate>
    </Grid>
  );
};
