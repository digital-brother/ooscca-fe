"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Carousel, { EmblaApiContext } from "@/app/activities/components/Carousel";
import React, { useContext } from "react"; // added useEffect
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { FormikSelect } from "@/app/components/FormikSelect";
import { useMutation, useQuery } from "react-query";
import { getActivity, getActivityTypes, patchActivity, TEST_ACTIVITY_ID } from "@/app/activities/api.mjs";
import { Field, Form, Formik, useFormikContext } from "formik";
import MultiDateRangeCalendar from "@/app/activities/components/MultiDateRangeCalendar";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/en-gb";
import { FormikCheckboxField, FormikNumericField, FormikTimeField } from "./components/formikFields";

function ActivitySecondFormSlide() {
  const { scrollNext, scrollPrev } = useContext(EmblaApiContext);
  const [age, setAge] = React.useState("range");
  const { data: activity } = useQuery(["activity", TEST_ACTIVITY_ID], () => getActivity(TEST_ACTIVITY_ID));
  const mutation = useMutation((data) => patchActivity(TEST_ACTIVITY_ID, data));

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  function handleSubmit(values, { setErrors }) {
    mutation.mutate(values, {
      onError: (error) => setErrors(error.response.data),
      // onSuccess: () => scrollNext(),
    });
  }

  return (
    activity && (
      <ActivitiesSlideContainer>
        <Formik
          initialValues={{
            startTime: activity.startTime,
            endTime: activity.endTime,
            price: activity.price,
            earlyDropOff: activity.earlyDropOff,
            earlyDropOffTime: activity.earlyDropOffTime,
            earlyDropOffPrice: activity.earlyDropOffPrice,
            latePickUp: activity.latePickUp,
            latePickUpTime: activity.latePickUpTime,
            latePickUpPrice: activity.latePickUpPrice,
            ageFrom: activity.ageFrom,
            ageTo: activity.ageTo,
            level: activity.level,
            capacity: activity.capacity,
          }}
          onSubmit={handleSubmit}
        >
          <Form>
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
              <Box>
                <FormikTimeField name="startTime" label="Start time" sx={{ width: 180, mr: 2 }} />
                <FormikTimeField name="endTime" label="End time" sx={{ width: 180 }} />
              </Box>
              <FormikNumericField
                name="price"
                sx={{ mt: 3 }}
                label="Price"
                InputProps={{
                  startAdornment: <InputAdornment position="start">£</InputAdornment>,
                }}
              />

              <Box sx={{ mt: 3 }}>
                <FormControlLabel
                  control={<FormikCheckboxField name="earlyDropOff" />}
                  label="Early drop off"
                />
                <FormikTimeField name="earlyDropOffTime" label="Early drop off time" sx={{ width: 130, mr: 2 }} />
                <FormikNumericField
                  name="earlyDropOffPrice"
                  sx={{ width: 134 }}
                  label="Early drop off price"
                  InputProps={{
                    startAdornment: <InputAdornment position="start">£</InputAdornment>,
                  }}
                />
              </Box>

              <Box sx={{ mt: 3 }}>
                <FormControlLabel
                  control={<FormikCheckboxField name="latePickUp" />}
                  label="Late pick up"
                />
                <FormikCheckboxField name="latePickUpTime" label="Late pick up time" sx={{ width: 130, mr: 2 }} />
                <FormikNumericField
                  name="latePickUpPrice"
                  sx={{ width: 134 }}
                  label="Late pick up price"
                  InputProps={{
                    startAdornment: <InputAdornment position="start">£</InputAdornment>,
                  }}
                />
              </Box>

              <Box sx={{ mt: 3 }}>
                <FormControl sx={{ mr: 2 }}>
                  <InputLabel id="demo-simple-select-label">Age</InputLabel>
                  <Select value={age} onChange={handleChange} labelId="demo-simple-select-label" label="Age">
                    <MenuItem value="single">Single</MenuItem>
                    <MenuItem value="range">Range</MenuItem>
                  </Select>
                </FormControl>
                <FormikNumericField name="ageFrom" sx={{ width: 67, mr: 2 }} label="2" />
                {age === "range" && (
                  <FormikNumericField name="ageTo" sx={{ width: 67, mr: 2 }} label="4" />
                )}
              </Box>

              <Field as={TextField} name="level" sx={{ mt: 3 }} label="Level" />
              <FormikNumericField name="capacity" sx={{ mt: 3 }} label="# of available place" />
              <Box sx={{ mt: 3 }}>
                <Button variant="outlined" onClick={scrollPrev} sx={{ mr: 2 }}>
                  Go back
                </Button>
                <Button variant="contained" type="submit" color="success">
                  Confirm
                </Button>
              </Box>
            </LocalizationProvider>
          </Form>
        </Formik>
      </ActivitiesSlideContainer>
    )
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

  function handleSubmit(data, { setErrors }) {
    mutation.mutate(data, {
      onError: (error) => setErrors(error.response.data),
      onSuccess: () => scrollNext(),
    });
  }

  return (
    <ActivitiesSlideContainer>
      <Formik initialValues={{ type: activity?.type || "", dates: [] }} enableReinitialize onSubmit={handleSubmit}>
        <Form>
          <FormikSelect label="Pick activity from list" items={activityTypes || []} sx={{ mt: 4 }} name="type" />
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
