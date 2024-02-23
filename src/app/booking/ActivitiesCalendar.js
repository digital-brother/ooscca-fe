"use client";

import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { IconButton, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import Image from "next/image";

import { useState } from "react";
import { useQuery } from "react-query";

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
  const { data: booking } = useQuery(["bookings", bookingId], getBooking);

  return (
    <Box sx={{ maxWidth: 353, border: "1px solid", borderColor: "grey.500", borderRadius: 2 }}>
      <Image alt="Activity image" src= />
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
