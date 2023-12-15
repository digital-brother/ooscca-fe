"use client";

import React from "react";
import Box from "@mui/material/Box";
import {Button, Container, styled} from "@mui/material";
import Typography from "@mui/material/Typography";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Tab from "@mui/material/Tab";
import {useTheme} from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import SchoolStats from "@/app/(homepage)/SchoolStats";
import {manrope, montserrat} from "@/components/ThemeRegistry/theme";

function HomepageTabsHeader({sx}) {
    return (
        <Box {...sx}>
            <Typography variant="subheading">
                Effortless tracking of every important detail
            </Typography>
            <Typography mt={2} variant="h2">
                Your central hub for key school details
            </Typography>
            <Typography mt={2} variant="body1" color="text.secondary">
                You shouldn’t have your work cut out finding and syncing holidays,
                birthdays and contacts. Once you're on board, you'll have access to
                crucial information like school holiday schedules, classmates'
                birthdays, and parents' contact details at your fingertips.
            </Typography>
        </Box>
    );
}

const CustomTab = styled(Tab)(({theme}) => ({
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

function Tabs(props) {
    const [value, setValue] = React.useState("oosCalendar");
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

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
                        TabIndicatorProps={{sx: {display: "none"}}}
                        sx={{border: "1px #CED4DA solid", borderRadius: 2}}
                        orientation={isSmallScreen ? "vertical" : "horizontal"}
                    >
                        <CustomTab label="OOS calendar" value="oosCalendar"/>
                        <CustomTab
                            label="Class birthday calendar"
                            value="classBirthdayCalendar"
                        />
                        <CustomTab label="Whose who" value="whoseWho"/>
                    </TabList>
                </Box>
                <Box sx={{pt: {xs: 4, md: 10}}}>
                    <TabPanel sx={{p: 0}} value="oosCalendar">
                        <SchoolStats/>
                    </TabPanel>
                    <TabPanel value="classBirthdayCalendar">
                        <Box sx={{display: "flex", alignItems: "center"}}>
                            <Box sx={{display: "flex", flexDirection: "column", width: 440, mr: 16}}>
                                <Typography variant="birthdayCalendarHeading">
                                    Celebrate Every Milestone
                                </Typography>
                                <Typography mt={2} variant="birthdayCalendarTitle">
                                    Birthdays matter. Of course they matter!
                                </Typography>
                                <Typography mt={3} mb={4} variant="birthdayCalendarBody">
                                    Birthdays parties, presents, cakes, pictures, cards, friends invite lists,
                                    plans,
                                    surprises, upsets —they all matter. To the child and the parents it is a very
                                    important personal event.
                                </Typography>
                                <Box
                                    sx={{
                                        display: "flex",
                                        width: 258,
                                        height: 64,
                                        py: 2,
                                        px: 4,
                                        justifyContent: "center",
                                        alignItems: "center",
                                        gap: 16,
                                        borderRadius: 4,
                                        border: "2px solid #FF8919",
                                    }}
                                >
                                    <Typography variant="birthdayCalendarButtonText">Unlock birthday
                                        calendar</Typography>
                                </Box>
                            </Box>
                            <Box component="img" src="/school1.png" sx={{
                                width: 543,
                                height: 430,
                            }}/>
                        </Box>
                    </TabPanel>
                    <TabPanel value="whoseWho">
                        <Box sx={{display: "flex", alignItems: "center"}}>
                            <Box sx={{display: "flex", flexDirection: "column", width: 440, mr: 15}}>
                                <Typography variant="birthdayCalendarHeading">
                                    Build meaningful connections
                                </Typography>
                                <Typography mt={2} variant="birthdayCalendarTitle">
                                    Whose that again?
                                </Typography>
                                <Typography mt={3} mb={4} variant="birthdayCalendarBody">
                                    Avoid the awkward conversations about whose who, when you meet at the gates or the
                                    next gathering. Your one place to get all your links, names and kid’s classmates in
                                    order!
                                </Typography>
                                <Box
                                    sx={{
                                        display: "flex",
                                        width: 259,
                                        height: 64,
                                        py: 2,
                                        px: 4,
                                        justifyContent: "center",
                                        alignItems: "center",
                                        gap: 16,
                                        borderRadius: 4,
                                        border: "2px solid #FF8919",
                                    }}
                                >
                                    <Typography variant="birthdayCalendarButtonText">Remembering made easy</Typography>
                                </Box>
                            </Box>
                            <Box component="img" src="/school2.png" sx={{
                                width: 544,
                                height: 391,
                            }}/>
                        </Box>
                    </TabPanel>
                </Box>
            </TabContext>
        </Box>
    )
        ;
}

export default function HomepageTabs() {
    return (
        <Container sx={{py: {xs: 6, md: 10}}}>
            <HomepageTabsHeader sx={{maxWidth: 730, textAlign: "center", mx: "auto"}}/>
            <Tabs sx={{mt: 5}}/>
        </Container>
    );
}
