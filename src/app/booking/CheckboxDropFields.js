"use client";

import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Box, Typography } from "@mui/material";

export default function CheckboxDropFields({
  activity,
  isEarlyDropOffSelected,
  setIsEarlyDropOffSelected,
  isLatePickUpSelected,
  setIsLatePickUpSelected,
}) {
  return (
    <FormGroup>
      {activity?.earlyDropOff && (
        <FormControlLabel
          control={
            <Checkbox
              checked={isEarlyDropOffSelected}
              onChange={() => setIsEarlyDropOffSelected(!isEarlyDropOffSelected)}
              color="primary"
            />
          }
          label={
            <Typography variant="body2">
              <b>
                {parseFloat(activity?.earlyDropOffPrice) ? (
                  `£${activity?.earlyDropOffPrice}`
                ) : (
                  <Box component="span" sx={{ color: "green.main" }}>
                    FREE
                  </Box>
                )}
              </b>
              &nbsp; Early drop off {activity?.earlyDropOffTime}
            </Typography>
          }
        />
      )}
      {activity?.latePickUp && (
        <FormControlLabel
          control={
            <Checkbox
              checked={isLatePickUpSelected}
              onChange={() => setIsLatePickUpSelected(!isLatePickUpSelected)}
              color="primary"
            />
          }
          label={
            <Typography variant="body2">
              <b>
                {parseFloat(activity?.latePickUpPrice) ? (
                  `£${activity?.latePickUpPrice}`
                ) : (
                  <Box component="span" sx={{ color: "green.main" }}>
                    FREE
                  </Box>
                )}
              </b>
              &nbsp; Late pick up {activity?.latePickUpTime}
            </Typography>
          }
        />
      )}
    </FormGroup>
  );
}
