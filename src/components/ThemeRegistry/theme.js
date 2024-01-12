import { createTheme } from "@mui/material/styles";
import { Libre_Franklin, Manrope, Montserrat } from "next/font/google";

const libreFranklin = Libre_Franklin({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const manrope = Manrope({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const montserrat = Montserrat({
  weight: ["700"],
  subsets: ["latin"],
  display: "swap",
});

const baseTheme = createTheme();

const theme = createTheme({
  palette: {
    mode: "light",
  },
  typography: {
    fontFamily: libreFranklin.style.fontFamily,
    h1: {
      fontSize: "3rem", // 48px
      fontWeight: 700,
      fontFamily: montserrat.style.fontFamily,
    },
    h2: {
      fontSize: "2.5rem", // 40px
      fontWeight: 700,
      fontFamily: montserrat.style.fontFamily,
    },
    h3: {
      fontSize: "2rem", // 32px
      fontWeight: 700,
      fontFamily: montserrat.style.fontFamily,
    },
    h5: {
      [baseTheme.breakpoints.up("xs")]: {
        fontFamily: montserrat.style.fontFamily,
        fontSize: "1.25rem", // 20
        fontWeight: 600,
      },
      [baseTheme.breakpoints.up("sm")]: {
        fontSize: "1.5rem", // 24
        fontWeight: 700,
      },
    },
    h6: {
      fontSize: "1.25rem", // 20px
      fontWeight: 700,
      fontFamily: montserrat.style.fontFamily,
    },
    subheading: {
      fontSize: "1rem", // 16px
      fontWeight: 700,
      fontFamily: montserrat.style.fontFamily,
      color: baseTheme.palette.warning.main,
    },
  },
  components: {
    MuiAlert: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...(ownerState.severity === "info" && {
            backgroundColor: "#60a5fa",
          }),
        }),
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          fontSize: 13,
          fontWeight: 700,
          fontFamily: manrope.style.fontFamily,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontSize: 16,
          fontWeight: 700,
        },
      },
    },
  },
});

export default theme;
