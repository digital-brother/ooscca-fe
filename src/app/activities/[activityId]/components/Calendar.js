"use client";

import React from "react";
import dayjs from "dayjs";
import { Box, Typography } from "@mui/material";

function CalendarCssGrid({ children, sx, props }) {
  return (
    <Box sx={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", ...sx }} {...props}>
      {children}
    </Box>
  );
}

function DayNames() {
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <CalendarCssGrid sx={{ mt: 3 }}>
      {daysOfWeek.map((day, index) => (
        <Typography sx={{ fontWeight: 700 }} key={`day-${index}`}>
          {day}
        </Typography>
      ))}
    </CalendarCssGrid>
  );
}

function Days() {
  const now = dayjs();

  const startMonthDayOfWeek = now.startOf("month").day();
  const emptyDaysNumbersArray = Array.from({ length: startMonthDayOfWeek }, (_, index) => index);

  const monthDaysNumber = now.daysInMonth();
  const monthDaysNumbersArray = Array.from({ length: monthDaysNumber }, (_, index) => index + 1);

  return (
    <CalendarCssGrid sx={{ mt: 1 }}>
      {emptyDaysNumbersArray.map((_, index) => (
        <Box key={`empty-${index}`}></Box>
      ))}

      {monthDaysNumbersArray.map((dayNumber) => (
        <Typography sx={{ border: "1px solid black" }} key={dayNumber}>
          {dayNumber}
        </Typography>
      ))}
    </CalendarCssGrid>
  );
}

export default function Calendar() {
  const now = dayjs();

  return (
    <Box sx={{ maxWidth: 500, mx: "auto" }}>
      <Typography variant="h5">{now.format("MMMM YYYY")}</Typography>
      <DayNames />
      <Days />
    </Box>
  );
}
