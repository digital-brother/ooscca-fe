import React, { useState } from 'react';
import { Box, Button, Dialog, Typography } from '@mui/material';
import { TermsAndConditionsContainer } from '@/app/activities/[activityId]/edit/sections/TermsAndConditionsSection';
import { StyledMuiLink } from "@/app/(homepage)/components/Link";

function LegalContentDialog({ linkText, htmlContent }) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "start" }}>
      <StyledMuiLink onClick={handleOpen} sx={{ cursor: "pointer" }}>
        {linkText}
      </StyledMuiLink>
      <Dialog onClose={handleClose} open={open} PaperProps={{ sx: { maxWidth: "none" } }}>
        <TermsAndConditionsContainer>
          {htmlContent ? (
            <Box dangerouslySetInnerHTML={{ __html: htmlContent }} />
          ) : (
            <Typography sx={{ fontWeight: 700 }}>No content available.</Typography>
          )}
          <Button variant="contained" color="primary" fullWidth onClick={handleClose} sx={{ mt: 2 }}>
            Close
          </Button>
        </TermsAndConditionsContainer>
      </Dialog>
    </Box>
  );
}

export default LegalContentDialog;
