"use client";

// TODO: Close button
// TODO: Carousel height and dots
// TODO: Style buttons
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import React, { useContext, useEffect, useRef, useState } from "react"; // added useEffect
import {
  Button,
  Chip,
  Dialog,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Stack,
} from "@mui/material";
import { useMutation, useQuery } from "react-query";
import { Field, Form, Formik, useFormikContext } from "formik";
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
import { timeschema, numericSchema, isTimeStringBefore, isTimeStringAfter } from "./utils";
import { Editor } from "@tinymce/tinymce-react";
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

function ReactQueryEror({ error, fieldName }) {
  return (
    error && (
      <Typography sx={{ mt: 1, textAlign: "center", color: "#E72A2A", fontWeight: 500 }}>
        Error occured, please contact administrator. <br />
        {error?.response?.data[fieldName] || error.message}
      </Typography>
    )
  );
}

function FormikNonFieldErrors() {
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

function ActivityDetails() {
  const { activityId } = useParams();
  const { data: activity } = useQuery(["activity", activityId], () => getActivity(activityId));
  const { data: discounts } = useQuery(["activityDiscounts", activityId], () => getActivityDiscounts(activityId));
  const earlyDiscount = discounts?.find((discount) => discount.type === "early");
  const endingDiscount = discounts?.find((discount) => discount.type === "ending");

  const formatDateString = (dateString) => dateString && dayjs(dateString).format("DD MMMM");

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 3, position: "relative" }}>
      <Stack spacing={1} sx={{ width: "max-content", position: "absolute", right: 0 }}>
        <Chip label="Early birds" sx={{ bgcolor: "#FF2E8C", color: "#FFFFFF" }} />
        <Chip label="Ending soon" sx={{ bgcolor: "#23A6C9", color: "#FFFFFF" }} />
      </Stack>
      <Typography>
        <b>Provider:</b> {activity?.providerName}
      </Typography>
      <Typography>
        <b>Activity:</b> {activity?.typeName}
      </Typography>
      <Typography>
        <b>Venue:</b> {activity?.venue}
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", gap: 1 }}>
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
        </Box>
        <Typography>
          {activity?.startTime} - {activity?.endTime}
        </Typography>
      </Box>
      {activity?.earlyDropOff && (
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography>
            <b>Early drop off:</b> {activity?.earlyDropOffTime}
          </Typography>
          {parseFloat(activity?.earlyDropOffPrice) ? (
            <Typography>{activity?.earlyDropOffPrice}£</Typography>
          ) : (
            <Typography sx={{ color: "#00A551", fontWeight: 700 }}>FREE</Typography>
          )}
        </Box>
      )}
      {activity?.latePickUp && (
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography>
            <b>Late pick up:</b> {activity?.latePickUpTime}
          </Typography>
          {parseFloat(activity?.latePickUpPrice) ? (
            <Typography>{activity?.latePickUpPrice}£</Typography>
          ) : (
            <Typography sx={{ color: "#00A551", fontWeight: 700 }}>FREE</Typography>
          )}
        </Box>
      )}
      {activity?.level && (
        <Typography>
          <b>Level:</b> {activity?.level}
        </Typography>
      )}
      <Typography>
        <b>Age:</b> {activity?.ageFrom} {activity?.ageTo && ` - ${activity?.ageTo}`}
      </Typography>
      <Typography>
        <b>Available spaces:</b> {activity?.capacity}
      </Typography>
      {(earlyDiscount?.enabled || endingDiscount?.enabled) && (
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography>
            <b>Discounts applied:</b>{" "}
          </Typography>
          <Box>
            {earlyDiscount?.enabled && (
              <Typography>
                Early birds ({earlyDiscount?.percent}%){" "}
                {earlyDiscount?.unit === "spaces"
                  ? `${earlyDiscount?.amount} spaces`
                  : `applied to first ${earlyDiscount?.amount} days`}
              </Typography>
            )}
            {endingDiscount?.enabled && (
              <Typography sx={{ mt: 1 }}>
                Ending soon ({endingDiscount?.percent}%){" "}
                {endingDiscount?.unit === "spaces"
                  ? `${endingDiscount?.amount} spaces`
                  : `applied to last ${endingDiscount?.amount} days`}
              </Typography>
            )}
          </Box>
        </Box>
      )}
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography>Terms and conditions</Typography>
        <Typography variant="h5">Total £{activity?.price}</Typography>
      </Box>
    </Box>
  );
}

function TermsAndConditions() {
  const activityId = useParams().activityId;
  const editorRef = useRef(null);

  const { data: activity } = useQuery(["activity", activityId], () => getActivity(activityId));
  const mutation = useMutation((data) => patchActivity(activityId, data));

  function handleSave() {
    const content = editorRef.current.getContent();
    mutation.mutate({ termsAndConditions: content });
  }

  return (
    <Box sx={{ minWidth: 500, minHeight: 500, p: 7 }}>
      <Typography variant="h3" textAlign="center">
        Add your Terms & Contitions here
      </Typography>
      <Box sx={{ mt: 5 }}>
        {/* Component is not controlled here for performance reasons
        (https://www.tiny.cloud/docs/tinymce/latest/react-ref/#using-the-tinymce-react-component-as-a-controlled-component) */}
        <Editor
          initialValue={activity?.termsAndConditions}
          apiKey={process.env.NEXT_PUBLIC_TINY_MCE_API_KEY}
          onInit={(evt, editor) => (editorRef.current = editor)}
          init={{
            height: 500,
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
              "help",
              "wordcount",
            ],
            toolbar:
              "undo redo | blocks | " +
              "bold italic forecolor | alignleft aligncenter " +
              "alignright alignjustify | bullist numlist outdent indent | " +
              "removeformat | help",
            content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
          }}
        />
      </Box>
      <ReactQueryEror error={mutation.error} fieldName="termsAndConditions" />
      <Box sx={{ mt: 5, display: "flex", height: 56, columnGap: 2, justifyContent: "right" }}>
        <Button
          variant="outlined"
          size="large"
          // onClick={scrollPrev}
          sx={{ height: "100%", fontWeight: 700, fontSize: 16, minWidth: 230 }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSave}
          variant="contained"
          color="success"
          sx={{ height: "100%", fontWeight: 700, fontSize: 16, minWidth: 230 }}
        >
          Save
        </Button>
      </Box>
    </Box>
  );
}

function DiscountForm({ type, discount, formRef }) {
  const theme = useTheme();
  const unitSelectItems = [
    { id: "days", name: "Days" },
    { id: "spaces", name: "Spaces" },
  ];

  const patchMutation = useMutation((discount) => patchDiscount(discount.activity, discount.id, discount));
  const createMutation = useMutation((discount) => createDiscount(discount.activity, discount));

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

  return (
    <Formik
      initialValues={{
        id: discount?.id,
        activity: discount?.activity,
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
          .max(40)
          .when("enabled", ([enabled], schema) => (enabled ? schema.required() : schema)),
      })}
      enableReinitialize
      onSubmit={handleSubmit}
      innerRef={formRef}
    >
      <Form style={{ marginTop: theme.spacing(2), marginBottom: theme.spacing(1) }}>
        <Field type="hidden" name="type" value={type} />
        <FormikCheckboxField name="enabled" label={type === "early" ? "Early Birds" : "Ending soon"} />
        <Box sx={{ mt: 2, mb: 1, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", columnGap: 2 }}>
          <FormikDecimalField name="percent" label="Percent" />
          <FormikDecimalField name="amount" label="Amount" />
          <FormikSelect name="unit" items={unitSelectItems} sx={{ height: 56 }} />
        </Box>
      </Form>
    </Formik>
  );
}

function SavedSlide({ scrollNext, close }) {
  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography variant="h6">Saved activity details</Typography>
      </Box>

      <ActivityDetails />

      <Box sx={{ mt: 3, display: "flex", height: 56, columnGap: 2 }}>
        <Button
          onClick={scrollNext}
          variant="contained"
          fullWidth
          color="inherit"
          sx={{ height: "100%", fontWeight: 700, fontSize: 16 }}
        >
          Edit
        </Button>
      </Box>
      <Typography variant="body2" sx={{ mt: 1, textAlign: "center" }}>
        Publish the activity from account page
      </Typography>
    </>
  );
}

function ReviewSlide({ scrollNext, scrollPrev, close }) {
  const { activityId } = useParams();
  const mutation = useMutation((data) => patchActivity(activityId, data));

  async function handleSave() {
    try {
      const response = await mutation.mutateAsync({ filled: true });
      console.log(response);
      scrollNext();
    } catch (error) {
      console.log(error.response.data);
    }
  }

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography variant="h6">Review activity details</Typography>
        <IconButton size="small" onClick={close}>
          <HighlightOffRoundedIcon sx={{ color: "#000000", fontSize: 28 }} />
        </IconButton>
      </Box>

      <ActivityDetails />

      <Box sx={{ mt: 3, display: "flex", height: 56, columnGap: 2 }}>
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
          onClick={handleSave}
          variant="contained"
          fullWidth
          color="success"
          sx={{ height: "100%", fontWeight: 700, fontSize: 16 }}
        >
          Save
        </Button>
      </Box>
      <Typography variant="body2" sx={{ mt: 1, textAlign: "center" }}>
        Activity will be saved in your accounts page
      </Typography>
    </>
  );
}

function DiscountsSlide({ scrollNext, scrollPrev, close, sx }) {
  const { activityId } = useParams();

  const { data: discounts } = useQuery(["activityDiscounts", activityId], () => getActivityDiscounts(activityId));
  const earlyDiscount = discounts?.find((discount) => discount.type === "early");
  const endingDiscount = discounts?.find((discount) => discount.type === "ending");

  const earlyDiscountFormRef = useRef();
  const endingDiscountFormRef = useRef();
  const [termsCoditionsOpen, setTermsCoditionsOpen] = React.useState(true);

  async function handleMultipleSubmit() {
    try {
      await earlyDiscountFormRef.current.submitForm();
      await endingDiscountFormRef.current.submitForm();
      scrollNext();
    } catch (error) {}
  }

  return (
    <>
      <Box>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant="h6">Keep editing</Typography>
          <IconButton size="small" onClick={close}>
            <HighlightOffRoundedIcon sx={{ color: "#000000", fontSize: 28 }} />
          </IconButton>
        </Box>
        <Typography sx={{ mt: 4, fontWeight: 700 }}>Discounts</Typography>
        <DiscountForm type="early" discount={earlyDiscount} formRef={earlyDiscountFormRef} />
        <DiscountForm type="ending" discount={endingDiscount} formRef={endingDiscountFormRef} />

        {/* TODO: Fix styling to link */}
        <Button variant="contained" sx={{ mt: 3 }} onClick={() => setTermsCoditionsOpen(true)}>
          Terms and Conditions
        </Button>

        <Dialog
          onClose={() => setTermsCoditionsOpen(false)}
          open={termsCoditionsOpen}
          PaperProps={{ sx: { maxWidth: "none" } }}
        >
          <TermsAndConditions />
        </Dialog>
      </Box>

      <Box sx={{ mt: "auto", display: "flex", height: 56, columnGap: 2 }}>
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
          Next
        </Button>
      </Box>
      <Typography variant="body2" sx={{ mt: 1, textAlign: "center" }}>
        Activity will be saved in your accounts page
      </Typography>
    </>
  );
}

function InfoSlide({ scrollNext, scrollPrev, close }) {
  const { activityId } = useParams();
  const { data: activity } = useQuery(["activity", activityId], () => getActivity(activityId));
  const mutation = useMutation((data) => patchActivity(activityId, data));

  const initialAgeType = activity?.ageFrom && activity?.ageTo ? "range" : "single";
  const [ageType, setAgeType] = React.useState(initialAgeType);
  const handleAgeTypeChange = (event) => {
    setAgeType(event.target.value);
  };

  async function handleSubmit(values, { setErrors }) {
    try {
      // On backend if rangeFrom is set, we treat it a single age, if both - as range
      const data = { ...values, ageTo: ageType === "range" ? values.ageTo : null };
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
      <>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant="h6">Keep editing</Typography>
          <IconButton size="small" onClick={close}>
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
                  <Select value={ageType} onChange={handleAgeTypeChange} labelId="demo-simple-select-label" label="Age">
                    <MenuItem value="single">Single</MenuItem>
                    <MenuItem value="range">Range</MenuItem>
                  </Select>
                </FormControl>
                <FormikDecimalField name="ageFrom" label="From" />
                {ageType === "range" && <FormikDecimalField name="ageTo" label="To" />}
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
                  Next
                </Button>
              </Box>
            </LocalizationProvider>
          </Form>
        </Formik>
        <Typography variant="body2" sx={{ mt: 1, textAlign: "center" }}>
          Activity will be saved in your accounts page
        </Typography>
      </>
    )
  );
}

function DatesSlide({ scrollNext, scrollPrev, close }) {
  const { activityId } = useParams();
  // TODO: Add error handling
  const { data: activityTypes } = useQuery("activityTypes", getActivityTypes);
  const { data: activity } = useQuery(["activity", activityId], () => getActivity(activityId));
  const mutation = useMutation((data) => patchActivity(activityId, data));

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
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6">Keep editing</Typography>
        <IconButton size="small" onClick={close}>
          <HighlightOffRoundedIcon sx={{ color: "#000000", fontSize: 28 }} />
        </IconButton>
      </Box>
      <Formik
        initialValues={{ type: (activityTypes && activity?.type) || "", dateRanges: activity?.dateRanges || [] }}
        enableReinitialize
        onSubmit={handleSubmit}
      >
        <Form style={{ flex: 1, display: "flex", flexDirection: "column" }}>
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
          <FormikNonFieldErrors />
          <Box sx={{ mt: "auto", display: "flex", height: 56 }}>
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
              Next
            </Button>
          </Box>
        </Form>
      </Formik>
      <Typography variant="body2" sx={{ mt: 1, textAlign: "center" }}>
        Activity will be saved in your accounts page
      </Typography>
    </>
  );
}

function StartSlide({ scrollNext, sx }) {
  return (
    <Box sx={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
      <Box sx={{ maxWidth: 341, textAlign: "center", ...sx }}>
        <Typography variant="h5">Create your first activity and let’s get going</Typography>
        <Button variant="contained" color="warning" size="large" onClick={scrollNext} sx={{ mt: 3 }}>
          Start here
        </Button>
      </Box>
    </Box>
  );
}

export default function Activities() {
  const activityId = useParams().activityId;
  const { data: activity } = useQuery(["activity", activityId], () => getActivity(activityId));

  const [slide, setSlide] = useState(3);

  const slides = [activity?.filled ? SavedSlide : StartSlide, DatesSlide, InfoSlide, DiscountsSlide, ReviewSlide];
  const CurrentSlide = slides[slide];

  function scrollNext() {
    if (slide === slides.length - 1) setSlide(0);
    else setSlide((prev) => prev + 1);
  }

  function scrollPrev() {
    setSlide((prev) => prev - 1);
  }

  function close() {
    setSlide(0);
  }

  return (
    <Container sx={{ my: 10 }}>
      {/* <Grid container>
        <Grid item xs={6}>
          Description
        </Grid>
        <Grid item xs={6}> */}
      <Box
        sx={{
          mx: "auto",

          maxWidth: 540,
          minHeight: 600,
          border: "1px solid #6C757D",
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
      {/* </Grid>
      </Grid> */}
    </Container>
  );
}
