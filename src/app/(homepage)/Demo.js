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

function Demo(props) {
  console.log(props)
  return (
    <Container sx={{ py: { xs: 6, md: 10 } }}>
      <DemoHeader sx={{ mx: "auto" }} subheading1={props.subheading} heading1={props.heading1}/>
      <OosStepper sx={{ mt: 4, maxWidth: 700, mx: "auto" }} steps={props.steps} />
      <Box component="img" src={props.imageUrl} sx={{ mt: { xs: 2, sm: 10 }, width: "100%" }} />
    </Container>
  );
}

const HomepageDemo = () => (
  <Demo
    subheading= "Directly from the calendar"
    heading1= "Discover the ease of booking activities without the text and email tennis"
    steps= {[
      "Find the activities your child will love",
      "Add them to child's calendar",
      "Review and then pay for all in one click",
    ]}
    imageUrl= "/demo.png"
    name='Homepage'
   />
);

export default Demo;
export {  HomepageDemo  };