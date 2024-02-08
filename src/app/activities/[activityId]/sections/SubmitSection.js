"use client";

import React from "react";
import { Button, Grid, Typography, Box, FormControlLabel, Checkbox, Container } from "@mui/material";
import Link from "next/link";

function FormBlock() {
  return (
    <Box>
      <Typography variant="h3" gutterBottom>
        Let's get your activities live and in front of parents!
      </Typography>
      <Grid container spacing={2} justifyContent="left">
        <Grid item xs={12}>
          <Button variant="contained" color="grey" sx={{ width: { xs: "100%", sm: "90%", lg: "80%" } }}>
            Save and come back later
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" sx={{ width: { xs: "100%", sm: "90%", lg: "80%" } }}>
            Submit
          </Button>
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox name="checkedC" />}
            label={
              <Typography>
                I accept the{" "}
                <Link href="/terms" sx={{ cursor: "pointer" }}>
                  Terms and Conditions
                </Link>
                {" and "}
                <Link href="/privacy" sx={{ cursor: "pointer" }}>
                  Privacy Policy
                </Link>
              </Typography>
            }
          />
        </Grid>
      </Grid>
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
