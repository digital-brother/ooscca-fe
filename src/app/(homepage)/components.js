import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import * as React from "react";

export function Logo() {
  return (
    <Box sx={{flexGrow: 1, display: "flex", flexDirection: "column", alignItems: "start"}}>
      <Box component="img" sx={{width: {xs: 117, md: 190}, height: 'auto'}} src="/logo.png" alt="OOSCCA logo"/>
      <Typography sx={{
        display: {xs: "none", md: "inherit"},
        fontSize: 9,
        fontWeight: "bold",
        letterSpacing: 0.27,
        color: "#6D6D6D",
      }}>
        Out Of School Clubs, Classes & Activities
      </Typography>
    </Box>
  )
}
