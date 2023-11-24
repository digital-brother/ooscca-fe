'use client'

import {Box, Button} from "@mui/material";
import Typography from "@mui/material/Typography";
import useMediaQuery from '@mui/material/useMediaQuery';
import {useTheme} from '@mui/material/styles';

function IntroText(props) {
  return (
    <Box textAlign={{xs: "center", md: "left"}} {...props}>
      <Typography variant="body2" color="text.secondary">
        Bringing activity planning into 21st century.
      </Typography>
      <Typography mt={2} variant="h4" fontWeight="bold">
        Effortless to find and manage Out Of School Activities
      </Typography>
      <Typography mt={2} variant="body1" color="text.secondary">
        All-in-one platform that reimagines the way to arrange and pay activities.
      </Typography>
      <Button sx={{mt: 2}} variant="contained" color="warning">
        Sign in to plan better
      </Button>
    </Box>
  )
}

function IntroImage() {
  const theme = useTheme();
  const mdUp = useMediaQuery(theme.breakpoints.up('md'));
  const lgUp = useMediaQuery(theme.breakpoints.up('lg'));

  const image = lgUp ? "/demo-md.svg" : "/demo.svg"
  const maxWidth = mdUp ? 700 : 500

  return (
    <Box width="100%" maxWidth={maxWidth}>
      <img src={image} width="100%" />
    </Box>
  )
}

export default function Intro() {
  return (
    <Box sx={{
      display: "flex", flexDirection: {xs: "column", md: "row-reverse"},
      justifyContent: "space-evenly", alignItems: "center",
    }}>
        <IntroImage/>
        <IntroText sx={{mr: {xs: 0, md: 5}, mt: {xs: 5, md: 0}}}/>
    </Box>
  )
}
