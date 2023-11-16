'use client'

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {Button, Checkbox, FormControlLabel, TextField} from "@mui/material";
import Divider from "@mui/material/Divider";
import Link from "next/link";
import MUILink from '@mui/material/Link';
import {useTheme} from "@mui/material/styles";


export default function SignUp() {
  const theme = useTheme();

  return (
    <Box sx={{textAlign: "left", mt: {xs: 5, md: 10}, mx: "auto"}}>
      <Typography variant="h4" fontWeight="bold">Easy to get started. And it’s free.</Typography>
      <Box mt={3}>
        <TextField label="Email address" variant="outlined" size="small" sx={{mr: 2, mb: 1}}/>
        <Button variant="contained" color="warning" size="large">Sign up</Button>
      </Box>
      <FormControlLabel
        control={<Checkbox/>}
        label={
          <Typography variant="body2" color="text.secondary">
            I accept the &nbsp;
            <Link href="#" passHref><MUILink color="text.secondary">Terms and Conditions</MUILink></Link> and &nbsp;
            <Link href="#" passHref><MUILink color="text.secondary">Privacy Policy</MUILink></Link>.
          </Typography>
        }
      />

      <Divider sx={{mt: 2}}/>
      <Typography variant="h6" fontWeight="bold" mt={2}>
        Already using OOSCAA? &nbsp;
        <span style={{ color: theme.palette.warning.main }}>Sign in</span>
      </Typography>
    </Box>
  )
}
