"use client";

import { Box, Button, Container, IconButton, Typography } from "@mui/material";
import IosShareIcon from "@mui/icons-material/IosShare";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { styled } from "@mui/system";

const BookingBox = styled(Box)(({ theme }) => ({
  flex: 1,
  borderRadius: theme.spacing(1),
  padding: theme.spacing(2),
}));

function Booking({ booking }) {
  return (
    <BookingBox
      sx={{
        display: "flex",
        flexDirection: "column",
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
    </BookingBox>
  );
}

function EmptyBooking() {
  return (
    <BookingBox
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: "1px solid",
        borderColor: "grey.main",
        borderStyle: "dashed",
      }}
    >
      <Button color="grey" startIcon={<AddCircleOutlineIcon />}>
        Add activity
      </Button>
    </BookingBox>
  );
}

function BookingDay({ bookings = [] }) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", rowGap: 1, width: 200, height: 400 }}>
      {bookings.map((booking, index) =>
        booking ? <Booking key={index} booking={booking} /> : <EmptyBooking key={index} />
      )}
    </Box>
  );
}

function FamilyBookings() {
  return <>Family Bookings</>;
}

function BookingCalendar({ sx }) {
  const booking = {
    type: "Football",
    time: "7:30 - 12:00 AM",
    address: "123 Clubs, Street name, postcode",
    price: 45,
  };
  return (
    <Box
      sx={{
        borderRadius: 2,
        border: "1px solid",
        borderColor: "grey.300",
        bgcolor: "white",
        p: 5,
        ...sx,
      }}
    >
      <FamilyBookings />
      <Box sx={{display: "flex", columnGap: 2, mt: 3}}>
        <BookingDay bookings={[booking]} />
        <BookingDay bookings={[booking, null]} />
        <BookingDay bookings={[null, booking]} />
        <BookingDay bookings={[null, null]} />
        <BookingDay bookings={[null]} />
      </Box>
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
        <BookingCalendar sx={{ mt: 8 }} />
      </Container>
    </Box>
  );
}
