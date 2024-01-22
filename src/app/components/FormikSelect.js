import React from "react";
import { FormControl, FormHelperText, InputLabel, MenuItem, Select as MUISelect } from "@mui/material";
import { useField } from "formik";


export function FormikSelect({ name, items, label, sx, variant, fullwidth, children }) {
  const [field, meta] = useField(name);

  return (
    <FormControl error={meta.touched && Boolean(meta.error)} sx={{ minWidth: 120, ...sx }} variant={variant} fullWidth={fullwidth}>
      <InputLabel>{label}</InputLabel>

      <MUISelect {...field} label={label}>
        {children}
      </MUISelect>
      {meta.touched && meta.error && <FormHelperText> {meta.error} </FormHelperText>}
    </FormControl>
  );
}
