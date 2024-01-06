"use client";

// TODO: Add error handling
// TODO: Error handling
// TODO: Close button
// TODO: Carousel height and dots
// TODO: Style buttons
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import React, { useContext, useRef } from "react"; // added useEffect
import { Button, FormControl, IconButton, InputAdornment, InputLabel, MenuItem, Select } from "@mui/material";
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
  FormikNumberField,
  FormikDecimalField,
  FormikTextField,
  FormikTimeField,
} from "./components/formikFields";
import { useParams } from "next/navigation";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";
import Container from "@mui/material/Container";
import * as Yup from "yup";
import { useTheme } from "@mui/material/styles";
import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import { timeschema , numericSchema , isTimeStringBefore , isTimeStringAfter } from "./utils";
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

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

function ActivityReviewSlide() {
  const { activityId } = useParams();
  const { scrollNext, scrollPrev } = useContext(EmblaApiContext);
  const { data: activity } = useQuery(["activity", activityId], () => getActivity(activityId));

  const { data: discounts } = useQuery(["activityDiscounts", activityId], () => getActivityDiscounts(activityId));
  const earlyDiscount = discounts?.find((discount) => discount.type === "early");
  const endingDiscount = discounts?.find((discount) => discount.type === "ending");

  const formatDateString = (dateString) => dateString && dayjs(dateString).format("DD MMMM");

  return (
    <ActivitiesSlideContainer>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography variant="h6">Review activity details</Typography>
        <IconButton size="small">
          <HighlightOffRoundedIcon sx={{ color: "#000000", fontSize: 28 }} />
        </IconButton>
      </Box>
      <Typography>Provider: {activity?.provider}</Typography>
      <Typography>Activity: {activity?.type}</Typography>
      <Typography>Venue: {activity?.venue}</Typography>

      <Typography>
        When: &nbsp;
        {activity?.dateRanges
          .map((dateRange) => `${formatDateString(dateRange.start)} - ${formatDateString(dateRange.start)}`)
          .join(", ")}
      </Typography>
      <Typography>
        {activity?.startTime} - {activity?.endTime}
      </Typography>

      <Typography>Early drop off: {activity?.earlyDropOffTime}</Typography>
      <Typography>{activity?.earlyDropOffPrice}£</Typography>
      <Typography>Late pick up: {activity?.latePickUpTime}</Typography>
      <Typography>{activity?.latePickUpPrice}£</Typography>
      <Typography>Level: {activity?.level}</Typography>
      <Typography>
        Age: {activity?.ageFrom} - {activity?.ageTo}
      </Typography>
      <Typography>Capacity: {activity?.capacity}</Typography>
      <Typography>Discounts applied: </Typography>
      <Typography>
        Early birds ({earlyDiscount?.percent}%){" "}
        {earlyDiscount?.unit === "seats"
          ? `${earlyDiscount?.quantity} seats`
          : `${formatDateString(earlyDiscount?.startDate)} - ${formatDateString(earlyDiscount?.endDate)}`}
      </Typography>

      <Typography>
        Ending ({endingDiscount?.percent}%){" "}
        {endingDiscount?.unit === "seats"
          ? `${endingDiscount?.quantity} seats`
          : `${formatDateString(endingDiscount?.startDate)} - ${formatDateString(endingDiscount?.endDate)}`}
      </Typography>
      <Typography>Terms and conditions</Typography>
      <Typography>Total £{activity?.price}</Typography>

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
          onClick={scrollNext}
          variant="contained"
          fullWidth
          color="success"
          sx={{ height: "100%", fontWeight: 700, fontSize: 16 }}
        >
          Confirm
        </Button>
      </Box>
    </ActivitiesSlideContainer>
  );
}

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
          <FormikCheckboxField name="earlyBirds" label="Early Birds" />
          <Box sx={{ mt: 2, mb: 1, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", columnGap: 2 }}>
            <FormikDecimalField name="percent" label="Percent" />
            <FormikDecimalField name="quantity" label="Quantity" />
            <FormikSelect name="unit" items={unitSelectItems} sx={{ height: "100%" }} />
          </Box>
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
          <FormikCheckboxField name="ending" label="Ending" />
          <Box sx={{ mt: 2, mb: 1, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", columnGap: 2 }}>
            <FormikDecimalField name="percent" label="Percent" />
            <FormikDecimalField name="quantity" label="Quantity" />
            <FormikSelect name="unit" items={unitSelectItems} sx={{ height: "100%" }} />
          </Box>
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
    try {
      console.log(data);
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
            startTime: timeschema
              .label("Start time")
              .required()
              .test("isAfter6Am", "Must be after 6am", (startTime) => isTimeStringAfter(startTime, "06:00"))
              .test("isBefore8Pm", "End time must be before 8pm", (startTime) =>
                isTimeStringBefore(startTime, "20:00")
              ),
            endTime: timeschema
              .label("End time")
              .required()
              .test("isAfter6Am", "Must be after 6am", (endTime) => isTimeStringAfter(endTime, "06:00"))
              .test("isBefore10Pm", "End time must be before 10pm", (endTime) =>
                isTimeStringBefore(endTime, "22:00")
              ),
            price: numericSchema.label("Price").required().max(999.99),
            earlyDropOffTime: timeschema.label("Early drop off time").when(["earlyDropOff", "startTime"], {
              is: (earlyDropOff, startTime) => earlyDropOff && typeof startTime === "string",
              then: (schema) =>
                schema
                  .required()
                  .test("isAfter6Am", "Must be after 6am", (earlyDropOffTime) =>
                    isTimeStringAfter(earlyDropOffTime, "06:00", false)
                  )
                  .test("isBeforeStartTime", "Must be earlier than start time", (earlyDropOffTime, context) =>
                    isTimeStringBefore(earlyDropOffTime, context.parent.startTime, false)
                  ),
              otherwise: (schema) => schema,
            }),
            earlyDropOffPrice: numericSchema
              .label("Early drop off price")
              .max(999.99)
              .when("earlyDropOff", {
                is: true,
                then: (schema) => schema.required(),
                otherwise: (schema) => schema,
              }),
            latePickUpTime: timeschema.label("Late pick up time").when(["latePickUp", "endTime"], {
              is: (latePickUp, endTime) => latePickUp && typeof endTime === "string",
              then: (schema) =>
                schema
                  .required()
                  .test("isBefore10Pm", "Must be before 10pm", (latePickUpTime) =>
                    isTimeStringBefore(latePickUpTime, "22:00", false)
                  )
                  .test("isAfterEndTime", "Must be after end time", (latePickUpTime, context) =>
                    isTimeStringAfter(latePickUpTime, context.parent.endTime, false)
                  ),
              otherwise: (schema) => schema,
            }),
            latePickUpPrice: numericSchema
              .label("Late pick up price")
              .max(999.99)
              .when("latePickUp", {
                is: true,
                then: (schema) => schema.required(),
                otherwise: (schema) => schema,
              }),
            level: Yup.string().max(64),
            capacity: numericSchema.label("Capacity").required().max(999),
          })}
          onSubmit={handleSubmit}
        >
          <Form>
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
              <FormikTimeField name="startTime" label="Start time" fullWidth margin="normal" />
              <FormikTimeField name="endTime" label="End time" fullWidth margin="normal" />
              <FormikDecimalField
                name="price"
                label="Price"
                InputProps={{
                  startAdornment: <InputAdornment position="start">£</InputAdornment>,
                }}
                fullWidth
                margin="normal"
              />

              <Box
                sx={{
                  mt: 2,
                  mb: 1,
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  columnGap: 2,
                  alignItems: "start",
                }}
              >
                <FormikCheckboxField name="earlyDropOff" label="Early drop off" />
                <FormikTimeField name="earlyDropOffTime" label="Early drop off time" />
                <FormikDecimalField
                  name="earlyDropOffPrice"
                  label="Early drop off price"
                  InputProps={{
                    startAdornment: <InputAdornment position="start">£</InputAdornment>,
                  }}
                />
              </Box>

              <Box
                sx={{
                  mt: 2,
                  mb: 1,
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  columnGap: 2,
                  alignItems: "start",
                }}
              >
                <FormikCheckboxField name="latePickUp" label="Late pick up" />
                <FormikTimeField name="latePickUpTime" label="Late pick up time" />
                <FormikDecimalField
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
                <FormikDecimalField name="ageFrom" label="From" />
                {age === "range" && <FormikDecimalField name="ageTo" label="To" />}
              </Box>

              <FormikTextField name="level" label="Level" fullWidth margin="normal" />
              <FormikNumberField name="capacity" label="Capacity" fullWidth margin="normal" />

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
              containerSx={{ width: "62%" }}
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
      {/* <Grid container>
        <Grid item xs={6}>
          Description
        </Grid>
        <Grid item xs={6}> */}
      <Box sx={{ maxWidth: 540, ml: 10 }}>
        <Carousel viewportSx={{ border: "1px solid #6C757D", borderRadius: 4 }}>
          <ActivityStartCreationSlide />
          <ActivityFirstFormSlide />
          <ActivitySecondFormSlide />
          <ActivityThirdFormSlide />
          <ActivityReviewSlide />
        </Carousel>
      </Box>

      {/* </Grid>
      </Grid> */}
    </Container>
  );
}
