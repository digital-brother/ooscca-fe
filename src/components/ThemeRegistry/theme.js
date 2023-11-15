import {Libre_Franklin} from 'next/font/google';
import {createTheme} from '@mui/material/styles';

const libreFranklin = Libre_Franklin({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const theme = createTheme({
  palette: {
    mode: 'light',
  },
  typography: {
    fontFamily: libreFranklin.style.fontFamily,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        html {
          font-size: 20px;
        }
      `,
    },
    MuiAlert: {
      styleOverrides: {
        root: ({ownerState}) => ({
          ...(ownerState.severity === 'info' && {
            backgroundColor: '#60a5fa',
          }),
        }),
      },
    },
  },
});

export default theme;
