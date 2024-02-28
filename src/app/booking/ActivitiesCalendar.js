"use client";

import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { Button, IconButton, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import Image from "next/image";

import { useState } from "react";
import { useQuery } from "react-query";
import { getActivitiesForDate } from "../activities/[activityId]/edit/api.mjs";

dayjs.extend(utc);

function PickerDate({ date, setSelectedDate, isSelectedDate }) {
  return (
    <Box sx={{ pb: 2, borderBottom: "3px solid", borderColor: isSelectedDate ? "grey.900" : "transparent" }}>
      <Box
        onClick={() => setSelectedDate(date)}
        sx={{
          textAlign: "center",
          display: "block",
          bgcolor: isSelectedDate ? "grey.100" : "transparent",
          "&:hover": {
            bgcolor: "grey.200",
          },
          "&:active": {
            bgcolor: "grey.300",
          },
          cursor: "pointer",
          borderRadius: 2,
          py: 1.5,
          width: 45,
        }}
      >
        <Typography variant="h5">{date.format("DD")}</Typography>
        <Typography sx={{ fontWeight: 700 }}>{date.format("ddd")}</Typography>
      </Box>
    </Box>
  );
}

function DateSwitcher() {
  const [selectedDate, setSelectedDate] = useState(dayjs.utc());
  const dayOfWeek = selectedDate.day();

  let monday;
  if (dayOfWeek === 0 || dayOfWeek === 6) {
    monday = selectedDate.startOf("week").add(1, "day").add(1, "week");
  } else {
    monday = selectedDate.startOf("week").add(1, "day");
  }
  const weekDates = Array.from({ length: 5 }, (_, i) => monday.add(i, "day"));

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottom: "1px solid",
        borderColor: "grey.500",
      }}
    >
      <IconButton onClick={() => setSelectedDate(selectedDate.subtract(1, "week"))}>
        <ArrowBackIosNewIcon />
      </IconButton>
      {weekDates.map((date, index) => {
        const isSelectedDate = date.isSame(selectedDate, "day");
        return <PickerDate key={index} {...{ date, setSelectedDate, isSelectedDate }} />;
      })}
      <IconButton onClick={() => setSelectedDate(selectedDate.add(1, "week"))}>
        <ArrowForwardIosIcon />
      </IconButton>
    </Box>
  );
}

function ActivityCard({ activity }) {
  return (
    <Box sx={{ maxWidth: 353, border: "1px solid", borderColor: "grey.500", borderRadius: 2, overflow: "hidden" }}>
      <Box sx={{ height: 200, position: "relative" }}>
        <Image alt="Activity image" src={activity?.imageUrl} fill objectFit="cover" />
      </Box>
      <Box sx={{ p: 2 }}>
        <Typography variant="subtitle1">{activity?.provider}</Typography>
        <Typography variant="body2">{activity?.address}</Typography>
        <Typography variant="subtitle1" sx={{ mt: 2 }}>
          {activity?.type}
        </Typography>
        <Typography variant="body2" sx={{ mb: 3 }}>
          {activity?.ageTo ? `(ages ${activity?.ageFrom}-${activity?.ageTo})` : `(age ${activity?.ageFrom})`}
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          <AccessTimeIcon fontSize="15" />
          <Typography variant="body2">
            {activity.startTime} - {activity.endTime}
          </Typography>
        </Box>
        {activity?.earlyDropOff && (
          <Typography variant="body2">
            <b>
              {parseFloat(activity?.earlyDropOffPrice) ? (
                `£${activity?.earlyDropOffPrice}`
              ) : (
                <Box component="span" sx={{ color: "green.main" }}>
                  FREE
                </Box>
              )}
            </b>
            &nbsp; Early drop off {activity?.earlyDropOffTime}
          </Typography>
        )}
        {activity?.latePickUp && (
          <Typography variant="body2">
            <b>
              {parseFloat(activity?.latePickUpPrice) ? (
                `£${activity?.latePickUpPrice}`
              ) : (
                <Box component="span" sx={{ color: "green.main" }}>
                  FREE
                </Box>
              )}
            </b>
            &nbsp; Late pick up {activity?.latePickUpTime}
          </Typography>
        )}
        <Box sx={{ display: "flex", mt: 3, gap: 2 }}>
          <Button variant="outlined" sx={{ flex: 1 }}>
            Learn more
          </Button>
          <Button variant="contained" sx={{ flex: 1 }}>
            Add
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

function ActivitiesList({ sx }) {
  const date = dayjs("2024-2-28");
  const { status, data: activities } = useQuery(["activitiesForDate", date], () => getActivitiesForDate(date));

  if (status === "success")
    return (
      <Box sx={{ ...sx }}>
        {activities.map((activity) => (
          <ActivityCard key={activity.id} activity={activity} />
        ))}
      </Box>
    );
}

export default function ActivitiesCalendar() {
  return (
    <Container sx={{ my: 10 }}>
      <DateSwitcher />
      <ActivitiesList sx={{ mt: 4 }} />
    </Container>
  );
}
