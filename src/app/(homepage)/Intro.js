"use client";

import { Box, Button, Container } from "@mui/material";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import { useRouter } from "next/navigation";
import NextImage from "next/image";

function IntroText(props) {
  const router = useRouter()

  return (
    <Box textAlign={{ xs: "center", md: "left" }} {...props}>
      <Typography variant="subheading">
        Organise and share with ease
      </Typography>
      <Typography mt={3} variant="h1">
        All-in-one platform that makes it super easy to discover, pay and manage activities 
      </Typography>
      <Typography mt={3} variant="h5" color="text.secondary">
        Intuitive. Powerful. Simple — because parenting is stressful enough.
      </Typography>
      <Button
        sx={{ mt: 5, textTransform: "none", fontSize: 24, fontWieght: 700 }}
        variant="contained"
        color="orange"
        size="large"
        onClick={() => router.push("/booking")}
      >
        Stop searching. Start booking.
      </Button>
    </Box>
  );
}

function IntroImage() {
  const theme = useTheme();
  const mdUp = useMediaQuery(theme.breakpoints.up("md"));
  const src = mdUp ? "/intro-desktop.png" : "/intro-mobile.png";

  return (
    <NextImage
      src={src}
      width={0}
      height={0}
      sizes="100vw"
      style={{width: "100%", height: "auto", objectFit: "cover", objectPosition: "left" }}
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
