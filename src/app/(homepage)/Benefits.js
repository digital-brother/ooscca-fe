import {Box, Container} from "@mui/material";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

const BENEFITS = [
  {
    image: "/benefit-world-of-choice.png",
    header: "One Platform, A World of Choices",
    subheader: "Simplify your search",
    description: "Why spend hours searching? With OOSCCA, there’s no need for countless windows or relentless rechecks. We bring variety and convenience to your doorstep. No more juggling between tabs – every option, every activity, all in one place. Dive into simplicity and wave goodbye to endless searching."
  },
  {
    image: "/benefit-multiple-bookings.png",
    header: "Multiple bookings. One Seamless Experience",
    subheader: "Effortless organisation",
    description: "Whether it's a dance class on Monday, the tennis session on Wednesday, or swimming on Friday - book a multi-activity week for your child with just a single, seamless payment: countless providers, yet the ease of one transaction. Your child's diverse week of fun is now uncomplicated to put together."
  },
  {
    image: "/benefit-think-big.png",
    header: "Think Big, Support Small",
    subheader: "Community impact",
    description: "OOSCCA is more than a platform; it's a community. By choosing activities for your children here, you're not just filling their schedules—you're nurturing local talent and businesses. We empower local businesses to be discovered and thrive while ensuring your kids are productively engaged. It’s a win-win."
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

function BenefitsHeader() {
  return (
    <Box sx={{textAlign: "center"}}>
      <Typography color="warning.main" sx={{fontWeight: 700}}>
        Built by parents, for parents
      </Typography>
      <Typography variant="h4" sx={{fontWeight: 700, mt: 2}}>
        Why join OOSCCA for parents
      </Typography>
    </Box>
  )
}

export default function Benefits() {
  return (
    <Container sx={{py: {xs: 6, md: 10}}}>
      <BenefitsHeader />
      <Box sx={{
        mt: {xs: 6, md: 10},
        display: "flex",
        flexDirection: "column",
        gap: 4,
        maxWidth: {xs: 500, md: "100%"},
        mx: "auto",
      }}>
        {BENEFITS.map((benefit, index) => (
          <Grid key={index} container rowSpacing={8} columnSpacing={6} sx={{
            justifyContent: "center",
            alignItems: "center",
            flexDirection: index % 2 ? "row-reverse" : "row",
          }}>
            <Grid item xs={12} md={6}>
              <Box component="img" src={benefit.image} width="100%" sx={{maxWidth: 500}}/>
            </Grid>
            <Grid item xs={12} md={6}>
              <BenefitText benefit={benefit} sx={{textAlign: {xs: "center", md: "left"}, maxWidth: {md: "90%"}}}/>
            </Grid>
          </Grid>
        ))}
      </Box>
    </Container>
  )
}
