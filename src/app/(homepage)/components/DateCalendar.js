import { DateCalendar as MUIDateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import * as React from "react";
import { useState } from "react";
import { manrope } from "@/components/ThemeRegistry/theme";
import "dayjs/locale/en-gb";
import dayjs from "dayjs";
import Box from "@mui/material/Box";
import { IconButton } from "@mui/material";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { PickersDay } from "@mui/x-date-pickers";

function PickersDayHighlighted({ schoolHolidays, ...props }) {
  const { firstSchoolHolidays, secondSchoolHolidays } = schoolHolidays;

  const isFirstSchoolHoliday =
    !props.outsideCurrentMonth &&
    firstSchoolHolidays.some((date) => date.isSame(props.day, "day"));

    const isSecondSchoolHoliday =
    !props.outsideCurrentMonth &&
    secondSchoolHolidays.some((date) => date.isSame(props.day, "day"));

    if (isFirstSchoolHoliday || isSecondSchoolHoliday) {
      return (
        <Box sx={{border: 1}}>
          <PickersDay {...props} />
        </Box>
      )
    }

  return <PickersDay {...props} />;
}

export default function DateCalendar({ displayDate, schoolHolidays }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
      <MUIDateCalendar
        views={["day"]}
        disableHighlightToday
        disabled
        value={displayDate}
        dayOfWeekFormatter={(_, date) => date.format("dd")}
        slots={{
          day: PickersDayHighlighted,
        }}
        slotProps={{
          day: {
            schoolHolidays,
          },
        }}
        sx={{
          ".MuiPickersArrowSwitcher-root": {
            display: "none",
          },
          ".MuiPickersCalendarHeader-labelContainer": {
            mx: "auto",
            fontWeight: 800,
            fontSize: 15,
            color: "#333333",
            fontFamily: manrope.style.fontFamily,
          },
          ".MuiDayCalendar-weekDayLabel": {
            fontWeight: 800,
            fontSize: 15,
            color: "#333333",
            fontFamily: manrope.style.fontFamily,
          },
          ".MuiPickersDay-root.Mui-disabled": {
            fontWeight: 600,
            fontSize: 15,
            color: "#666666",
            fontFamily: manrope.style.fontFamily,
          },
          ".MuiPickersDay-root.Mui-selected": {
            bgcolor: "transparent",
          },
        }}
      />
    </LocalizationProvider>
  );
}

export function DateCalendarSet({ schoolHolidays }) {
  const [monthDate, setMonthDate] = useState(dayjs());
  const nextMonthDate = monthDate.add(1, "month");
  const twoMonthsFromTodayDate = monthDate.add(2, "month");

  function handleNext() {
    const newMonthDate = monthDate.add(1, "month");
    setMonthDate(newMonthDate);
  }

  function handlePrevious() {
    const newMonthDate = monthDate.subtract(1, "month");
    setMonthDate(newMonthDate);
  }

  return (
    <Box sx={{ m: 10, display: "flex", alignItems: "center" }}>
      <IconButton onClick={handlePrevious}>
        <KeyboardArrowLeftIcon />
      </IconButton>
      <DateCalendar displayDate={monthDate} schoolHolidays={schoolHolidays} />
      <DateCalendar
        displayDate={nextMonthDate}
        schoolHolidays={schoolHolidays}
      />
      <DateCalendar
        displayDate={twoMonthsFromTodayDate}
        schoolHolidays={schoolHolidays}
      />
      <IconButton onClick={handleNext}>
        <KeyboardArrowRightIcon />
      </IconButton>
    </Box>
  );
}
