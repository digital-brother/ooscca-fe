'use client'

import React from 'react'
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import {Container, Tabs} from "@mui/material";
import Typography from "@mui/material/Typography";

function OOSCalendar() {
  return (
    <Box textAlign="center">OOS Calendar</Box>
  )
}

function SchoolStats() {
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

function TryItText({benefit, sx}) {
  return (
    <Box {...sx}>
      <Typography variant="body1" color="warning.main" fontWeight="bold">
        Try it for yourself
      </Typography>
      <Typography mt={2} variant="h4" fontWeight="bold">
        OOSCCA helps your remember all the important details.
      </Typography>
      <Typography mt={2} variant="body1" color="text.secondary">
        You shouldn’t have your work cut out finding and matching dates and timings, birthdates or the parents’ name
      </Typography>
    </Box>
  )
}

function ComingSoon() {
  return (
    <Box sx={{mt: {xs: 6, md: 12}, border: 1, borderRadius: 1, borderColor: "#CED4DA"}}>
      <Typography color="text.secondary" sx={{textAlign: "center", py: {xs: 6, md: 10}}}>
        Coming soon
      </Typography>
    </Box>
  )
}

export default function TryIt() {
  return (
    <Container sx={{py: {xs: 6, md: 10}}}>
      <TryItText sx={{maxWidth: 730, textAlign: "center", mx: "auto"}}/>
      <ComingSoon/>
    </Container>
  )
}
