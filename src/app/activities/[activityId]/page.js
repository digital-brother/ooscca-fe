"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  Chip, CircularProgress,
  Dialog,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  useMediaQuery,
} from "@mui/material";
import {useMutation, useQuery, useQueryClient} from "react-query";
import { Field, Form, Formik } from "formik";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  getActivity,
  getActivityTypes,
  patchActivity,
  createDiscount,
  patchDiscount,
  getActivityDiscounts,
  patchProvider,
} from "@/app/activities/[activityId]/api.mjs";
import "dayjs/locale/en-gb";
import {
  FormikErrors,
  Error,
  FormikSelect,
  FormikCalendarField,
  FormikCheckboxField,
  FormikNumberField,
  FormikDecimalField,
  FormikTextField,
  FormikTimeField,
  createHandleSubmit,
} from "./components/formikFields";
import { useParams } from "next/navigation";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";
import Container from "@mui/material/Container";
import * as Yup from "yup";
import { styled, useTheme } from "@mui/material/styles";
import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import { timeschema, numericSchema, isTimeStringBefore, isTimeStringAfter } from "./utils";
import { CancelButton, GoBackButton, NextButton } from "./components/buttons";
import { Editor } from "@tinymce/tinymce-react";
import {MapComponent} from "@/app/activities/[activityId]/components/Map";
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

const SmFlex = styled(Box)(({ theme }) => ({
  display: "flex",
  columnGap: "0.5rem",
  [theme.breakpoints.up("xs")]: {
    flexDirection: "column",
    textAlign: "center",
  },
  [theme.breakpoints.up("sm")]: {
    flexDirection: "row",
    textAlign: "left",
  },
}));

const LgFlex = styled(Box)(({ theme }) => ({
  display: "flex",
  columnGap: "0.5rem",
  [theme.breakpoints.up("xs")]: {
    flexDirection: "column",
    textAlign: "center",
  },
  [theme.breakpoints.up("lg")]: {
    flexDirection: "row",
    textAlign: "left",
  },
}));

function SlideHeader({ label, close }) {
  const smUp = useMediaQuery((theme) => theme.breakpoints.up("sm"));
  return (
    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
      <Typography variant="h6">{label}</Typography>

      {smUp && (
        <IconButton size="small" onClick={close}>
          <HighlightOffRoundedIcon sx={{ color: "common.black", fontSize: 28 }} />
        </IconButton>
      )}
    </Box>
  );
}

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
      <Typography sx={{ textAlign: { sm: "right" } }} variant="h5">
        Total £{activity?.price}
      </Typography>
    </Box>
  );
}

function DiscountForm({ type, discount, formRef }) {
  const theme = useTheme();
  const { activityId } = useParams();
  const unitSelectItems = [
    { value: "days", title: "Days" },
    { value: "spaces", title: "Spaces" },
  ];

  const patchMutation = useMutation((discount) => patchDiscount(activityId, discount.id, discount));
  const createMutation = useMutation((discount) => createDiscount(activityId, discount));

  async function handleSubmit(values, formikHelpers) {
    const mutation = values.id ? patchMutation : createMutation;
    const handle = createHandleSubmit({ mutation, throwError: true });
    handle(values, formikHelpers);
  }

  return (
    <Formik
      initialValues={{
        id: discount?.id,
        activity: activityId,
        type: discount?.type ?? type,
        enabled: discount?.enabled ?? false,
        percent: discount?.percent,
        amount: discount?.amount,
        unit: discount?.unit || "days",
      }}
      validationSchema={Yup.object({
        percent: numericSchema
          .label("Percent")
          .max(100)
          .when("enabled", ([enabled], schema) => (enabled ? schema.required() : schema)),
        amount: numericSchema
          .label("Amount")
          .max(60)
          .when("enabled", ([enabled], schema) => (enabled ? schema.required() : schema)),
      })}
      enableReinitialize
      onSubmit={handleSubmit}
      innerRef={formRef}
    >
      <Form style={{ marginTop: theme.spacing(2), marginBottom: theme.spacing(1) }}>
        <Field type="hidden" name="type" value={type} />
        <FormikCheckboxField name="enabled" label={type === "early" ? "Early Birds" : "Ending soon"} />
        <Box
          sx={{
            mt: 2,
            mb: 1,
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "repeat(3, 1fr)" },
            columnGap: 2,
            rowGap: 2,
          }}
        >
          <FormikNumberField name="percent" label="Percent" />
          <FormikNumberField name="amount" label="Amount" />
          <FormikSelect name="unit" sx={{ height: 56 }}>
            {(unitSelectItems || []).map((unit) => (
              <MenuItem key={unit.value} value={unit.value}>
                {unit.title}
              </MenuItem>
            ))}
          </FormikSelect>
        </Box>
        <FormikErrors />
      </Form>
    </Formik>
  );
}

function SavedSlide({ scrollNext, close }) {
  return (
    <>
      <Typography variant="h6">Saved activity details</Typography>
      <ActivityDetails sx={{ flex: 1 }} />

      <Button onClick={scrollNext} variant="contained" fullWidth color="grey" sx={{ mt: 3 }}>
        Edit
      </Button>
      <Typography variant="body2" sx={{ mt: 1.5, textAlign: "center" }}>
        Publish the activity from account page
      </Typography>
    </>
  );
}

function ReviewSlide({ scrollNext, scrollPrev, close }) {
  const { activityId } = useParams();
  const smDown = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const mutation = useMutation((data) => patchActivity(activityId, data));

  function handleSave() {
    mutation.mutate({ filled: true }, { onSuccess: scrollNext });
  }

  return (
    <>
      <SlideHeader label="Review activity details" close={close} />
      <ActivityDetails sx={{ flex: 1 }} />

      <Error>{mutation.isError && mutation.error.message}</Error>
      <SmFlex sx={{ mt: 3, rowGap: 1 }}>
        {smDown && <CancelButton onClick={close} />}
        <GoBackButton onClick={scrollPrev} />
        <NextButton onClick={handleSave} label="Save" />
      </SmFlex>
      <Typography variant="body2" sx={{ mt: 1.5, textAlign: "center" }}>
        Activity will be saved in your accounts page
      </Typography>
    </>
  );
}

function DiscountsSlide({ scrollNext, scrollPrev, close, sx }) {
  const { activityId } = useParams();
  const smDown = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  const { data: discounts } = useQuery(["activityDiscounts", activityId], () => getActivityDiscounts(activityId));
  const earlyDiscount = discounts?.find((discount) => discount.type === "early");
  const endingDiscount = discounts?.find((discount) => discount.type === "ending");

  const earlyDiscountFormRef = useRef();
  const endingDiscountFormRef = useRef();

  async function handleMultipleSubmit() {
    try {
      await earlyDiscountFormRef.current.submitForm();
      await endingDiscountFormRef.current.submitForm();
      if (earlyDiscountFormRef.current?.isValid && endingDiscountFormRef.current?.isValid) scrollNext();
    } catch (error) {}
  }

  return (
    <>
      <Box>
        <SlideHeader label="Keep editing" close={close} />
        <Typography sx={{ mt: 2, fontWeight: 700 }}>Discounts</Typography>
        <DiscountForm type="early" discount={earlyDiscount} formRef={earlyDiscountFormRef} />
        <DiscountForm type="ending" discount={endingDiscount} formRef={endingDiscountFormRef} />
      </Box>

      <SmFlex sx={{ mt: { xs: 3, sm: "auto" }, rowGap: 1 }}>
        {smDown && <CancelButton onClick={close} />}
        <GoBackButton onClick={scrollPrev} />
        <NextButton onClick={handleMultipleSubmit} />
      </SmFlex>
      <Typography variant="body2" sx={{ mt: 1.5, textAlign: "center" }}>
        Activity will be saved in your accounts page
      </Typography>
    </>
  );
}

function MapForm() {
  const defaultCoordinates = { lat: 51.5074, lng: -0.1278 };
  const activityId = useParams().activityId;
  const queryClient = useQueryClient();
  const { data: activity, isError } = useQuery(["activity", activityId], () => getActivity(activityId));
  const [errors, setErrors] = useState('');

  const [coordinates, setCoordinates] = useState(defaultCoordinates);
  const [address, setAddress] = useState('');

  const onSuccess = (data) => {
    queryClient.invalidateQueries(['activity', activityId]);
    setErrors('');
  };

  const onError = (error) => {
    let errorMessage = 'An unexpected error occurred';
    const errorsResponse = error?.response?.data;

    if (errorsResponse && typeof errorsResponse === 'object') {
        const errorMessages = Object.entries(errorsResponse).flatMap(([field, errors]) => {
            return errors.map((error) => `${field}: ${error}`);
        });
        errorMessage = errorMessages.join('\n');
    }
    setErrors(errorMessage);
  };

  const mutation = useMutation((data) => patchActivity(activityId, data), { onSuccess, onError });

  useEffect(() => {
    if (activity) {
      const { latitude, longitude, address: activityAddress } = activity;
      setCoordinates({ lat: parseFloat(latitude), lng: parseFloat(longitude) });
      setAddress(activityAddress || '');
    }
  }, [activity]);

  async function handleSubmit() {
    const data = { latitude: coordinates.lat, longitude: coordinates.lng, address };
    mutation.mutate(data);
  }

  if (isError) {
    return (
      <Box sx={{mt: 2}}>
        <MapComponent
          initialCoordinates={coordinates}
          initialAddress={address}
          setCoordinates={setCoordinates}
          setAddress={setAddress}
        />
        <Button variant="contained" color="green" size="large" type="submit" onClick={handleSubmit} sx={{mt:2}}>
          Save
        </Button>
        <Typography sx={{ mt: 1, textAlign: "center", color: "error.main", fontWeight: 600 }}>
          Error loading activity data
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{mt: 2}}>
      <MapComponent
        initialCoordinates={coordinates}
        initialAddress={address}
        setCoordinates={setCoordinates}
        setAddress={setAddress}
      />
      <Button variant="contained" color="green" size="large" type="submit" onClick={handleSubmit} sx={{mt:2}}>
        Save
      </Button>
      {errors && (
        <Typography sx={{ mt: 1, textAlign: "center", color: "error.main", fontWeight: 600 }}>{errors}</Typography>
      )}
    </Box>
  );
}

function InfoSlide({ scrollNext, scrollPrev, close }) {
  const smDown = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const { activityId } = useParams();
  const { data: activity } = useQuery(["activity", activityId], () => getActivity(activityId));
  const mutation = useMutation((data) => patchActivity(activityId, data));

  const [ageType, setAgeType] = React.useState("single");
  useEffect(() => {
    const newAgeType = activity?.ageFrom && activity?.ageTo ? "range" : "single";
    setAgeType(newAgeType);
  }, [activity]);
  const handleAgeTypeChange = (event) => {
    setAgeType(event.target.value);
  };

  async function handleSubmit(values, formikHelpers) {
    // On backend if rangeFrom is set, we treat it a single age, if both - as range
    const data = { ...values, ageTo: ageType === "range" ? values.ageTo : null };
    // TODO: Rewrite if values conversions will be frequent
    const handle = createHandleSubmit({ mutation, onSuccess: scrollNext });
    handle(data, formikHelpers);
  }

  return (
    activity && (
      <>
        <SlideHeader label="Keep editing" close={close} />
        <Formik
          onSubmit={handleSubmit}
          enableReinitialize
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
              .test("isBefore10Pm", "End time must be before 10pm", (endTime) => isTimeStringBefore(endTime, "22:00")),
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
            ageFrom: numericSchema.label("Age").required().max(18),
            ageTo: numericSchema
              .label("Age")
              .max(18)
              // eslint-disable-next-line no-template-curly-in-string
              .test("required", "${path} to is a required field", (ageTo) => ageType === "single" || ageTo),
            level: Yup.string().max(64),
            capacity: numericSchema.label("Capacity").required().max(999),
          })}
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
                  mt: { xs: 0, sm: 2 },
                  mb: 1,
                  display: "grid",
                  gridTemplateColumns: { xs: "repeat(2, 1fr)", sm: "repeat(3, 1fr)" },
                  columnGap: 2,
                  rowGap: 1,
                  alignItems: "start",
                }}
              >
                <FormikCheckboxField
                  name="earlyDropOff"
                  label="Early drop off"
                  sx={{ gridColumn: { xs: "span 2", sm: "span 1" } }}
                />
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
                  mt: { xs: 1, sm: 3 },
                  mb: 1,
                  display: "grid",
                  gridTemplateColumns: { xs: "repeat(2, 1fr)", sm: "repeat(3, 1fr)" },
                  columnGap: 2,
                  rowGap: 1,
                  alignItems: "start",
                }}
              >
                <FormikCheckboxField
                  name="latePickUp"
                  label="Late pick up"
                  sx={{ gridColumn: { xs: "span 2", sm: "span 1" } }}
                />
                <FormikTimeField name="latePickUpTime" label="Late pick up time" />
                <FormikDecimalField
                  name="latePickUpPrice"
                  label="Late pick up price"
                  InputProps={{
                    startAdornment: <InputAdornment position="start">£</InputAdornment>,
                  }}
                />
              </Box>

              <Box
                sx={{
                  mt: 3,
                  mb: 1,
                  display: "grid",
                  gridTemplateColumns: { xs: "repeat(2, 1fr)", sm: "repeat(3, 1fr)" },
                  columnGap: 2,
                  rowGap: 2,
                }}
              >
                <FormControl sx={{ gridColumn: { xs: "span 2", sm: "span 1" } }}>
                  <InputLabel id="demo-simple-select-label">Age</InputLabel>
                  <Select value={ageType} onChange={handleAgeTypeChange} labelId="demo-simple-select-label" label="Age">
                    <MenuItem value="single">Single</MenuItem>
                    <MenuItem value="range">Range</MenuItem>
                  </Select>
                </FormControl>
                <FormikDecimalField name="ageFrom" label={ageType === "single" ? "Years" : "From"} />
                {ageType === "range" && <FormikDecimalField name="ageTo" label="To" />}
              </Box>

              <FormikTextField name="level" label="Level" fullWidth margin="normal" />
              <FormikNumberField name="capacity" label="Capacity" fullWidth margin="normal" />

              <FormikErrors />
              <SmFlex sx={{ mt: 2, rowGap: 1 }}>
                {smDown && <CancelButton onClick={close} />}
                <GoBackButton onClick={scrollPrev} />
                <NextButton />
              </SmFlex>
            </LocalizationProvider>
          </Form>
        </Formik>
        <Typography variant="body2" sx={{ mt: 1.5, textAlign: "center" }}>
          Activity will be saved in your accounts page
        </Typography>
      </>
    )
  );
}

function DatesSlide({ scrollNext, close }) {
  const { activityId } = useParams();
  const { data: activityTypes } = useQuery("activityTypes", getActivityTypes);
  const { data: activity } = useQuery(["activity", activityId], () => getActivity(activityId));
  const mutation = useMutation((data) => patchActivity(activityId, data));

  return (
    <>
      <SlideHeader label="Keep editing" close={close} />
      <Formik
        initialValues={{ type: (activityTypes && activity?.type) || "", dateRanges: activity?.dateRanges || [] }}
        enableReinitialize
        onSubmit={createHandleSubmit({ mutation, onSuccess: scrollNext })}
        validationSchema={Yup.object({
          type: numericSchema.label("Type").required(),
        })}
      >
        <Form style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 3, mt: 2 }}>
            <FormikSelect label="Pick activity from list" name="type" containerSx={{ width: "62%" }} fullwidth>
              {(activityTypes || []).map((activityType) => (
                <MenuItem key={activityType.id} value={activityType.id}>
                  {activityType.name}
                </MenuItem>
              ))}
            </FormikSelect>
          </Box>
          <FormikCalendarField sx={{ mt: 5 }} name="dateRanges" />
          <FormikErrors />
          <SmFlex sx={{ mt: { xs: 2, sm: "auto" }, rowGap: 1 }}>
            <CancelButton onClick={close} />
            <NextButton />
          </SmFlex>
        </Form>
      </Formik>
      <Typography variant="body2" sx={{ mt: 1.5, textAlign: "center" }}>
        Activity will be saved in your accounts page
      </Typography>
    </>
  );
}

function StartSlide({ scrollNext, sx }) {
  const activityId = useParams().activityId;
  const { data: activity } = useQuery(["activity", activityId], () => getActivity(activityId));

  return (
    <Box sx={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
      <Box sx={{ maxWidth: 341, textAlign: "center", ...sx }}>
        <Typography variant="h5">Create your first activity and let’s get going</Typography>
        <Button variant="contained" color="orange" size="large" onClick={scrollNext} sx={{ mt: 3 }}>
          {activity?.type ? "Continue editing" : "Start here"}
        </Button>
      </Box>
    </Box>
  );
}

function DescriptionForm() {
  const activityId = useParams().activityId;
  const { data: activity } = useQuery(["activity", activityId], () => getActivity(activityId));
  const mutation = useMutation((data) => patchActivity(activityId, data));

  return (
    <Formik
      initialValues={{ description: activity?.description ?? "", preRequisites: activity?.preRequisites ?? "" }}
      onSubmit={createHandleSubmit(mutation)}
      enableReinitialize
    >
      <Form>
        <Stack spacing={3}>
          <FormikTextField name="description" variant="filled" fullWidth label="Description" multiline rows={10} />
          <FormikTextField
            name="preRequisites"
            variant="filled"
            fullWidth
            label="Highlight important details here"
            multiline
            rows={9}
            inputProps={{
              style: {
                fontWeight: 700,
              },
            }}
          />
          <Button variant="contained" color="green" size="large" type="submit">
            Save
          </Button>
          <FormikErrors />
        </Stack>
      </Form>
    </Formik>
  );
}

function Activities() {
  const activityId = useParams().activityId;
  const { data: activity } = useQuery(["activity", activityId], () => getActivity(activityId));

  const [slide, setSlide] = useState(0);
  const slides = [activity?.filled ? SavedSlide : StartSlide, DatesSlide, InfoSlide, DiscountsSlide, ReviewSlide];
  const CurrentSlide = slides[slide];

  const smDown = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const slideRef = useRef(null);
  const scrollToActivities = () =>
    smDown && slideRef.current && window.scrollTo({ top: slideRef.current.offsetTop - 10, behavior: "smooth" });

  function scrollNext() {
    if (slide === slides.length - 1) setSlide(0);
    else setSlide((prev) => prev + 1);
    scrollToActivities();
  }

  function scrollPrev() {
    setSlide((prev) => prev - 1);
    scrollToActivities();
  }

  function close() {
    setSlide(0);
    scrollToActivities();
  }

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr", lg: "repeat(2, 1fr)" },
        gap: 3,
        maxWidth: { xs: 540, lg: "none" },
        mx: "auto",
      }}
    >
      <DescriptionForm />
      <Box
        ref={slideRef}
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
          <CurrentSlide {...{ scrollNext, scrollPrev, close }} />
        </Box>
      </Box>
    </Box>
  );
}

function TermsAndConditionsModal({ setTermsCoditionsOpen }) {
  const activityId = useParams().activityId;
  const editorRef = useRef(null);
  const mdUp = useMediaQuery((theme) => theme.breakpoints.up("md"));

  const { data: activity } = useQuery(["activity", activityId], () => getActivity(activityId));
  const { data: provider } = useQuery(["provider", activity?.provider], () => patchProvider(activity?.provider));
  const mutation = useMutation((data) => patchProvider(activity?.provider, data));
  const [error, setError] = useState(null);

  function handleSave() {
    const content = editorRef.current.getContent();
    mutation.mutate(
      { termsAndConditions: content },
      {
        onError: (error) => setError(error?.response?.data?.termsAndConditions || error.message),
        onSuccess: () => {
          setError(null);
          setTermsCoditionsOpen(false);
        },
      }
    );
  }

  return (
    <Box sx={{ minWidth: { xs: 300, md: 500 }, minHeight: { xs: 300, md: 200 }, px: { xs: 2.5, md: 7 }, py: { xs: 3, md: 5 } }}>
      <Typography variant="h3" textAlign="center">
        Add your Terms & Contitions here
      </Typography>
      <Box sx={{ mt: { xs: 2, md: 5 } }}>
        {/* Component is not controlled here for performance reasons
        (https://www.tiny.cloud/docs/tinymce/latest/react-ref/#using-the-tinymce-react-component-as-a-controlled-component) */}
        <Editor
          initialValue={provider?.termsAndConditions}
          apiKey={process.env.NEXT_PUBLIC_TINY_MCE_API_KEY}
          onInit={(evt, editor) => (editorRef.current = editor)}
          toolbarMode="floating"
          // inline={true}
          init={{
            height: mdUp ? 500 : 350,
            menubar: false,
            statusbar: false,
            plugins: [
              "advlist",
              "autolink",
              "lists",
              "link",
              "image",
              "charmap",
              "anchor",
              "searchreplace",
              "visualblocks",
              "code",
              "fullscreen",
              "insertdatetime",
              "media",
              "table",
              "preview",
              "wordcount",
            ],
            toolbar:
              "undo redo | blocks | " +
              "bold italic forecolor | alignleft aligncenter " +
              "alignright alignjustify | bullist numlist outdent indent | " +
              "removeformat | help",
            toolbar_mode: "floating",
            content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
          }}
        />
      </Box>
      <Error>{error}</Error>
      <SmFlex sx={{ mt: { xs: 2, md: 5 }, rowGap: 1, columnGap: 5, justifyContent: "right", alignItems: "center" }}>
        <Button
          variant="outlined"
          color="grey"
          size="large"
          onClick={() => setTermsCoditionsOpen(false)}
          fullWidth
          sx={{ maxWidth: 230 }}
        >
          Cancel
        </Button>
        <Button onClick={handleSave} variant="contained" color="green" size="large" fullWidth sx={{ maxWidth: 230 }}>
          Save
        </Button>
      </SmFlex>
    </Box>
  );
}

function TermsAndConditions() {
  const [termsCoditionsOpen, setTermsCoditionsOpen] = React.useState(false);

  return (
    <LgFlex sx={{ mt: { xs: 5, sm: 10 }, columnGap: 5, rowGap: 1, alignItems: "center" }}>
      <Typography variant="h5">Terms and Conditions</Typography>
      <Button
        variant="contained"
        color="yellow"
        onClick={() => setTermsCoditionsOpen(true)}
        sx={{ width: "100%", maxWidth: 340 }}
      >
        Click to add
      </Button>

      <Dialog
        onClose={() => setTermsCoditionsOpen(false)}
        open={termsCoditionsOpen}
        PaperProps={{ sx: { maxWidth: "none" } }}
      >
        <TermsAndConditionsModal {...{ setTermsCoditionsOpen }} />
      </Dialog>
    </LgFlex>
  );
}

export default function ActivityEditView() {

  return (
    <Container sx={{ my: 10 }}>
       <Activities />
       <MapForm />
       <TermsAndConditions />
    </Container>
  );
}
