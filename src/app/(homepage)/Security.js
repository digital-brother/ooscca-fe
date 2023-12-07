import {Box, Container, Typography} from "@mui/material";
import {Manrope, Montserrat} from "@next/font/google";


const manrope = Manrope({subsets: ['latin']});
const montserrat = Montserrat({subsets: ['latin']});

const securityInlineStyles = {
    textAlign: "center",
    maxWidth: "638px",
};

const headerStyles = {
    textAlign: "center",
    fontFamily: montserrat.style,
    fontSize: "16px",
    fontStyle: "normal",
    fontWeight: "700",
    lineHeight: "24px", /* 150% */
    letterSpacing: "0.16px",
    color: "#FF8919"
}

const titleStyles = {
    fontSize: "48px",
    fontStyle: "normal",
    fontWeight: 700,
    lineHeight: "56px", /* 116.667% */
    letterSpacing: "-0.72px",
    color: "#FFF",
    fontFamily: montserrat.style,
};

const contentStyles = {
    fontSize: "24px",
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: "32px",
    color: "#FFF",
    fontFamily: manrope.style,
};

function SecurityHeader({sx}) {
    return (
        <Box sx={{...securityInlineStyles, ...sx}}>
            <Typography variant="body2" className={montserrat.className} sx={headerStyles}>
                Your Trust, Our Commitment
            </Typography>
            <Typography mt={2} variant="h3" sx={titleStyles} className={montserrat.className}>
                Uncompromised Security
            </Typography>
            <Typography mt={3} variant="body1" sx={contentStyles} className={manrope.className}>
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
                py: {
                    xs: 6,
                    md: 10,
                    display: "flex",
                    background: "black",
                },
                '@media (max-width: 900px)': {
                    maxWidth: "900px",
                    paddingLeft: "0px",
                    paddingRight: "0px",
                    marginRight: "0px",
                    marginLeft: "0px",
                    display: "flex",
                    flexDirection: "column-reverse",
                    alignItems: "center",
                },
            }} style={{
            maxWidth: "1441px",
            paddingLeft: "0px",
            paddingRight: "0px",
            marginRight: "0px",
            marginLeft: "0px",
            alignItems: "center",
        }}
        >
            <Box component="img" src="/security3.png" sx={{width: "327px", height: "239px", overflow: "hidden"}}/>
            <SecurityHeader sx={{mx: "auto"}}/>
            <Box component="img" src="/security4.png" sx={{width: "376px", height: "221px", overflow: "hidden"}}/>
        </Container>
    );
}
