"use client";

import {
  FormikErrors,
  FormikTextField,
  createHandleSubmit,
} from "@/app/activities/[activityId]/edit/components/formikFields";
import { AUTH_TOKEN_KEY, login } from "@/app/api.mjs";
import { Button, Container, Typography } from "@mui/material";
import { Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import { useMutation } from "react-query";
import Link from "@/app/(homepage)/components/Link";
import * as Yup from "yup";
import { SignUpContainer } from "../signup/components/SignUpAccount";

export default function Login() {
  const mutation = useMutation(login);
  const router = useRouter();

  async function handleSubmit(values, formikHelpers) {
    const handle = createHandleSubmit({
      mutation,
      onSuccess: ({ key: token }) => {
        localStorage.setItem(AUTH_TOKEN_KEY, token);
        router.push("/booking");
      },
    });
    handle(values, formikHelpers);
  }

  return (
    <Container sx={{ height: "100%", display: "flex", justifyContent: "center", alignItems: "center", py: 10 }}>
      <SignUpContainer sx={{ textAlign: "center" }}>
        <Typography variant="h5" sx={{ mt: 6 }}>
          Log in
        </Typography>
        <Typography sx={{ mt: 1.5 }}>
          Enjoy smoother planning, minimises personal and work scheduling conflicts, and maximises healthy family time.
        </Typography>
        <Formik
          onSubmit={handleSubmit}
          initialValues={{ email: "", password: "" }}
          validationSchema={Yup.object({
            email: Yup.string().label("Email address").email("Invalid email address").required(),
            password: Yup.string().label("Password").label("Password").required(),
          })}
        >
          <Form>
            <FormikTextField name="email" label="Email Address" fullWidth sx={{ mt: 3 }} />
            <FormikTextField name="password" label="Password" type="password" fullWidth sx={{ mt: 1.5 }} />
            <FormikErrors sx={{ mt: 1.5 }} />
            <Button type="submit" variant="contained" color="green" fullWidth sx={{ mt: 6 }}>
              Login
            </Button>
            <Typography sx={{ mt: 2, textAlign: 'center' }}>
              <Link href="/signup" style={{ marginLeft: '5px', fontWeight: 'bold', color: 'green' }}>
                Create an account
              </Link>
            </Typography>
          </Form>
        </Formik>
      </SignUpContainer>
    </Container>
  );
}
