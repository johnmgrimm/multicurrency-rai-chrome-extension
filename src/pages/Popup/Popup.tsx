import React from 'react';
import Button from '@mui/material/Button';
import './Popup.css';
import { ThemeProvider, styled } from '@mui/material/styles';
import { OpenInNewOutlined as OpenInNewOutlinedIcon } from '@mui/icons-material';
import { theme } from '../../shared/theme';
import {
  Container,
  FormHelperText,
  FormLabel,
  Grid,
  Typography,
} from '@mui/material';
import { useAsyncRetry } from 'react-use';
import { getStoredData } from '../../shared/storedData';
import {
  allCurrencies,
  autoUpdateInterval,
  StoredData,
} from '../../shared/consts';
import { getDateStringFromNumber } from '../../shared/getDateStringFromNumber';

const OptionsButton = styled(Button)(({ theme }) => ({
  background: `linear-gradient(225deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  color: theme.palette.text.primary,
}));

const Popup = () => {
  const storedData = useAsyncRetry<StoredData>(async () => {
    return await getStoredData();
  }, []);
  // console.log(storedData);

  // const [refreshState, refresh] = useAsyncFn(async () => {
  //   const result = await getUpdatedConversionRates();

  //   // fake timeout that let show user that refresh is taking place
  //   await new Promise((resolve) => setTimeout(resolve, 300));

  //   console.log(result);
  //   // await storedData.retry();

  //   return result;
  // }, []);

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Typography variant="h6" component="h1">
          Current price of 1 RAI
        </Typography>
        <FormHelperText>For enabled currencies</FormHelperText>
        <br />
        <Grid container spacing={0}>
          {storedData &&
            storedData.value &&
            storedData.value.enabled.map((currencyId) => (
              <Grid item xs={12} key={currencyId}>
                <FormLabel
                  sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    lineHeight: 1.5,
                  }}
                >
                  <span>
                    {storedData?.value?.conversionRates[currencyId].toFixed(2)}{' '}
                    {allCurrencies[currencyId].symbol}
                  </span>
                </FormLabel>
              </Grid>
            ))}
        </Grid>
        <br />
        <FormHelperText>Values are rounded to 2 decimal places</FormHelperText>
        <FormHelperText>
          Last conversion rates update:
          <br />
          <strong>
            {getDateStringFromNumber(storedData?.value?.lastRatesUpdate)}
          </strong>
        </FormHelperText>
        <br />
        <OptionsButton
          color="primary"
          aria-label="Extension options"
          title="Extension options"
          onClick={() => {
            chrome.tabs.create({
              url: 'options.html',
            });
          }}
          startIcon={<OpenInNewOutlinedIcon />}
        >
          Extension options
        </OptionsButton>
        {/* <br />
        {refreshState.error && (
          <Alert severity="error" sx={{ marginBottom: 2 }}>
            <AlertTitle>Error</AlertTitle>
            <p>Error while refreshing conversion rates. Try again.</p>
            <code>{JSON.stringify(refreshState.error)}</code>
          </Alert>
        )}
        <br />
        <LoadingButton
          loading={refreshState.loading}
          color="info"
          variant="contained"
          startIcon={<RefreshIcon />}
          loadingPosition="start"
          onClick={() => refresh()}
        >
          Refresh rates
        </LoadingButton> */}
      </Container>
    </ThemeProvider>
  );
};

export default Popup;
