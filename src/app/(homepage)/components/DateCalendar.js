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
import { PickersDay } from "@mui/x-date-pickers";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import {LeftArrow} from "@/assets/LeftArrow";
import {RightArrow} from "@/assets/RightArrow";

function PickersDayHighlighted({ schoolHolidays, ...props }) {
  const { firstSchoolHolidays, secondSchoolHolidays } = schoolHolidays;

  const isFirstSchoolHoliday =
    !props.outsideCurrentMonth &&
    firstSchoolHolidays.some((date) => date.isSame(props.day, "day"));

  const isSecondSchoolHoliday =
    !props.outsideCurrentMonth &&
    secondSchoolHolidays.some((date) => date.isSame(props.day, "day"));

  let className = "";
  if (isFirstSchoolHoliday && isSecondSchoolHoliday) {
    className = "isBothSchoolsHoliday";
  } else if (isFirstSchoolHoliday) {
    className = "isFirstSchoolHoliday";
  } else if (isSecondSchoolHoliday) {
    className = "isSecondSchoolHoliday";
  }

  return <PickersDay className={className} {...props} />;
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
          ".MuiButtonBase-root.MuiPickersDay-root.Mui-disabled": {
            fontWeight: 600,
            fontSize: 15,
            color: "#666666",
            fontFamily: manrope.style.fontFamily,
          },
          ".MuiButtonBase-root.MuiPickersDay-root.Mui-disabled.Mui-selected": {
            bgcolor: "transparent",
            color: "#666666",
            opacity: 1,
          },

          ".MuiPickersDay-root": {
            borderRadius: 1.5,
          },
          ".MuiPickersDay-root.Mui-disabled.isFirstSchoolHoliday": {
            bgcolor: "#FFC50A",
            color: "#FFFFFF",
          },
          ".MuiPickersDay-root.Mui-disabled.isSecondSchoolHoliday": {
            bgcolor: "#00A8DE",
            color: "#FFFFFF",
          },
          ".MuiPickersDay-root.Mui-disabled.isBothSchoolsHoliday": {
            background:
              "linear-gradient(to bottom right, #FFC50A 50%, #00A8DE 50%)",
            color: "#FFFFFF",
          },
        }}
      />
    </LocalizationProvider>
  );
}

export function DateCalendarSet({ schoolHolidays, mt }) {
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

  const theme = useTheme();
  const lgUp = useMediaQuery(theme.breakpoints.up("lg"))
  const mdUp = useMediaQuery(theme.breakpoints.up("md"))

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        mt: mt,
      }}
    >
      <IconButton size="large" onClick={handlePrevious}>
        <LeftArrow />
      </IconButton>
      <DateCalendar displayDate={monthDate} schoolHolidays={schoolHolidays} />
      {mdUp && (
        <DateCalendar
          displayDate={nextMonthDate}
          schoolHolidays={schoolHolidays}
        />
      )}
      {lgUp && (
        <DateCalendar
          displayDate={twoMonthsFromTodayDate}
          schoolHolidays={schoolHolidays}
        />
      )}
      <IconButton size="large" onClick={handleNext}>
        <RightArrow />
      </IconButton>
    </Box>
  );
}
