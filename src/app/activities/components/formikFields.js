import { useField } from "formik";
import TextField from "@mui/material/TextField";
import React from "react";
import { Checkbox, FormControlLabel } from "@mui/material";
import { TimeField } from "@mui/x-date-pickers/TimeField";
import dayjs from "dayjs";

// TODO: Rationalize on how to handle errors
// Handles cases, when value initial value is:
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

export function FormikTimeField(props) {
  const [field, meta, helpers] = useField(props);
  // const initialValue = dayjs("22:16:37", "HH:mm")
  // const initialValue = null
  // const [value, setValue] = useState(initialValue);

  console.log(field);

  const fieldValue = dayjs(field.value, "HH:mm");

  function handleChange(value) {
    const formikValue = value?.format("HH:mm")
    helpers.setValue(formikValue);
  }

  // const fieldValue = dayjs(value);
  // const [field, meta] = useField(props);

  // const isString = typeof field.value === "string";
  // const fieldValue = isString ? dayjs(field.value, "HH:mm") : field.value;

  // return <TimeField {...field} value={fieldValue} {...props} />;

  return <TimeField value={fieldValue} onChange={handleChange} />;
  // return <TimeField value={value} onChange={(value) => setValue(value)} {...props} />;
}
