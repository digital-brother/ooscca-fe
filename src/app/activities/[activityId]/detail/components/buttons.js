import { Button } from "@mui/material";
import React from "react";


export function CancelButton({ onClick }) {
  return (
    <Button variant="outlined" color="grey" size="large" fullWidth onClick={onClick}>
      Cancel
    </Button>
  );
}export function GoBackButton({ onClick }) {
  return (
    <Button variant="contained" color="grey" size="large" fullWidth onClick={onClick}>
      Go back
    </Button>
  );
}
export function NextButton({ onClick, label = "Next" }) {
  return (
    <Button onClick={onClick} variant="contained" fullWidth color="green" type="submit">
      {label}
    </Button>
  );
}
