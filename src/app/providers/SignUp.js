'use client'

import Link from "@/app/providers/components/Link";
import { Button, Checkbox, Container, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import Image from "next/image";

function SignUpForm() {
  const theme = useTheme();

  return (
    <Box sx={{flex: 1, textAlign: {xs: "center", md: "left"}}}>
      <Typography variant="subheading">
        New parents joining dialy
      </Typography>

      <Typography mt={3} variant="h2">Reaching parents.</Typography>
      <Typography variant="h2">Made easy.</Typography>
      <Typography mt={4} variant="body1"
        fontFamily="Manrope"
        fontSize={24}
        fontWeight={400}
        lineHeight="32px" 
        textAlign="left"
        color="text.secondary"
        sx={{ fontWeight: 'light' }}>
        OOSCCA is a shareable multi-activity booking,
        and managing platform built to bring you and the
        parents under one roof. Now you can be visible
        every time parents are looking to book an activity.
      </Typography>

      <Box sx={{ mt: 3, mb: 1, display: 'flex', alignItems: 'center' }}>
        <TextField label="Email address" variant="outlined" size="small"
            sx={{ width: '70%', mr: 2, '& .MuiOutlinedInput-input': { padding: '12px 14px' } }}
            inputProps={{ style: { height: '100%' } }}
        />
        <Button variant="contained" color="orange" size="large" sx={{ height: '100%', minWidth: 'auto' }}>
        Sign up
        </Button>
      </Box>

      <Box sx={{display: "flex", alignItems: "center", justifyContent: {xs: "center", md: "left"}}}>
        <Checkbox size="small" sx={{ml: -1}}/>
        <Typography variant="body2" color="text.secondary">
          I accept the <Link href="#">Terms and Conditions</Link> and <Link href="#">Privacy Policy</Link>
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
            <Image src="/doing 1.png"width={495.77}
            height={356.96} top={286.9} left={1336.88}
            gap={0} opacity={0} angle={-180}/>
          </Box>
        </Grid>
      </Grid>
    </Container>
  )
}
