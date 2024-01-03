"use client";

// TODO: Add error handling
// TODO: Error handling
// TODO: Close button
// TODO: Carousel height and dots
// TODO: Style buttons
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
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { useMutation, useQuery } from "react-query";
import { Form, Formik, useFormikContext } from "formik";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
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
import {
  FormikCalendarField,
  FormikCheckboxField,
  FormikNumericField,
  FormikTextField,
  FormikTimeField,
} from "./components/formikFields";
import { useParams } from "next/navigation";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";
import Container from "@mui/material/Container";
import * as Yup from "yup";
import { useTheme } from "@mui/material/styles";

function ActivityThirdFormSlide() {
  const { activityId } = useParams();
  const { scrollNext, scrollPrev } = useContext(EmblaApiContext);
  const theme = useTheme();

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
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography variant="h6">Keep editing</Typography>
        <IconButton size="small">
          <HighlightOffRoundedIcon sx={{ color: "#000000", fontSize: 28 }} />
        </IconButton>
      </Box>
      <Typography sx={{ mt: 4, fontWeight: 700 }}>Discounts</Typography>

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
        <Form style={{ marginTop: theme.spacing(2), marginBottom: theme.spacing(1) }}>
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
        <Form style={{ marginTop: theme.spacing(2), marginBottom: theme.spacing(1) }}>
          <FormControlLabel control={<Checkbox />} label="Ending" sx={{ display: "block", mt: 2 }} />
          <FormikNumericField name="percent" label="0-100%" sx={{ maxWidth: 120, ml: 2 }} />
          <FormikNumericField name="quantity" label="0-40" sx={{ maxWidth: 80, ml: 2 }} />
          <FormikSelect name="unit" items={unitSelectItems} sx={{ maxWidth: 150, ml: 2 }} />
        </Form>
      </Formik>

      <Box sx={{ mt: 3, mb: 1, display: "flex", height: 56, columnGap: 2 }}>
        <Button
          variant="outlined"
          size="large"
          fullWidth
          onClick={scrollPrev}
          sx={{ height: "100%", fontWeight: 700, fontSize: 16 }}
        >
          Go back
        </Button>
        <Button
          onClick={handleMultipleSubmit}
          variant="contained"
          fullWidth
          type="submit"
          color="success"
          sx={{ height: "100%", fontWeight: 700, fontSize: 16 }}
        >
          Confirm
        </Button>
      </Box>

      <Typography variant="body2" sx={{ mt: 2.5, textAlign: "center" }}>
        Activity will be saved in your accounts page
      </Typography>
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

  async function handleSubmit(data, { setErrors }) {
    console.log(data);
    try {
      await mutation.mutateAsync(data);
      scrollNext();
    } catch (error) {
      console.log(error.response.data);
      setErrors(error.response.data);
    }
  }

  return (
    activity && (
      <ActivitiesSlideContainer>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant="h6">Keep editing</Typography>
          <IconButton size="small">
            <HighlightOffRoundedIcon sx={{ color: "#000000", fontSize: 28 }} />
          </IconButton>
        </Box>
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
          validationSchema={Yup.object({
            level: Yup.string().max(64).required(),
            capacity: Yup.number().required().min(0).max(999),
          })}
          onSubmit={handleSubmit}
        >
          <Form>
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
              <FormikTimeField name="startTime" label="Start time" fullWidth margin="normal" />
              <FormikTimeField name="endTime" label="End time" fullWidth margin="normal" />
              <FormikNumericField
                name="price"
                label="Price"
                InputProps={{
                  startAdornment: <InputAdornment position="start">£</InputAdornment>,
                }}
                fullWidth
                margin="normal"
              />
              <Box sx={{ mt: 2, mb: 1, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", columnGap: 2 }}>
                <FormikCheckboxField name="earlyDropOff" label="Early drop off" />
                <FormikTimeField name="earlyDropOffTime" label="Early drop off time" />
                <FormikNumericField
                  name="earlyDropOffPrice"
                  label="Early drop off price"
                  InputProps={{
                    startAdornment: <InputAdornment position="start">£</InputAdornment>,
                  }}
                />
              </Box>

              <Box sx={{ mt: 2, mb: 1, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", columnGap: 2 }}>
                <FormikCheckboxField name="latePickUp" label="Late pick up" />
                <FormikTimeField name="latePickUpTime" label="Late pick up time" />
                <FormikNumericField
                  name="latePickUpPrice"
                  label="Late pick up price"
                  InputProps={{
                    startAdornment: <InputAdornment position="start">£</InputAdornment>,
                  }}
                />
              </Box>

              <Box sx={{ mt: 2, mb: 1, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", columnGap: 2 }}>
                <FormControl>
                  <InputLabel id="demo-simple-select-label">Age</InputLabel>
                  <Select value={age} onChange={handleChange} labelId="demo-simple-select-label" label="Age">
                    <MenuItem value="single">Single</MenuItem>
                    <MenuItem value="range">Range</MenuItem>
                  </Select>
                </FormControl>
                <FormikNumericField name="ageFrom" label="From" />
                {age === "range" && <FormikNumericField name="ageTo" label="To" />}
              </Box>

              <FormikTextField name="level" label="Level" fullWidth margin="normal" />
              <FormikNumericField name="capacity" label="Capacity" fullWidth margin="normal" />

              <Box sx={{ mt: 2, mb: 1, display: "flex", height: 56 }}>
                <Button
                  variant="outlined"
                  size="large"
                  fullWidth
                  onClick={scrollPrev}
                  sx={{ mr: 2, height: "100%", fontWeight: 700, fontSize: 16 }}
                >
                  Go back
                </Button>
                <Button
                  variant="contained"
                  fullWidth
                  type="submit"
                  color="success"
                  sx={{ height: "100%", fontWeight: 700, fontSize: 16 }}
                >
                  Confirm
                </Button>
              </Box>
            </LocalizationProvider>
          </Form>
        </Formik>
        <Typography variant="body2" sx={{ mt: 2.5, textAlign: "center" }}>
          Activity will be saved in your accounts page
        </Typography>
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

  async function handleSubmit(data, { setErrors }) {
    console.log(data);
    try {
      await mutation.mutateAsync(data);
      scrollNext();
    } catch (error) {
      setErrors(error.response.data);
    }
  }

  return (
    <ActivitiesSlideContainer>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography variant="h6">Keep editing</Typography>
        <IconButton size="small">
          <HighlightOffRoundedIcon sx={{ color: "#000000", fontSize: 28 }} />
        </IconButton>
      </Box>
      <Formik
        initialValues={{ type: activity?.type || "", dateRanges: activity?.dateRanges || [] }}
        enableReinitialize
        onSubmit={handleSubmit}
      >
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
          <FormikCalendarField sx={{ mt: 5 }} name="dateRanges" />
          <NonFieldErrors />
          <Box sx={{ mt: 4, display: "flex", height: 56 }}>
            <Button
              variant="outlined"
              size="large"
              fullWidth
              onClick={scrollPrev}
              sx={{ mr: 2, height: "100%", fontWeight: 700, fontSize: 16 }}
            >
              Go back
            </Button>
            <Button
              variant="contained"
              fullWidth
              type="submit"
              color="success"
              sx={{ height: "100%", fontWeight: 700, fontSize: 16 }}
            >
              Confirm
            </Button>
          </Box>
        </Form>
      </Formik>
      <Typography variant="body2" sx={{ mt: 2.5, textAlign: "center" }}>
        Activity will be saved in your accounts page
      </Typography>
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
    <Container sx={{ my: 10 }}>
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
    </Container>
  );
}
