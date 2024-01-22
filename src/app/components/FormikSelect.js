import React from "react";
import { FormControl, FormHelperText, InputLabel, MenuItem, Select as MUISelect } from "@mui/material";
import { useField } from "formik";


export function FormikSelect({ name, items, label, sx, variant, valueField = "id", titleField = "name" }) {
  const [field, meta] = useField(name);

  return (
    <FormControl error={meta.touched && Boolean(meta.error)} sx={{ minWidth: 120, ...sx }} variant={variant}>
      <InputLabel>{label}</InputLabel>

      <MUISelect {...field} label={label}>
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {items.map((item) => (
          <MenuItem key={item[valueField]} value={item[valueField]}>
            {item[titleField]}
          </MenuItem>
        ))}
      </MUISelect>
      {meta.touched && meta.error && <FormHelperText> {meta.error} </FormHelperText>}
    </FormControl>
  );
}
