"use client";

import React, { useState } from "react";
import dayjs from "dayjs";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

function Calendar() {
    const [currentMonth, setCurrentMonth] = useState(dayjs());
    const [dateRanges, setDateRanges] = useState([]);

    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const daysInMonth = currentMonth.daysInMonth();

    const startDayOfWeek = dayjs(currentMonth.format("YYYY-MM")).day();

    const days = [...Array(daysInMonth + startDayOfWeek).keys()].map((i) =>
        i >= startDayOfWeek ? i - startDayOfWeek + 1 : null
    );

    const dayStyle = (day) => {
        const date = dayjs(currentMonth.format("YYYY-MM")).date(day);
        const isSelected = dateRanges.some(range =>
            date.isSame(range.start, "day") ||
            date.isSame(range.end, "day") ||
            (range.start && range.end && date.isAfter(range.start) && date.isBefore(range.end))
        );
        return {
            width: "30px",
            height: "30px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            border: "1px solid #ddd",
            cursor: "pointer",
            '&:hover': day !== null ? { backgroundColor: '#BBB' } : {},
            backgroundColor: isSelected ? '#BBB' : 'white',
        };
    };

    const handleDayClick = (day) => {
      const date = dayjs(currentMonth.format("YYYY-MM")).date(day);
      const rangeIndex = dateRanges.findIndex(
        (range) =>
          date.isSame(range.start, "day") ||
          date.isSame(range.end, "day") ||
          (range.start && range.end && date.isAfter(range.start) && date.isBefore(range.end))
      );
      if (rangeIndex !== -1) {
        setDateRanges((prevRanges) => prevRanges.filter((_, index) => index !== rangeIndex));
      } else {
        setDateRanges((prevRanges) => {
          const lastRange = prevRanges[prevRanges.length - 1];
          if (!lastRange || (lastRange.start && lastRange.end)) {
            return [...prevRanges, { start: date, end: null }];
          } else if (!lastRange.end) {
            if (date.isBefore(lastRange.start, "day")) {
              return [...prevRanges.slice(0, -1), { start: date, end: lastRange.start }];
            } else {
              return [...prevRanges.slice(0, -1), { start: lastRange.start, end: date }];
            }
          }
        });
      }
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                <Button onClick={() => setCurrentMonth(currentMonth.subtract(1, "month"))}>Prev</Button>
                <Box>{currentMonth.format("MMMM YYYY")}</Box>
                <Button onClick={() => setCurrentMonth(currentMonth.add(1, "month"))}>Next</Button>
            </Box>
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '10px' }}>
                {daysOfWeek.map((day) => (
                    <Box key={day}>{day}</Box>
                ))}
                {days.map((day, index) => (
                    <Box key={index} sx={dayStyle(day)} onClick={() => handleDayClick(day)}>
                        {day}
                    </Box>
                ))}
            </Box>
            <Box>
                Selected Date Ranges: 
                {dateRanges.map((range, index) => (
                    <div key={index}>
                        {range.start && range.start.format("YYYY-MM-DD")} - {range.end && range.end.format("YYYY-MM-DD")}
                    </div>
                ))}
            </Box>
        </Box>
    );
}

export default Calendar;