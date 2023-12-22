import React from "react";
import { FormControl, FormHelperText } from "@mui/material";
import { ErrorMessage, useField } from "formik";

export function FormikSelect({ label, items, sx, name }) {
  const [field, meta] = useField({ name });

  return (
    <FormControl sx={{ minWidth: 120, ...sx }} fullWidth>
      <FormikSelect />
      <FormHelperText>
        <ErrorMessage name={name} />
      </FormHelperText>
    </FormControl>
  );
}
