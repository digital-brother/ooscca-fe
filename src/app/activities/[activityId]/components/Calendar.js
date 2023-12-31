import React from "react";
import dayjs from "dayjs";
import { Box } from "@mui/material";

export default function Calendar() {
  const now = dayjs();

  const startMonthDayOfWeek = now.startOf("month").day();
  const emptyDaysNumbersArray = Array.from({ length: startMonthDayOfWeek }, (_, index) => index);

  const monthDaysNumber = now.daysInMonth();
  const monthDaysNumbersArray = Array.from({ length: monthDaysNumber }, (_, index) => index + 1);

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div>
      <h2>{now.format("MMMM YYYY")}</h2>
      <Box sx={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)" }}>
        {daysOfWeek.map((day, index) => (
          <Box key={`day-${index}`} sx={{ fontWeight: "bold" }}>
            {day}
          </Box>
        ))}
        {emptyDaysNumbersArray.map((_, index) => (
          <Box key={`empty-${index}`}></Box>
        ))}
        {monthDaysNumbersArray.map((day) => (
          <Box sx={{ border: "1px solid black" }} key={day}>
            {day}
          </Box>
        ))}
      </Box>
    </div>
  );
}
