"use client";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import React from "react";
import { FormControl, MenuItem, Select } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import SquareRoundedIcon from "@mui/icons-material/SquareRounded";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const SCHOOLS = [
  { id: 1, name: "Lyceum" },
  { id: 2, name: "Gymnasium" },
  { id: 3, name: "College" },
];

function SchoolSelect({ label, schools }) {
  const [school, setSchool] = React.useState("");

  const handleChange = (event) => {
    setSchool(event.target.value);
  };

  return (
    <FormControl sx={{ minWidth: 120 }} fullWidth>
      <Select
        value={school}
        onChange={handleChange}
        displayEmpty
        variant="filled"
        disableUnderline
        inputProps={{ sx: { py: 2 } }}
        IconComponent={KeyboardArrowDownIcon}
        sx={{
          borderRadius: 1,
          // bgcolor: "#E9ECEF",
          color: school ? "#0C0E0F" : "#6C757D",
          fontWeight: 700,
          textAlign: "center",
          "& .MuiSelect-icon": {
            color: school ? "#0C0E0F" : "#6C757D", // Change icon color conditionally
          },
        }}
      >
        <MenuItem value="">{label}</MenuItem>
        {schools.map((school, index) => (
          <MenuItem key={index} value={school.id}>
            {school.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default function SchoolStats() {
  const theme = useTheme();
  const mdUp = useMediaQuery(theme.breakpoints.up("md"))

  return (
    <Box>
      <Grid container columnSpacing={4} rowSpacing={3}>
        <Grid item xs={12} sm={6} sx={{ order: { xs: 1, sm: 3 } }}>
          <SchoolSelect label="Select a school" schools={SCHOOLS} />
        </Grid>
        <Grid item xs={12} sm={6} sx={{ order: { xs: 2, sm: 4 } }}>
          <SchoolSelect label="Select another school" schools={SCHOOLS} />
        </Grid>
        <Grid
          item
          xs={6}
          sx={{
            order: { xs: 3, sm: 1 },
            display: "flex",
            alignItems: "center",
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
              <Typography sx={{ fontWeight: 700, ml: 1 }}>
                Add school
              </Typography>
            </Box>
          )}
        </Grid>
      </Grid>
    </Box>
  );
}
