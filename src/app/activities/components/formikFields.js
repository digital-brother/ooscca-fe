import { useField } from "formik";
import TextField from "@mui/material/TextField";
import React from "react";
import { Checkbox, FormControlLabel } from "@mui/material";
import { TimeField } from "@mui/x-date-pickers/TimeField";
import dayjs from "dayjs";

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
export function FormikNumericField(props) {
  const [field, meta, helpers] = useField(props);

  const fieldValue = field.value ?? "";

  function handleChange(event) {
    const value = event.target.value;
    helpers.setValue(value === "" ? null : value);
  }

  // const isError = meta.touched && meta.error;
  //
  // const helperText = (
  //   <>
  //     {meta.error?.map((item, index) => (
  //       <Box key={index}>{item}</Box>
  //     ))}
  //   </>
  // );

  return (
    <TextField
      type="number"
      {...field}
      value={fieldValue}
      onChange={handleChange}
      // error={isError}
      // helperText={isError && helperText}
      {...props}
    />
  );
}

// Handles initial value is undefined case
export function FormikCheckboxField({ label, ...props }) {
  const [field, meta] = useField({ ...props, type: "checkbox" });

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
    const formikValue = value?.format("HH:mm")
    console.log(`  [Set] TimeField-from ${value}`)
    console.log(`  [Set] formik-to: ${formikValue}`)
    helpers.setValue(formikValue);
  }

  function handleBlur(event) {
    helpers.setTouched(true);
    if (event.target.value === null) {
      setValue(null);
    }
  }

  const parsedDayjs = dayjs(field.value, "HH:mm");
  const displayValue = parsedDayjs.isValid() ? parsedDayjs : null

  console.log(`[Get] formik-from: ${field.value}`)
  console.log(`[Get] formik-from-parsedDayjs: ${parsedDayjs}`)
  console.log(`[Get] TimeField-to: ${displayValue}`)
  return <TimeField value={displayValue} onChange={handleChange} onBlur={handleBlur} />;
}
