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
                        <Box sx={{
                            display: {md: "flex", xs: "block"},
                            alignItems: "center",
                            textAlign: {xs: "center", md: "left"}
                        }}>
                            < Box sx={{
                                display: "flex",
                                flexDirection: "column",
                                maxWidth: 730,
                                mr: {xs: 0, md: 16}}}>
                                <Typography mb={2} variant="subheading" sx={{
                                    fontFamily: montserrat.style.fontFamily,
                                    display: {xs: "none", md: "block"},
                                }}>
                                    Celebrate Every Milestone
                                </Typography>
                                <Typography mb={3} sx={{fontFamily: montserrat.style.fontFamily}} variant="h2">
                                    Birthdays matter. Of course they matter!
                                </Typography>
                                <Typography sx={{fontFamily: manrope.style.fontFamily}} mb={6.7} variant="body1"
                                            color="text.secondary">
                                    Birthdays parties, presents, cakes, pictures, cards, friends invite lists,
                                    plans,
                                    surprises, upsets —they all matter. To the child and the parents it is a very
                                    important personal event.
                                </Typography>
                                <Box mb={6.7} component="img" src="/school1.png" sx={{
                                    width: {md: 543, xs: 347},
                                    height: {md: 430, xs: 305},
                                    mx: {xs: "auto", md: 0},
                                    display: {xs: "block", md: "none"}

                                }}/>
                                <Box mb={2}
                                     sx={{
                                         width: 262,
                                         height: 64,
                                         py: 2,
                                         px: 4,
                                         gap: 16,
                                         borderRadius: 4,
                                         border: "2px solid #FF8919",
                                         mx: {md: 0, xs: "auto"}
                                     }}
                                >
                                    <Typography sx={{fontFamily: manrope.style.fontFamily}} variant="subheading">Unlock
                                        birthday
                                        calendar</Typography>
                                </Box>
                                <CustomTab sx={{
                                    display: {
                                        xs: "block",
                                        md: "none"
                                    },
                                    mx: {md: 0, xs: "auto"},
                                    fontFamily: manrope.style.fontFamily
                                }} label="Sweat the small stuff" value="sweatthesmallstuff"/>
                            </Box>
                            <Box component="img" src="/school1.png" sx={{
                                width: {md: 543, xs: 347},
                                height: {md: 430, xs: 305},
                                display: {xs: "none", md: "inline-block"},
                            }}/>
                        </Box>
                    </TabPanel>
                    <TabPanel value="whoseWho">
                        <Box sx={{
                            display: {md: "flex", xs: "block"},
                            alignItems: "center",
                            textAlign: {xs: "center", md: "left"}
                        }}>
                            < Box sx={{
                                display: "flex",
                                flexDirection: "column",
                                maxWidth: 730,
                                mr: {xs: 0, md: 16}
                            }}>
                                <Typography mb={2} variant="subheading" sx={{
                                    fontFamily: montserrat.style.fontFamily,
                                    display: {xs: "none", md: "block"},
                                }}>
                                    Build meaningful connections
                                </Typography>
                                <Typography mb={4} sx={{fontFamily: montserrat.style.fontFamily}} variant="h2">
                                    Whose that again?
                                </Typography>
                                <Typography sx={{fontFamily: manrope.style.fontFamily}} mb={6} variant="body1"
                                            color="text.secondary">
                                    Avoid the awkward conversations about whose who when you meet at the gates or the
                                    next gathering. Your one place to get all your links, names and classmates in order!
                                </Typography>
                                <Box mb={6} component="img" src="/school2.png" sx={{
                                    width: {md: 544, xs: 369},
                                    height: {md: 391, xs: 240},
                                    mx: {xs: "auto", md: 0},
                                    display: {xs: "inline-block", md: "none"}

                                }}/>
                                <Box mb={2}
                                     sx={{
                                         width: 262,
                                         height: 64,
                                         py: 2,
                                         px: 4,
                                         gap: 16,
                                         borderRadius: 4,
                                         border: "2px solid #FF8919",
                                         mx: {md: 0, xs: "auto"}
                                     }}
                                >
                                    <Typography sx={{fontFamily: manrope.style.fontFamily}} variant="subheading">Remembering
                                        made easy</Typography>
                                </Box>
                                <CustomTab sx={{
                                    display: {
                                        xs: "block",
                                        md: "none"
                                    },
                                    mx: {md: 0, xs: "auto"},
                                    fontFamily: manrope.style.fontFamily,
                                }} label="It’s all in the name" value="itsallinthename"/>
                            </Box>
                            <Box component="img" src="/school2.png" sx={{
                                width: {md: 544, xs: 369},
                                height: {md: 391, xs: 187},
                                display: {xs: "none", md: "inline-block"},
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
