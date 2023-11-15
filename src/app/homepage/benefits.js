import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import {Paper} from "@mui/material";

const BENEFITS = [
  {
    icon: "/hat.svg",
    title: "Simplify Your Life",
    description: "Keep your family's activity schedule organised effortlessly. With OOSCCA, track your bookings, manage schedules, and coordinate with other parents smoothly, all from one convenient location."
  },
  {
    icon: "/hat.svg",
    title: "Maximise Family Time",
    description: "Let OOSCCA do the legwork by bringing together a vast selection of clubs and activities in one place. Spend less time searching and more time enjoying life's precious moments with your children."
  },
  {
    icon: "/hat.svg",
    title: "Maximise Family Time",
    description: "Let OOSCCA do the legwork by bringing together a vast selection of clubs and activities in one place. Spend less time searching and more time enjoying life's precious moments with your children."
  },
]

export default function Benefits() {
  return (
    <>
      <Box sx={{textAlign: "center", mt: {xs: 5, md: 10}, mx: "auto", maxWidth: 600}}>
        <Typography variant="body2" textAlign="center" fontWeight="bold" color="warning.main">
          It’s easy to get started. And free.
        </Typography>
        <Typography variant="h4" fontWeight="bold" mt={1}>
          Platform that puts you in control again
        </Typography>
        <Typography variant="body1" color="text.secondary" mt={2}>
          The activity planning reimagined the way parents want to arrange,
          pay and manage activities with multiple providers.
        </Typography>
      </Box>

      <Box sx={{display: 'flex', justifyContent: 'center'}}>
        <Grid container justifyContent="center" alignItems="center" spacing={5}
              sx={{textAlign: "center", mt: {xs: 2, md: 3}, maxWidth: {xs: 500, md: 1200}}}
        >
          {BENEFITS.map(benefit => (
            <Grid item xs={12} md={4}>
              <Paper variant="outlined" sx={{p: 3}}>
                <img src={benefit.icon} />
                <Typography variant="body1" fontWeight="bold" color="text.secondary" mt={1}>
                  {benefit.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">{benefit.description}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  )
}
