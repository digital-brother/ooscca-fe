import {Box, Button, Container} from "@mui/material";
import Typography from "@mui/material/Typography";
import DemoStepper from "@/app/(homepage)/DemoStepper";

import {SubHeader} from "@/app/(homepage)/components";

function DemoHeader({sx}) {
  return (
    <Box sx={{textAlign: "center", maxWidth: 735, ...sx}}>
      <SubHeader>
        Directly from the calendar
      </SubHeader>
      <Typography mt={2} variant="h3" fontWeight="bold">
        Discover the ease of booking activities without the text and email tennis
      </Typography>
    </Box>
  )
}

export default function Demo() {
  return (
    <Container sx={{py: {xs: 6, md: 10}}}>
      <DemoHeader sx={{mx: "auto"}}/>
      <DemoStepper sx={{mt: 4, maxWidth: 700, mx: "auto"}}/>
      <Box component="img" src="/demo.png" sx={{mt: {xs: 2, sm: 10}, width: "100%"}}/>
    </Container>
  )
}