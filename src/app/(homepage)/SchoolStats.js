import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

export default function SchoolStats() {
  return (
    <Box>
      <Grid container>
        <Grid item xs={12} md={6} sx={{ order: { xs: 1, md: 3 } }}>
          School 1
        </Grid>
        <Grid item xs={12} md={6} sx={{ order: { xs: 2, md: 4 } }}>
          School 2
        </Grid>
        <Grid item xs={6} sx={{ order: { xs: 3, md: 1 } }}>
          Label 1
        </Grid>
        <Grid item xs={6} sx={{ order: { xs: 4, md: 2 } }}>
          Label 2
        </Grid>
      </Grid>
    </Box>
  );
}
