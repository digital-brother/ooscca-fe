'use client'

import {Box, Button} from "@mui/material";
import Typography from "@mui/material/Typography";
import Grid from '@mui/material/Grid';
import useMediaQuery from '@mui/material/useMediaQuery';
import {useTheme} from '@mui/material/styles';

function IntroText() {
  return (
    <Box textAlign={{xs: "center", md: "left"}} border={1} width={270}>
      <Typography variant="body1" color="text.secondary">
        Bringing activity planning into 21st century.
      </Typography>
      <Typography mt={3} variant="h4" fontWeight="bold">
        Effortless to find and manage Out Of School Activities
      </Typography>
      <Typography mt={3} variant="body1" color="text.secondary">
        All-in-one platform that reimagines the way to arrange and pay activities.
      </Typography>
      <Button sx={{mt: 3}} variant="contained" color="warning">
        Sign in to plan better
      </Button>
    </Box>
  )
}

function IntroImage() {
  const theme = useTheme();
  const mdUp = useMediaQuery(theme.breakpoints.up('md'));

  const image = mdUp ? "/demo-md.svg" : "/demo.svg"

  return (
    <Box width="100%" maxWidth={700}>
      <img src={image} width="100%" style={{border: '1px solid black'}}/>
    </Box>
  )
}

export default function Intro() {
  return (
    <Grid container flexDirection={{xs: "row", md: "row-reverse"}}
          spacing={5} my={{md: 10}}>
      <Grid item xs={12} md={8}
            sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}
            border={1}
      >
        <IntroImage/>
      </Grid>

      <Grid item xs={12} md={4}
            sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}
            border={1}
      >
        <IntroText/>
      </Grid>

    </Grid>
  )
}
