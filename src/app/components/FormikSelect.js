import React from "react";
import { FormControl, FormHelperText, MenuItem, Select as MUISelect } from "@mui/material";
import { ErrorMessage, useField } from "formik";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

export function FormikSelect({ label, items, sx, name, containerSx }) {
  const [field, meta] = useField({ name });

  const isError = meta.touched && Boolean(meta.error);

  return (
    <FormControl sx={containerSx}>
      <MUISelect
        {...field}
        displayEmpty
        variant="filled"
        disableUnderline
        inputProps={{ sx: { py: 1 } }}
        IconComponent={KeyboardArrowDownIcon}
        sx={{
          borderRadius: 1,
          color: field.value ? "grey.800" : "grey.600",
          fontWeight: 700,
          textAlign: "center",
          "& .MuiSelect-icon": {
            color: field.value ? "grey.800" : "grey.600",
          },
          ...sx,
        }}
      >
        {label && <MenuItem value="">{label}</MenuItem>}
        {items.map((item, index) => (
          <MenuItem key={index} value={item.id}>
            {item.name}
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
