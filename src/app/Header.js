'use client'

import HamburgerMenu from "@/app/(homepage)/HamburgerMenu";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import * as React from "react";
import Link from "@/app/(homepage)/components/Link";
import AccountChildIcon from "@/assets/AccountChildIcon";
import NextLink from "next/link";
import {Button, Toolbar} from "@mui/material";
import {useTheme} from "@mui/material/styles";
import {Logo} from "@/app/(homepage)/components/Logo";
import { useState, useEffect } from "react";
import { useMutation } from "react-query";
import { logout, AUTH_TOKEN_KEY, SIGNUP_CURRENT_STEP_KEY, USER_ID_KEY } from "@/app/api.mjs";

export const HEADER_NAV_LINKS = [
  {name: "about", text: 'About', path: '/'},
  {name: "providers", text: 'Providers', path: '#'},
  {name: "contact", text: 'Contact', path: '#'},
  {name: "signIn", text: 'Sign in', path: '#', icon: AccountChildIcon, border: true},
];

function NavLink({link}) {
  const [authToken, setAuthToken] = useState(null);
  const mutation = useMutation(logout, {
    onSuccess: () => {
      localStorage.removeItem(AUTH_TOKEN_KEY);
      localStorage.removeItem(USER_ID_KEY);
      localStorage.removeItem(SIGNUP_CURRENT_STEP_KEY);
    },
    onError: (error) => {
      console.error("Logout failed");
    }
  });

  const theme = useTheme()
  const linkElement = (
    <Link href="#" sx={{whiteSpace: "nowrap", textDecoration: "none"}}>
      {link.text}
    </Link>
  )

  useEffect(() => {
    setAuthToken(localStorage.getItem(AUTH_TOKEN_KEY));
  }, []);

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
      <Button variant="outlined" color="orange" onClick={authToken ? mutation.mutate : null} sx={{
        textTransform: 'none',
        fontSize: theme.typography.htmlFontSize,
      }}>
        {authToken ? 'Log out': link.text}
      </Button>
    </NextLink>
  )
}

export function NavLinks() {
  return (
    <>
      {HEADER_NAV_LINKS.map((link, index) => (
        <NavLink key={index} link={link}/>
      ))}
    </>
  )
}

export default function Header() {
  return (
    <>
      {/* TODO: p={1} - how much px? */}
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
          <Box sx={{color: "#6D6D6D", flexGrow: 1, display: "flex", flexDirection: "column", alignItems: "start"}}>
            <Logo/>
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
