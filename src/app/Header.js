import Image from "next/image";
import HamburgerMenu from "@/app/(homepage)/HamburgerMenu";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import * as React from "react";
import Link from "@/app/(homepage)/Link";
import AccountChildIcon from "@/assets/AccountChildIcon";

export const NAV_LINKS = [
  {text: 'About', path: '/'},
  {text: 'Providers', path: '#'},
  {text: 'Contact', path: '#'},
  {text: 'Sign in', path: '#', icon: <AccountChildIcon/>},
];

export function NavLinks() {
  return (
    <>
      {NAV_LINKS.map(item => (
        <Box sx={{display: "flex", alignItems: "center"}}>
          {item.icon}
          <Link href="#" sx={{whiteSpace: "nowrap", textDecoration: "none"}}>
            {item.text}
          </Link>
        </Box>
      ))}
    </>
  )
}

export default function Header() {
  return (
    <>
      {/*TODO: p={1} - how much px?*/}
      <AppBar elevation={0} color="transparent" position="static">
        <Toolbar
          sx={{
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: 1,
            borderColor: "#CED4DA",
            py: {xs: 1, sm: 3},
            // TODO: Fix color
          }}
        >
          <Box sx={{flexGrow: 1, display: "flex", alignItems: "center"}}>
            <Image src="/logo.png" width={117} height={27} alt="OOSCCA logo"/>
          </Box>
          {/* TODO: Add menu */}

          <Box sx={{
            flexGrow: 1,
            display: {xs: "none", sm: "flex"},
            justifyContent: "space-between",
            maxWidth: 500,
            mr: 5,
          }}>
            <NavLinks/>
          </Box>

          <HamburgerMenu sx={{display: {xs: "block", sm: "none"}}}/>
        </Toolbar>
      </AppBar>
    </>
  )
}
