"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import React, { useContext, useRef } from "react"; // added useEffect
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { useMutation, useQuery } from "react-query";
import { Field, Form, Formik, useFormikContext } from "formik";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import MultiDateRangeCalendar from "@/app/activities/[activityId]/components/MultiDateRangeCalendar";
import {
  getActivity,
  getActivityTypes,
  patchActivity,
  createDiscount,
  patchDiscount,
  getActivityDiscounts,
} from "@/app/activities/[activityId]/api.mjs";
import { FormikSelect } from "@/app/components/FormikSelect";
import Carousel, { EmblaApiContext } from "@/app/activities/[activityId]/components/Carousel";
import "dayjs/locale/en-gb";
import { FormikCheckboxField, FormikNumericField, FormikTimeField } from "./components/formikFields";
import { useParams } from "next/navigation";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";

function ActivityThirdFormSlide() {
  const { activityId } = useParams();
  const { scrollNext, scrollPrev } = useContext(EmblaApiContext);

  const { data: discounts } = useQuery(["activityDiscounts", activityId], () => getActivityDiscounts(activityId));
  const earlyDiscount = discounts?.find((discount) => discount.type === "early");
  const endingDiscount = discounts?.find((discount) => discount.type === "ending");

  const earlyDiscountFormRef = useRef();
  const endingDiscountFormRef = useRef();
  const patchMutation = useMutation((discount) => patchDiscount(activityId, discount.id, discount));
  const createMutation = useMutation((discount) => createDiscount(activityId, discount));

  const unitSelectItems = [
    { id: "days", name: "Days" },
    { id: "seats", name: "Seats" },
  ];

  async function handleSubmit(values, { setSubmitting, setErrors }) {
    const mutation = values.id ? patchMutation : createMutation;
    try {
      const response = await mutation.mutateAsync(values);
      console.log(response);
    } catch (error) {
      console.log(error.response.data);
      setErrors(error.response.data);
      throw error;
    }
  }

  async function handleMultipleSubmit() {
    try {
      await earlyDiscountFormRef.current.submitForm();
      await endingDiscountFormRef.current.submitForm();
      scrollNext();
    } catch (error) {}
  }

  return (
    <ActivitiesSlideContainer>
      <Typography>Discounts</Typography>

      <Formik
        initialValues={{
          id: earlyDiscount?.id,
          activity: earlyDiscount?.activity || activityId,
          type: earlyDiscount?.type || "early",
          percent: earlyDiscount?.percent,
          quantity: earlyDiscount?.quantity,
          unit: earlyDiscount?.unit || "days",
        }}
        enableReinitialize
        onSubmit={handleSubmit}
        innerRef={earlyDiscountFormRef}
      >
        <Form>
          <FormControlLabel control={<Checkbox />} label="Early birds" sx={{ display: "block", mt: 2 }} />
          <FormikNumericField name="percent" label="0-100%" sx={{ maxWidth: 120, ml: 2 }} />
          <FormikNumericField name="quantity" label="0-40" sx={{ maxWidth: 80, ml: 2 }} />
          <FormikSelect name="unit" items={unitSelectItems} sx={{ maxWidth: 150, ml: 2 }} />
        </Form>
      </Formik>

      <Formik
        initialValues={{
          id: endingDiscount?.id,
          activity: endingDiscount?.activity || activityId,
          type: endingDiscount?.type || "ending",
          percent: endingDiscount?.percent,
          quantity: endingDiscount?.quantity,
          unit: endingDiscount?.unit || "days",
        }}
        enableReinitialize
        onSubmit={handleSubmit}
        innerRef={endingDiscountFormRef}
      >
        <Form>
          <FormControlLabel control={<Checkbox />} label="Ending" sx={{ display: "block", mt: 2 }} />
          <FormikNumericField name="percent" label="0-100%" sx={{ maxWidth: 120, ml: 2 }} />
          <FormikNumericField name="quantity" label="0-40" sx={{ maxWidth: 80, ml: 2 }} />
          <FormikSelect name="unit" items={unitSelectItems} sx={{ maxWidth: 150, ml: 2 }} />
        </Form>
      </Formik>

      <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
        <Button variant="outlined" sx={{ mr: 2 }} onClick={scrollPrev}>
          Go back
        </Button>
        <Button onClick={handleMultipleSubmit} variant="contained" color="success">
          Confirm
        </Button>
      </Box>
    </ActivitiesSlideContainer>
  );
}

function ActivitySecondFormSlide() {
  const { activityId } = useParams();
  const { scrollNext, scrollPrev } = useContext(EmblaApiContext);
  const [age, setAge] = React.useState("range");
  const { data: activity } = useQuery(["activity", activityId], () => getActivity(activityId));
  const mutation = useMutation((data) => patchActivity(activityId, data));

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  function handleSubmit(values, { setErrors }) {
    mutation.mutate(values, {
      onError: (error) => setErrors(error.response.data),
      onSuccess: () => scrollNext(),
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
                <FormControlLabel control={<FormikCheckboxField name="earlyDropOff" />} label="Early drop off" />
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
                <FormControlLabel control={<FormikCheckboxField name="latePickUp" />} label="Late pick up" />
                <FormikTimeField name="latePickUpTime" label="Late pick up time" sx={{ width: 130, mr: 2 }} />
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
                {age === "range" && <FormikNumericField name="ageTo" sx={{ width: 67, mr: 2 }} label="4" />}
              </Box>

              <Field as={TextField} name="level" sx={{ mt: 3, display: "block" }} label="Level" />
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
        px: 4,
        py: 2.5,
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
  const { activityId } = useParams();
  // TODO: Add error handling
  const { data: activityTypes } = useQuery("activityTypes", getActivityTypes);
  const { data: activity } = useQuery(["activity", activityId], () => getActivity(activityId));
  const mutation = useMutation((data) => patchActivity(activityId, data));
  const { scrollNext, scrollPrev } = useContext(EmblaApiContext);

  function handleSubmit(data, { setErrors }) {
    mutation.mutate(data, {
      onError: (error) => setErrors(error.response.data),
      onSuccess: () => scrollNext(),
    });
  }

  return (
    <ActivitiesSlideContainer>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography variant="h6">Keep editing</Typography>
        <IconButton>
          <HighlightOffRoundedIcon sx={{ color: "#000000" }} />
        </IconButton>
      </Box>
      <Formik initialValues={{ type: activity?.type || "", dates: [] }} enableReinitialize onSubmit={handleSubmit}>
        <Form>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 3, mt: 2 }}>
            <Typography sx={{ fontWeight: 700 }}>Activity</Typography>
            <FormikSelect
              label="Pick activity from list"
              items={activityTypes || []}
              name="type"
              size="small"
              sx={{ width: "62%" }}
            />
          </Box>
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
            <ActivityThirdFormSlide />
          </Carousel>
        </Grid>
      </Grid>
    </Box>
  );
}
