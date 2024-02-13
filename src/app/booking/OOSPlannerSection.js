import { Box, Container, Typography } from "@mui/material";

function OOSPlanner({ sx }) {
  return (
    <Box sx={{ borderRadius: 2, bgcolor: "white", border: "1px solid", borderColor: "grey.200", ...sx }}>
      OOS Planner
    </Box>
  );
}

export default function OOSPlannerSection() {
  return (
    <Box sx={{ bgcolor: "grey.50", py: 10 }}>
      <Container>
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="overlineBold">Directly from calendar</Typography>
          <Typography variant="h2" sx={{ mt: 2 }}>
            Enjoy the ease of booking activities without the text and email tennis
          </Typography>
        </Box>
        <OOSPlanner sx={{ mt: 8, py: 5 }} />
      </Container>
    </Box>
  );
}
