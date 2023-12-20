"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Carousel, { EmblaApiContext } from "@/app/activities/components/Carousel";
import { useContext } from "react";
import { Button, TextField } from "@mui/material";
import Grid from "@mui/material/Grid";
import { Select } from "@/app/components/Select";
import { useQuery } from "react-query";
import { getActivityTypes } from "@/app/activities/api.mjs";

function ActivitiesSlideContainer({ children, sx }) {
  return (
    <Box
      sx={{
        // width: 541,
        width: "100%",
        height: 597,
        padding: 4,
        ...sx,
      }}
    >
      {children}
    </Box>
  );
}

function ActivitiesSecondSlide() {
  // TODO: Add error handling
  const query = useQuery("activityTypes", getActivityTypes);

  return (
    <ActivitiesSlideContainer>
      <Box>
        <Select label="Pick activity from list" items={query.data || []} sx={{ mt: 4 }} />

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
        <Typography variant="h5">Create your first activity and let’s get going</Typography>
        <Button variant="contained" color="warning" size="large" onClick={scrollNext} sx={{ mt: 3 }}>
          Start here
        </Button>
      </Box>
    </ActivitiesSlideContainer>
  );
}

export default function Activities() {
  return (
    <Box sx={{ m: 10 }}>
      <Grid container>
        <Grid item xs={6}>
          Description
        </Grid>
        <Grid item xs={6}>
          <Carousel viewportSx={{ border: "1px solid #6C757D", borderRadius: 4 }}>
            <ActivitiesFirstSlide />
            <ActivitiesSecondSlide />
          </Carousel>
        </Grid>
      </Grid>
    </Box>
  );
}
