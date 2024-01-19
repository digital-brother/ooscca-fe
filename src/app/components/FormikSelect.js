import React from "react";
import { FormControl, FormHelperText, InputLabel, MenuItem, Select as MUISelect } from "@mui/material";
import { ErrorMessage, useField } from "formik";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { v4 as uuid } from "uuid";

export function FormikSelect({
  label,
  items,
  sx,
  name,
  containerSx,
  itemValueField = "id",
  itemLabelField = "name",
  ...props
}) {
  const [field, meta] = useField({ name, type: "select" });

  const isError = meta.touched && Boolean(meta.error);
  const labelId = uuid();

  return (
    <FormControl sx={containerSx} fullwidth>
      <InputLabel id={labelId}>{label}</InputLabel>
      <MUISelect
        {...field}
        autoWidth
        // displayEmpty
        variant="filled"
        labelId={labelId}
        label={label}
        disableUnderline
        // inputProps={{ sx: { py: 1 } }}
        IconComponent={KeyboardArrowDownIcon}
        sx={{
          borderRadius: 1,
          color: field.value ? "grey.800" : "grey.600",
          fontWeight: 700,
          textAlign: "center",
          "& .MuiSelect-icon": {
            color: field.value ? "grey.800" : "grey.600",
          },
          // height: 56,
          ...sx,
        }}
      >
        {label && <MenuItem value="">{label}</MenuItem>}
        {items.map((item, index) => (
          <MenuItem key={index} value={item[itemValueField]}>
            {item[itemLabelField]}
          </MenuItem>
        ))}
      </MUISelect>
      {isError && (
        <FormHelperText>
          <ErrorMessage name={name} />
        </FormHelperText>
      )}
    </FormControl>
  );
}

export function FormikSelectNew({ name, items, label, sx, valueField = "id", titleField = "name" }) {
  const [field, meta] = useField(name);
  const labelId = uuid();

  return (
    <FormControl sx={{ minWidth: 120, ...sx }} error={meta.touched && meta.error}>
      <InputLabel id={labelId}>{label}</InputLabel>

      <MUISelect {...field} labelId={labelId} id="demo-simple-select-helper" label={label}>
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