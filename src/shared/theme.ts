import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  typography: {
    fontFamily: ["'Source Code Pro'", 'Helvetica', 'monospace'].join(','),
  },
  palette: {
    primary: {
      main: '#78d8ff',
    },
    secondary: {
      main: '#4ce096',
    },
    text: {
      primary: '#000000',
      secondary: '#000000',
    },
  },
});
