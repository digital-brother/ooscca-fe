"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Carousel, { EmblaApiContext } from "@/app/activities/components/Carousel";
import React, { useContext } from "react"; // added useEffect
import { Button, Checkbox, FormControlLabel, IconButton, InputAdornment, TextField } from "@mui/material";
import Grid from "@mui/material/Grid";
import { Select } from "@/app/components/Select";
import { useMutation, useQuery } from "react-query";
import { getActivity, getActivityTypes, patchActivity, TEST_ACTIVITY_ID } from "@/app/activities/api.mjs";
import { Form, Formik, useFormikContext } from "formik";
import MultiDateRangeCalendar from "@/app/activities/components/MultiDateRangeCalendar";
import { TimeField } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/en-gb";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

function ActivitySecondFormSlide() {
  const { scrollNext, scrollPrev } = useContext(EmblaApiContext);

  return (
    <ActivitiesSlideContainer>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
        <TimeField label="Time" />
      </LocalizationProvider>
      <TextField
        sx={{ mt: 3 }}
        label="Price"
        InputProps={{
          startAdornment: <InputAdornment position="start">£</InputAdornment>,
        }}
        type="number"
      />

      <Box>
        <FormControlLabel control={<Checkbox defaultChecked />} label="Early drop off" />
      </Box>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
        <TimeField label="Early drop off time" />
      </LocalizationProvider>
      <TextField
        sx={{ mt: 3 }}
        label="Early drop off price"
        InputProps={{
          startAdornment: <InputAdornment position="start">£</InputAdornment>,
        }}
        type="number"
      />
      <Box>
        <FormControlLabel control={<Checkbox defaultChecked />} label="Late pick up" />
      </Box>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
        <TimeField label="Late pick up time" />
      </LocalizationProvider>
      <TextField
        sx={{ mt: 3 }}
        label="Late pick up price"
        InputProps={{
          startAdornment: <InputAdornment position="start">£</InputAdornment>,
        }}
        type="number"
      />

      <TextField sx={{ mt: 3 }} label="Agr from" type="number" />
      <TextField sx={{ mt: 3 }} label="Agr to" type="number" />
      <Box sx={{ mt: 1 }}>
        <IconButton>
          <DeleteForeverIcon />
        </IconButton>
      </Box>
      <Box>
        <FormControlLabel control={<Checkbox defaultChecked />} label="Single age" />
      </Box>

      <TextField sx={{ mt: 3 }} label="Level" />
      <TextField sx={{ mt: 3 }} label="# of available place" type="number" />
      <Box sx={{ mt: 3 }}>
        <Button variant="outlined" onClick={scrollPrev} sx={{ mr: 2 }}>
          Go back
        </Button>
        <Button variant="contained" type="submit" color="success">
          Confirm
        </Button>
      </Box>
    </ActivitiesSlideContainer>
  );
}

function ActivitiesSlideContainer({ children, sx }) {
  return (
    <Box
      sx={{
        // width: 541,
        width: "100%",
        // TODO: Back to height once element completed
        minHeight: 597,
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
      onSuccess: () => scrollNext(),
    });
  }

  return (
    <ActivitiesSlideContainer>
      <Formik initialValues={{ type: activity?.type || "", dates: [] }} enableReinitialize onSubmit={handleConfirm}>
        <Form>
          <Select label="Pick activity from list" items={activityTypes || []} sx={{ mt: 4 }} name="type" />
          <MultiDateRangeCalendar containerSx={{ mt: 3 }} name="dates" />
          <NonFieldErrors />
          <Box sx={{ mt: 3 }}>
            <Button variant="outlined" onClick={scrollPrev} sx={{ mr: 2 }}>
              Go back
            </Button>
            <Button variant="contained" type="submit" color="success">
              Confirm
            </Button>
          </Box>
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
            <ActivitySecondFormSlide />
          </Carousel>
        </Grid>
      </Grid>
    </Box>
  );
}
