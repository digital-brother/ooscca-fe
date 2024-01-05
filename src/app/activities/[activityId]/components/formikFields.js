import { useField } from "formik";
import TextField from "@mui/material/TextField";
import React from "react";
import { Checkbox, FormControlLabel } from "@mui/material";
import { TimeField } from "@mui/x-date-pickers/TimeField";
import dayjs from "dayjs";
import Calendar from "./Calendar";
import { NumericFormat } from "react-number-format";

export function FormikTextField(props) {
  const [field, meta] = useField(props);
  const isError = meta.touched && Boolean(meta.error);
  return <TextField {...field} error={isError} helperText={isError && meta.error} {...props} />;
}

// TODO: Rationalize on how to handle errors
// Passes null / undefined from formik value to inputs as "".
// - null - returned by DRF for empty DecimalField
// - undefined - returned by react-query while response is loading
// It not handled, causes react controlled / uncontrolled component error.
//
// Passes "" from input to formik value as null.
// "" - when value is edited and erased
// DRF IntegerField raises "Valid integer is required" in such case.
// * DRF DecimalField treats "" as null.
export function FormikNumberField(props) {
  const [field, meta] = useField(props);

  return (
    <NumericFormat
      {...field}
      error={meta.touched && Boolean(meta.error)}
      helperText={meta.touched && meta.error}
      {...props}
      allowNegative={false}
      decimalScale={0}
      customInput={TextField}
    />
  );
}

export function FormikDecimalField(props) {
  const [field] = useField(props);
  return <NumericFormat {...field} {...props} allowNegative={false} decimalScale={2} customInput={TextField} />;
}

// Handles initial value is undefined case
export function FormikCheckboxField({ label, ...props }) {
  const [field] = useField({ ...props, type: "checkbox" });
  const fieldValue = field.value ?? false;
  return <FormControlLabel control={<Checkbox {...field} value={fieldValue} {...props} />} label={label} />;
}

// Passes data from formik value to input:
// - null / invalid dayjs object - as null
// - vailid date string - as datejs object
//
// Passes data from input to formik value:
// - null - as null
// - invalid dayjs object - as "Invalid date"
// - valid dayjs object - as data string
//
// When TextField is erased, value is set to hh:mm, so presented as "Invalid date" in formik.
// TextField value is set to null when loses focus, handleBlur addresses this case.
export function FormikTimeField(props) {
  const [field, meta, helpers] = useField(props);

  function handleChange(value) {
    const formikValue = value?.format("HH:mm") ?? null;
    helpers.setValue(formikValue);
  }

  function handleBlur(event) {
    helpers.setTouched(true);
    if (event.target.value === null) {
      helpers.setValue(null);
    }
  }

  const parsedDayjs = dayjs(field.value, "HH:mm");
  const displayValue = parsedDayjs.isValid() ? parsedDayjs : null;
  const isError = meta.touched && Boolean(meta.error);

  return (
    <TimeField
      value={displayValue}
      onChange={handleChange}
      onBlur={handleBlur}
      {...props}
      error={isError}
      helperText={isError && meta.error}
    />
  );
}

export function FormikCalendarField({ name, sx, debug }) {
  const [field, , helpers] = useField(name);

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

  return <Calendar dateRanges={value} setDateRanges={handleChange} {...{ name, sx, debug }} />;
}
