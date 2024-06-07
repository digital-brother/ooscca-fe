'use client'

import HamburgerMenu from "@/app/(homepage)/HamburgerMenu";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import * as React from "react";
import Link from "@/app/(homepage)/components/Link";
import NextLink from "next/link";
import {Button, Toolbar} from "@mui/material";
import {useTheme} from "@mui/material/styles";
import {Logo} from "@/app/(homepage)/components/Logo";
import { useContext } from "react";
import { useMutation } from "react-query";
import { useSnackbar } from 'notistack';
import { getFlatErrors } from "@/app/activities/[activityId]/edit/components/formikFields";
import { logout, AUTH_TOKEN_KEY } from "@/app/api.mjs";
import { AuthTokenContext } from "@/app/layout";

export const HEADER_NAV_LINKS = [
  {name: "about", text: 'About', path: '/'},
  {name: "providers", text: 'Providers', path: '#'},
  {name: "contact", text: 'Contact', path: '#'},
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
      <Button variant="outlined" color="orange" sx={{
        textTransform: 'none',
        fontSize: theme.typography.htmlFontSize,
      }}>
        {link.text}
      </Button>
    </NextLink>
  )
}

function LogOutLink() {
  const theme = useTheme()
  const { enqueueSnackbar } = useSnackbar();
  const { setAuthToken } = useContext(AuthTokenContext);
  const mutation = useMutation(logout, {
    onSuccess: () => {
      localStorage.removeItem(AUTH_TOKEN_KEY);
      setAuthToken(null)
      enqueueSnackbar("Logout successful", { variant: "success" });
    },
    onError: (error) => {
      const errorMsg = getFlatErrors(error).join("; ");
      enqueueSnackbar(errorMsg, { variant: "error" });
    }
  });

  return (
    <NextLink href="/" passHref>
      <Button variant="outlined" color="orange" onClick={mutation.mutate} sx={{
        textTransform: 'none',
        fontSize: theme.typography.htmlFontSize,
      }}>
        Log out
    </Button>
  </NextLink>
  );
}

function SignInLink() {
  const theme = useTheme()

  return (
    <NextLink href="/login" passHref>
      <Button variant="outlined" color="orange" sx={{
        textTransform: 'none',
        fontSize: theme.typography.htmlFontSize,
      }}>
        Sign in
    </Button>
  </NextLink>
  );
}

export function NavLinks() {
  const { authToken } = useContext(AuthTokenContext);
  return (
    <>
      {HEADER_NAV_LINKS.map((link, index) => (
        <NavLink key={index} link={link}/>
      ))}
      {authToken ? <LogOutLink /> : <SignInLink />}
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
          <NavLinks />
          </Box>

          <HamburgerMenu sx={{display: {xs: "inherit", sm: "none"}}}/>
        </Toolbar>
      </AppBar>
    </>
  )
}
