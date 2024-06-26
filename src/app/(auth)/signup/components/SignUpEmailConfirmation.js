"use client";

import { useMutation } from "react-query";
import { Button, Container, Typography } from "@mui/material";
import { OssContainer } from "@/components/OosContainer";
import { resendEmail, USER_ID_KEY } from "@/app/api.mjs";
import { Error } from "@/app/activities/[activityId]/edit/components/formikFields";

export default function SignUpEmailConfirmation() {

  const userId = localStorage.getItem(USER_ID_KEY);
  const mutation = useMutation(() => resendEmail({userId}));

  return (
    <Container sx={{ height: "100%", display: "flex", justifyContent: "center", alignItems: "center", py: 10 }}>
      <OssContainer sx={{ border: 1, borderRadius: 1.5 }}>
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
          onClick={mutation.mutate}
        >
          Resend confirmation email
        </Button>
        <Typography sx={{ mt: 2, textAlign: "center",  fontWeight: 600, }}>Please check your junk/spam folder if you don&apos;t see the verification email in your inbox</Typography>
        <Error>{mutation.isError && mutation.error.message}</Error>
      </OssContainer>
    </Container>
  );
}
