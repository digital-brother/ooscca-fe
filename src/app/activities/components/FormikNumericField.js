import { useField } from "formik";
import TextField from "@mui/material/TextField";
import React from "react";

// TODO: Rationalize on how to handle errors
// Handles cases: null value from DB, undefined value from query is loading state
export function FormikNumericField(props) {
  const [field, meta] = useField(props);

  // We need to convert null to an empty string to handle DRF returning null for empty DecimalField
  // We also need to convert undefined to an empty string to handle undefined while query is loading
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
