'use client'

import Link from "@/app/(homepage)/components/Link";
import { Button, Checkbox, Container, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";


function SignUpForm() {
  const theme = useTheme();

  return (
    <Box sx={{flex: 1, textAlign: {xs: "center", md: "left"}}}>
      <Typography variant="h2">Easy to get started. And it’s free.</Typography>
      <Box sx={{mt: 3, mb: 1}}>
        <TextField label="Email address" variant="outlined" size="small" sx={{mr: 2, mb: 1}}/>
        <Button variant="contained" color="orange" size="large">Sign up</Button>
      </Box>

      <Box sx={{display: "flex", alignItems: "center", justifyContent: {xs: "center", md: "left"}}}>
        <Checkbox size="small" sx={{ml: -1}}/>
        <Typography variant="body2" color="text.secondary">
          I accept the <Link href="/parent-terms-of-use">Terms of Use</Link> and <Link href="/privacy-policy">Privacy Policy</Link>
        </Typography>
      </Box>

      <Divider sx={{mt: 2}}/>
      <Typography variant="h6" fontWeight="bold" mt={2}>
        Already using OOSCCA? &nbsp;
        <span style={{color: theme.palette.orange.main}}>Sign in</span>
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
