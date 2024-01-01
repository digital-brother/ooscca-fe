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
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(7, 1fr)",
        rowGap: 0.5,
        gridAutoRows: 40,
        ...sx,
      }}
      {...props}
    >
      {children}
    </Box>
  );
}

function Day({
  isNewDateRangeStartDate,
  day,
  isSelected,
  handleDayClick,
  isDateRangeStart,
  isDateRangeEnd,
  isDateRangeMiddle,
  setHoveredDay,
}) {
  let borderRadiusSx = {};
  if (isDateRangeStart) {
    borderRadiusSx = {
      borderTopLeftRadius: 999,
      borderBottomLeftRadius: 999,
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0,
    };
  } else if (isDateRangeEnd) {
    borderRadiusSx = {
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0,
      borderTopRightRadius: 999,
      borderBottomRightRadius: 999,
    };
  } else if (isDateRangeMiddle) {
    borderRadiusSx = { borderRadius: 0 };
  } else {
    borderRadiusSx = { borderRadius: 999 };
  }

  return (
    <Typography
      sx={{
        border: isNewDateRangeStartDate ? "2px solid #997706" : "2px solid transparent",
        ...borderRadiusSx,

        cursor: "pointer",
        backgroundColor: isSelected ? "#FFC50A" : "transparent",
        // TODO: Rationalize this
        boxSizing: "border-box",
        "&:hover": {
          border: "2px solid #997706",
          // outline: "1px solid #997706",
        },

        color: "#666",
        // TODO: Ratinalize with CssGrid
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      key={day.format("DD")}
      onClick={() => handleDayClick(day)}
      onMouseEnter={() => setHoveredDay(day)}
      onMouseLeave={() => setHoveredDay(null)}
    >
      {day.format("DD")}
    </Typography>
  );
}

function Days({ month, ...props }) {
  const startMonthDayOfWeek = month.startOf("month").day();
  const emptyDaysNumbersArray = Array.from({ length: startMonthDayOfWeek }, (_, index) => index);

  const monthDaysNumber = month.daysInMonth();
  const monthDays = Array.from({ length: monthDaysNumber }, (_, index) => {
    return dayjs().date(index + 1);
  });

  const [dateRanges, setDateRanges] = useState([]);
  const [hoveredDay, setHoveredDay] = useState(null);

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

  const handleDayClick = (day) => {
    const dateRangeToRemoveIndex = dateRanges.findIndex((range) => dateInDateRange(day, range));
    if (dateRangeToRemoveIndex !== -1) {
      removeDateRange(dateRangeToRemoveIndex);
      return;
    }

    const lastDateRange = dateRanges[dateRanges.length - 1];
    const isFirstDateSelect = !lastDateRange || lastDateRange.end;
    if (isFirstDateSelect) {
      addDateRange(day);
    } else {
      completeDateRange(day);
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

        {monthDays.map((day) => {
          const lastDateRange = dateRanges[dateRanges.length - 1];
          const lastIncompleteDateRange = lastDateRange && !lastDateRange.end ? lastDateRange : null;
          const isNewDateRangeStartDate =
            lastIncompleteDateRange?.start && day.isSame(lastIncompleteDateRange.start, "day");

          const parentDateRange = dateRanges.find((dateRange) => dateInDateRange(day, dateRange));
          const isDateRangeStart = parentDateRange?.start?.isSame(day, "day");
          const isDateRangeEnd = parentDateRange?.end?.isSame(day, "day");
          const isDateRangeMiddle = parentDateRange && !isDateRangeStart && !isDateRangeEnd;

          // const isDayInHoveredDateRange = dateInDateRange(hoveredDay, parentDateRange);

          return (
            <Day
              day={day}
              isNewDateRangeStartDate={isNewDateRangeStartDate}
              isSelected={isDateSelected(day)}
              isDateRangeStart={isDateRangeStart}
              isDateRangeEnd={isDateRangeEnd}
              isDateRangeMiddle={isDateRangeMiddle}
              handleDayClick={handleDayClick}
              setHoveredDay={setHoveredDay}
              key={day.format("DD")}
            />
          );
        })}
      </CalendarCssGrid>
      {/* TODO: remove this and wrapper */}
      <Box sx={{ textAlign: "center" }}>
        <Typography mt={3}>Selected dates:</Typography>
        {dateRanges.map((dateRange, index) => (
          <Typography key={index}>
            {dateRange.start && dateRange.start.format("YYYY-MM-DD")} -{" "}
            {dateRange.end && dateRange.end.format("YYYY-MM-DD")}
          </Typography>
        ))}
        <Typography mt={3}>Hovered dates: {hoveredDay?.format("DD")}</Typography>
      </Box>
    </Box>
  );
}

function WeekDays({ ...props }) {
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <CalendarCssGrid {...props}>
      {daysOfWeek.map((day, index) => (
        <Typography
          // TODO: Refactor sx
          sx={{ color: "#333", display: "flex", alignItems: "center", justifyContent: "center" }}
          key={`day-${index}`}
        >
          {day}
        </Typography>
      ))}
    </CalendarCssGrid>
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
    <Box sx={{ display: "flex", justifyContent: "right", alignItems: "center", gap: 1 }}>
      <Typography sx={{ color: "#333", fontWeight: 700 }}>{month.format("MMMM YYYY")}</Typography>
      <IconButton size="small" sx={{ p: 0 }} onClick={handlePrevMonth}>
        <KeyboardArrowLeftRoundedIcon {...iconProps} />
      </IconButton>
      <IconButton size="small" sx={{ p: 0 }} onClick={handleNextMonth}>
        <KeyboardArrowRightRoundedIcon {...iconProps} />
      </IconButton>
    </Box>
  );
}

export default function Calendar() {
  const [month, setMonth] = useState(dayjs());

  return (
    <Box sx={{ maxWidth: 450, mx: "auto" }}>
      <MonthSwitcher month={month} setMonth={setMonth} />
      <WeekDays sx={{ mt: 1 }} />
      <Days month={month} />
    </Box>
  );
}
