"use client"

import {Box, Container, Typography} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import {useTheme} from "@mui/material/styles";
import {manrope, montserrat} from "@/components/ThemeRegistry/theme";

function SecurityHeader() {
    const theme = useTheme();
    const smUp = useMediaQuery(theme.breakpoints.up("sm"));
    return (
        <Box sx={{
            textAlign: "center",
            mx: {
                xs: "auto",
            },
            maxWidth: {
                xs: 358,
                md: 638,
            }
        }}>
            <Typography variant="subheading">
                Your Trust, Our Commitment
            </Typography>
            <Typography mt={2} mb={3} variant={smUp ? "h1" : "h3"} sx={{
                display: "flex",
                justifyContent: "center",
                color: "#FFF",
                fontFamily: montserrat.style.fontFamily,

            }}>
                Uncompromised Security
            </Typography>
            <Typography variant="h5" sx={{fontFamily: manrope.style.fontFamily, color: "#FFF"}}>
                At OOSCCA, we understand that security isn't just a feature; it's a foundation. In a digital world
                where your family's safety and privacy are paramount, we are steadfast in our commitment to
                protecting your information with the utmost rigor.
            </Typography>
        </Box>
    );
}

export default function Security() {
    return (
        <Container sx={{
            py: {
                xs: 6,
                md: 10,
            },
            px: {md: 0},
            mx: {
                xs: 0,
                lg: "auto",
            },
            maxWidth: {md: 1441},
            background: "#0C0E0F",
        }}>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: {md: "initial", xs: "column-reverse"},
                }}
            >
                <Box component="img" src="/security3.png" sx={{
                    width: {md: 327, xs: 175},
                    height: {md: 264, xs: 127},
                    objectFit: "cover",
                    mt: {md: 0, xs: 9}
                }
                }/>
                <SecurityHeader/>
                <Box component="img" src="/security4.png" sx={{
                    width: {md: 376, xs: 298},
                    height: {md: 241, xs: 175},
                    mt: {md: 0, xs: -13},
                    mb: {md: 0, xs: 7.5},

                }}/>
            </Box>
        </Container>
    );
}
