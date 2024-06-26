"use client";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import React from "react";
import SquareRoundedIcon from "@mui/icons-material/SquareRounded";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { DateCalendarSet } from "@/app/(homepage)/components/DateCalendarSet";
import dayjs from "dayjs";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const SCHOOLS = [
  { id: 1, name: "Lyceum" },
  { id: 2, name: "Gymnasium" },
  { id: 3, name: "College" },
];

function SchoolStatsTable(props) {
  const indicators = [
    { description: "Bank holidays + weekend", leftValue: 73, rightValue: 73 },
    { description: "Out Of School (OOS)", leftValue: 92, rightValue: 92 },
    {
      description: "OOS + Bank Holidays + Weekends",
      leftValue: 62,
      rightValue: 78,
    },
    { description: "Days in School (DIS)", leftValue: 201, rightValue: 98 },
  ];

  return (
    <Box {...props}>
      {indicators.map((indicator, index) => (
        <Grid
          key={index}
          container
          sx={{
            textAlign: "center",
            borderTop: !index ? "1px solid #DBE2E7" : 0,
            borderBottom: "1px solid #DBE2E7",
            py: 2,
          }}
        >
          <Grid item xs={1} sm={3} md={4} sx={{ color: "#FFB41A" }}>
            {indicator.leftValue}
          </Grid>
          <Grid item xs={10} sm={6} md={4} sx={{ fontWeight: 700, px: 1 }}>
            {indicator.description}
          </Grid>
          <Grid item xs={1} sm={3} md={4} sx={{ color: "#23A6C9" }}>
            {indicator.rightValue}
          </Grid>
        </Grid>
      ))}
    </Box>
  );
}

function SchoolPicker() {
  const theme = useTheme();
  const mdUp = useMediaQuery(theme.breakpoints.up("md"));

  const SchoolSelect = ({ name, label }) => (
    <FormControl fullWidth>
      <InputLabel id={name}>{label}l</InputLabel>
      <Select labelId={name} label={label} defaultValue="">
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {SCHOOLS.map((school) => (
          <MenuItem key={school.id} value={school.id}>
            {school.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );

  return (
    <Grid container columnSpacing={4} rowSpacing={3}>
      <Grid item xs={12} sm={6} sx={{ order: { xs: 1, sm: 3 } }}>
        <SchoolSelect name="schoolOne" label="Select a school" />
      </Grid>
      <Grid item xs={12} sm={6} sx={{ order: { xs: 2, sm: 4 } }}>
        <SchoolSelect name="schoolTwo" label="Select another school" />
      </Grid>
      <Grid
        item
        xs={6}
        sx={{
          order: { xs: 3, sm: 1 },
          display: "flex",
          alignItems: "center",
          mt: { xs: 1, sm: 0 },
        }}
      >
        <SquareRoundedIcon sx={{ color: "#FFB41A" }} />
        <Typography ml={2}>1st school holidays</Typography>
      </Grid>
      <Grid
        item
        xs={6}
        sx={{
          order: { xs: 4, sm: 2 },
          mt: { xs: 1, sm: 0 },
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <SquareRoundedIcon sx={{ color: "#23A6C9" }} />
          <Typography ml={2}>2nd school holidays</Typography>
        </Box>

        {mdUp && (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <SchoolOutlinedIcon />
            <Typography sx={{ fontWeight: 700, ml: 1 }}>Add school</Typography>
          </Box>
        )}
      </Grid>
    </Grid>
  );
}

export default function SchoolStats() {
  const schoolHolidays = {
    firstSchoolHolidays: [dayjs("2023-12-10"), dayjs("2023-12-25"), dayjs("2024-01-10"), dayjs("2024-01-25")],
    secondSchoolHolidays: [dayjs("2023-12-10"), dayjs("2024-01-04"), dayjs("2024-01-05")],
  };

  return (
    <Box>
      <SchoolPicker />
      <SchoolStatsTable mt={5} />
      <DateCalendarSet schoolHolidays={schoolHolidays} mt={8} />
    </Box>
  );
}
