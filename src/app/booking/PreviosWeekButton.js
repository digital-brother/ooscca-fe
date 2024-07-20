"use-client";

import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { IconButton, Box } from "@mui/material";
import { getDisplayedWeekModayDate } from "./ActivitiesCalendar";
import dayjs from "dayjs";

export default function PreviosWeekButton({ selectedDate, setSelectedDate }) {
  const currentMonday = getDisplayedWeekModayDate(dayjs.utc())
  const previousWeekButtonEnabled = getDisplayedWeekModayDate(selectedDate).isSame(currentMonday)
  const handlePreviosWeek = () => setSelectedDate(selectedDate.subtract(7, "day"));

  return (
    <Box>
      {!previousWeekButtonEnabled &&
        <IconButton onClick={handlePreviosWeek}>
          <ArrowBackIosNewIcon />
        </IconButton>
      }
    </Box>
  );
};
