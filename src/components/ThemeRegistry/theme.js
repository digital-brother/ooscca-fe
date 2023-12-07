import {createTheme} from '@mui/material/styles';
import {Libre_Franklin, Manrope} from "next/font/google";

const libreFranklin = Libre_Franklin({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

export const manrope = Manrope({
  weight: ['600'],
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
