import OosStepper from "@/components/OosStepper";
import { Box, Container } from "@mui/material";
import Typography from "@mui/material/Typography";
import NextImage from "next/image";

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
      <OosStepper sx={{ mt: 4, maxWidth: 700, mx: "auto", mb: { xs: 2, sm: 10 } }} steps={steps} />
        <NextImage 
          src="/demo.png"
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: '100%', height: 'auto' }}
        />
    </Container>
  );
}
