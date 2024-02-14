"use client"

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import * as React from "react";
import { useState } from "react";
import { manrope } from "@/components/ThemeRegistry/theme";
import "dayjs/locale/en-gb";
import dayjs from "dayjs";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { LeftArrow } from "@/assets/LeftArrow";
import { RightArrow } from "@/assets/RightArrow";
import {
  Typography,
  Container,
  IconButton,
  Divider,
} from "@mui/material";

function Title({ title, sx }) {
  return (
    <Typography sx={{
      fontFamily: manrope.style.fontFamily,
      fontSize: "1.5rem",
      fontWeight: 600,
      lineHeight: "2.4rem",
      textAlign: "center",
      ...sx,
    }}>
      {title}
    </Typography>
  )
};

function DaySwitcher({ currentDay, setCurrentDay }) {
  function handleNext() {
    const newDayDate = currentDay.add(1, "day");
    setCurrentDay(newDayDate);
  }

  function handlePrevious() {
    const newDayDate = currentDay.subtract(1, "day");
    setCurrentDay(newDayDate);
  }

  function Day({ day, selected, sx, ...props }) {
    return (
      <Box {...props} sx={{
        backgroundColor: selected ? "grey.100" : "inherit",
        width: { xs: 48, md: 55 },
        height: 77,
        borderRadius: 2,
        py: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        ...sx
      }}>
        <Typography sx={{
          fontFamily: manrope.style.fontFamily,
          fontSize: "1.5rem",
          fontWeight: 700,
          lineHeight: "120%",
          textAlign: "center",
          color: selected ? "black" : "grey.500",
        }}>
          {day.format("D")}
        </Typography>

        <Typography sx={{
          fontFamily: manrope.style.fontFamily,
          fontSize: "1rem",
          fontWeight: 700,
          lineHeight: "120%",
          textAlign: "center",
          color: selected ? "black" : "grey.500",
        }}>
          {day.format("ddd")}
        </Typography>
      </Box>
    )
  }

  return (
    <Box sx={{
      display: "flex",
      justifyContent: "space-between",
      width: "100%",
    }}>
      <IconButton onClick={handlePrevious} display="flex">
        <LeftArrow sx={{ fontSize: 40 }} />
      </IconButton>

      <Day day={currentDay.subtract(1, "day")} />
      <Day day={currentDay} selected />
      <Day day={currentDay.add(1, "day")} />
      <Day day={currentDay.add(2, "day")} />
      <Day day={currentDay.add(3, "day")} key={3} />

      <IconButton onClick={handleNext} display="flex">
        <RightArrow sx={{ fontSize: 40 }} />
      </IconButton>
    </Box>
  )
}

function HalfDayFilter() {}

function CardsSet() {}


export default function BookingCardsCalendar({ sx }) {
  const theme = useTheme();
  const lgUp = useMediaQuery(theme.breakpoints.up("lg"));
  const mdUp = useMediaQuery(theme.breakpoints.up("md"));

  const [currentDay, setCurrentDay] = useState(dayjs());
  const [halfDayFilter, setHalfDayFilter] = useState("fullDay");


  return (
    <Container sx={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      mt: 1,
    }}>
      <Title title={"September - October"} sx={{ mb: 3 }} />
      <DaySwitcher currentDay={currentDay} setCurrentDay={setCurrentDay} />
      <Divider mb={3} />
      <HalfDayFilter halfDayFilter={halfDayFilter} setHalfDayFilter={setHalfDayFilter} />
      <CardsSet currentDay={currentDay} halfDayFilter={halfDayFilter} />
    </Container>
  );
}
