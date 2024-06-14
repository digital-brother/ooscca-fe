"use client";

import Link from "@/app/(homepage)/components/Link";
import {
  FormikCheckboxField,
  FormikTextField,
  FormikErrors,
  createHandleSubmit,
} from "@/app/activities/[activityId]/edit/components/formikFields";
import { Button, Container, Typography } from "@mui/material";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { useMutation } from "react-query";
import { signupAccount, USER_ID_KEY } from "@/app/api.mjs";
import { OssContainer } from "@/components/OosContainer";

export default function SignUpAccount({ goToNextStep }) {
  const mutation = useMutation(signupAccount);

  async function handleSubmit(values, formikHelpers) {
    const handle = createHandleSubmit({
      mutation,
      onSuccess: (data) => {
        localStorage.setItem(USER_ID_KEY, data.userId);
        goToNextStep();
      },
    });
    handle(values, formikHelpers);
  }

  return (
    <Container sx={{ height: "100%", display: "flex", justifyContent: "center", alignItems: "center", py: 10 }}>
      <OssContainer sx={{ border: 1, borderRadius: 1.5, textAlign: "center" }}>
        <Typography variant="h5" sx={{ mt: 6 }}>
          Sign in or create an account
        </Typography>
        <Typography sx={{ mt: 1.5 }}>
          Enjoy smoother planning, minimises personal and work scheduling conflicts, and maximises healthy family time.
        </Typography>
        <Formik
          onSubmit={handleSubmit}
          initialValues={{ email: "", password1: "", password2: "", termsConditionsAccepted: false }}
          validationSchema={Yup.object({
            email: Yup.string().email("Invalid email address").required("Required"),
            password1: Yup.string()
              .label("Password")
              .min(8, "Password must be at least 8 characters")
              .max(20, "Password must be 20 characters or less")
              .matches(/[a-z]/, "Password must contain at least one lowercase letter")
              .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
              .matches(/[0-9]/, "Password must contain at least one number")
              .matches(/[@$!%*?&]/, "Password must contain at least one special character (@, $, !, %, *, ?, &)")
              .required(),
            password2: Yup.string()
              .label("Re-enter password")
              .oneOf([Yup.ref("password1")], "Passwords must match")
              .required(),
            termsConditionsAccepted: Yup.boolean().oneOf([true], "You must accept the Terms of Use"),
          })}
        >
          <Form>
            <FormikTextField name="email" label="Email Address" fullWidth sx={{ mt: 3 }} />
            <FormikTextField name="password1" label="Password" type="password" fullWidth sx={{ mt: 1.5 }} />
            <FormikTextField name="password2" label="Re-enter password" type="password" fullWidth sx={{ mt: 1.5 }} />
            <FormikCheckboxField
              name="termsConditionsAccepted"
              label={
                <Typography variant="body2" color="text.secondary">
                  By signing up you accept <Link href="/parent-terms-of-use">Terms and Conditions</Link> and{" "}
                  <Link href="/">Privacy Policy</Link>
                </Typography>
              }
              sx={{ mt: 6 }}
            />
            <Button type="submit" variant="contained" color="grey" fullWidth sx={{ mt: 1, mb: 2 }}>
              Sign up with email
            </Button>
              <Link href="/login" sx={{textDecoration: "none", fontWeight: 600}}>
                Sign in to account
              </Link>
            <FormikErrors />
          </Form>
        </Formik>
      </OssContainer>
    </Container>
  );
}
