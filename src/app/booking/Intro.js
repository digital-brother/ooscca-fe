import Image from "next/image";
import bookingIntroImage from "/public/booking-intro.png";
import { Box } from "@mui/material";

export default function Intro() {
  return (
    <>
      <Box
        sx={{
          height: { xs: 200, sm: 225, md: 275, lg: 300, xl: 325 },
          border: 1,
          overflow: "hidden",
          position: "relative",
        }}
      >
        <Image
          src={bookingIntroImage}
          alt="Booking intro"
          fill
          style={{ objectFit: "cover" }}
        />
      </Box>
    </>
  );
}
