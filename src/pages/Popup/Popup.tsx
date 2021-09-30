import React from 'react';
import Button from '@mui/material/Button';
import './Popup.css';
import { ThemeProvider, styled } from '@mui/material/styles';
import { OpenInNewOutlined as OpenInNewOutlinedIcon } from '@mui/icons-material';
import { theme } from '../../shared/theme';
import { Container } from '@mui/material';
import { useAsyncRetry } from 'react-use';
import { getStoredData } from '../../shared/storedData';
import { StoredData } from '../../shared/consts';
import Content from './Content';

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
        {storedData && storedData.value ? (
          <Content storedData={storedData.value} />
        ) : (
          <div>Loading...</div>
        )}
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
