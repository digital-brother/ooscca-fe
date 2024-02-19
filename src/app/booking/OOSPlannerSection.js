"use client";

import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import IosShareIcon from "@mui/icons-material/IosShare";
import {
  Box,
  Button,
  Container,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from "@mui/material";
import { styled } from "@mui/system";
import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";
import { useQuery } from "react-query";
import { getBookings, getChildren } from "../activities/[activityId]/api.mjs";

dayjs.extend(weekday);

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

function BookingDay({ bookings = [], sx }) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", rowGap: 1, height: 320, ...sx }}>
      {bookings.map((booking, index) =>
        booking ? <Booking key={index} booking={booking} /> : <EmptyBooking key={index} />
      )}
    </Box>
  );
}

function FamilyBookings() {
  const today = dayjs();
  let firstWeekDayDate;
  if (today.weekday() === 0 || today.weekday() === 6) {
    firstWeekDayDate = today.startOf("week").add(1, "day");
  } else {
    firstWeekDayDate = today.startOf("week").add(1, "day");
  }
  const weekDates = Array.from({ length: 5 }, (_, i) => firstWeekDayDate.add(i, "day"));
  const {data: children} = useQuery("children", getChildren);
  const { date: bookings } = useQuery("bookings", () => getBookings(weekDates[0], weekDates[4]));

  const formatDate = (date) => date.format("ddd D");

  const booking = {
    type: "Football",
    time: "7:30 - 12:00 AM",
    address: "123 Clubs, Street name, postcode",
    price: 45,
  };

  const StyledHeaderTableCell = styled(TableCell)(({ theme }) => ({
    borderBottom: "none",
    "&:first-child": {
      borderRight: "1px solid",
      borderRightColor: theme.palette.grey[300],
    },
  }));

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    justifyContent: "center",
    borderBottom: "none",
    "&:not(:last-child)": {
      borderRight: "1px dashed",
      borderRightColor: theme.palette.grey[300],
    },
    "&:first-child": {
      borderRight: "1px solid",
      borderRightColor: theme.palette.grey[300],
    },
  }));

  return (
    <TableContainer component={Box}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <StyledTableCell></StyledTableCell>
            <StyledTableCell colSpan={5}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Typography>September 2023</Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <IconButton>
                    <ArrowBackIosNewIcon />
                  </IconButton>
                  <Typography>Today</Typography>
                  <IconButton>
                    <ArrowForwardIosIcon />
                  </IconButton>
                </Box>
                <Button startIcon={<IosShareIcon />} variant="outlined" color="grey">
                  Share Calendar
                </Button>
              </Box>
            </StyledTableCell>
          </TableRow>
          <TableRow sx={{ borderBottom: "1px solid", borderColor: "grey.300" }}>
            <StyledHeaderTableCell></StyledHeaderTableCell>
            {weekDates.map((date, index) => (
              <StyledHeaderTableCell key={index} align="center">
                {formatDate(date)}
              </StyledHeaderTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {children?.map((child, index) => {
            const isLastChild = index + 1 === children.length;
            return (
              <TableRow key={child.id} sx={isLastChild ? {} : { borderBottom: "1px solid", borderColor: "grey.300" }}>
                <StyledTableCell component="th" scope="row">
                  {child.name}
                </StyledTableCell>
                {weekDates.map((date, index) => (
                  <StyledTableCell key={index} align="left" sx={isLastChild && { pb: 0 }}>
                    <BookingDay bookings={[booking, booking]} sx={{ mx: "auto" }} />
                  </StyledTableCell>
                ))}
              </TableRow>
            );
          })}
          <TableRow>
            <StyledTableCell></StyledTableCell>
            <StyledTableCell colSpan={5} sx={{ textAlign: "right" }}>
              <Button variant="contained" color="yellow">
                Proceed to checkout
              </Button>
            </StyledTableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}

function Wrapper({ sx }) {
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
        ...sx,
      }}
    >
      <FamilyBookings />
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
        <Wrapper sx={{ mt: 8 }} />
      </Container>
    </Box>
  );
}
