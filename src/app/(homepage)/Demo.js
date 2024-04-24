import OosStepper from "@/components/OosStepper";
import { Box, Container } from "@mui/material";
import Typography from "@mui/material/Typography";

function DemoHeader({ sx, subheading1, heading1, heading2}) {
  return (
    <Box sx={{ textAlign: "center", maxWidth: 735, ...sx }}>
      {subheading1 && <Typography variant="subheading">{subheading1}</Typography>}
      {heading1 && <Typography mt={2} variant="h2">{heading1}</Typography>}
    </Box>
  );
}

export default function Demo({ config }) {

  return (
    <Container sx={{ py: { xs: 6, md: 10 } }}>
      <DemoHeader sx={{ mx: "auto" }} subheading1={config.subheading} heading1={config.heading1}/>
      <OosStepper sx={{ mt: 4, maxWidth: 700, mx: "auto" }} steps={config.steps} />
      <Box component="img" src={config.imageUrl} sx={{ mt: { xs: 2, sm: 10 }, width: "100%" }} />
    </Container>
  );
}