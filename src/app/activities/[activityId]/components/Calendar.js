"use client";

import React, { useState } from "react";
import dayjs from "dayjs";
import { Box, IconButton, Typography } from "@mui/material";
import KeyboardArrowLeftRoundedIcon from "@mui/icons-material/KeyboardArrowLeftRounded";
import KeyboardArrowRightRoundedIcon from "@mui/icons-material/KeyboardArrowRightRounded";
import isBetween from "dayjs/plugin/isBetween";

dayjs.extend(isBetween);

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
  const setDateRange = (date1, date2) => {
    if (date1.isBefore(date2, "day")) {
      setSelectedDates({ start: date1, end: date2 });
    } else {
      setSelectedDates({ start: date2, end: date1 });
    }
  };

  const handleDateClick = (dayNumber) => {
    const clickedDate = month.date(dayNumber);
    const isFirstDateSelect = !selectedDates.start || selectedDates.end;
    if (isFirstDateSelect) {
      setSelectedDates({ start: clickedDate, end: null });
    } else {
      setDateRange(selectedDates.start, clickedDate);
    }
  };

  const isDateSelected = (date) => {
    if (!selectedDates.start || !selectedDates.end) {
      return false;
    }
    return date.isBetween(selectedDates.start, selectedDates.end, "day", "[]");
  };

  return (
    <Box>
      <CalendarCssGrid {...props}>
        {emptyDaysNumbersArray.map((emptyDayNumber) => (
          <Box key={`empty-${emptyDayNumber}`}></Box>
        ))}

        {monthDaysNumbersArray.map((monthDayNumber) => {
          const date = month.date(monthDayNumber);
          const isNewDateRangeStartDate = selectedDates.start && date.isSame(selectedDates.start, "day") && !selectedDates.end;

          return (
            <Typography
              sx={{
                border: isNewDateRangeStartDate ? "1px solid black" : "1px solid #ccc",
                cursor: "pointer",
                backgroundColor: isDateSelected(date) ? "lightblue" : "transparent",
                // TODO: Rationalize this
                boxSizing: "border-box",
                "&:hover": {
                  border: "1px solid black",
                  outline: "1px solid black",
                },
              }}
              key={monthDayNumber}
              onClick={() => handleDateClick(monthDayNumber)}
            >
              {monthDayNumber}
            </Typography>
          );
        })}
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
