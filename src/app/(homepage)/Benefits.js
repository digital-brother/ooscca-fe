import Grid from "@mui/material/Grid";
import {Box, Container} from "@mui/material";
import Typography from "@mui/material/Typography";

const BENEFITS = [
  {
    icon: "/hat.svg",
    subheader: "Parenting is hard enough",
    header: "Multiple bookings. One Seamless Experience",
    description: "Whether it's a dance class on Monday, a tennis session on Wednesday, or a craft club on Friday - book them all through OOSCCA. Plan a multi-activity week for your child with just a single, seamless payment. Countless providers, yet the ease of one transaction. Your child's diverse week of fun is now uncomplicated to put together."
  },
  {
    icon: "/hat.svg",
    subheader: "Parenting is hard enough",
    header: "Multiple bookings. One Seamless Experience",
    description: "Whether it's a dance class on Monday, a tennis session on Wednesday, or a craft club on Friday - book them all through OOSCCA. Plan a multi-activity week for your child with just a single, seamless payment. Countless providers, yet the ease of one transaction. Your child's diverse week of fun is now uncomplicated to put together."
  },
  {
    icon: "/hat.svg",
    subheader: "Parenting is hard enough",
    header: "Multiple bookings. One Seamless Experience",
    description: "Whether it's a dance class on Monday, a tennis session on Wednesday, or a craft club on Friday - book them all through OOSCCA. Plan a multi-activity week for your child with just a single, seamless payment. Countless providers, yet the ease of one transaction. Your child's diverse week of fun is now uncomplicated to put together."
  },
]

function BenefitText({benefit}) {
  return (
    <Box>
      <Typography variant="body1" color="warning.main" fontWeight="bold">
        {benefit.subheader}
      </Typography>
      <Typography mt={2} variant="h3" fontWeight="bold">
        {benefit.header}
      </Typography>
      <Typography mt={2} variant="body1" color="text.secondary">
        {benefit.description}
      </Typography>
    </Box>
  )
}

export default function Benefits() {
  return (
    <>
      <Container sx={{py: {xs: 6, md: 10}}}>
        <Grid container rowSpacing={{md: 12}}>
          {BENEFITS.map(benefit => (
            <>
              <Grid item xs={12} md={6}>
                <BenefitText benefit={benefit}/>
              </Grid>
              <Grid item>
                <Box component="img" src="/benefit.png" width="100%"/>
              </Grid>
            </>
          ))}
        </Grid>
      </Container>
    </>
  )
}
