'use client'

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {Button, Checkbox, FormControlLabel, TextField} from "@mui/material";
import Divider from "@mui/material/Divider";
import Link from "next/link";
import MUILink from '@mui/material/Link';
import {useTheme} from "@mui/material/styles";
import Image from "next/image";
import Grid from "@mui/material/Grid";


function SignUpForm() {
  const theme = useTheme();

  return (
    <Box sx={{flex: 1, textAlign: {xs: "center", md: "left"}}}>
      <Typography variant="h4" fontWeight="bold">Easy to get started. And it’s free.</Typography>
      <Box sx={{mt: 3, mb: 1}}>
        <TextField label="Email address" variant="outlined" size="small" sx={{mr: 2, mb: 1}}/>
        <Button variant="contained" color="warning" size="large">Sign up</Button>
      </Box>

      <Box sx={{display: "flex", alignItems: "center", justifyContent: {xs: "center", md: "left"}}}>
        <Checkbox size="small" sx={{ml: -1}}/>
        <Typography variant="body2" color="text.secondary" sx={{lineHeight: 1, textAlign: "left"}}>
          I accept the &nbsp;
          <Link href="#" passHref><MUILink color="text.secondary">Terms and Conditions</MUILink></Link> and &nbsp;
          <Link href="#" passHref><MUILink color="text.secondary">Privacy Policy</MUILink></Link>.
        </Typography>
      </Box>

      <Divider sx={{mt: 2}}/>
      <Typography variant="h6" fontWeight="bold" mt={2}>
        Already using OOSCAA? &nbsp;
        <span style={{color: theme.palette.warning.main}}>Sign in</span>
      </Typography>
    </Box>
  )
}

export default function SignUp() {
  return (
    <Grid container spacing={{xs: 10, md: 5}} sx={{
      pt: {xs: 10, md: 10},
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
  )
}
