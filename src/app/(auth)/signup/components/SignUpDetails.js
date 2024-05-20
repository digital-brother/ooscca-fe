"use client";

import { FormikTextField, createHandleSubmit, FormikErrors } from "@/app/activities/[activityId]/edit/components/formikFields";
import { Button, Container, Typography } from "@mui/material";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { SignUpContainer } from "./SignUpAccount";
import { useMutation } from "react-query";
import { signupDetails, USER_ID_KEY } from "@/app/api.mjs";

function getUserIdFromLocalStorage() {
  return localStorage.getItem(USER_ID_KEY);
}

export default function SignUpDetails({ goToNextStep }) {
  const userId = getUserIdFromLocalStorage();
  const mutation = useMutation((data) => signupDetails(userId, data));

  async function handleSubmit(values, formikHelpers) {
    const handle = createHandleSubmit({ mutation, onSuccess: goToNextStep});
    handle(values, formikHelpers);
  }

  return (
    <Container sx={{ height: "100%", display: "flex", justifyContent: "center", alignItems: "center", py: 10 }}>
      <SignUpContainer>
        <Typography variant="h5" sx={{ mt: 6, textAlign: "center" }}>
          Welcome to OOSCCA
        </Typography>
        <Typography sx={{ mt: 1.5, textAlign: "center" }}>
          All-in-one platform that brings kids’ activity under one roof.
        </Typography>
        <Typography sx={{ fontWeight: 700, mt: 6 }}>Your details</Typography>
        <Formik
          initialValues={{ firstName: "", lastName: "", mobile: "" }}
          onSubmit={handleSubmit}
          validationSchema={Yup.object({
            firstName: Yup.string()
              .label("First name")
              .required()
              .matches(
                /^[A-Za-zÀ-ÖØ-öø-ÿ'’\- ]+$/,
                // eslint-disable-next-line no-template-curly-in-string
                "${label} must contain only letters, hyphens, apostrophes, and spaces"
              )
              .min(2)
              .max(50),
            lastName: Yup.string()
              .label("Last name")
              .required()
              .matches(
                /^[A-Za-zÀ-ÖØ-öø-ÿ'’\- ]+$/,
                // eslint-disable-next-line no-template-curly-in-string
                "${label} must contain only letters, hyphens, apostrophes, and spaces"
              )
              .min(2)
              .max(50),
            mobile: Yup.string()
              .label("Mobile number")
              .required()
              .matches(/^(07\d{9}|\+447\d{9})$/, "Mobile number must be a valid London mobile number"),
          })}
        >
          <Form>
            <FormikTextField name="firstName" label="First name" fullWidth sx={{ mt: 1.5 }} />
            <FormikTextField name="lastName" label="Last name" fullWidth sx={{ mt: 1.5 }} />
            <FormikTextField name="mobile" label="Mobile number" fullWidth sx={{ mt: 1.5 }} />
            <Button type="submit" variant="contained" color="green" fullWidth sx={{ mt: 6 }}>
              Continue
            </Button>
            <FormikErrors />
          </Form>
        </Formik>
      </SignUpContainer>
    </Container>
  );
}
