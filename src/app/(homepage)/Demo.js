import {Box, Button, Container} from "@mui/material";
import Typography from "@mui/material/Typography";
import Image from "next/image";

function DemoHeader({sx}) {
  return (
    <Box sx={{textAlign: "center", maxWidth: 735, ...sx}}>
      <Typography variant="body2" color="warning.main" fontWeight="bold">
        Directly from the calendar
      </Typography>
      <Typography mt={2} variant="h3" fontWeight="bold">
        Discover the ease of booking activities - the right way
      </Typography>
      <Typography mt={2} variant="body1" color="text.secondary">
        We know when kids are going to be Out Of School so why not plan by calendar instead by
        activities. It’s that simple, easy and intuitive. Trying to working through different
        calendars, schedules, clubs, fixtures, messaging apps to arrange an activity with
        classmates made easy. Share your calendar with fellow parents to synchronise fun time.
      </Typography>
    </Box>
  )
}

export default function Demo() {
  return (
    <Container sx={{py: {xs: 6, md: 10}}}>
      <DemoHeader sx={{mx: "auto"}}/>
      <Box component="img" src="/demo.png" sx={{mt: {xs:7, md: 10}, width: "100%"}}/>
    </Container>
  )
}