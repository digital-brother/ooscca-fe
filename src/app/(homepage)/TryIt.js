'use client'

import React from 'react'
import Box from '@mui/material/Box';
import {Container} from "@mui/material";
import Typography from "@mui/material/Typography";
import {ComingSoon} from "@/app/(homepage)/components/ComingSoon";


function TryItText({benefit, sx}) {
  return (
    <Box {...sx}>
      <Typography variant="body1" color="warning.main" fontWeight="bold">
        Try it for yourself
      </Typography>
      <Typography mt={2} variant="h4" fontWeight="bold">
        OOSCCA helps your remember all the important details.
      </Typography>
      <Typography mt={2} variant="body1" color="text.secondary">
        You shouldn’t have your work cut out finding and matching dates and timings, birthdates or the parents’ name
      </Typography>
    </Box>
  )
}

export default function TryIt() {
  return (
    <Container sx={{py: {xs: 6, md: 10}}}>
      <TryItText sx={{maxWidth: 730, textAlign: "center", mx: "auto"}}/>
      <ComingSoon/>
    </Container>
  )
}
