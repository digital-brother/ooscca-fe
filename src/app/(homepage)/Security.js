import {Box, Container, Typography} from "@mui/material";
import {Manrope, Montserrat} from "@next/font/google";


const manrope = Manrope({subsets: ['latin']});
const montserrat = Montserrat({subsets: ['latin']});

const securityInlineStyles = {
    textAlign: "center",
    maxWidth: "638px",
    '@media (max-width: 900px)': {
        textAlign: "center",
        maxWidth: "358px",
    }
};

const inlineStyles = {
    textAlign: "center",
    fontFamily: montserrat.style,
    fontSize: "16px",
    fontStyle: "normal",
    fontWeight: "700",
    lineHeight: "24px",
    letterSpacing: "0.16px",
    color: "#FF8919",
    '@media (max-width: 900px)': {
        fontSize: "16px",
        fontStyle: "normal",
        fontWeight: 700,
        lineHeight: "24px",
        letterSpacing: "0.16px",
        fontFamily: montserrat.style,
        color: "#FF8919",
    },
}

const titleStyles = {
    fontSize: "48px",
    fontStyle: "normal",
    fontWeight: 700,
    lineHeight: "56px",
    letterSpacing: "-0.72px",
    color: "#FFF",
    fontFamily: montserrat.style,
    '@media (max-width: 900px)': {
        fontSize: "32px",
        fontStyle: "normal",
        fontWeight: 700,
        lineHeight: "44px",
        letterSpacing: "0.16px",
        fontFamily: montserrat.style,
        color: "#FFF",
    },
};

const contentStyles = {
    fontSize: "24px",
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: "32px",
    color: "#FFF",
    fontFamily: manrope.style,
    '@media (max-width: 900px)': {
        fontSize: "16px",
        fontStyle: "normal",
        fontWeight: 400,
        lineHeight: "24px",
        fontFamily: manrope.style,
        color: "#FFF",
        marginBottom: "73px"
    },
};

const imageSecurity3Styles = {
    width: "327px",
    height: "239px",
    overflow: "hidden",
    '@media (max-width: 900px)': {
        width: "175px",
        height: "127px",
    }

}

const imageSecurity4Styles = {
    width: "376px",
    height: "221px",
    overflow: "hidden",
    '@media (max-width: 900px)': {
        width: "298px",
        height: "175px",
        marginRight: "50px",
        position: "relative",
        bottom: "55px",
    }

}

const containerInlineSlytes = {
    display: "flex",
    background: "#0C0E0F",
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
    },
    '@media (max-width: 900px)': {
        maxWidth: "900px",
        display: "flex",
        flexDirection: "column-reverse",
        alignItems: "center",
        paddingTop: "0px",
    },
}

function SecurityHeader({sx}) {
    return (
        <Box sx={{...securityInlineStyles, ...sx}}>
            <Typography variant="body2" className={montserrat.className} sx={inlineStyles}>
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
            sx={containerInlineSlytes} style={{
            maxWidth: "1441px",
            alignItems: "center",
        }}
        >
            <Box component="img" src="/security3.png" sx={imageSecurity3Styles}/>
            <SecurityHeader sx={{mx: "auto"}}/>
            <Box component="img" src="/security4.png" sx={imageSecurity4Styles}/>
        </Container>
    );
}
