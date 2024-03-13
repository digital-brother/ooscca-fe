import { Box, Container, Stack, Typography } from "@mui/material";
import Image from "next/image";

const BENEFITS = [
  {
    subheader: "Spread the word",
    header: "Invite your favourite clubs to join OOSCCA",
    text: "It's a simple way to keep all your bookings in one place and to support the local community of providers. Just enter their name and email, and we'll introduce them to the world of OOSCCA.",
    cta: "Let's get more providers. Let's get more choice >",
    image: "/booking-benefit-1.png",
  },
  {
    subheader: "Exciting Future Ahead",
    header: "New Features on the Horizon",
    text: "This is just the beginning. Our platform is built and  thrives on innovation, and we're excited to announce that new features and updates are just around the corner—designed to make your OOSCCA experience even more seamless and enjoyable. We're more than just a platform; we're a community. And every community thrives on collaboration. Share your suggestions with us, and let's build the future of OOSCCA together.",
    cta: "Suggest a feature >",
    image: "/booking-benefit-2.png",
  },
  {
    subheader: "Simplify your search",
    header: "Spread the word: Invite your favourite clubs and providers",
    text: "Do your children love their current clubs and activity providers? Help us make OOSCCA even better by inviting them to join our platform. It's a simple way to keep all your bookings in one place and to support your favourite providers with the tools they need to thrive. Just enter their name and email, and we'll introduce them to the world of OOSCCA.",
    cta: "Fill in the detail  >",
    image: "/booking-benefit-3.png",
  },
];

function Benefit({ benefit, reverse }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: reverse ? "row" : "row-reverse" },
        rowGap: 5,
        columnGap: 5,
      }}
    >
      <Box sx={{ flex: 1, textAlign: { xs: "center", md: "left" } }}>
        <Typography variant="captionBold">{benefit.subheader}</Typography>
        <Typography variant="h3" sx={{ mt: 2 }}>
          {benefit.header}
        </Typography>
        <Typography variant="bodyMedium" color="grey.500" sx={{ mt: 2 }}>
          {benefit.text}
        </Typography>
        <Typography sx={{ fontWeight: 700, color: "purple.main", mt: 2 }}>{benefit.cta}</Typography>
      </Box>
      <Box sx={{ flex: 1, position: "relative", textAlign: "center", minHeight: { xs: 250, sm: 270, md: 290 } }}>
        <Image
          src={benefit.image}
          alt="Invite your favourite clubs to join OOSCCA"
          fill
          sizes="290px"
          style={{ objectFit: "contain" }}
        />
      </Box>
    </Box>
  );
}

export default function Benefits() {
  return (
    <Box>
      <Container sx={{ py: 10, }}>
        <Stack sx={{ maxWidth: { xs: 500, md: "none" }, mx: "auto", gap: 10 }}>
          {BENEFITS.map((benefit, index) => (
            <Benefit key={index} benefit={benefit} reverse={index % 2} />
          ))}
        </Stack>
      </Container>
    </Box>
  );
}
