"use client";

import { Box, Container, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Image from "next/image";
import OosStepper from "@/components/OosStepper";

export default function Intro() {
  const theme = useTheme();
  const steps = [
    "Select activities below",
    "Activities are added to your child's calendar underneath",
    "Pay for all bookings in one go",
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
          src="/booking-intro.png"
          alt="Booking intro"
          fill
          style={{ objectFit: "cover", objectPosition: "bottom" }}
          priority
        />
      </Box>
      <Container sx={{ textAlign: "center" }}>
        <Box sx={{ maxWidth: 800, mx: "auto", mt: 3 }}>
          <Typography variant="h6" color="orange.main">
            Keeping it simple
          </Typography>
          <Typography variant="h3" mt={2}>
            Book kids activities without the faff
          </Typography>
          <Typography color="grey.500" mt={2}>
            Enjoy not planning by calendar instead of activities
          </Typography>
          <Typography color="grey.500">
            It&apos;s is way simpler, easier and more intuitive
          </Typography>
        </Box>
        <Box sx={{ maxWidth: 800, mx: "auto", mt: { xs: 6, md: 10 } }}>
          <Typography variant="subtitle1">
            The cure to complexity in
            <span style={{ color: theme.palette.purple.main }}> 3 simple steps</span>
          </Typography>
          <OosStepper steps={steps} sx={{ mt: 3 }} />
        </Box>
      </Container>
    </>
  );
}
