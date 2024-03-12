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
  Typography,
} from "@mui/material";
import { styled } from "@mui/system";
import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";
import { useQuery } from "react-query";
import { getBookings, getChildren } from "@/app/api.mjs";
import _ from "lodash";
import { useState } from "react";
import FamilyRestroomIcon from "@mui/icons-material/FamilyRestroom";

dayjs.extend(weekday);

const BookingBox = styled(Box)(({ theme }) => ({
  flex: 1,
  borderRadius: theme.spacing(1),
  padding: theme.spacing(2),
}));

function FilledBooking({ booking }) {
  return (
    <BookingBox
      sx={{
        display: "flex",
        flexDirection: "column",
        bgcolor: "green.100",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between", gap:1 }}>
        <Typography sx={{ fontWeight: 700 }}>{booking.activity.typeName}</Typography>
        <Typography sx={{ right: 12, top: 12, fontWeight: 700 }}>£{booking.activity.price}</Typography>
      </Box>
      <Typography>
        {booking.activity.startTime} - {booking.activity.endTime}
      </Typography>
      <Typography>{booking.activity.address}</Typography>
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
        booking ? <FilledBooking key={index} booking={booking} /> : <EmptyBooking key={index} />
      )}
    </Box>
  );
}

  const StyledHeaderTableCell = styled(TableCell)(({ theme }) =>
    theme.unstable_sx({
      borderBottom: "none",
      width: "18%",
      p: 1,
      fontSize: "1rem",
      fontWeight: 400,
      color: "grey.600",
    })
  );

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

function FamilyBookings() {
  const today = dayjs();

  let currentWeekFirstDayDate;
  if (today.weekday() === 0 || today.weekday() === 6) {
    currentWeekFirstDayDate = today.startOf("week").add(1, "day");
  } else {
    currentWeekFirstDayDate = today.startOf("week").add(1, "day");
  }
  const [weekFirstDayDate, setWeekFirstDayDate] = useState(currentWeekFirstDayDate);
  const weekDates = Array.from({ length: 5 }, (_, i) => weekFirstDayDate.add(i, "day"));
  const { data: children } = useQuery("children", getChildren);
  const { data: bookings } = useQuery("bookings", () => getBookings(weekDates[0], weekDates[4]));

  const formatDate = (date) => date.format("ddd D");

  const handleNextWeek = () => setWeekFirstDayDate(weekFirstDayDate.add(7, "day"));
  const handlePreviosWeek = () => setWeekFirstDayDate(weekFirstDayDate.subtract(7, "day"));

  return (
    <TableContainer component={Box}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <StyledTableCell rowSpan={2} sx={{ verticalAlign: "bottom", textAlign: "center" }}>
              <FamilyRestroomIcon />
              <Typography sx={{ fontWeight: 700 }}>Family</Typography>
            </StyledTableCell>

            <StyledTableCell colSpan={5}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Typography variant="h6">{weekFirstDayDate.format("MMMM YYYY")}</Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <IconButton onClick={handlePreviosWeek}>
                    <ArrowBackIosNewIcon />
                  </IconButton>
                  <Button color="grey" sx={{ py: 0.2 }} onClick={() => setWeekFirstDayDate(currentWeekFirstDayDate)}>
                    Today
                  </Button>
                  <IconButton onClick={handleNextWeek}>
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
            {weekDates.map((date, index) => (
              <StyledHeaderTableCell key={index} align="center">
                <Box sx={{ bgcolor: today.isSame(date, "day") ? "grey.100" : "transparent", borderRadius: 1.5, py: 1 }}>
                  {formatDate(date)}
                </Box>
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
                  <Typography sx={{fontWeight: 700, textAlign: "center"}}>{child.name}</Typography>
                </StyledTableCell>
                {weekDates.map((date, index) => {
                  let dateBookings = bookings?.filter(
                    (booking) => booking.participant === child.id && dayjs(booking.date).isSame(date, "day")
                  );
                  if (!dateBookings || _.isEmpty(dateBookings)) dateBookings = [null];
                  return (
                    <StyledTableCell key={index} align="left" sx={isLastChild && { pb: 0 }}>
                      <BookingDay bookings={dateBookings} sx={{ mx: "auto" }} />
                    </StyledTableCell>
                  );
                })}
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
