"use client";

import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Button, IconButton, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import Image from "next/image";

import { useState } from "react";
import { useQuery } from "react-query";
import { getBooking } from "../activities/[activityId]/edit/api.mjs";

dayjs.extend(utc);

function PickerDate({ date, setSelectedDate, isSelectedDate }) {
  return (
    <Box sx={{ pb: 2, borderBottom: "3px solid", borderColor: isSelectedDate ? "grey.900" : "transparent" }}>
      <Box
        onClick={() => setSelectedDate(date)}
        sx={{
          textAlign: "center",
          display: "block",
          bgcolor: isSelectedDate ? "grey.100" : "transparent",
          "&:hover": {
            bgcolor: "grey.200",
          },
          "&:active": {
            bgcolor: "grey.300",
          },
          cursor: "pointer",
          borderRadius: 2,
          py: 1.5,
          width: 45,
        }}
      >
        <Typography variant="h5">{date.format("DD")}</Typography>
        <Typography sx={{ fontWeight: 700 }}>{date.format("ddd")}</Typography>
      </Box>
    </Box>
  );
}

function DateSwitcher() {
  const [selectedDate, setSelectedDate] = useState(dayjs.utc());
  const dayOfWeek = selectedDate.day();

  let monday;
  if (dayOfWeek === 0 || dayOfWeek === 6) {
    monday = selectedDate.startOf("week").add(1, "day").add(1, "week");
  } else {
    monday = selectedDate.startOf("week").add(1, "day");
  }
  const weekDates = Array.from({ length: 5 }, (_, i) => monday.add(i, "day"));

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottom: "1px solid",
        borderColor: "grey.500",
      }}
    >
      <IconButton onClick={() => setSelectedDate(selectedDate.subtract(1, "week"))}>
        <ArrowBackIosNewIcon />
      </IconButton>
      {weekDates.map((date, index) => {
        const isSelectedDate = date.isSame(selectedDate, "day");
        return <PickerDate key={index} {...{ date, setSelectedDate, isSelectedDate }} />;
      })}
      <IconButton onClick={() => setSelectedDate(selectedDate.add(1, "week"))}>
        <ArrowForwardIosIcon />
      </IconButton>
    </Box>
  );
}

function ActivityCard() {
  const bookingId = 1;
  const { data: booking } = useQuery(["bookings", bookingId], () => getBooking(bookingId));
  console.log(booking);

  return (
    <Box sx={{ maxWidth: 353, border: "1px solid", borderColor: "grey.500", borderRadius: 2, overflow: "hidden" }}>
      <Box sx={{ height: 200, position: "relative" }}>
        <Image alt="Activity image" src={booking?.activity?.imageUrl} fill objectFit="cover" />
      </Box>
      <Box sx={{ p: 2 }}>
        <Typography variant="subtitle1">{booking?.activity?.provider}</Typography>
        <Typography variant="bodyRegular3">{booking?.activity?.address}</Typography>
        <Typography variant="subtitle1" sx={{ mt: 2 }}>
          {booking?.activity?.type}
        </Typography>
        <Typography variant="bodyRegular3" sx={{ mb: 3 }}>
          {booking?.activity?.ageTo
            ? `(ages ${booking?.activity?.ageFrom}-${booking?.activity?.ageTo})`
            : `(age ${booking?.activity?.ageFrom})`}
        </Typography>

        {booking?.activity?.earlyDropOff && (
          <Typography variant="bodyRegular3">
            <b>
              {parseFloat(booking?.activity?.earlyDropOffPrice) ? (
                `£${booking?.activity?.earlyDropOffPrice}`
              ) : (
                <Box component="span" sx={{ color: "green.main" }}>
                  FREE
                </Box>
              )}
            </b>
            &nbsp; Early drop off {booking?.activity?.earlyDropOffTime}
          </Typography>
        )}
        {booking?.activity?.latePickUp && (
          <Typography variant="bodyRegular3">
            <b>
              {parseFloat(booking?.activity?.latePickUpPrice) ? (
                `£${booking?.activity?.latePickUpPrice}`
              ) : (
                <Box component="span" sx={{ color: "green.main" }}>
                  FREE
                </Box>
              )}
            </b>
            &nbsp; Late pick up {booking?.activity?.latePickUpTime}
          </Typography>
        )}
        <Box sx={{ display: "flex", mt: 3, gap: 2 }}>
          <Button variant="outlined" sx={{ flex: 1 }}>
            Learn more
          </Button>
          <Button variant="contained" sx={{ flex: 1 }}>
            Add
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

function ActivitiesList({ sx }) {
  return (
    <Box sx={{ ...sx }}>
      <ActivityCard />
    </Box>
  );
}

export default function ActivitiesCalendar() {
  return (
    <Container sx={{ my: 10 }}>
      <DateSwitcher />
      <ActivitiesList sx={{ mt: 4 }} />
    </Container>
  );
}
