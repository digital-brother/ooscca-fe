"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Select } from "@/app/components/Select";
import Carousel, {
  EmblaApiContext,
} from "@/app/activities/components/Carousel";
import { useContext } from "react";
import { TextField } from "@mui/material";

const ACTIVITIES_TYPES = [
  { id: 1, name: "Football" },
  { id: 2, name: "Basketball" },
  { id: 2, name: "Swimming" },
];

function ActivitiesSlideContainer({ children, sx }) {
  return (
    <Box
      sx={{
        border: "1px solid #6C757D",
        borderRadius: 4,
        width: 541,
        height: 597,
        padding: 4,
        ...sx,
      }}
    >
      { children }
    </Box>
  );
}

function ActivitiesSecondSlide() {
  return (
    <ActivitiesSlideContainer>
      <Box>
        <Typography>Provider</Typography>
        <TextField />
      </Box>
    </ActivitiesSlideContainer>
  );
}

function ActivitiesFirstSlide() {
  const { scrollNext } = useContext(EmblaApiContext);

  return (
    <ActivitiesSlideContainer
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
          onSelect={scrollNext}
        />
      </Box>
    </ActivitiesSlideContainer>
  );
}

export default function Activities() {
  return (
    <Box sx={{ m: 10 }}>
      <Carousel>
        <ActivitiesFirstSlide />
        <ActivitiesSecondSlide />
      </Carousel>
    </Box>
  );
}
