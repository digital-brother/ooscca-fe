"use client";

import React, { useState } from "react";
import Box from "@mui/material/Box";
import { Calendar } from "react-multi-date-picker";

export default function MultiDateRangeCalendar({ containerSx }) {
  const [values, setValues] = useState();

  return (
    <Box sx={containerSx}>
      <Calendar value={values} onChange={setValues} multiple range />
    </Box>
  );
}
