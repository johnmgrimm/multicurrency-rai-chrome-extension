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
import { ConversionRate } from './ConversionRate';

const OptionsButton = styled(Button)(({ theme }) => ({
  background: `linear-gradient(225deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  color: theme.palette.text.primary,
}));

const Popup = () => {
  const storedData = useAsyncRetry<StoredData>(async () => {
    return await getStoredData();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Typography variant="h6" component="h1">
          Current RAI prices
        </Typography>
        <FormHelperText>For enabled currencies</FormHelperText>
        <br />
        <Grid container spacing={0}>
          {storedData &&
            storedData.value &&
            storedData.value.enabled.map((currencyId) => (
              <Grid item xs={12} key={currencyId}>
                <ConversionRate
                  currencyId={currencyId}
                  currencySymbol={allCurrencies[currencyId].symbol}
                  conversionRate={storedData?.value?.conversionRates[
                    currencyId
                  ].toFixed(2)}
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
          <strong>
            {getDateStringFromNumber(storedData?.value?.lastRatesUpdate)}
          </strong>
        </FormHelperText>
        <br />
        <OptionsButton
          fullWidth
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
      </Container>
    </ThemeProvider>
  );
};

export default Popup;
