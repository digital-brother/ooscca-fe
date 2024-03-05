import { Box, Container, Typography } from "@mui/material";
import Image from "next/image";

const BENEFITS = [
  {
    subheader: "Spread the word",
    header: "Invite your favourite clubs to join OOSCCA",
    text: "It's a simple way to keep all your bookings in one place and to support the local community of providers. Just enter their name and email, and we'll introduce them to the world of OOSCCA.",
    cta: "Let's get more providers. Let's get more choice >",
  },
];

export default function Benefits() {
  const benefit = BENEFITS[0];
  return (
    <Container sx={{ my: 10 }}>
      <Box sx={{ maxWidth: { xs: 500, md: "none" }, mx: "auto" }}>
        <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, rowGap: 5 }}>
          <Box sx={{ flex: 1, textAlign: { xs: "center", md: "left" } }}>
            <Typography variant="captionBold">{benefit.subheader}</Typography>
            <Typography variant="h3" sx={{ mt: 2 }}>
              {benefit.header}
            </Typography>
            <Typography variant="bodyMedium" color="grey.500" sx={{ mt: 2 }}>
              {benefit.text}
            </Typography>
            <Typography sx={{ fontWeight: 700, color: "purple.main", mt: 2 }}>
              Let&apos;s get more providers. Let&apos;s get more choice &gt;
            </Typography>
          </Box>
          <Box sx={{ flex: 1, position: "relative", textAlign: "center", minHeight: { xs: 250, md: 290 } }}>
            <Image
              src="/booking-benefit-1.png"
              alt="Invite your favourite clubs to join OOSCCA"
              fill
              sizes="290px"
              style={{ objectFit: "contain" }}
            />
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
