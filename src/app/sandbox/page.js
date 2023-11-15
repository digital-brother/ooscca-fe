import {Box} from "@mui/material";
import Grid from "@mui/material/Grid";

export const metadata = {
  title: 'Sandbox',
  description: 'Sandbox',
};

export default function Test() {
  return (
    <Grid container>
      {[1, 2, 3].map(item => (
        <Grid item xs={12} md={4} sx={{maxWidth: {md: "auto"}}}>
          {item}
        </Grid>
      ))}
    </Grid>
  )
}