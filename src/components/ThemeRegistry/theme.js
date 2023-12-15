import {createTheme} from '@mui/material/styles';
import {Libre_Franklin, Manrope, Montserrat} from "next/font/google";

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

export const montserrat = Montserrat({
    weight: ['400', '700'],
    subsets: ['latin'],
    display: 'swap',
});

const baseTheme = createTheme();

const theme = createTheme({
    palette: {
        mode: 'light',
    },
    typography: {
        fontFamily: libreFranklin.style.fontFamily,
        h1: {
            fontSize: '3rem', // 48px
            fontWeight: 700,
        },
        h2: {
            fontSize: '2.5rem', // 40px
            fontWeight: 700,
        },
        h3: {
            fontSize: '2rem', // 32px
            fontWeight: 700,
        },
        h5: {
            fontSize: '1.5rem', //24
            fontWeight: 700,
        },
        subheading: {
            fontSize: '1rem', // 16px
            fontWeight: 700,
            color: baseTheme.palette.warning.main,
        },
        birthdayCalendarHeading: {
            fontFamily: montserrat.style.fontFamily,
            fontWeight: 700,
            letterSpacing: 0.16,
            color: "#FF8919"
        },
        birthdayCalendarTitle: {
            fontFamily: montserrat.style.fontFamily,
            fontSize: 32,
            fontWeight: 700,
            color: "#0C0E0F"
        },
        birthdayCalendarBody: {
            fontFamily: manrope.style.fontFamily,
            fontWeight: 400,
            color: "#6C757D",
        },
        birthdayCalendarButtonText: {
            textAlign: "center",
            fontFamily: manrope.style.fontFamily,
            fontWeight: 700,
            color: "#FF8919"
        }

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
