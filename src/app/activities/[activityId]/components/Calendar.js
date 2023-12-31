"use client";

import React, { useState } from "react";
import dayjs from "dayjs";
import { Box, IconButton, Typography } from "@mui/material";
import KeyboardArrowLeftRoundedIcon from "@mui/icons-material/KeyboardArrowLeftRounded";
import KeyboardArrowRightRoundedIcon from "@mui/icons-material/KeyboardArrowRightRounded";

function CalendarCssGrid({ children, sx, ...props }) {
  return (
    <Box sx={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 1, ...sx }} {...props}>
      {children}
    </Box>
  );
}

function DayNames({ ...props }) {
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <CalendarCssGrid {...props}>
      {daysOfWeek.map((day, index) => (
        <Typography sx={{ fontWeight: 700 }} key={`day-${index}`}>
          {day}
        </Typography>
      ))}
    </CalendarCssGrid>
  );
}
function Days({ month, ...props }) {
  const startMonthDayOfWeek = month.startOf("month").day();
  const emptyDaysNumbersArray = Array.from({ length: startMonthDayOfWeek }, (_, index) => index);

  const monthDaysNumber = month.daysInMonth();
  const monthDaysNumbersArray = Array.from({ length: monthDaysNumber }, (_, index) => index + 1);

  const [selectedDates, setSelectedDates] = useState({ start: null, end: null });
  const handleDateClick = (dayNumber) => {
    const clickedDate = month.date(dayNumber);
    if (!selectedDates.start) {
      setSelectedDates({ start: clickedDate, end: null });
    } else if (!selectedDates.end) {
      setSelectedDates({ ...selectedDates, end: clickedDate });
    } else {
      setSelectedDates({ start: clickedDate, end: null });
    }
  };

  return (
    <Box>
      <CalendarCssGrid {...props}>
        {emptyDaysNumbersArray.map((emptyDayNumber) => (
          <Box key={`empty-${emptyDayNumber}`}></Box>
        ))}

        {monthDaysNumbersArray.map((monthDayNumber) => (
          <Typography
            sx={{ border: "1px solid #ccc", cursor: "pointer" }}
            key={monthDayNumber}
            onClick={() => handleDateClick(monthDayNumber)}
          >
            {monthDayNumber}
          </Typography>
        ))}
      </CalendarCssGrid>
      {/* TODO: remove this and wrapper */}
      <Typography>Selected Dates:</Typography>
      <Typography>
        {selectedDates.start && selectedDates.start.format("YYYY-MM-DD")} -{" "}
        {selectedDates.end && selectedDates.end.format("YYYY-MM-DD")}
      </Typography>
    </Box>
  );
}

function MonthSwitcher({ month, setMonth }) {
  const iconProps = { sx: { color: "#333", fontSize: 35 } };

  const handleNextMonth = () => {
    setMonth((prevMonth) => prevMonth.add(1, "month"));
  };

  const handlePrevMonth = () => {
    setMonth((prevMonth) => prevMonth.subtract(1, "month"));
  };
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      <IconButton size="small" sx={{ p: 0 }} onClick={handlePrevMonth}>
        <KeyboardArrowLeftRoundedIcon {...iconProps} />
      </IconButton>
      <IconButton size="small" sx={{ p: 0 }} onClick={handleNextMonth}>
        <KeyboardArrowRightRoundedIcon {...iconProps} />
      </IconButton>
      <Typography variant="h5">{month.format("MMMM YYYY")}</Typography>
    </Box>
  );
}

export default function Calendar() {
  const [month, setMonth] = useState(dayjs());

  return (
    <Box sx={{ maxWidth: 300, mx: "auto" }}>
      <MonthSwitcher month={month} setMonth={setMonth} />

      {/* TODO: rationalize */}
      <Box textAlign="center">
        <DayNames sx={{ mt: 3 }} />
        <Days month={month} sx={{ mt: 1 }} />
      </Box>
    </Box>
  );
}
