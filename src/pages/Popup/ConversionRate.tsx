import React, { ReactNode } from 'react';
import { FormLabel, IconButton, Link, Box, Grid } from '@mui/material';
import { OpenInNewOutlined as OpenInNewOutlinedIcon } from '@mui/icons-material';
import { getExtensionAssetURL } from '../../shared/chromeApi';

type Props = {
  currencyId: string;
  currencySymbol: string;
  conversionRate?: string;
  showLink: boolean;
  children?: ReactNode;
};

export const ConversionRate = ({
  currencyId,
  currencySymbol,
  conversionRate,
  showLink,
  children,
}: Props) => {
  const baseUrl = getExtensionAssetURL('/');
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '35px' }}>
        <img
          src={`${baseUrl}src/assets/img/${currencyId}.png`}
          alt={currencySymbol}
        />
      </Box>
      {children}
      <FormLabel
        sx={{
          display: 'inline-flex',
          alignItems: 'center',
          lineHeight: 1.5,
        }}
      >
        <span title={conversionRate}>
          <span
            style={{
              minWidth: '80px',
              display: 'inline-block',
              textAlign: 'right',
            }}
          >
            {Number(conversionRate).toFixed(2)}
          </span>{' '}
          <span style={{ minWidth: '90px', display: 'inline-block' }}>
            {currencySymbol}/RAI
          </span>
        </span>
        {showLink && (
          <Link
            href={`https://www.coingecko.com/en/coins/${currencyId}`}
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
        )}
      </FormLabel>
    </Box>
  );
};
