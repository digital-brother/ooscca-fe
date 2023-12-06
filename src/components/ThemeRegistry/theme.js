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
    MuiAlert: {
      styleOverrides: {
        root: ({ownerState}) => ({
          ...(ownerState.severity === 'info' && {
            backgroundColor: '#60a5fa',
          }),
        }),
      },
    },
    MuiPickersDay: {
      styleOverrides: {
        root: {
          // color: '#FFC50A',
          borderRadius: 2,
          borderWidth: 1,
          // border: '1px solid',
          // backgroundColor: '#bbdefb',
          color: "#666",
          textAlign: "center",
          fontFamily: "Inter",
          fontSize: "14.752px",
          fontStyle: "normal",
          fontWeight: "500",
          lineHeight: "normal",
          selected: {
            color: "red",
            backgroundColor: "red",
          },
        },
      }
    },
    MuiPickersCalendarHeader: {
      styleOverrides: {
        root: {
          // display: "none",
        }
      }
    }
  },
});

export default theme;
