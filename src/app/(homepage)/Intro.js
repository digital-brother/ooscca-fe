"use client";

import { Box, Button, Container } from "@mui/material";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Grid from "@mui/material/Grid";

function IntroText(props) {
  return (
    <Box textAlign={{ xs: "center", md: "left" }} {...props}>
      <Typography variant="body1" color="warning.main" fontWeight="bold">
        OOSCCA /ˈos.ka/ — Out Of School Clubs, Classes & Activities
      </Typography>
      <Typography mt={3} variant="h3" fontWeight="bold">
        All-in-one platform that brings kids’ activity providers and parents
        under one roof
      </Typography>
      <Typography mt={3} variant="h5" color="text.secondary">
        AOOSCCA makes it super easy to discover, pay and manage activities with
        multiple providers — because parenting is hard enough.
      </Typography>
      <Button
        sx={{ mt: 5, textTransform: "none", fontSize: 24, fontWieght: 700 }}
        variant="contained"
        color="warning"
        size="large"
      >
        Sign in and start relaxing
      </Button>
    </Box>
  );
}

function IntroImage() {
  const theme = useTheme();
  const mdUp = useMediaQuery(theme.breakpoints.up("md"));
  const src = mdUp ? "/intro-desktop.png" : "/intro-mobile.png";

  return (
    <Box
      component="img"
      src={src}
      width="100%"
      sx={{ maxWidth: { xs: 390, md: "100%" }, mx: "auto" }}
    />
  );
}

export default function Intro() {
  return (
    <Grid
      container
      sx={{
        flexDirection: { md: "row-reverse" },
      }}
    >
      <Grid item xs={12} md={6} textAlign="center">
        <IntroImage />
      </Grid>
      <Grid item xs={12} md={6} sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "right",
      }}>
        <Container maxWidth="sm" sx={{mx:0}}>
          <IntroText/>
        </Container>
      </Grid>
    </Grid>
  );
}
