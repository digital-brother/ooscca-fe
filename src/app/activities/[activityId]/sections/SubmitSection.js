"use client";

import React from "react";
import { Button, Typography, Box, Checkbox, Container } from "@mui/material";
import Link from "next/link";

function FormBlock() {
  return (
    <Box>
      <Typography variant="h3" gutterBottom>
        Let's get your activities live and in front of parents!
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'left', mt: 4}}>
        <Button
          size="large"
          variant="contained"
          color="grey"
          sx={{ width: { xs: "100%", sm: "90%", lg: "80%" }}}
        >
          Save and come back later
        </Button>
        <Button
          size="large"
          variant="contained"
          color="primary"
          sx={{ width: { xs: "100%", sm: "90%", lg: "80%" }}}
        >
          Submit
        </Button>
        <Box sx={{display: "flex", alignItems: "center"}}>
          <Checkbox size="small" sx={{ml: -1}}/>
          <Typography variant="body2" color="text.secondary">
            I accept the <Link href="#">Terms and Conditions</Link> and <Link href="#">Privacy Policy</Link>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

function ImageBlock() {
  return (
    <Box>
      <Box component="img" src="/rate.png" alt="Rating" sx={{ width: "100%", mb: -3 }} />
    </Box>
  );
}

export function SubmitSection() {
  return (
    <Container sx={{ mt: 2 }}>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", lg: "repeat(2, 1fr)" },
          gap: 3,
          maxWidth: { xs: 540, lg: "none" },
          mx: "auto",
        }}
      >
        <FormBlock />
        <ImageBlock />
      </Box>
    </Container>
  );
}
