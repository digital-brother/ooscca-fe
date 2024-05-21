"use client";

import {
  FormikDateField,
  FormikSelect,
  FormikTextField,
  FormikErrors,
  createHandleSubmit,
} from "@/app/activities/[activityId]/edit/components/formikFields";
import { SmFlex } from "@/app/activities/[activityId]/edit/components/responsiveFlexes";
import { getSchools } from "@/app/api.mjs";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { Button, Container, MenuItem, Typography } from "@mui/material";
import dayjs from "dayjs";
import { Form, Formik } from "formik";
import { useMutation, useQuery } from "react-query";
import { useState } from "react"
import * as Yup from "yup";
import { SignUpContainer } from "./SignUpAccount";
import { signupChildren, USER_ID_KEY } from "@/app/api.mjs";

export default function SignUpChildren({ goToNextStep }) {
  const { data: schools } = useQuery("schools", getSchools);
  const [stayOnPage, setStayOnPage] = useState(false);
  const userId = localStorage.getItem(USER_ID_KEY);

  const classesYears = Array.from({ length: 8 }, (v, i) => `Year ${i + 1}`);
  classesYears.unshift("Reception");

  const mutation = useMutation((data) => signupChildren(userId, data));

  async function handleSubmit(values, formikHelpers) {
    const handle = createHandleSubmit({ mutation,
       onSuccess: () => {
          if (!stayOnPage) {
            goToNextStep();
          } else {
            formikHelpers.resetForm();
          }
        },
    });
    handle(values, formikHelpers);
  }

  return (
    <Container sx={{ height: "100%", display: "flex", justifyContent: "center", alignItems: "center", py: 10 }}>
      <SignUpContainer>
        <Typography variant="h5" sx={{ mt: 6, textAlign: "center" }}>
          Children&apos;s details
        </Typography>
        <Typography sx={{ mt: 1.5, textAlign: "center" }}>
          Add your child(ren)&apos;s details here and we&apos;ll do the rest
        </Typography>
        <Typography sx={{ fontWeight: 700, mt: 6 }}>Child</Typography>
        <Formik
          initialValues={{ firstName: "", lastName: "", displayName: "", birthDate: null, classYear: "", school: "" }}
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
            displayName: Yup.string()
              .label("Display/nick name")
              .required()
              .matches(
                /^[A-Za-zÀ-ÖØ-öø-ÿ'’\- ]+$/,
                // eslint-disable-next-line no-template-curly-in-string
                "${label} must contain only letters, hyphens, apostrophes, and spaces"
              )
              .min(2)
              .max(50),
            birthDate: Yup.date()
              .label("Date of birth")
              .required()
              .typeError("Invalid date")
              .min(1990)
              .max(dayjs(), `Date of birth must be before ${dayjs().format("MM/DD/YYYY")}`),
            school: Yup.number().label("School").required(),
            classYear: Yup.string().label("Class/year").required(),
          })}
        >
          {(formik) => (
            <Form>
              <FormikTextField name="firstName" label="First name" fullWidth sx={{ mt: 1.5 }} />
              <FormikTextField name="lastName" label="Last name" fullWidth sx={{ mt: 1.5 }} />
              <FormikTextField name="displayName" label="Display/nick name" fullWidth sx={{ mt: 1.5 }} />
              <SmFlex sx={{ gap: 1.5, mt: 1.5 }}>
                <FormikDateField name="birthDate" label="Date of birth" fullWidth disableFuture />
                <FormikSelect name="school" label="School" fullwidth>
                  {(schools || []).map((school) => (
                    <MenuItem key={school.id} value={school.id}>
                      {school.name}
                    </MenuItem>
                  ))}
                </FormikSelect>
              </SmFlex>
              <FormikSelect name="classYear" label="Class/year" fullwidth sx={{ mt: 1.5 }}>
                {classesYears.map((classYear, index) => (
                  <MenuItem key={index} value={index}>
                    {classYear}
                  </MenuItem>
                ))}
              </FormikSelect>

              <Button
                onClick={() => {
                  setStayOnPage(true);
                  formik.submitForm();
                }}
                variant="outlined"
                startIcon={<AddCircleOutlineIcon />}
                color="grey"
                fullWidth
                sx={{ mx: "auto", mt: 6 }}
              >
                Add another child
              </Button>
              <Button
                onClick={() => {
                  setStayOnPage(false);
                  formik.submitForm();
                }}
                variant="contained"
                color="green"
                fullWidth
                sx={{ mt: 1.5 }}
              >
                Continue
              </Button>
              <FormikErrors />
            </Form>
          )}
        </Formik>
      </SignUpContainer>
    </Container>
  );
}
