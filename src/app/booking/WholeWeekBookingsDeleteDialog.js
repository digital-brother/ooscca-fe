"use client";

import { OssContainer } from "@/components/OosContainer";
import { Dialog, DialogActions, DialogContent, DialogContentText, Button } from "@mui/material";

export default function WholeWeekBookingsDeleteDialog({ open, onClose, onConfirm, providerName }) {
  return (
    <Dialog open={open} onClose={onClose}>
      <OssContainer sx={{ pb: 6, border: "none" }} handleClick={onClose}>
        <DialogContent sx={{ pt: 6 }}>
          <DialogContentText>
            This activity is for the whole week. Do you want to delete all bookings from {providerName} this week?
          </DialogContentText>
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
