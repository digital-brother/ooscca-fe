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
    },
    h2: {
      fontSize: "2.5rem", // 40px
      fontWeight: 700,
    },
    h3: {
      fontSize: "2rem", // 32px
      fontWeight: 700,
    },
    h5: {
      fontSize: "1.5rem", //24
      fontWeight: 700,
    },
    subheading: {
      fontSize: "1rem", // 16px
      fontWeight: 700,
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
  },
});

export default theme;
