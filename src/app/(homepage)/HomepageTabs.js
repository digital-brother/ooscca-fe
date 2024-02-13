"use client";

import React from "react";
import Box from "@mui/material/Box";
import { Container, styled } from "@mui/material";
import Typography from "@mui/material/Typography";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Tab from "@mui/material/Tab";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import SchoolStats from "@/app/(homepage)/SchoolStats";

function HomepageTabsHeader({ sx }) {
  return (
    <Box {...sx}>
      <Typography variant="subheading">Effortless tracking of every important detail</Typography>
      <Typography mt={2} variant="h2">
        Your central hub for key school details
      </Typography>
      <Typography mt={2} variant="body1" color="text.secondary">
        You shouldn’t have your work cut out finding and syncing holidays, birthdays and contacts. Once you&apos;re on
        board, you&apos;ll have access to crucial information like school holiday schedules, classmates&apos; birthdays,
        and parents&apos; contact details at your fingertips.
      </Typography>
    </Box>
  );
}

const CustomTab = styled(Tab)(({ theme }) => ({
  textTransform: "none",
  "&.Mui-selected": {
    color: "#FFFFFF",
    backgroundColor: "#BD54C2",
  },
  [theme.breakpoints.down("sm")]: {
    borderRight: null,
    borderBottom: "1px solid #CED4DA",
  },
  [theme.breakpoints.up("sm")]: {
    borderRight: "1px solid #CED4DA",
    borderBottom: null,
  },
  "&:last-child": {
    borderRight: "none",
    borderBottom: "none",
  },
  fontWeight: "bold",
  fontSize: 16,
}));

function CustomTabList({ children, handleChange }) {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <TabList
      onChange={handleChange}
      aria-label="lab API tabs example"
      variant="fullWidth"
      TabIndicatorProps={{ sx: { display: "none" } }}
      sx={{ border: "1px #CED4DA solid", borderRadius: 2 }}
      orientation={isSmallScreen ? "vertical" : "horizontal"}
    >
      {children}
    </TabList>
  );
}

function Tabs(props) {
  const [value, setValue] = React.useState("oosCalendar");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box {...props}>
      <TabContext value={value}>
        <Box>
          <CustomTabList handleChange={handleChange}>
            <CustomTab label="OOS calendar" value="oosCalendar" />
            <CustomTab label="Class birthday calendar" value="classBirthdayCalendar" />
            <CustomTab label="Whose who" value="whoseWho" />
          </CustomTabList>
        </Box>
        <Box sx={{ pt: { xs: 4, md: 10 } }}>
          <TabPanel sx={{ p: 0 }} value="oosCalendar">
            <SchoolStats />
          </TabPanel>
          <TabPanel value="classBirthdayCalendar">Class birthday calendar</TabPanel>
          <TabPanel value="whoseWho">Whose who</TabPanel>
        </Box>
      </TabContext>
    </Box>
  );
}

export default function HomepageTabs() {
  return (
    <Container sx={{ py: { xs: 6, md: 10 } }}>
      <HomepageTabsHeader sx={{ maxWidth: 730, textAlign: "center", mx: "auto" }} />
      <Tabs sx={{ mt: 5 }} />
    </Container>
  );
}
