import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import * as React from "react";

export default function BasicDateCalendar() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar
        views={["day"]}
        sx={{
          ".MuiPickersArrowSwitcher-root": {
            display: "none",
          },
          ".MuiPickersCalendarHeader-labelContainer": {
            mx: "auto",
          },
        }}
      />
    </LocalizationProvider>
  );
}
