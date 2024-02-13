import { Box, Button, Container, IconButton, Typography } from "@mui/material";
import IosShareIcon from "@mui/icons-material/IosShare";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

function Booking({booking}) {
  return (
    <Box
      sx={{
        // mt: 5,
        display: "flex",
        flexDirection: "column",
        maxWidth: 200,
        minHeight: 200,
        p: 2,
        position: "relative",
        border: "1px solid",
        borderColor: "grey.400",
        borderRadius: 1,
        bgcolor: "green.100",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography sx={{ fontWeight: 700 }}>{booking.type}</Typography>
        <Typography sx={{ right: 12, top: 12, fontWeight: 700 }}>£{booking.price}</Typography>
      </Box>
      <Typography>{booking.time}</Typography>
      <Typography>{booking.address}</Typography>
      <Box sx={{ mt: "auto", mb: -1.5, mx: -1.5, display: "flex", justifyContent: "space-between" }}>
        <IconButton>
          <IosShareIcon />
        </IconButton>
        <IconButton>
          <DeleteForeverIcon />
        </IconButton>
      </Box>
    </Box>
  );
}

function Day() {
  const booking = {
    type: "Football",
    time: "7:30 - 12:00 AM",
    address: "123 Clubs, Street name, postcode",
    price: 45,
  };
  return (
    <>
      <Booking booking={booking} />
      <Booking booking={booking} />
    </>
  );
}

function OOSPlanner({ sx }) {
  return (
    <Box sx={{ borderRadius: 2, bgcolor: "white", border: "1px solid", borderColor: "grey.300", ...sx }}>
      <Day />
    </Box>
  );
}

export default function OOSPlannerSection() {
  return (
    <Box sx={{ bgcolor: "grey.50", py: 10 }}>
      <Container>
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="overlineBold">Directly from calendar</Typography>
          <Typography variant="h2" sx={{ mt: 2 }}>
            Enjoy the ease of booking activities without the text and email tennis
          </Typography>
        </Box>
        <OOSPlanner sx={{ mt: 8, p: 5 }} />
      </Container>
    </Box>
  );
}
