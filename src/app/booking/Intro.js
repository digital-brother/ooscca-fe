"use client";

import { Box, Container, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Image from "next/image";
import bookingIntroImage from "/public/booking-intro.png";
import OosStepper from "@/components/OosStepper";

export default function Intro() {
  const theme = useTheme();
  const steps = [
    "Find the activities your child will love",
    "Add them to child’s calendar",
    "Review and then pay for all in one click",
  ];

  return (
    <>
      <Box
        sx={{
          height: { xs: 200, sm: 225, md: 275, lg: 300, xl: 325 },
          overflow: "hidden",
          position: "relative",
        }}
      >
        <Image
          src={bookingIntroImage}
          alt="Booking intro"
          fill
          style={{ objectFit: "cover", objectPosition: "bottom" }}
        />
      </Box>
      <Container>
        <Box sx={{ maxWidth: 800, textAlign: "center", mx: "auto", mt: 3 }}>
          <Typography variant="h6" color="orange.main">
            Keeping it simple
          </Typography>
          <Typography variant="h3" mt={2}>
            Enjoy the ease of booking activities without the text and email tennis
          </Typography>
          <Typography color="grey.500" mt={2}>
            We know when kids are going to be Out Of School so why not plan by calendar instead of activities. It&apos;s
            is simpler, easier and more intuitive.
          </Typography>
        </Box>
      </Container>
      <Container sx={{ textAlign: "center", mt: { xs: 6, md: 10 }, mb: 10 }}>
        <Box sx={{ maxWidth: 800, mx: "auto" }}>
          <Typography variant="subtitle1">
            The cure to complexity of booking activities in
            <span style={{ color: theme.palette.purple.main }}> 3 simple steps</span>
          </Typography>
          <OosStepper steps={steps} sx={{ mt: 3 }} />
        </Box>
      </Container>
    </>
  );
}
