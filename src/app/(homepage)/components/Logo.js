import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import NextImage from "next/image";
import { useMediaQuery, Link } from "@mui/material";
import * as React from "react";

export  function LogoImage() {
  const mdUp = useMediaQuery((theme) => theme.breakpoints.up("md"));

  return (
    <NextImage
        src="/logo.png"
        alt="OOSCCA logo"
        width={mdUp ? 190 : 117}
        height={mdUp ? 43 : 26}
    />
  );
}

export function Logo() {
  return (
    <Box>
      <Link href="/">
        <LogoImage />
      </Link>
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
      <LogoImage />
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
