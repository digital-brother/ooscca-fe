import {Box, Button, Container} from "@mui/material";
import Typography from "@mui/material/Typography";
import OosStepper from "@/components/OosStepper";

function DemoHeader({sx}) {
  return (
    <Box sx={{textAlign: "center", maxWidth: 735, ...sx}}>
      <Typography variant="subheading">
        Directly from the calendar
      </Typography>
      <Typography mt={2} variant="h2">
        Discover the ease of booking activities without the text and email tennis
      </Typography>
    </Box>
  )
}

export default function Demo() {
  const steps = [
    "Find the activities your child will love",
    "Add them to child’s calendar",
    "Review and then pay for all in one click",
  ];
  return (
    <Container sx={{ py: { xs: 6, md: 10 } }}>
      <DemoHeader sx={{ mx: "auto" }} />
      <OosStepper sx={{ mt: 4, maxWidth: 700, mx: "auto" }} steps={steps} />
      <Box component="img" src="/demo.png" sx={{ mt: { xs: 2, sm: 10 }, width: "100%" }} />
    </Container>
  );
}