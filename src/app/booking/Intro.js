"use client";

import { Box, Container } from "@mui/material";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import DemoStepper from "@/app/(homepage)/DemoStepper";

function IntroText(props) {

  const STEPS = [
    "Select activities",
    "Activities are added to your child’s calendar",
    "Pay for all bookings in one go",
  ];

  return (
    <Box textAlign="center" {...props}>
      <Typography my={3} variant="h1">
        Discover, book and track activities without clicking,
        typing and scrolling marathons
      </Typography>
      <Typography mt={5} color="text.secondary" variant="introSubheading">
        We know when kids are going to be Out Of School so why not plan by
        calendar instead by activities. It’s that simple, easy and intuitive.
      </Typography>
      <Typography mt={5} mb={3} variant="introSubheading">
        The cure to complexity of booking activities in
        <span style={{ color: "purple", fontWeight: 700 }}> 3 simple steps</span>
      </Typography>
      <DemoStepper steps={STEPS} />
    </Box>
  );
}

function IntroImage() {
  const theme = useTheme();
  const mdUp = useMediaQuery(theme.breakpoints.up("md"));
  const src = mdUp ? "/booking-intro-desktop.png" : "/booking-intro-mobile.png";

  return (
    <Box
      component="img"
      src={src}
      sx={{
        width: "100%",
        height: "100%",
        objectFit: "cover",
        objectPosition: "left",
      }}
    />
  );
}

export default function Intro() {
  return (
    <Grid container sx={{ flexDirection: { md: "row-reverse" } }}>
      <Grid
        item
        xs={12}
        sx={{
          maxHeight: { md: 818 },
          height: { xs: 595, md: "auto" },
        }}
      >
        <IntroImage />
      </Grid>
      <Grid
        item
        xs={12}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Container
          sx={{ mx: 0, maxWidth: { xs: 735, md: "950px" } }}
        >
          <IntroText py={{ xs: 6, md: 10 }} />
        </Container>
      </Grid>
    </Grid>
  );
}
