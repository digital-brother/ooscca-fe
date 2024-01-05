import { useField } from "formik";
import TextField from "@mui/material/TextField";
import React from "react";
import { Checkbox, FormControlLabel } from "@mui/material";
import { TimeField } from "@mui/x-date-pickers/TimeField";
import dayjs from "dayjs";
import Calendar from "./Calendar";
import { NumericFormat } from "react-number-format";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/en-gb";

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

  function onChange(newValue) {
    const isValidDayjs = dayjs.isDayjs(newValue) && newValue.isValid();
    if (isValidDayjs) helpers.setValue(newValue.format("HH:mm"));
    else helpers.setValue(newValue);
  }

  const isValidDayjs = typeof field.value === "string" 
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
