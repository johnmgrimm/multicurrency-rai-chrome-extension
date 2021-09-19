import React from 'react';
import {
  Grid,
  FormControlLabel,
  Switch,
  FormLabel,
  IconButton,
  Link,
} from '@mui/material';
import { OpenInNewOutlined as OpenInNewOutlinedIcon } from '@mui/icons-material';
import {
  Control,
  Controller,
  ControllerRenderProps,
  Field,
} from 'react-hook-form';
import { FormData } from './Options';
import { CurrencyData, StoredData } from '../../shared/consts';

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
    <Grid container spacing={0}>
      <Controller
        name={`enabled.${currency.id}`}
        control={control}
        render={({ field }: { field: ControllerRenderProps }) => (
          <FormControlLabel
            control={
              <Switch checked={Boolean(field.value)} {...field} color={color} />
            }
            label={currency.symbol}
          />
        )}
      />
      <FormLabel
        sx={{
          display: 'inline-flex',
          alignItems: 'center',
          lineHeight: 1.5,
        }}
      >
        <span>
          {conversionRates} {currency.symbol} / RAI
        </span>
        <Link
          href={`https://www.coingecko.com/en/coins/${currency.id}`}
          target="_blank"
          rel="noreferrer"
        >
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="span"
            title="View data source"
            size="small"
          >
            <OpenInNewOutlinedIcon fontSize="small" />
          </IconButton>
        </Link>
      </FormLabel>
    </Grid>
  );
};
