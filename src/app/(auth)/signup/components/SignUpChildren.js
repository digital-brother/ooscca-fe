"use client";

import {
  FormikDateField,
  FormikErrors,
  FormikSelect,
  FormikTextField,
  createHandleSubmit,
} from "@/app/activities/[activityId]/edit/components/formikFields";
import { SmFlex } from "@/app/activities/[activityId]/edit/components/responsiveFlexes";
import { USER_ID_KEY, getSchools, signupChildren } from "@/app/api.mjs";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { Button, Container, MenuItem, Typography } from "@mui/material";
import dayjs from "dayjs";
import { Form, Formik } from "formik";
import { useMutation, useQuery } from "react-query";
import * as Yup from "yup";
import { OssContainer } from "@/components/OosContainer";
import { useState } from "react";

export default function SignUpChildren({ goToNextStep }) {
  const { data: schools } = useQuery("schools", getSchools);
  const [isLastChild, setisLastChild] = useState(false);

  const userId = localStorage.getItem(USER_ID_KEY);
  const mutation = useMutation((data) => signupChildren(isLastChild, userId, data));

  function handleSubmit(values, formikHelpers) {
    const handle = createHandleSubmit({ mutation,
      onSuccess: () => {
        if (isLastChild) goToNextStep()
        else formikHelpers.resetForm()
       },
    });
    handle(values, formikHelpers);
  }

  const classesYears = Array.from({ length: 8 }, (v, i) => `Year ${i + 1}`);
  classesYears.unshift("Reception");

  return (
    <Container sx={{ height: "100%", display: "flex", justifyContent: "center", alignItems: "center", py: 10 }}>
      <OssContainer sx={{ border: 1, borderRadius: 1.5 }}>
        <Typography variant="h5" sx={{ mt: 6, textAlign: "center" }}>
          Children&apos;s details
        </Typography>
        <Typography sx={{ mt: 1.5, textAlign: "center" }}>
          Add your child(ren)&apos;s details here and we&apos;ll do the rest
        </Typography>
        <Typography sx={{ fontWeight: 700, mt: 6 }}>Child</Typography>
        <Formik
          initialValues={{ firstName: "", lastName: "", displayName: "", birthDate: null, classYear: "", school: "", allergiesMedical: "" }}
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
              .max(34),
            lastName: Yup.string()
              .label("Last name")
              .required()
              .matches(
                /^[A-Za-zÀ-ÖØ-öø-ÿ'’\- ]+$/,
                // eslint-disable-next-line no-template-curly-in-string
                "${label} must contain only letters, hyphens, apostrophes, and spaces"
              )
              .min(2)
              .max(34),
            displayName: Yup.string()
              .label("Display/nick name")
              .required()
              .matches(
                /^[A-Za-zÀ-ÖØ-öø-ÿ'’\- ]+$/,
                // eslint-disable-next-line no-template-curly-in-string
                "${label} must contain only letters, hyphens, apostrophes, and spaces"
              )
              .min(2)
              .max(64),
            birthDate: Yup.date()
              .label("Date of birth")
              .required()
              .typeError("Invalid date")
              .min(1990)
              .max(dayjs(), `Date of birth must be before ${dayjs().format("MM/DD/YYYY")}`),
            school: Yup.number().label("School").required(),
            classYear: Yup.string().label("Class/year").required(),
            allergiesMedical: Yup.string().label("Allergies/Medical").max(350),
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
              <FormikTextField name="allergiesMedical" label="Allergies/Medical" multiline rows={4} fullWidth sx={{ mt: 1.5 }} />

              <Button
                onClick={() => {
                  setisLastChild(false);
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
                  setisLastChild(true);
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
      </OssContainer>
    </Container>
  );
}
