"use client";

import { FormikTextField } from "@/app/activities/[activityId]/edit/components/formikFields";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";
import { Box, Button, Container, IconButton, Typography } from "@mui/material";
import { Form, Formik } from "formik";
import Image from "next/image";

export default function SignUpChildren() {
  return (
    <Container sx={{ height: "100%", display: "flex", justifyContent: "center", alignItems: "center", py: 10 }}>
      <Box sx={{ border: 1, borderRadius: 1.5, width: { xs: "100%", sm: 545 }, maxWidth: 545, p: 4 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Image src="/logo.png" alt="Logo" width={160} height={36} />
          <IconButton size="small">
            <HighlightOffRoundedIcon sx={{ color: "common.black", fontSize: 28 }} />
          </IconButton>
        </Box>
        <Typography variant="h5" sx={{ mt: 6, textAlign: "center" }}>
          Children’s details
        </Typography>
        <Typography sx={{ mt: 1.5, textAlign: "center" }}>
          Add your child(ren)’s details here and we’ll do the rest
        </Typography>
        <Typography sx={{ fontWeight: 700, mt: 6 }}>Child 1</Typography>
        <Formik
          initialValues={{ firstName: "", lastName: "", displayName: "" }}
          onSubmit={(values) => console.log(values)}
        >
          <Form>
            <FormikTextField name="firstName" label="First name" fullWidth sx={{ mt: 1.5 }} />
            <FormikTextField name="lastName" label="Last name" fullWidth sx={{ mt: 1.5 }} />
            <FormikTextField name="displayName" label="Display/nick name" fullWidth sx={{ mt: 1.5 }} />
            <Button type="submit" variant="contained" color="green" fullWidth sx={{ mt: 6 }}>
              Continue
            </Button>
          </Form>
        </Formik>
      </Box>
    </Container>
  );
}
