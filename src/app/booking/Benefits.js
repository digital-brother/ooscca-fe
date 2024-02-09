import {Box, Container} from "@mui/material";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Link from '@mui/material/Link';

const BENEFITS = [
  {
    image: "/invite-favourite-clubs-ooscca.png",
    header: "Invite your favouriteclubs and providersto join OOSCCA",
    subheader: "Spread the word",
    description: "Do your children love their current clubs and activity providers? Help us make OOSCCA even better by inviting them to join our platform. It's a simple way to keep all your bookings in one place and to support your favourite providers with the tools they need to thrive. Just enter their name and email, and we'll introduce them to the world of OOSCCA.",
    linkText: "Let’s get more providers. Let’s get more choice",
    link: "#",
  },
  {
    image: "/new-feature-on-the-horizon.png",
    header: "New Features on the Horizon",
    subheader: "Exciting Futures Ahead",
    description: "At OOSCCA, we are continuously evolving, crafting an experience that grows with your family. Our platform thrives on innovation, and we're excited to announce that new features and updates are just around the corner—designed to make your OOSCCA experience even more seamless and enjoyable. We're more than just a platform; we're a community. And every community thrives on collaboration. Share your suggestions with us, and let's build the future of OOSCCA together.",
    linkText: "Suggest a feature",
    link: "#",
  },
  {
    image: "/spread-the-word-invite.png",
    header: "Spread the word:Invite your favourite clubs and providers",
    subheader: "Simplify your search",
    description: "Do your children love their current clubs and activity providers? Help us make OOSCCA even better by inviting them to join our platform. It's a simple way to keep all your bookings in one place and to support your favourite providers with the tools they need to thrive. Just enter their name and email, and we'll introduce them to the world of OOSCCA.",
    linkText: "Fill in the detail",
    link: "#",
  },
]

function BenefitText({benefit, sx}) {
  return (
    <Box {...sx}>
      <Typography variant="subheading">
        {benefit.subheader}
      </Typography>
      <Typography mt={2} variant="h3">
        {benefit.header}
      </Typography>
      <Typography my={2} variant="body1" color="text.secondary">
        {benefit.description}
      </Typography>
      <Link href={benefit.link} underline="none" color="purple.main" variant="benefitDetails">
        {benefit.linkText.trim()} {"  >"}
      </Link>
    </Box>
  )
}

export default function Benefits() {
  return (
    <Container sx={{py: {xs: 6, md: 10}}}>
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
            flexDirection: index % 2 ? "row" : "row-reverse",
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
