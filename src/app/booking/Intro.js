import Image from "next/image";
import bookingIntroImage from "/public/booking-intro.png";
import { Box, Container, Typography } from "@mui/material";

export default function Intro() {
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
        <Box sx={{ maxWidth: 800, textAlign: "center", mx: "auto", mt: 3, mb: 10 }}>
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
    </>
  );
}
