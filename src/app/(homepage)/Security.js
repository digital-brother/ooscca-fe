"use client";

import { Box, Container, Typography } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

function SecurityHeader() {
  const theme = useTheme();
  const smUp = useMediaQuery(theme.breakpoints.up("sm"));
  return (
    <Container
      sx={{ textAlign: "center", maxWidth: 730, minWidth: { lg: 530 } }}
    >
      <Typography variant="subtitle1">Your Trust, Our Commitment</Typography>
      <Typography
        variant={smUp ? "h1" : "h3"}
        sx={{ mt: 2, color: "#FFF", letterSpacing: -3 }}
      >
        Uncompromised Security
      </Typography>
      <Typography sx={{ mt: 3, fontSize: 24, color: "#FFF" }}>
        At OOSCCA, we understand that security isn&apos;t just a feature; it&apos;s a
        foundation. In a digital world where your family&apos;s safety and privacy
        are paramount, we are steadfast in our commitment to protecting your
        information with the utmost rigor.
      </Typography>
    </Container>
  );
}

export default function Security() {
  return (
    <Box
      sx={{
        background: "#0C0E0F",
        display: "flex",
        justifyContent: "center",
        overflowX: "hidden",
      }}
    >
      <Box
        sx={{
          py: { xs: 7, md: 10 },
          display: "flex",
          flexDirection: { xs: "column", lg: "row-reverse" },
          columnGap: { lg: 5, xl: 10 },
          rowGap: 7,
          alignItems: "center",
          maxWidth: 1505,
        }}
      >
        <Box
          component="img"
          src="/security4.png"
          sx={{
            width: { xs: 298, lg: 376 },
            height: { xs: 175, lg: 221 },
          }}
        />
        <SecurityHeader />
        <Box
          component="img"
          src="/security3.png"
          sx={{
            width: { xs: 174, lg: 327 },
            height: { xs: 127, lg: 239 },
          }}
        />
      </Box>
    </Box>
  );
}
