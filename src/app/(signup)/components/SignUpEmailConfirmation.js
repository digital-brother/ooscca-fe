"use client";

import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";
import { Box, Button, Container, IconButton, Typography } from "@mui/material";
import Image from "next/image";

export default function SignUpDetails() {
  return (
    <Container sx={{ height: "100%", display: "flex", justifyContent: "center", alignItems: "center", py: 10 }}>
      <Box sx={{ border: 1, borderRadius: 1.5, width: { xs: "100%", sm: 545 }, maxWidth: 545, p: 4 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Image src="/logo.png" alt="Logo" width={160} height={36} />
          <IconButton size="small">
            <HighlightOffRoundedIcon sx={{ color: "common.black", fontSize: 28 }} />
          </IconButton>
        </Box>
        <Typography variant="h5" sx={{ mt: 16, textAlign: "center" }}>
          Please verify your email
        </Typography>
        <Typography sx={{ mt: 1.5, textAlign: "center" }}>
          For security, we&apos;ve sent you an email to the address you provided. Please click the link in the email to
          verify, and then log in.
        </Typography>

        <Typography sx={{ mt: 16, textAlign: "center" }}>
          If you can&apos;t find it, you can resend the email.
        </Typography>
        <Button
          type="submit"
          variant="contained"
          color="grey"
          fullWidth
          sx={{ mt: 1 }}
          onClick={() => console.log("Email confirmation")}
        >
          Resend confirmation email
        </Button>
      </Box>
    </Container>
  );
}
