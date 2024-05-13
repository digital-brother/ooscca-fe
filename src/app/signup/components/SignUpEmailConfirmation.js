"use client";

import { Button, Container, Typography } from "@mui/material";
import { SignUpContainer } from "./SignUpAccount";

export default function SignUpEmailConfirmation() {
  return (
    <Container sx={{ height: "100%", display: "flex", justifyContent: "center", alignItems: "center", py: 10 }}>
      <SignUpContainer>
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
      </SignUpContainer>
    </Container>
  );
}
