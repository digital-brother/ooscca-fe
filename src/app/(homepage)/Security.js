"use client";

import { Box, Container, Typography } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { manrope, montserrat } from "@/components/ThemeRegistry/theme";

function SecurityHeader() {
  const theme = useTheme();
  const smUp = useMediaQuery(theme.breakpoints.up("sm"));
  return (
    <Box sx={{textAlign: "center"}}>
      <Typography variant="subheading">Your Trust, Our Commitment</Typography>
      <Typography variant={smUp ? "h1" : "h3"} sx={{mt: 2, color: "#FFF", letterSpacing: -1 }}>
        Uncompromised Security
      </Typography>
      <Typography sx={{ mt: 3, fontSize: 24, color: "#FFF" }}>
        At OOSCCA, we understand that security isn't just a feature; it's a
        foundation. In a digital world where your family's safety and privacy
        are paramount, we are steadfast in our commitment to protecting your
        information with the utmost rigor.
      </Typography>
    </Box>
  );
}

export default function Security() {
  return (
    <Box sx={{ background: "#0C0E0F", display: "flex", justifyContent: "center", overflowX: "hidden" }}>
      <Box sx={{py: {md: 10}, display: "flex", alignItems: "center", gap: 10, maxWidth: 1505}}>
          <Box
            component="img"
            src="/security3.png"
            sx={{
              width: { xs: 175, md: 327 },
              height: { xs: 127, md: 239 },
              objectFit: "cover",
              mt: { md: 0, xs: 9 },
            }}
          />
          <SecurityHeader />
          <Box
            component="img"
            src="/security4.png"
            sx={{
              width: { xs: 298, md: 406 },
              height: { xs: 175, md: 235, },
              mt: { md: 0, xs: -13 },
              mb: { md: 0, xs: 7.5 },
            }}
          />
      </Box>
    </Box>
  );
}
