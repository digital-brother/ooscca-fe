"use client";

import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { Select } from "@/app/components/Select";
import Carousel from "@/app/activities/components/Carousel";

const ACTIVITIES_TYPES = [
  { id: 1, name: "Football" },
  { id: 2, name: "Basketball" },
  { id: 2, name: "Swimming" },
];

const ActivitiesBox = styled(Box)({
  border: "1px solid #6C757D",
  borderRadius: 16,
  width: 541,
  height: 597,
});

function ActivitiesFirst() {
  return (
    <ActivitiesBox
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      <Box sx={{ maxWidth: 341 }}>
        <Typography variant="h5">
          Create your first activity and let’s get going
        </Typography>
        <Select
          label="Pick activity from list"
          items={ACTIVITIES_TYPES}
          sx={{ mt: 4 }}
        />
      </Box>
    </ActivitiesBox>
  );
}

export default function Activities() {
  return (
    <Box sx={{ m: 10 }}>
      <Carousel>
        <ActivitiesFirst />
      </Carousel>
    </Box>
  );
}
