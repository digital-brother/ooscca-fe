"use client";

import React from "react";
import Box from "@mui/material/Box";
import { Calendar } from "react-multi-date-picker";
import { useField, useFormikContext } from "formik";

export default function MultiDateRangeCalendar({ containerSx, name }) {
  const [field, meta] = useField({ name });
  const { setFieldValue } = useFormikContext();

  const mapDays = ({ date }) => {
    if (date.weekDay.index === 0 || date.weekDay.index === 6)
      return {
        disabled: true,
        style: { color: "#ccc", backgroundColor: "#eaeaea" },
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
      />
    </Box>
  );
}
