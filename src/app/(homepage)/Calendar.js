import React, { useState, useRef } from 'react';
import { Paper, Typography, Box } from '@mui/material';
import dayjs from 'dayjs';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { DateRangeCalendar } from '@mui/x-date-pickers-pro/DateRangeCalendar';
import { LeftArrow, RightArrow } from '@/app/(homepage)/components/Arrows';

const Calendar = () => {
  // from backend
  const firstSchoolHolidays = [
    "2023-01-01",
    "2023-02-12",
    "2023-03-01",
    "2023-04-12",
    "2023-05-23",
  ];

  // from backend
  const secondSchoolHolidays = [
    "2023-01-03",
    "2023-02-11",
    "2023-03-01",
    "2023-04-15",
    "2023-05-23",
  ];

  const calendarsRefs = [useRef(null), useRef(null), useRef(null),]

  const CustomDataCalendar = (props) =>
    <DateCalendar {...props}
      ref={props?.calendarRef}
      value={dayjs(props?.date)}
      dayOfWeekFormatter={(_day, weekday) => `${weekday.format("dd")}`}
      views={['day']}
      disableHighlightToday
      // disabled
      sx={{
        width: "330px",
        minHeight: "400px",
        flexDirection: "column",
        alignItems: "center",

        '.MuiPickersCalendarHeader-root': {
          justifyContent: "center",
          m: 0,
          mb: "15px",

          color: "var(--light-primary, var(--bg-black-80, #333))",
          fontFamily: "Inter",
          fontSize: "14.752px",
          fontStyle: "normal",
          fontWeight: "700",
          lineHeight: "normal",

        },
        ".MuiPickersCalendarHeader-labelContainer": {
          justifyContent: "center",
          m: 0,
          color: "var(--light-primary, var(--bg-black-80, #333))",
          fontFamily: "Inter, inherit",
          fontSize: "14.752px",
          fontStyle: "normal",
          fontWeight: "700",
          lineHeight: "normal",
        },
        ".MuiDayCalendar-weekDayLabel ": {
          color: "var(--light-primary, var(--bg-black-80, #333))",
          textAlign: "center",
          fontFamily: "Inter, inherit",
          fontSize: "14.752px",
          fontStyle: "normal",
          fontWeight: "500",
          lineHeight: "normal",
          height: "45px",
          width: "45px",
        },
        ".MuiPickersArrowSwitcher-root ": { // buttons < > on header
          display: "none",
        },
        ".MuiPickersDay-root ": {
          opacity: "100%",
          color: '#1565c0',
          borderRadius: 2,
          borderWidth: 1,
          color: "#666",
          textAlign: "center",
          fontFamily: "Inter, inherit",
          fontSize: "14.752px",
          fontStyle: "normal",
          fontWeight: "500",
          lineHeight: "normal",
          height: "45px",
          width: "45px",
        },
        ".MuiPickersDay-root.Mui-selected": {
          opacity: "100%",
          borderRadius: "6px",
          backgroundColor: "#FFC50A",
          flexShrink: 0,

          color: "var(--primary-black, #0C0E0F)",
          textAlign: "center",
          fontFamily: "Inter, inherit",
          fontSize: "14.752px",
          fontStyle: "normal",
          fontWeight: "700",
          lineHeight: "normal",
          height: "45px",
          width: "45px",
        },
        ".MuiPickersDay-root.Mui-selected:hover": {
          backgroundColor: "00A8DE",
          opacity: "100%",
        },
        ".MuiPickersSlideTransition-root": {
          height: "300px",
          opacity: "100%",
        },

        ...props.sx,
      }}
    />

  const CalendarBlock = [
    <Box
      sx={{
        ml: -14,
        width: "120%",
        display: "flex",
        flexDirection: "row",
        // alignContent: "center",
        // justifyContent: "center",
        gap: "25px",
      }}>
      <Box sx={{ pt: 25 }} onClick={ PreviousButtonClick } ><LeftArrow /></Box>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <CustomDataCalendar calendarRef={calendarsRefs[0]} key={1} date={"2023-01-01"} sx={{
          display: { xs: "none", md: "flex" }
        }}/>
        <CustomDataCalendar key={2} calendarRef={calendarsRefs[1]} date="2023-02-01"/>
        <CustomDataCalendar key={3} calendarRef={calendarsRefs[2]} date="2023-03-01" sx={{
          display: { xs: "none", lg: "flex" }
        }}/>
      </LocalizationProvider>
      <Box sx={{ pt: 25 }} onClick={ NextButtonClick } ><RightArrow /></Box>
    </Box>
  ];


  function NextButtonClick(event) {
    calendarsRefs.map((calendarRef) => {
      calendarRef.current.getElementsByClassName("MuiIconButton-edgeStart")[0].click()
    });
  }

  function PreviousButtonClick(event) {
    calendarsRefs.map((calendarRef) => {
      calendarRef.current.getElementsByClassName("MuiIconButton-edgeEnd")[0].click()
    });
  }

  return CalendarBlock
};

export default Calendar;
