"use client";

import React from "react";
import {Button, Typography, Box, Checkbox, Container} from "@mui/material";
import Link from "@/app/(homepage)/components/Link";

function FormBlock() {

  return (
    <Box>
      <Typography
        variant="h3"
        gutterBottom
        sx={{textAlign: {xs: 'center', lg: 'left'}}}
      >
        Let&apos;s get your activities live and in front of parents!
      </Typography>
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: {xs: "center", lg: "start"},
        justifyContent: {xs: "center", lg: "left"},
        gap: 2,
        mt: 3
        }}>
        <Button
          size="large"
          variant="contained"
          color="grey"
          sx={{ width: { xs: "90%", lg: "70%" }}}
        >
          Save and come back later
        </Button>
        <Button
          size="large"
          variant="contained"
          color="primary"
          sx={{ width: { xs: "90%", lg: "70%" }}}
        >
          Submit
        </Button>
        <Box sx={{display: "flex", alignItems: "center"}}>
          <Checkbox size="small" sx={{ml: -1}}/>
          <Typography variant="body2" color="text.secondary">
            I accept the <Link href="/provider-terms-of-use">Terms and Conditions</Link> and <Link href="/provider-terms-of-use">Privacy Policy</Link>
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
          justifyContent: "center",
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
