'use client'

import Image from "next/image";
import HamburgerMenu from "@/app/(homepage)/HamburgerMenu";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import * as React from "react";
import Link from "@/app/(homepage)/Link";
import AccountChildIcon from "@/assets/AccountChildIcon";
import NextLink from "next/link";
import {Button} from "@mui/material";
import {useTheme} from "@mui/material/styles";
import Typography from "@mui/material/Typography";

export const NAV_LINKS = [
  {text: 'About', path: '/'},
  {text: 'Providers', path: '#'},
  {text: 'Contact', path: '#'},
  {text: 'Sign in', path: '#', icon: AccountChildIcon, border: true},
];

function NavLink({link}) {
  const theme = useTheme()
  const linkElement = (
    <Link href="#" sx={{whiteSpace: "nowrap", textDecoration: "none"}}>
      {link.text}
    </Link>
  )

  if (!link.border) return linkElement

  else return (
    // <Box sx={{
    //   display: "flex",
    //   alignItems: "center",
    //   gap: 0.5,
    //   border: "2px solid #FF8919",
    //   borderRadius: 1.5,
    //   px: 2,
    //   py: 1,
    //   ...linkColorsSx,
    // }}>
    //   {link.icon && <link.icon/>}
    //   {linkElement}
    // </Box>
    <NextLink href="/" passHref>
      <Button variant="outlined" color="warning" sx={{
        textTransform: 'none',
        fontSize: theme.typography.htmlFontSize,
      }}>
        {link.text}
      </Button>
    </NextLink>
  )
}

export function NavLinks() {
  return (
    <>
      {NAV_LINKS.map(item => (
        <NavLink link={item}/>
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
            py: {xs: 1.5, md: 3},
            px: {xs: 2, md: 7.5},
            // TODO: Fix color
          }}
        >
          <Box sx={{flexGrow: 1, display: "flex", flexDirection: "column", alignItems: "start"}}>
            <Box component="img" sx={{width: {xs: 117, md: 190}, height: 'auto'}} src="/logo.png" alt="OOSCCA logo"/>
            <Typography sx={{
              display: {xs: "none", md: "inherit"},
              fontSize: 9,
              fontWeight: "bold",
              letterSpacing: 0.27,
              color: "text.secondary",
              mt: 0.75
            }}>
              Out Of School Clubs, Classes & Activities
            </Typography>
          </Box>

          <Box sx={{
            flexGrow: 1,
            display: {xs: "none", sm: "flex"},
            justifyContent: "space-between",
            alignItems: "center",
            maxWidth: 500,
            mr: 5,
          }}>
            <NavLinks/>
          </Box>

          <HamburgerMenu sx={{display: {xs: "inherit", sm: "none"}}}/>
        </Toolbar>
      </AppBar>
    </>
  )
}
