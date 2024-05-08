"use client"

import { Box, Button, Checkbox, Container, IconButton, TextField, Typography } from "@mui/material";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";
import Image from "next/image";
import Link from "../(homepage)/components/Link";

export default function SignUp() {
  return (
    <Container sx={{ height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Box
        sx={{ border: 1, borderRadius: 1.5, width: { xs: "100%", sm: 545 }, maxWidth: 545, p: 4, textAlign: "center" }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Image src="/logo.png" alt="Logo" width={160} height={36} />
          <IconButton size="small">
            <HighlightOffRoundedIcon sx={{ color: "common.black", fontSize: 28 }} />
          </IconButton>
        </Box>
        <Typography variant="h5" sx={{ mt: 6 }}>
          Sign in or create an account
        </Typography>
        <Typography sx={{ mt: 1.5 }}>
          Enjoy smoother planning, minimises personal and work scheduling conflicts, and maximises healthy family time.
        </Typography>
        <TextField label="Email Address" type="email" fullWidth required sx={{ mt: 3 }} />
        <TextField label="Password" type="password" fullWidth required sx={{ mt: 1.5 }} />
        <TextField label="Re-enter password" type="password" fullWidth required sx={{ mt: 1.5 }} />

        {/* To be refactored to formik staff */}
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: { xs: "center", md: "left" }, mt: 6 }}>
          <Checkbox size="small" sx={{ ml: -1 }} />
          <Typography variant="body2" color="text.secondary">
            By signing up you accept our <Link href="#">Terms and Conditions</Link> and <Link href="#">Privacy Policy</Link>
          </Typography>
        </Box>

        <Button variant="contained" color="grey" fullWidth sx={{ mt: 1 }}>
          Sign up with email
        </Button>
      </Box>
    </Container>
  );
}
