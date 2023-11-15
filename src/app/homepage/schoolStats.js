'use client'

import React from 'react'
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import {Tabs} from "@mui/material";

function OOSCalendar() {
  return (
    <Box textAlign="center">OOS Calendar</Box>
  )
}

export default function SchoolStats() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box mt={{xs: 5, md: 10}}>
      <Tabs
        value={value}
        onChange={handleChange}
        centered
        sx={{borderBottom: 1, borderColor: 'divider'}}
      >
        <Tab label="OOS calendar"/>
        <Tab label="Class birthday calendar"/>
        <Tab label="Whose who"/>
      </Tabs>
      <OOSCalendar/>
    </Box>
  );
}
