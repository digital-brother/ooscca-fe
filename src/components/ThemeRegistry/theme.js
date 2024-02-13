import { alpha, createTheme, darken } from "@mui/material/styles";
import { Manrope, Montserrat } from "next/font/google";
import { colors } from "./colors";

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
    primary: colors.orange,
    ...colors,
  },
  typography: {
    fontFamily: manrope.style.fontFamily,
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
      fontFamily: montserrat.style.fontFamily,
      [baseTheme.breakpoints.up("xs")]: {
        fontSize: "1.5rem", // 24
        fontWeight: 600,
      },
      [baseTheme.breakpoints.up("sm")]: {
        fontSize: "2rem", // 32
        fontWeight: 700,
      },
    },
    h5: {
      fontFamily: montserrat.style.fontFamily,
      [baseTheme.breakpoints.up("xs")]: {
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
    subheading: ({ theme }) => ({
      fontFamily: montserrat.style.fontFamily,
      fontSize: "1rem", // 16px
      fontWeight: 700,
      color: theme.palette.orange.main,
    }),
    overlineBold: ({
      fontFamily: montserrat.style.fontFamily,
      fontWeight: 700,
      fontSize: "1rem", // 16px
      color: colors.orange.main,
    }),
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
      defaultProps: {
        disableElevation: true,
        disableRipple: true,
      },
      styleOverrides: {
        root: {
          fontFamily: montserrat.style.fontFamily,
          fontSize: "1rem", // 16px
          fontWeight: 700,
          textTransform: "none",
        },
        contained: ({ ownerState, theme }) => {
          return {
            "&:hover": {
              backgroundColor: theme.palette[ownerState.color].light,
            },
            "&:active": {
              backgroundColor: theme.palette[ownerState.color].dark,
            },
          };
        },
        outlined: ({ ownerState, palette }) => {
          return {
            borderColor: theme.palette[ownerState.color].main,
            "&:hover": {
              backgroundColor: alpha(theme.palette[ownerState.color].main, 0.09),
            },
            "&:active": {
              backgroundColor: alpha(theme.palette[ownerState.color].main, 0.18),
            },
          };
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        sx: {
          "& .MuiFilledInput-root": {
            borderRadius: 1,
          },
        },
      },
      styleOverrides: {
        root: {
          "& .Mui-error.MuiFilledInput-root": {
            border: `1px solid ${baseTheme.palette.error.main}`,
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          fontWeight: 700,
        },
      },
    },
  },
});

export default theme;
