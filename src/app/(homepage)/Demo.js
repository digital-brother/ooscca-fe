import OosStepper from "@/components/OosStepper";
import { Box, Container } from "@mui/material";
import Typography from "@mui/material/Typography";


function DemoHeader({ sx, subheading1, heading1}) {
  return (
    <Box sx={{ textAlign: "center", maxWidth: 735, ...sx }}>
      {subheading1 && <Typography variant="subheading">{subheading1}</Typography>}
      {heading1 && <Typography mt={2} variant="h2">{heading1}</Typography>}
    </Box>
  );
}

function Demo({subheading,heading, steps, image}) {
  return (
    <Container sx={{ py: { xs: 6, md: 10 } }}>
      <DemoHeader sx={{ mx: "auto" }} subheading1={subheading} heading1={heading}/>
      <OosStepper sx={{ mt: 4, maxWidth: 700, mx: "auto" }} steps={steps} />
      <Box component="img" src={image} sx={{ mt: { xs: 2, sm: 10 }, width: "100%" }} />
    </Container>
  );
}


export default Demo;
