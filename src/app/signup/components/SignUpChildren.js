"use client";

import {
  FormikDateField,
  FormikSelect,
  FormikTextField,
} from "@/app/activities/[activityId]/edit/components/formikFields";
import { SmFlex } from "@/app/activities/[activityId]/edit/components/responsiveFlexes";
import { getSchools } from "@/app/api.mjs";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { Button, Container, MenuItem, Typography } from "@mui/material";
import dayjs from "dayjs";
import { Form, Formik } from "formik";
import { useQuery } from "react-query";
import * as Yup from "yup";
import { SignUpContainer } from "./SignUpAccount";

export default function SignUpChildren({ goToNextStep }) {
  const { data: schools } = useQuery("schools", getSchools);

  const classesYears = Array.from({ length: 8 }, (v, i) => `Year ${i + 1}`);
  classesYears.unshift("Reception");

  return (
    <Container sx={{ height: "100%", display: "flex", justifyContent: "center", alignItems: "center", py: 10 }}>
      <SignUpContainer>
        <Typography variant="h5" sx={{ mt: 6, textAlign: "center" }}>
          Children&apos;s details
        </Typography>
        <Typography sx={{ mt: 1.5, textAlign: "center" }}>
          Add your child(ren)&apos;s details here and we&apos;ll do the rest
        </Typography>
        <Typography sx={{ fontWeight: 700, mt: 6 }}>Child 1</Typography>
        <Formik
          initialValues={{ firstName: "", lastName: "", displayName: "", birthDate: null, classYear: "", school: "" }}
          onSubmit={(values) => {
            console.log(values);
          }}
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
                  <MenuItem key={index} value={classYear}>
                    {classYear}
                  </MenuItem>
                ))}
              </FormikSelect>

              <Button
                onClick={() => {
                  formik.submitForm();
                  if (formik.isValid) formik.resetForm();
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
                  formik.submitForm();
                  if (formik.isValid) goToNextStep();
                }}
                variant="contained"
                color="green"
                fullWidth
                sx={{ mt: 1.5 }}
              >
                Continue
              </Button>
            </Form>
          )}
        </Formik>
      </SignUpContainer>
    </Container>
  );
}
