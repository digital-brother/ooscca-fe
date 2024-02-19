"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";
import {
  Chip,
  Stack,
} from "@mui/material";
import { useQuery } from "react-query";
import {
  getActivity,
  getActivityDiscounts,
} from "../api.mjs";
import "dayjs/locale/en-gb";
import { useParams } from "next/navigation";
import Container from "@mui/material/Container";
import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import { SmFlex } from "../components/responsiveFlexes";
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

function ActivityDetails({ sx }) {
  const { activityId } = useParams();
  const { data: activity } = useQuery(["activity", activityId], () => getActivity(activityId));
  const { data: discounts } = useQuery(["activityDiscounts", activityId], () => getActivityDiscounts(activityId));
  const earlyDiscount = discounts?.find((discount) => discount.type === "early");
  const endingDiscount = discounts?.find((discount) => discount.type === "ending");

  const formatDateString = (dateString) => dateString && dayjs(dateString).format("DD MMMM");

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        mt: 3,
        position: "relative",
        alignItems: { xs: "center", sm: "stretch" },
        ...sx,
      }}
    >
      <Stack
        spacing={1}
        sx={{ position: { xs: "static", sm: "absolute" }, right: 0, width: { xs: "50%", sm: "max-content" } }}
      >
        <Chip label="Early birds" sx={{ bgcolor: "magenta.main", color: "common.white" }} />
        <Chip label="Ending soon" sx={{ bgcolor: "blue.main", color: "common.white" }} />
      </Stack>

      <SmFlex>
        <b>Provider:</b> {activity?.providerName}
      </SmFlex>
      <SmFlex>
        <b>Activity:</b> {activity?.typeName}
      </SmFlex>
      {activity?.address && (
        <SmFlex>
          <b>Venue:</b> {activity?.address}
        </SmFlex>
      )}
      <SmFlex>
        <Typography>
          <b>When:</b>
        </Typography>
        <Box>
          {activity?.dateRanges.map((dateRange, index) => (
            <Typography key={index}>
              {formatDateString(dateRange.start)} - {formatDateString(dateRange.start)}
            </Typography>
          ))}
        </Box>
        <Typography sx={{ ml: { sm: "auto" } }}>
          {activity?.startTime} - {activity?.endTime}
        </Typography>
      </SmFlex>
      {activity?.earlyDropOff && (
        <SmFlex>
          <b>Early drop off:</b> {activity?.earlyDropOffTime}
          {parseFloat(activity?.earlyDropOffPrice) ? (
            <Typography sx={{ ml: { sm: "auto" } }}>£{activity?.earlyDropOffPrice}</Typography>
          ) : (
            <Typography sx={{ ml: { sm: "auto" }, color: "green.main", fontWeight: 700 }}>FREE</Typography>
          )}
        </SmFlex>
      )}
      {activity?.latePickUp && (
        <SmFlex>
          <b>Late pick up:</b> {activity?.latePickUpTime}
          {parseFloat(activity?.latePickUpPrice) ? (
            <Typography sx={{ ml: { sm: "auto" } }}>£{activity?.latePickUpPrice}</Typography>
          ) : (
            <Typography sx={{ ml: { sm: "auto" }, color: "green.main", fontWeight: 700 }}>FREE</Typography>
          )}
        </SmFlex>
      )}
      {activity?.level && (
        <SmFlex>
          <b>Level:</b> {activity?.level}
        </SmFlex>
      )}
      <SmFlex>
        <b>Age:</b> {activity?.ageFrom} {activity?.ageTo && ` - ${activity?.ageTo}`}
      </SmFlex>
      <SmFlex>
        <b>Available spaces:</b> {activity?.capacity}
      </SmFlex>
      {(earlyDiscount?.enabled || endingDiscount?.enabled) && (
        <SmFlex>
          <b>Discounts applied:</b>{" "}
          <Box sx={{ ml: { sm: "auto" }, textAlign: { xs: "center", sm: "right" } }}>
            {earlyDiscount?.enabled && (
              <Typography>
                Early birds ({earlyDiscount?.percent}%){" "}
                {earlyDiscount?.unit === "spaces"
                  ? `${earlyDiscount?.amount} spaces`
                  : `applied to first ${earlyDiscount?.amount} days`}
              </Typography>
            )}
            {endingDiscount?.enabled && (
              <Typography>
                Ending soon ({endingDiscount?.percent}%){" "}
                {endingDiscount?.unit === "spaces"
                  ? `${endingDiscount?.amount} spaces`
                  : `applied to last ${endingDiscount?.amount} days`}
              </Typography>
            )}
          </Box>
        </SmFlex>
      )}
      <SmFlex>
          <b>Late pick up:</b> {activity?.latePickUpTime}
          <Typography sx={{ml: "auto"}} variant="h5">
            Total £{activity?.price}
          </Typography>
      </SmFlex>

    </Box>
  );
}


function DescriptionTextField() {
  const activityId = useParams().activityId;
  const { data: activity } = useQuery(["activity", activityId], () => getActivity(activityId));

  const [description, setDescription] = useState('');
  const [prerequisites, setPrerequisites] = useState('');

  // useEffect to update the state when the activity data is fetched
  useEffect(() => {
    if (activity) {
      setDescription(activity.description || '');
      setPrerequisites(activity.preRequisites || '');
    }
  }, [activity]);

  return (
    <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: {xs: "center", lg: "start"},
        textAlign: {xs: "center", lg: "start"},
      }}>
      <Typography variant="h5" gutterBottom>
        Description:
      </Typography>
      <Typography variant="body2">
        {description}
      </Typography>
      <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
        Pre-requisites to join this class:
      </Typography>
      <Typography variant="body2">
        {prerequisites}
      </Typography>
    </Box>
  );
}

export default function ActivitiesSection() {
  const activityId = useParams().activityId;
  const { data: activity } = useQuery(["activity", activityId], () => getActivity(activityId));

  return (
    <Container sx={{ my: 10 }}>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", lg: "repeat(2, 1fr)" },
          gap: 3,
          maxWidth: { xs: 540, lg: "none" },
          mx: "auto",
        }}
      >
        <DescriptionTextField />
        <Box
          sx={{
            mx: "auto",
            width: "100%",
            maxWidth: 540,
            minHeight: 600,
            border: "1px solid",
            borderColor: "grey.main",
            borderRadius: 4,
            px: 4,
            pt: 2.4,
            pb: 2,

            display: "flex",
          }}
        >
          {/* Makes child slide take full height. Child CSS 'height: 100%' does not work (unless parent height is specified). */}
          <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
             <ActivityDetails sx={ "sx" } />
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
