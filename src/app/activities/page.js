"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Carousel, { EmblaApiContext } from "@/app/activities/components/Carousel";
import React, { useContext } from "react"; // added useEffect
import { Button } from "@mui/material";
import Grid from "@mui/material/Grid";
import { Select } from "@/app/components/Select";
import { useMutation, useQuery } from "react-query";
import { getActivity, getActivityTypes, patchActivity, TEST_ACTIVITY_ID } from "@/app/activities/api.mjs";
import { ErrorMessage, Form, Formik, useFormikContext } from "formik";

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

function NonFieldErrors() {
  const { errors } = useFormikContext();

  if (!errors.nonFieldErrors) return null;
  return (
    <Box>
      {errors.nonFieldErrors.map((error, index) => (
        <Typography key={index}>{error}</Typography>
      ))}
    </Box>
  );
}

function ActivityFirstFormSlide() {
  // TODO: Add error handling
  const { data: activityTypes } = useQuery("activityTypes", getActivityTypes);
  const { data: activity } = useQuery(["activity", TEST_ACTIVITY_ID], () => getActivity(TEST_ACTIVITY_ID));
  const mutation = useMutation((data) => patchActivity(TEST_ACTIVITY_ID, data));
  const { scrollNext, scrollPrev } = useContext(EmblaApiContext);

  function handleConfirm(data, { setErrors }) {
    const lata = { type: 100 };
    mutation.mutate(data, {
      onError: (error) => setErrors(error.response.data),
    });
    // scrollNext();
  }

  return (
    <ActivitiesSlideContainer>
      <Formik initialValues={{ type: activity?.type || "" }} enableReinitialize onSubmit={handleConfirm}>
        <Form>
          <Select label="Pick activity from list" items={activityTypes || []} sx={{ mt: 4 }} name="type" />
          <Button onClick={scrollPrev}>Go back</Button>
          <Button type="submit">Confirm</Button>
          <ErrorMessage name="nonFieldErrors" />
          <NonFieldErrors />
        </Form>
      </Formik>
    </ActivitiesSlideContainer>
  );
}

function ActivityStartCreationSlide() {
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
            <ActivityStartCreationSlide />
            <ActivityFirstFormSlide />
          </Carousel>
        </Grid>
      </Grid>
    </Box>
  );
}
