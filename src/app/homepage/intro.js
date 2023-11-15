import {Box, Button} from "@mui/material";
import Typography from "@mui/material/Typography";
import Grid from '@mui/material/Grid';

function IntroText() {
  return (
    <>
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
    </>
  )
}

function IntroImage() {
  return (
    <Box maxWidth={500}>
      <img src="/demo.svg" width="100%"/>
    </Box>
  )
}

export default function Intro() {
  return (
    <Grid container justifyContent="center" rowSpacing={5} columnSpacing={10} py={{xs: 5, md: 10}}>
      <Grid item>
        <IntroImage/>
      </Grid>
      <Grid item maxWidth={473} textAlign={{xs: "center", md: "left"}} px={3}>
        <IntroText/>
      </Grid>
    </Grid>
  )
}
