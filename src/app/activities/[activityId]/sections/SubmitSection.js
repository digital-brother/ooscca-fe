"use client";

import React from 'react';
import {Button, Grid, Typography, Box, FormControlLabel, Checkbox, Container} from '@mui/material';
import {LgFlex} from "@/app/activities/[activityId]/components/responsiveFlexes";
import ImageUpload from "@/app/activities/[activityId]/components/ImageUpload";
import Link from "next/link";


function FormBlock() {
  return (
    <Box sx={{ width: "100%" }}>
      <Typography variant="h3" gutterBottom>
        Let's get your activities live and in front of parents!
      </Typography>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12}>
          <Button
            variant="contained"
            fullWidth
            sx={{
              width: "70%",
              bgcolor: '#333', // This is a dark gray, almost black color
              color: 'white',
              '&:hover': {
                bgcolor: '#555' // Slightly lighter gray for the hover state
              }
            }}
          >
            Save and come back later
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" fullWidth sx={{ width: "70%" }}>
            Submit
          </Button>
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox name="checkedC" />}
            label={
              <Typography>
                I accept the{' '}
                <Link href="/terms" sx={{ cursor: 'pointer' }}>
                  Terms and Conditions
                </Link>
                {' and '}
                <Link href="/privacy" sx={{ cursor: 'pointer' }}>
                  Privacy Policy
                </Link>.
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
    <Box sx={{ width: "100%" }}>
      <Box component="img" src="/rate.png" alt="Rating" />
    </Box>
  );
}

export function SubmitSection(sx) {
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
