import React from "react";
import dayjs from "dayjs";
import { Box, Typography } from "@mui/material";

export default function Calendar() {
  const now = dayjs();

  const startMonthDayOfWeek = now.startOf("month").day();
  const emptyDaysNumbersArray = Array.from({ length: startMonthDayOfWeek }, (_, index) => index);

  const monthDaysNumber = now.daysInMonth();
  const monthDaysNumbersArray = Array.from({ length: monthDaysNumber }, (_, index) => index + 1);

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <Box sx={{ maxWidth: 500, mx: "auto" }}>
      <Typography variant="h5">{now.format("MMMM YYYY")}</Typography>

      <Box sx={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", mt: 3 }}>
        {daysOfWeek.map((day, index) => (
          <Typography sx={{ fontWeight: 700 }} key={`day-${index}`}>
            {day}
          </Typography>
        ))}
      </Box>

      <Box sx={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", mt: 1 }}>
        {emptyDaysNumbersArray.map((_, index) => (
          <Box key={`empty-${index}`}></Box>
        ))}

        {monthDaysNumbersArray.map((day) => (
          <Typography sx={{ border: "1px solid black" }} key={day}>
            {day}
          </Typography>
        ))}
      </Box>
    </Box>
  );
}
