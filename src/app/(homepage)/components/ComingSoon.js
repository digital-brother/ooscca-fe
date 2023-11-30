import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import React from "react";

export function ComingSoon() {
  return (
    <Box sx={{mt: {xs: 6, md: 12}, border: 1, borderRadius: 1, borderColor: "#CED4DA"}}>
      <Typography color="text.secondary" sx={{textAlign: "center", py: {xs: 6, md: 10}}}>
        Coming soon
      </Typography>
    </Box>
  )
}
