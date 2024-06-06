'use client'

import Link from "@/app/(homepage)/components/Link";
import {
  FormikTextField,
  FormikCheckboxField
} from "@/app/activities/[activityId]/edit/components/formikFields";
import { Button, Container, TextField } from "@mui/material";
import MuiLink from '@mui/material/Link';
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import { useRouter } from "next/navigation";
import { Formik, Form } from 'formik';

function SignUpForm() {
  const theme = useTheme();
  const router = useRouter();

  return (
    <Box sx={{flex: 1, textAlign: {xs: "center", md: "left"}}}>
      <Typography variant="h2">Easy to get started. And it&apos;s free.</Typography>
      <Formik 
        initialValues={{ email: '', acceptPolicy: false }}
        onSubmit={(values) => {
            router.push(`/signup?email=${encodeURIComponent(values.email)}&acceptPolicy=${values.acceptPolicy}`);
        }}
      >
        <Form>
          <Box sx={{mt: 3, mb: 1}}>
            <FormikTextField name="email" label="Email address" variant="outlined" size="small" sx={{mr: 2, mb: 1}}/>
            <Button type="submit" variant="contained" color="orange" size="large">Sign up</Button>
          </Box>

          <Box sx={{display: "flex", alignItems: "center", justifyContent: {xs: "center", md: "left"}}}>
            <FormikCheckboxField size="small" name="acceptPolicy" sx={{ml: -1}}
            label={ <Typography variant="body2" color="text.secondary">
                      I accept the <Link href="#">Terms and Conditions</Link> and <Link href="#">Privacy Policy</Link>
                    </Typography> }
            />
          </Box>
        </Form>
      </Formik>

      <Divider sx={{mt: 2}}/>
      <Typography variant="h6" fontWeight="bold" mt={2}>
        Already using OOSCCA? &nbsp;
        <MuiLink href="/login" sx={{ textDecoration: 'none', color: 'orange' }}>Sign in</MuiLink>
      </Typography>
    </Box>
  )
}

export default function SignUp() {
  return (
    <Container sx={{pt: {xs: 5, md: 10}}}>
      <Grid container spacing={{xs: 10, md: 5}} sx={{
        textAlign: "center",
      }}>
        <Grid item xs={12} md={6}>
          <SignUpForm/>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box sx={{
            maxWidth: {xs: 370, md: 520},
            mx: "auto",
            mb: -1,
          }}>
            <img src="/signup.svg" style={{width: "100%"}}/>
          </Box>
        </Grid>
      </Grid>
    </Container>
  )
}
