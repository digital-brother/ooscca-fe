"use client";

import React, { useState } from "react";
import dayjs from "dayjs";
import { Box, IconButton, Typography } from "@mui/material";
import KeyboardArrowLeftRoundedIcon from "@mui/icons-material/KeyboardArrowLeftRounded";
import KeyboardArrowRightRoundedIcon from "@mui/icons-material/KeyboardArrowRightRounded";
import isBetween from "dayjs/plugin/isBetween";

dayjs.extend(isBetween);

function CalendarCssGrid({ children, sx }) {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(7, 1fr)",
        rowGap: 0.5,
        gridAutoRows: 40,
        ...sx,
      }}
    >
      {children}
    </Box>
  );
}

function Day({
  isNewDateRangeStartDate,
  day,
  handleDayClick,
  isDateRangeStart,
  isDateRangeEnd,
  isDateRangeMiddle,
  isDayInHoveredDateRange,
  isHovered,
  disabled,
  isNextDayDisabled,
  isPreviousDayDisabled,
  setHoveredDay,
}) {
  const isInDateRange = isDateRangeStart || isDateRangeMiddle || isDateRangeEnd;

  let borderRadiusSx = { borderRadius: 5 };
  if (isDateRangeStart && isDateRangeEnd);
  else if (isDateRangeStart) {
    borderRadiusSx = {
      ...borderRadiusSx,
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0,
    };
  } else if (isDateRangeEnd) {
    borderRadiusSx = {
      ...borderRadiusSx,
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0,
    };
  } else if (isDateRangeMiddle) {
    borderRadiusSx = { borderRadius: 0 };
  }
  const isLastDayOfMonth = day.isSame(day.endOf("month"), "day");
  const isFirstDayOfMonth = day.isSame(day.startOf("month"), "day");
  if (((isDateRangeStart && !isDateRangeEnd) || isDateRangeMiddle) && (isNextDayDisabled || isLastDayOfMonth)) {
    borderRadiusSx = {
      ...borderRadiusSx,
      borderTopRightRadius: 6,
      borderBottomRightRadius: 6,
    };
  }
  if ((isDateRangeMiddle || (isDateRangeEnd && !isDateRangeStart)) && (isPreviousDayDisabled || isFirstDayOfMonth)) {
    borderRadiusSx = {
      ...borderRadiusSx,
      borderTopLeftRadius: 6,
      borderBottomLeftRadius: 6,
    };
  }

  let borderColorSx = { border: "2px solid transparent" };
  if (disabled);
  else if (isHovered && isNewDateRangeStartDate) {
    borderColorSx = { border: "2px solid #997706" };
  } else if ((isHovered && !isDayInHoveredDateRange) || isNewDateRangeStartDate) {
    borderColorSx = { border: "2px solid #FFC50A" };
  }

  let backgroundColor = "transparent";
  if (disabled);
  else if (isDayInHoveredDateRange) {
    backgroundColor = "#ffe285";
  } else if (isInDateRange) {
    backgroundColor = "#FFC50A";
  }

  return (
    <Typography
      sx={{
        ...borderColorSx,
        ...borderRadiusSx,

        cursor: disabled ? "default" : "pointer",
        backgroundColor,
        // TODO: Rationalize this
        // boxSizing: "border-box",

        color: disabled ? "#AAA" : "#666",
        // TODO: Ratinalize with CssGrid
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      key={day.format("DD")}
      onClick={() => !disabled && handleDayClick(day)}
      onMouseEnter={() => !disabled && setHoveredDay(day)}
      onMouseLeave={() => !disabled && setHoveredDay(null)}
    >
      {day.format("DD")}
    </Typography>
  );
}

function Days({ month, dateRanges, setDateRanges, debug }) {
  const startMonthDayOfWeek = month.startOf("month").day();
  const emptyDaysNumbersArray = Array.from({ length: startMonthDayOfWeek - 1 }, (_, index) => index);

  const monthDaysNumber = month.daysInMonth();
  const monthDays = Array.from({ length: monthDaysNumber }, (_, index) => {
    return month.date(index + 1);
  });

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

  function isDisabled(day) {
    return day.day() === 0 || day.day() === 6;
  }

  function removeDateRange(dateRangeIndex) {
    setDateRanges((prevRanges) => prevRanges.filter((_, index) => index !== dateRangeIndex));
  }

  function addDateRange(startDate) {
    setDateRanges((previousDateRanges) => [...previousDateRanges, { start: startDate, end: null }]);
  }

  const completeDateRange = (day) => {
    setDateRanges((previousDateRanges) => {
      let newDateRanges = [...previousDateRanges];

      const lastDateRange = newDateRanges[newDateRanges.length - 1];
      if (!lastDateRange || lastDateRange.end) {
        throw new Error("Unproper calling: incomplete date range not found");
      }

      if (!lastDateRange?.start) {
        throw new Error("Invalid date range: start date not set");
      }

      let startDate, endDate;
      if (day.isBefore(lastDateRange.start, "day")) {
        startDate = day;
        endDate = lastDateRange.start;
      } else {
        endDate = day;
        startDate = lastDateRange.start;
      }

      newDateRanges = removeDateRangesBetween(newDateRanges, startDate, endDate);
      newDateRanges[newDateRanges.length - 1] = { start: startDate, end: endDate };
      return newDateRanges;
    });
  };

  function removeDateRangesBetween(dateRanges, startDate, endDate) {
    return dateRanges.filter((dateRange) => {
      if (!dateRange.end) return true;
      const isStartDateInRange = dateInDateRange(dateRange.start, { start: startDate, end: endDate });
      const isEndDateInRange = dateInDateRange(dateRange.end, { start: startDate, end: endDate });
      return !(isStartDateInRange && isEndDateInRange);
    });
  }

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

  return (
    <Box>
      <CalendarCssGrid>
        {emptyDaysNumbersArray.map((emptyDayNumber) => (
          <Box key={`empty-${emptyDayNumber}`}></Box>
        ))}

        {monthDays.map((day) => {
          const lastDateRange = dateRanges[dateRanges.length - 1];
          const incompleteDateRange = lastDateRange && !lastDateRange.end ? lastDateRange : null;
          const isNewDateRangeStartDate = incompleteDateRange?.start && day.isSame(incompleteDateRange.start, "day");

          const parentDateRange = dateRanges.find((dateRange) => dateInDateRange(day, dateRange));
          const isDateRangeStart = parentDateRange?.start?.isSame(day, "day");
          const isDateRangeEnd = parentDateRange?.end?.isSame(day, "day");
          const isDateRangeMiddle = parentDateRange && !isDateRangeStart && !isDateRangeEnd;

          const hoveredDateRange = hoveredDay && dateRanges.find((dateRange) => dateInDateRange(hoveredDay, dateRange));
          const isDayInHoveredDateRange = hoveredDay && hoveredDateRange && dateInDateRange(day, hoveredDateRange);
          const isHovered = hoveredDay && hoveredDay.isSame(day, "day");
          const disabled = isDisabled(day);

          const nextDay = day.add(1, "day");
          const isNextDayDisabled = isDisabled(nextDay);

          const previousDay = day.subtract(1, "day");
          const isPreviousDayDisabled = isDisabled(previousDay);

          const dayProps = {
            day,
            isNewDateRangeStartDate,
            isDateRangeStart,
            isDateRangeEnd,
            isDateRangeMiddle,
            isDayInHoveredDateRange,
            isHovered,
            disabled,
            isNextDayDisabled,
            isPreviousDayDisabled,
            handleDayClick,
            setHoveredDay,
          };

          return <Day {...dayProps} key={day.format("DD")} />;
        })}
      </CalendarCssGrid>
      {/* TODO: remove this and wrapper */}
      {debug && (
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
      )}
    </Box>
  );
}

function WeekDays({ sx }) {
  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return (
    <CalendarCssGrid sx={sx}>
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

export default function Calendar({ name, sx, degug, dateRanges, setDateRanges }) {
  const [month, setMonth] = useState(dayjs());

  return (
    <Box sx={{ minWidth: 270, ...sx }} name={name}>
      <MonthSwitcher month={month} setMonth={setMonth} />
      <WeekDays sx={{ mt: 1 }} />
      <Days month={month} {...{degug, dateRanges, setDateRanges }} />
    </Box>
  );
}
