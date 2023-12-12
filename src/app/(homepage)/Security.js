import {Box, Container, Typography} from "@mui/material";

function SecurityHeader() {
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
            <Typography variant="securityHeading">
                Your Trust, Our Commitment
            </Typography>
            <Typography mt={2} mb={3} variant="securityTitle" sx={{
                display: "flex",
                justifyContent: "center",
                fontSize: {md: 48, xs: 32},
                lineHeight: {md: "56px", xs: "44px"},
                letterSpacing: {md: -0.72, xs: 0.16},

            }}>
                Uncompromised Security
            </Typography>
            <Typography variant="securityBody" sx={{
                fontSize: {md: 24},
                lineHeight: {md: "32px"},
            }}>
                At OOSCCA, we understand that security isn't just a feature; it's a foundation. In a digital world
                where your family's safety and privacy are paramount, we are steadfast in our commitment to
                protecting your information with the utmost rigor.
            </Typography>
        </Box>
    );
}

export default function Security() {
    return (
        <Container
            sx={{
                display: "flex",
                background: "#0C0E0F",
                alignItems: "center",
                py: {
                    xs: 6,
                    md: 10,
                },
                px: {
                    xs: 0,
                },
                mx: {
                    xs: 0,
                    lg: "auto",
                },
                maxWidth: {md: 1441, xs: 900},
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
                mr: {
                    md: 0,
                    xs: 5,
                },
                position: {xs: "relative"},
                bottom: {md: 0, xs: 103},

            }}/>
        </Container>
    );
}
