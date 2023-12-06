import {Box, Button, Container} from "@mui/material";
import Typography from "@mui/material/Typography";
import DemoStepper from "@/app/(homepage)/DemoStepper";

function DemoHeader({sx}) {
  return (
    <Box sx={{textAlign: "center", maxWidth: 735, ...sx}}>
      <Typography variant="body1" color="warning.main" fontWeight="bold">
        Directly from the calendar
      </Typography>
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
      <Box component="img" src="/demo.png" sx={{mt: {xs: 7, md: 13}, width: "100%"}}/>
    </Container>
  )
}