import { Box, Container, Typography } from "@mui/material";

const securityHeaderStyles = {
    textAlign: "center",
    maxWidth: 735,
};

const titleStyles = {
    color: "#FFF",
};

const contentStyles = {
    fontFamily: "Manrope",
    fontSize: "24px",
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: "32px",
    color: "#FFF",
};

function SecurityHeader({ sx }) {
    return (
        <Box sx={{ ...securityHeaderStyles, ...sx }}>
            <Typography variant="body2" color="warning.main" fontWeight="bold">
                Your Trust, Our Commitment
            </Typography>
            <Typography mt={2} variant="h3" fontWeight="bold" sx={titleStyles}>
                Uncompromised Security
            </Typography>
            <Typography mt={2} variant="body1" color="text.secondary" sx={contentStyles}>
                At OOSCCA, we understand that security isn't just a feature; it's a foundation. In a digital world where your family's safety and privacy are paramount, we are steadfast in our commitment to protecting your information with the utmost rigor.
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
                    paddingLeft: "0px",
                    paddingRight: "0px",
                },
            }} style={{maxWidth: "fit-content"}}
        >
            <Box component="img" src="/security3.png" sx={{width: "329px", height: "239px" }} />
            <SecurityHeader sx={{ mx: "auto" }} />
            <Box component="img" src="/security4.png" sx={{width: "376px", height: "221px" }} />
        </Container>
    );
}
