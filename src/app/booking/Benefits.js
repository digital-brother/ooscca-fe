import { Box, Container, Typography } from "@mui/material";

export default function Benefits() {
  return (
    <Container sx={{ my: 10 }}>
      <Box>
        <Typography variant="captionBold">Spread the word</Typography>
        <Typography variant="h3">Invite your favourite clubs to join OOSCCA</Typography>
        <Typography variant="bodyMedium" color="grey.500">
          It&apos;s a simple way to keep all your bookings in one place and to support the local community of providers.
          Just enter their name and email, and we&apos;ll introduce them to the world of OOSCCA.
        </Typography>
        <Typography sx={{fontWeight: 700, color: "purple.main"}}>Let&apos;s get more providers. Let&apos;s get more choice &gt;</Typography>
      </Box>
    </Container>
  );
}
