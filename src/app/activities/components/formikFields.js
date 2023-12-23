import { useField } from "formik";
import TextField from "@mui/material/TextField";
import React from "react";
import { Checkbox, FormControlLabel } from "@mui/material";

// TODO: Rationalize on how to handle errors
// Handles cases, when value is:
// - null - returned by DRF for empty DecimalField
// - undefined - returned by react-query while response is loading
// It causes react controlled / uncontrolled component error.
//
// Values in formik memory keeps being null / undefined, it affects only how we display it
// (how we pass value to a component)
//
// In case if value is edited and erased, "" is sent to backend.
// Relies on fact, that DRF treats "" as null.
export function FormikDecimalField(props) {
  const [field, meta] = useField(props);

  const fieldValue = field.value ?? "";

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
      // error={isError}
      // helperText={isError && helperText}
      {...props}
    />
  );
}

export function FormikCheckboxField({ label, ...props }) {
  const [field, meta] = useField({ ...props, type: "checkbox" });

  const fieldValue = field.value ?? false;

  return <FormControlLabel control={<Checkbox {...field} value={fieldValue} {...props} />} label={label} />;
}

// In case if value is edited and erased, "" is set as a value.
// That causes backend "Valid integer is required" error. DRF does not treat "" as null for IntegerField.
export function FormikIntegerField(props) {
  const [field, meta, helpers] = useField(props);

  const fieldValue = field.value ?? "";

  function handleChange(event) {
    const value = event.target.value;
    helpers.setValue(value === "" ? null : value);
  }

  return <TextField type="number" {...field} value={fieldValue} onChange={handleChange} {...props} />;
}
