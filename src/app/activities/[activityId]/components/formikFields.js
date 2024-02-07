import { useField, useFormikContext } from "formik";
import TextField from "@mui/material/TextField";
import React from "react";
import { TimeField } from "@mui/x-date-pickers/TimeField";
import dayjs from "dayjs";
import Calendar from "./Calendar";
import { NumericFormat } from "react-number-format";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/en-gb";
import {
  Checkbox,
  FormControlLabel,
  FormControl,
  FormHelperText,
  InputLabel,
  Select as MUISelect,
} from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export function getErrors(error) {
  // If status is 400, it means that DRF returned validation errors
  if (error?.response?.status === 400) {
    const drfErrors = error.response?.data;
    const drfNonFieldErrors = drfErrors?.nonFieldErrors;
    if (drfErrors) return drfErrors;
    if (drfNonFieldErrors) return { nonFieldErrors: drfNonFieldErrors };
  } else {
    return { submissionError: error.message };
  }
}

// TODO: rationalize it
export function getFlatErrors(error) {
  // If status is 400, it means that DRF returned validation errors
  if (error?.response?.status === 400) {
    const drfErrors = error.response?.data;
    const drfNonFieldErrors = drfErrors?.nonFieldErrors;

    if (drfErrors) return Object.values(drfErrors);
    if (drfNonFieldErrors) return drfNonFieldErrors;
  } else {
    return [error.message];
  }
}

export function createHandleSubmit({ mutation, onSuccess = () => {}, throwError = false }) {
  return async function handleSubmit(values, { setErrors, setStatus }) {
    setStatus(null);
    try {
      await mutation.mutateAsync(values);
      onSuccess();
    } catch (error) {
      setErrors(getErrors(error));
      if (throwError) throw error;
    }
  };
}

export function FormikTextField(props) {
  const [field, meta] = useField(props);
  return (
    <TextField
      {...field}
      error={meta.touched && Boolean(meta.error)}
      helperText={meta.touched && meta.error}
      {...props}
    />
  );
}

// Passes "" from input to formik value as null.
// DRF IntegerField raises "Valid integer is required" in has "" passed.
// DRF DecimalField treats "" as null.
export function FormikNumericFormat(props) {
  const [field, meta, helpers] = useField(props);

  function setValueOrNull(event) {
    return helpers.setValue(event.target.value || null);
  }

  return (
    <NumericFormat
      customInput={TextField}
      {...field}
      onChange={setValueOrNull}
      error={meta.touched && Boolean(meta.error)}
      helperText={meta.touched && meta.error}
      {...props}
    />
  );
}

export function FormikNumberField(props) {
  return <FormikNumericFormat allowNegative={false} decimalScale={0} {...props} />;
}

export function FormikDecimalField(props) {
  return <FormikNumericFormat allowNegative={false} decimalScale={2} {...props} />;
}

// Handles initial value is undefined case
export function FormikCheckboxField({ label, sx, ...props }) {
  const [field] = useField({ ...props, type: "checkbox" });
  const fieldValue = field.value ?? false;
  return <FormControlLabel control={<Checkbox {...field} value={fieldValue} {...props} />} label={label} sx={sx} />;
}

// Passes data from formik value to input:
// - null / invalid dayjs object - as is
// - vailid date string - as datejs object
//
// Passes data from input to formik value:
// - null / invalid dayjs object - as is
// - valid dayjs object - as data string
export function FormikTimeField(props) {
  const [field, meta, helpers] = useField(props);

  function onChange(newValue) {
    const isValidDayjs = dayjs.isDayjs(newValue) && newValue.isValid();
    if (isValidDayjs) helpers.setValue(newValue.format("HH:mm"));
    else helpers.setValue(newValue);
  }

  const isValidDayjs = typeof field.value === "string";
  const displayValue = isValidDayjs ? dayjs(field.value, "HH:mm") : field.value;

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
      <TimeField
        {...field}
        value={displayValue}
        onChange={onChange}
        error={meta.touched && Boolean(meta.error)}
        helperText={meta.touched && meta.error}
        {...props}
      />
    </LocalizationProvider>
  );
}

export function FormikCalendarField({ name, sx }) {
  const validateDateRanges = (dateRanges) => {
    for (const dateRange of dateRanges) {
      if (!dateRange.end) return "End date is required";
    }
  };

  const [field, meta, helpers] = useField({ name, validate: validateDateRanges });

  const value = field.value.map((range) => ({
    start: dayjs(range.start, "YYYY-MM-DD"),
    end: range.end && dayjs(range.end, "YYYY-MM-DD"),
  }));

  function handleChange(changeFunction) {
    const dateRanges = changeFunction(value);
    const formikDateRanges = dateRanges.map((range) => ({
      start: range.start.format("YYYY-MM-DD"),
      end: range.end?.format("YYYY-MM-DD"),
    }));
    helpers.setValue(formikDateRanges);
  }

  return (
    <>
      <Calendar dateRanges={value} setDateRanges={handleChange} sx={sx} />
      {meta.touched && meta.error && <Error> {meta.error} </Error>}
    </>
  );
}

export function FormikSelect({ name, items, label, sx, variant, fullwidth, children }) {
  const [field, meta] = useField(name);

  return (
    <FormControl
      error={meta.touched && Boolean(meta.error)}
      sx={{ minWidth: 120, ...sx }}
      variant={variant}
      fullWidth={fullwidth}
    >
      <InputLabel>{label}</InputLabel>

      <MUISelect {...field} label={label}>
        {children}
      </MUISelect>
      {meta.touched && meta.error && <FormHelperText> {meta.error} </FormHelperText>}
    </FormControl>
  );
}

export function FormikErrors() {
  const { status } = useFormikContext();
  if (status?.submissionError) return <Error>{status.submissionError}</Error>;

  if (status?.nonFieldErrors)
    return (
      <Box>
        {status.nonFieldErrors.map((error, index) => (
          <Error key={index}>{error}</Error>
        ))}
      </Box>
    );
}

export function Errors({ errors }) {
  return errors?.map((error, index) => <Error key={index}>{error}</Error>);
}

// TODO: Fix how Errors look in form
export function Error({ children }) {
  return (
    children && (
      <Typography sx={{ color: "error.main", fontWeight: 600 }}>{children}</Typography>
    )
  );
}
