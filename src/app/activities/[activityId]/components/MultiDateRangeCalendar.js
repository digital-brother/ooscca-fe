"use client";

import React from "react";
import Box from "@mui/material/Box";
import { Calendar } from "react-multi-date-picker";
import { useField, useFormikContext } from "formik";
import { IconButton } from "@mui/material";
import KeyboardArrowLeftRoundedIcon from "@mui/icons-material/KeyboardArrowLeftRounded";
import KeyboardArrowRightRoundedIcon from "@mui/icons-material/KeyboardArrowRightRounded";
import "@/app/activities/[activityId]/react-multi-date-picker.css";

function CalendarButton({ direction, handleClick, disabled }) {
  const iconProps = { sx: { color: "#333", fontSize: 30 } };
  return (
    <IconButton onClick={handleClick} size="small" sx={{ p: 0 }}>
      {direction === "left" ? (
        <KeyboardArrowLeftRoundedIcon {...iconProps} />
      ) : (
        <KeyboardArrowRightRoundedIcon {...iconProps} />
      )}
    </IconButton>
  );
}

export default function MultiDateRangeCalendar({ containerSx, name, ...props }) {
  const [field] = useField({ name });
  const { setFieldValue } = useFormikContext();

  const mapDays = ({ date }) => {
    if (date.weekDay.index === 0 || date.weekDay.index === 6)
      return {
        disabled: true,
      };
  };

  return (
    <Box sx={containerSx}>
      <Calendar
        {...field}
        onChange={(newValue) => setFieldValue(name, newValue)} // overwrites formik function to work with react-multi-date-picker
        multiple
        range
        weekStartDayIndex={1}
        mapDays={mapDays}
        highlightToday={false}
        className="ooscca"
        renderButton={<CalendarButton />}
        {...props}
      />
    </Box>
  );
}
