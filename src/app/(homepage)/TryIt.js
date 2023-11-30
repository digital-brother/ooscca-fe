'use client'

import React from 'react'
import Box from '@mui/material/Box';
import {Container, styled} from "@mui/material";
import Typography from "@mui/material/Typography";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Tab from "@mui/material/Tab";
import {useTheme} from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";


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

const CustomTab = styled(Tab)(({theme}) => ({
  textTransform: 'none',
  '&.Mui-selected': {
    color: "#FFFFFF",
    backgroundColor: "#BD54C2",
  },
  [theme.breakpoints.down('sm')]: {
    borderRight: null,
    borderBottom: '1px solid #CED4DA',
  },
  [theme.breakpoints.up('sm')]: {
    borderRight: '1px solid #CED4DA',
    borderBottom: null,
  },
  '&:last-child': {
    borderRight: 'none',
    borderBottom: 'none'
  },
  fontWeight: "bold",
  fontSize: 16,
  // py: 1.5,
  // height: 60,
}))

function Tabs(props) {
  const [value, setValue] = React.useState('oosCalendar');
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box {...props}>
      <TabContext value={value}>
        <Box>
          <TabList
            onChange={handleChange}
            aria-label="lab API tabs example"
            variant="fullWidth"
            TabIndicatorProps={{sx: {display: 'none'}}}
            sx={{border: '1px #CED4DA solid', borderRadius: 2}}
            orientation={isSmallScreen ? 'vertical' : 'horizontal'}
          >
            <CustomTab label="OOS calendar" value="oosCalendar"/>
            <CustomTab label="Class birthday calendar" value="classBirthdayCalendar"/>
            <CustomTab label="Whose who" value="whoseWho"/>
          </TabList>
        </Box>
        <TabPanel value="oosCalendar">OOS calendar</TabPanel>
        <TabPanel value="classBirthdayCalendar">Class birthday calendar</TabPanel>
        <TabPanel value="whoseWho">Whose who</TabPanel>
      </TabContext>
    </Box>
  );
}

export default function TryIt() {
  return (
    <Container sx={{py: {xs: 6, md: 10}}}>
      <TryItText sx={{maxWidth: 730, textAlign: "center", mx: "auto"}}/>
      <Tabs sx={{mt: 5}}/>
    </Container>
  )
}