"use client";

import React from "react";
import Box from "@mui/material/Box";
import { Button, Container, styled } from "@mui/material";
import Typography from "@mui/material/Typography";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Tab from "@mui/material/Tab";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import SchoolStats from "@/app/(homepage)/SchoolStats";
import Image from "next/image";

const TABS_CONTENT = {
  classBirthdayCalendar: {
    image: "/school1.png",
    header: "Birthdays matter. Of course they matter!",
    subheader: "Celebrate Every Milestone",
    button: "Unlock birthday calendar",
    description:
      "Birthdays parties, presents, cakes, pictures, cards, friends invite lists, plans, surprises, upsets —they all matter. To the child and the parents it is a very important personal event.",
  },
  whoseWho: {
    image: "/school2.png",
    header: "Whose that again?",
    subheader: "Build meaningful connections",
    button: "Remembering made easy",
    description:
      "Avoid the awkward conversations about whose who when you meet at the gates or the next gathering. Your one place to get all your links, names and classmates in order!",
  },
};

const CustomTab = styled(Tab)(({ theme }) => ({
  textTransform: "none",
  "&.Mui-selected": {
    color: "black",
    backgroundColor: theme.palette.grey[300],
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

function ContentPanel({ type }) {
  const data = TABS_CONTENT[type];

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        alignItems: { xs: "center", md: "stretch" },
        textAlign: { xs: "center", md: "left" },
        rowGap: 6,
        columnGap: 3,
        maxWidth: { xs: 500, md: "none" },
        mx: "auto",
      }}
    >
      <Box sx={{ flex: 1 }}>
        <Typography mb={2} variant="subheading">
          {data.subheader}
        </Typography>
        <Typography mb={3} variant="h3">
          {data.header}
        </Typography>
        <Typography mb={3} variant="body1" color="text.secondary">
          {data.description}
        </Typography>
        <Button variant="outlined" color="orange" size="large">
          {data.button}
        </Button>
      </Box>
      <Box sx={{ flex: 1, textAlign: "right"}}>
        <Image
          src={data.image}
          alt="School"
          width="0"
          height="0"
          sizes="100vw"
          style={{ width: "100%", height: "auto", maxWidth: 500 }}
        />
      </Box>
    </Box>
  );
}

function CustomTabList({children, handleChange}) {
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
  const [selectedTab, setSelectedTab] = React.useState("oosCalendar");

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <Box {...props}>
      <TabContext value={selectedTab}>
        <Box>
          <CustomTabList handleChange={handleChange}>
            <CustomTab label="OOS calendar" value="oosCalendar" />
            <CustomTab label="Class birthday calendar" value="classBirthdayCalendar" />
            <CustomTab label="Whose who" value="whoseWho" />
          </CustomTabList>
        </Box>
        <Box sx={{ p: 0, pt: 5 }}>
          <TabPanel sx={{ p: 0 }} value="oosCalendar">
            <SchoolStats />
          </TabPanel>
          <TabPanel sx={{ p: 0 }} value="classBirthdayCalendar">
            <ContentPanel type={selectedTab} />
          </TabPanel>
          <TabPanel sx={{ p: 0 }} value="whoseWho">
            <ContentPanel type={selectedTab} />
          </TabPanel>
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
