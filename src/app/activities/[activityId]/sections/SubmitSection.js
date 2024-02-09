"use client";

import React from "react";
import {Button, Typography, Box, Checkbox, Container} from "@mui/material";
import Link from "next/link";

function FormBlock() {

  return (
    <Box>
      <Typography
        variant="h3"
        gutterBottom
        sx={{
          textAlign: {xs: 'center', lg: 'left'}, // Center text on small and middle screens
          width: '100%' // Ensure the typography takes full width for proper alignment
        }}>
        Let's get your activities live and in front of parents!
      </Typography>
      <Box sx={{
        display: 'grid',
        justifyContent: {xs: "center", lg: "left"},
        gap: 2,
        mt: 3,
        }}>
        <Button
          size="large"
          variant="contained"
          color="grey"
        >
          Save and come back later
        </Button>
        <Button
          size="large"
          variant="contained"
          color="primary"
        >
          Submit
        </Button>
        <Box sx={{display: "flex", alignItems: "center", justifyContent: {xs: "center", lg: "left"}}}>
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
    <Box component="img" src="/rate.png" alt="Rating" sx={{width: "100%", maxWidth: 540, mb: -3, mt: {xs: 3, lg: 0}}}/>
  );
}

export function SubmitSection() {
  return (
    <Container sx={{mt: 4}}>
      <Box
        sx={{
          display: "flex",
          flexDirection: {xs: "column", lg: "row"},
          justifyContent: "centre",
          gap: 3,
          maxWidth: {xs: 540, lg: "none"},
          mx: "auto",
        }}
      >
        <FormBlock/>
        <ImageBlock/>
      </Box>
    </Container>
  );
}
