"use client";

import { OssContainer } from "@/components/OosContainer";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Button,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Typography,
} from "@mui/material";
import { SmFlex } from "@/app/activities/[activityId]/edit/components/responsiveFlexes";

export default function WholeWeekDialog({
  open,
  onClose,
  onConfirm,
  activity,
  earlyDropOffDays,
  setEarlyDropOffDays,
  latePickupDays,
  setLatePickupDays,
}) {
  const totalPrice = activity?.price * 5;
  const daysOfWeek = ["M", "T", "W", "T", "F"];
  const handleCheckboxChange = (day, type) => (e) => {
    if (type === "early") {
      setEarlyDropOffDays({ ...earlyDropOffDays, [day]: e.target.checked });
    } else {
      setLatePickupDays({ ...latePickupDays, [day]: e.target.checked });
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <OssContainer sx={{ pb: 6, border: "none" }} handleClick={onClose}>
        <DialogContent sx={{ pt: 6 }}>
          <DialogContentText sx={{ mb: 2, fontWeight: 600 }}>
            This activity is only available for the whole week. The total price is ${totalPrice}. Would you like to
            proceed?
          </DialogContentText>
          {activity?.earlyDropOff && (
            <>
              <SmFlex>
                <b>Early drop off:</b> {activity?.earlyDropOffTime}
                {parseFloat(activity?.earlyDropOffPrice) ? (
                  <Typography sx={{ ml: { sm: "auto" } }}>£{activity?.earlyDropOffPrice}</Typography>
                ) : (
                  <Typography sx={{ ml: { sm: "auto" }, color: "green.main", fontWeight: 700 }}>FREE</Typography>
                )}
              </SmFlex>
              <FormGroup row>
                {daysOfWeek.map((day) => (
                  <FormControlLabel
                    key={day}
                    control={<Checkbox checked={earlyDropOffDays[day]} onChange={handleCheckboxChange(day, "early")} />}
                    label={`${day}`}
                  />
                ))}
              </FormGroup>
            </>
          )}
          {activity?.latePickUp && (
            <>
              <SmFlex>
                <b>Late pick up:</b> {activity?.latePickUpTime}
                {parseFloat(activity?.latePickUpPrice) ? (
                  <Typography sx={{ ml: { sm: "auto" } }}>£{activity?.latePickUpPrice}</Typography>
                ) : (
                  <Typography sx={{ ml: { sm: "auto" }, color: "green.main", fontWeight: 700 }}>FREE</Typography>
                )}
              </SmFlex>
              <FormGroup row>
                {daysOfWeek.map((day) => (
                  <FormControlLabel
                    key={day}
                    control={<Checkbox checked={latePickupDays[day]} onChange={handleCheckboxChange(day, "late")} />}
                    label={`${day}`}
                  />
                ))}
              </FormGroup>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={onConfirm} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </OssContainer>
    </Dialog>
  );
}
