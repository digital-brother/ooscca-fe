"use client";

import { Box, Button, Container } from "@mui/material";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { useRouter } from "next/navigation";
import Grid from "@mui/material/Grid";
import { AUTH_TOKEN_KEY } from "@/app/api.mjs";

function IntroText(props) {
  const router = useRouter();
  
  return (
    <Box textAlign={{ xs: "center", md: "left" }} {...props}>
      <Typography variant="subheading">
        OOSCCA /&apos;os.ka/ — Out Of School Clubs, Classes & Activities
      </Typography>
      <Typography mt={3} variant="h1">
        All-in-one platform that brings kids&apos; activity providers and parents
        under one roof
      </Typography>
      <Typography mt={3} variant="h5" color="text.secondary">
        AOOSCCA makes it super easy to discover, pay and manage activities with
        multiple providers — because parenting is hard enough.
      </Typography>
      <Button
        sx={{ mt: 5, textTransform: "none", fontSize: 24, fontWieght: 700 }}
        onClick={() => localStorage.getItem(AUTH_TOKEN_KEY) ? router.push("/booking") : router.push("/login")}
        variant="contained"
        color="orange"
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
        md={6}
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
        md={6}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: { xs: "center", md: "right" },
        }}
      >
        <Container
          sx={{ mx: 0, maxWidth: { xs: 735, md: "sm" }, pr: { md: 0 } }}
        >
          <IntroText py={{ xs: 6, md: 10 }} />
        </Container>
      </Grid>
    </Grid>
  );
}
