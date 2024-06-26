"use-client";

import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { IconButton } from "@mui/material";
import { getDisplayedWeekModayDate } from "./ActivitiesCalendar";
import dayjs from "dayjs";

export default function PreviosWeekButton({ selectedDate, setSelectedDate }) {
  const currentMonday = getDisplayedWeekModayDate(dayjs())
  const previousWeekButtonDisabled = getDisplayedWeekModayDate(selectedDate).isSame(currentMonday)
  const handlePreviosWeek = () => setSelectedDate(selectedDate.subtract(7, "day"));

  return (
    <>
      <IconButton 
        onClick={handlePreviosWeek} 
        disabled={previousWeekButtonDisabled}
      >
        <ArrowBackIosNewIcon />
      </IconButton>
    </>
  );
};
