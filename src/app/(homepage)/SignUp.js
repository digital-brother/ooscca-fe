'use client'

import Link from "@/app/(homepage)/components/Link";
import { Button, Checkbox, Container, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";


function SignUpField() {
  return (
    <Box sx={{ mt: 3, mb: 1, display: 'flex', alignItems: 'center' }}>
      <TextField
        label="Email address"
        variant="outlined"
        size="small"
        sx={{ width: '70%', mr: 2 }}
      />
      <Button variant="contained" color="orange" size="large" sx={{ height: '100%', minWidth: 'auto' }}>
        Sign up
      </Button>
    </Box>
  );
}

function AgreementSection() {
  const theme = useTheme();
  return (
    <Box sx={{ display: "flex", alignItems: "center", justifyContent: { xs: "center", md: "left" } }}>
      <Checkbox size="small" sx={{ ml: -1 }} />
      <Typography variant="body2" color="text.secondary">
        I accept the <Link href="#">Terms and Conditions</Link> and <Link href="#">Privacy Policy</Link>
      </Typography>
      <Divider sx={{ mt: 2 }} />
      <Typography variant="h6" fontWeight="bold" mt={2}>
        Already using OOSCCA? &nbsp;
        <span style={{ color: theme.palette.orange.main }}>Sign in</span>
      </Typography>
    </Box>
  );
}

function SignUpForm({ subheading, heading1, heading2, bodyText }) {
  return (
    <Box sx={{ flex: 1, textAlign: { xs: 'center', md: 'left' } }}>
      {subheading && <Typography variant="subheading">{subheading}</Typography>}
      {heading1 && <Typography mt={3} variant="h2">{heading1}</Typography>}
      {heading2 && <Typography variant="h2">{heading2}</Typography>}
      {bodyText && <Typography mt={4} variant="h7">{bodyText}</Typography>}
      <SignUpField />
      <AgreementSection />
    </Box>
  );
}

export default function SignUp({ config }) {
  return (
    <Container sx={{ pt: { xs: 5, md: 10 } }}>
      <Grid container spacing={{ xs: 10, md: 5 }} sx={{ textAlign: 'center' }}>
        <Grid item xs={12} md={6}>
          <SignUpForm {...config} />
        </Grid>
        <Grid item xs={12} md={6}>
          <Box sx={{ maxWidth: { xs: 370, md: 520 }, mx: 'auto', mb: -1 }}>
            <img src={config.imageUrl} style={{width: "100%"}}/>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}