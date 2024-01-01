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
    <Box sx={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", rowGap: 0.5, ...sx }} {...props}>
      {children}
    </Box>
  );
}

function WeekDays({ ...props }) {
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <CalendarCssGrid {...props}>
      {daysOfWeek.map((day, index) => (
        <Typography sx={{ color: "#333" }} key={`day-${index}`}>
          {day}
        </Typography>
      ))}
    </CalendarCssGrid>
  );
}

function Day({
  isNewDateRangeStartDate,
  monthDayNumber,
  isSelected,
  handleDateClick,
  isDateRangeStart,
  isDateRangeEnd,
}) {
  return (
    <Typography
      sx={{
        border: isNewDateRangeStartDate ? "2px solid black" : "2px solid transparent",
        borderTopLeftRadius: !isNewDateRangeStartDate && isDateRangeStart ? 999 : 0,
        borderBottomLeftRadius: !isNewDateRangeStartDate && isDateRangeStart ? 999 : 0,
        borderTopRightRadius: isDateRangeEnd ? 999 : 0,
        borderBottomRightRadius: isDateRangeEnd ? 999 : 0,

        cursor: "pointer",
        backgroundColor: isSelected ? "#FFC50A" : "transparent",
        // TODO: Rationalize this
        boxSizing: "border-box",
        "&:hover": {
          border: "2px solid black",
          // outline: "1px solid black",
        },

        color: "#666",
      }}
      key={monthDayNumber}
      onClick={() => handleDateClick(monthDayNumber)}
    >
      {monthDayNumber}
    </Typography>
  );
}

function Days({ month, ...props }) {
  const startMonthDayOfWeek = month.startOf("month").day();
  const emptyDaysNumbersArray = Array.from({ length: startMonthDayOfWeek }, (_, index) => index);

  const monthDaysNumber = month.daysInMonth();
  const monthDaysNumbersArray = Array.from({ length: monthDaysNumber }, (_, index) => index + 1);

  const [dateRanges, setDateRanges] = useState([]);

  function dateInDateRange(date, dateRange) {
    if (!dateRange.start) {
      throw new Error("Invalid date range: start date not set");
    }
    if (!dateRange.end) {
      return false;
    }
    return date.isBetween(dateRange.start, dateRange.end, "day", "[]");
  }

  function removeDateRange(dateRangeIndex) {
    setDateRanges((prevRanges) => prevRanges.filter((_, index) => index !== dateRangeIndex));
  }

  function addDateRange(startDate) {
    setDateRanges((previousDateRanges) => [...previousDateRanges, { start: startDate, end: null }]);
  }

  const completeDateRange = (endDate) => {
    setDateRanges((previousDateRanges) => {
      const newDateRanges = [...previousDateRanges];

      const lastDateRange = newDateRanges[newDateRanges.length - 1];
      if (!lastDateRange || lastDateRange.end) {
        throw new Error("Unproper calling: incomplete date range not found");
      }

      if (!lastDateRange?.start) {
        throw new Error("Invalid date range: start date not set");
      }

      if (endDate.isBefore(lastDateRange.start, "day")) {
        newDateRanges[newDateRanges.length - 1] = { start: endDate, end: lastDateRange.start };
      } else {
        newDateRanges[newDateRanges.length - 1] = { ...lastDateRange, end: endDate };
      }

      return newDateRanges;
    });
  };

  const handleDateClick = (dayNumber) => {
    const clickedDate = month.date(dayNumber);
    const dateRangeToRemoveIndex = dateRanges.findIndex((range) => dateInDateRange(clickedDate, range));
    if (dateRangeToRemoveIndex !== -1) {
      removeDateRange(dateRangeToRemoveIndex);
      return;
    }

    const lastDateRange = dateRanges[dateRanges.length - 1];
    const isFirstDateSelect = !lastDateRange || lastDateRange.end;
    if (isFirstDateSelect) {
      addDateRange(clickedDate);
    } else {
      completeDateRange(clickedDate);
    }
  };

  const isDateSelected = (date) => {
    return dateRanges.some((dateRange) => dateInDateRange(date, dateRange));
  };

  return (
    <Box>
      <CalendarCssGrid {...props}>
        {emptyDaysNumbersArray.map((emptyDayNumber) => (
          <Box key={`empty-${emptyDayNumber}`}></Box>
        ))}

        {monthDaysNumbersArray.map((monthDayNumber) => {
          const date = month.date(monthDayNumber);
          const lastDateRange = dateRanges[dateRanges.length - 1];
          const lastIncompleteDateRange = lastDateRange && !lastDateRange.end ? lastDateRange : null;
          const isNewDateRangeStartDate =
            lastIncompleteDateRange?.start && date.isSame(lastIncompleteDateRange.start, "day");
          const isDateRangeStart = dateRanges.some((dateRange) => dateRange.start?.isSame(date, "day"));
          const isDateRangeEnd = dateRanges.some((dateRange) => dateRange.end?.isSame(date, "day"));

          return (
            <Day
              monthDayNumber={monthDayNumber}
              isNewDateRangeStartDate={isNewDateRangeStartDate}
              isSelected={isDateSelected(date)}
              isDateRangeStart={isDateRangeStart}
              isDateRangeEnd={isDateRangeEnd}
              handleDateClick={handleDateClick}
              key={monthDayNumber}
            />
          );
        })}
      </CalendarCssGrid>
      {/* TODO: remove this and wrapper */}
      <Typography mt={3}>Selected Dates:</Typography>
      {dateRanges.map((dateRange, index) => (
        <Typography key={index}>
          {dateRange.start && dateRange.start.format("YYYY-MM-DD")} -{" "}
          {dateRange.end && dateRange.end.format("YYYY-MM-DD")}
        </Typography>
      ))}
    </Box>
  );
}

function MonthSwitcher({ month, setMonth }) {
  const iconProps = { sx: { color: "#333", fontSize: 28 } };

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
      <Typography sx={{ color: "#333", fontWeight: 700 }}>{month.format("MMMM YYYY")}</Typography>
      </IconButton>
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
        <WeekDays sx={{ mt: 3 }} />
        <Days month={month} sx={{ mt: 1 }} />
      </Box>
    </Box>
  );
}
