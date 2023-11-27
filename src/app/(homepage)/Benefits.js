import {Box, Container} from "@mui/material";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

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

function BenefitText({benefit, sx}) {
  return (
    <Box {...sx}>
      <Typography variant="body1" color="warning.main" fontWeight="bold">
        {benefit.subheader}
      </Typography>
      <Typography mt={2} variant="h4" fontWeight="bold">
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
    <Container sx={{py: {xs: 6, md: 10}}}>
      <Box sx={{display: "flex", flexDirection: "column", gap: 12, maxWidth: {xs: 500, md: "100%"}, mx: "auto"}}>
        {BENEFITS.map((benefit, index) => (
          <Grid container rowSpacing={8} columnSpacing={6} sx={{
            justifyContent: "center",
            alignItems: "center",
            flexDirection: index % 2 ? "row-reverse" : "row",
          }}>
            <Grid item xs={12} md={6}>
              <BenefitText benefit={benefit} sx={{textAlign: {xs: "center", md: "left"}, maxWidth: {md: "90%"}}}/>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box component="img" src="/benefit.png" width="100%" sx={{maxWidth: 500}}/>
            </Grid>
          </Grid>
        ))}
      </Box>
    </Container>
  )
}
