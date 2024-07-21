import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/navigation";
import * as React from "react";

export function Logo() {
  const router = useRouter();

  return (
    <Box>
      <Box component="img" onClick={() => router.push('/')} src="/logo.png" alt="OOSCCA logo" sx={{
        cursor: 'pointer',
        width: {xs: 117, md: 190},
        height: 'auto'
      }}/>
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

export function FooterLogo() {
  return (
    <Box>
      <Box component="img" sx={{width: {xs: 247, sm: 190}, height: 'auto'}} src="/logo.png" alt="OOSCCA logo"/>
      <Typography sx={{
        // display: {xs: "none", md: "inherit"},
        fontSize: {xs: 13, sm: 9.5},
        fontWeight: "bold",
        // letterSpacing: 0.27,
        color: "#FFFFFF",
      }}>
        Out Of School Clubs, Classes & Activities
      </Typography>
    </Box>
  )
}
