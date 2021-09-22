import React from 'react';
import { useForm } from 'react-hook-form';
import useAsyncRetry from 'react-use/lib/useAsyncRetry';
import FormGroup from '@mui/material/FormGroup';
import { getStoredData, setStoredData } from '../../shared/storedData';
import './Options.css';
import {
  Alert,
  AlertTitle,
  Container,
  FormHelperText,
  FormLabel,
  Grid,
  Link,
  Typography,
} from '@mui/material';
import { ThemeProvider, styled } from '@mui/material/styles';
import { LoadingButton } from '@mui/lab';
import { Save as SaveIcon, Refresh as RefreshIcon } from '@mui/icons-material';
import { getUpdatedConversionRates } from '../../shared/getUpdatedConversionRates';
import { allCurrencies, autoUpdateInterval } from '../../shared/consts';
import { FormCurrency } from './FormCurrency';
import { OpenInNewOutlined as OpenInNewOutlinedIcon } from '@mui/icons-material';
import { useAsyncFn } from 'react-use';
import { theme } from '../../shared/theme';
import { getDateStringFromNumber } from '../../shared/getDateStringFromNumber';

type FormEnabledCurrencies = {
  [key: string]: boolean;
};
export type FormData = {
  enabled: FormEnabledCurrencies;
};

const currenciesList = Object.values(allCurrencies);

const onSubmit = async (data: FormData) => {
  // console.log('submit', data);

  // fake timeout that let show user that form is processing the submission
  await new Promise((resolve) => setTimeout(resolve, 300));

  const storedData = await getStoredData();
  const enabledCurrencies = [];
  for (const [currencyId, enabled] of Object.entries(data.enabled)) {
    if (enabled) enabledCurrencies.push(currencyId);
  }

  storedData.enabled = enabledCurrencies;
  await setStoredData(storedData);

  return storedData;
};

const SubmitButton = styled(LoadingButton)(({ theme }) => ({
  background: `linear-gradient(225deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
}));

export const Options = () => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<FormData>();
  const storedData = useAsyncRetry(async () => {
    const storedData = await getStoredData();
    // console.log('init', storedData);

    const formData = {
      enabled: storedData.enabled.reduce<FormEnabledCurrencies>(
        (all, currencyId) => {
          all[currencyId] = true;
          return all;
        },
        {}
      ),
    };
    // console.log('formData', formData);
    reset(formData);
    return storedData;
  }, [reset]);

  const [refreshState, refresh] = useAsyncFn(async () => {
    const result = await getUpdatedConversionRates();

    // fake timeout that let show user that refresh is taking place
    await new Promise((resolve) => setTimeout(resolve, 300));

    return result;
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="md">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h4" component="h1">
                Multicurrency RAI converter
              </Typography>
              <FormHelperText>
                Select currencies which will be converted to RAI.
              </FormHelperText>
              <FormHelperText>
                Hover over conversion rate number to get a detailed value.
              </FormHelperText>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormGroup>
                <FormLabel component="legend">Fiat currencies</FormLabel>
                {currenciesList
                  .filter((currency) => currency.type === 'fiat')
                  .map((currency) => (
                    <FormCurrency
                      key={currency.id}
                      currency={currency}
                      storedData={storedData.value}
                      control={control}
                      color="primary"
                    />
                  ))}
              </FormGroup>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormGroup>
                <FormLabel component="legend">Cryptocurrencies</FormLabel>
                {currenciesList
                  .filter((currency) => currency.type === 'crypto')
                  .map((currency) => (
                    <FormCurrency
                      key={currency.id}
                      currency={currency}
                      storedData={storedData.value}
                      control={control}
                      color="secondary"
                    />
                  ))}
              </FormGroup>
            </Grid>

            <Grid item xs={12}>
              <SubmitButton
                loading={storedData.loading || isSubmitting}
                loadingPosition="start"
                startIcon={<SaveIcon />}
                variant="contained"
                type="submit"
              >
                Save
              </SubmitButton>
              {isSubmitSuccessful && (
                <Alert severity="success" sx={{ marginTop: 2 }}>
                  <AlertTitle>Saved</AlertTitle>
                </Alert>
              )}
              {errors && errors.enabled && (
                <Alert severity="error" sx={{ marginTop: 2 }}>
                  <AlertTitle>Error</AlertTitle>
                  <p>Error while saving data.</p>
                  <code>{JSON.stringify(errors)}</code>
                </Alert>
              )}
            </Grid>
          </Grid>
        </form>
        <br />
        <FormHelperText>
          Last conversion rates update:{' '}
          <strong>
            {getDateStringFromNumber(storedData?.value?.lastRatesUpdate)}
          </strong>
          <br />
          Automatic currency rates update is triggered after currency conversion
          if more than {autoUpdateInterval / 60e3} minutes elapsed from the last
          update.
        </FormHelperText>
        <br />
        {refreshState.error && (
          <Alert severity="error" sx={{ marginBottom: 2 }}>
            <AlertTitle>Error</AlertTitle>
            <p>Error while refreshing conversion rates. Try again.</p>
            <code>{JSON.stringify(refreshState.error)}</code>
          </Alert>
        )}
        <LoadingButton
          loading={refreshState.loading}
          color="info"
          variant="contained"
          startIcon={<RefreshIcon />}
          loadingPosition="start"
          onClick={async () => {
            await refresh();
            await storedData.retry();
          }}
        >
          Refresh conversion rates
        </LoadingButton>
        <br />
        <br />
        <Link
          href="https://www.coingecko.com/en/api"
          target="_blank"
          rel="noreferrer"
          underline="always"
          color="#000000"
        >
          Conversion rates provided by CoinGecko API{' '}
          <OpenInNewOutlinedIcon fontSize="inherit" />
        </Link>
      </Container>
    </ThemeProvider>
  );
};
