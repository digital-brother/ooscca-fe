import {Box, Container, Typography} from "@mui/material";
import {Manrope, Montserrat} from "@next/font/google";


const manrope = Manrope({subsets: ['latin']});
const montserrat = Montserrat({subsets: ['latin']});

function SecurityHeader() {
    return (
        <Box sx={{
            textAlign: "center",
            mx: {
                xs: "auto",
                md: "auto",
            },
            maxWidth: {
                xs: "358px",
                md: "638px",
            }
        }}>
            <Typography variant="body2" className={montserrat.className} sx={{
                textAlign: "center",
                fontFamily: montserrat.style,
                fontSize: "16px",
                fontStyle: "normal",
                fontWeight: "700",
                lineHeight: "24px",
                letterSpacing: "0.16px",
                color: "#FF8919",
            }}>
                Your Trust, Our Commitment
            </Typography>
            <Typography mt={2} variant="h3" sx={{
                color: "#FFF",
                fontFamily: montserrat.style,
                fontStyle: "normal",
                fontWeight: 700,
                fontSize: {md: "48px", xs: "32px"},
                lineHeight: {md: "56px", xs: "44px"},
                letterSpacing: {md: "-0.72px", xs: "0.16px"},

            }} className={montserrat.className}>
                Uncompromised Security
            </Typography>
            <Typography mt={3} variant="body1" sx={{
                color: "#FFF",
                fontFamily: manrope.style,
                fontStyle: "normal",
                fontWeight: 400,
                fontSize: {md: "24px", xs: "16px"},
                lineHeight: {md: "32px", xs: "24px"},
                mb: {
                    xs: "72px"
                }
            }} className={manrope.className}>
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
                    sm: 0,
                    md: 0,
                },
                mx: {
                    sm: 0,
                    md: 0,
                    lg: "auto",
                    xl: "auto",
                },
                maxWidth: {md: "1441px", xs: "900px"},
                flexDirection: {md: "initial", xs: "column-reverse"},
            }}
        >
            <Box component="img" sx={{
                width: {md: "327px", xs: "175px"},
                height: {md: "264px", xs: "127px"},
                backgroundImage: {md: `url('/security3.png')`, xs: `url('/security3xs.png')`},
                backgroundSize: "cover",

            }
            }/>
            <SecurityHeader/>
            <Box component="img" sx={{
                width: {md: "376px", xs: "298px"},
                height: {md: "241px", xs: "175px"},
                marginRight: {
                    md: "0px",
                    xs: "50px",
                },
                position: {xs: "relative"},
                bottom: {md: "0px", xs: "103px"},
                backgroundImage: {md: `url('/security4.png')`, xs: `url('/security4xs.png')`},
                backgroundSize: "cover",

            }}/>
        </Container>
    );
}
