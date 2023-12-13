import { DateCalendar as MUIDateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import * as React from "react";
import { manrope } from "@/components/ThemeRegistry/theme";
import "dayjs/locale/en-gb";

export default function DateCalendar({ displayDate }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
      <MUIDateCalendar
        views={["day"]}
        disableHighlightToday
        disabled
        value={displayDate}
        dayOfWeekFormatter={(_, date) => date.format("dd")}
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
