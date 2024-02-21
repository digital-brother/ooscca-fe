"use client";

import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { IconButton, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import dayjs from "dayjs";
import { useState } from "react";

function PickerDate({ date, setSelectedDate, selectedDate }) {
  const isSelectedDate = date.isSame(selectedDate, "day");
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

export default function ActivitiesCalendar() {
  const today = dayjs();
  const dayOfWeek = today.day();
  const [selectedDate, setSelectedDate] = useState(today);

  let monday;
  if (dayOfWeek === 0 || dayOfWeek === 6) {
    monday = selectedDate.startOf("week").add(1, "day").add(1, "week");
  } else {
    monday = selectedDate.startOf("week").add(1, "day");
  }

  const weekDates = Array.from({ length: 5 }, (_, i) => monday.add(i, "day"));

  return (
    <Container sx={{ my: 10 }}>
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
        {weekDates.map((date, index) => (
          <PickerDate key={index} {...{ date, setSelectedDate, selectedDate }} />
        ))}
        <IconButton onClick={() => setSelectedDate(selectedDate.add(1, "week"))}>
          <ArrowForwardIosIcon />
        </IconButton>
      </Box>
    </Container>
  );
}
