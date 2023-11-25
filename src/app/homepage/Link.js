'use client'

import NextLink from "next/link";
import MuiLink from "@mui/material/Link";
import {useTheme} from "@mui/material/styles";


export default async function Link({children, href, sx}) {
  const theme = useTheme();

  return (
    <NextLink href={href} passHref>
      <MuiLink
        component="span"
        sx={{color: "text.secondary", textDecorationColor: theme.palette.text.secondary, ...sx}}
      >
        {children}
      </MuiLink>
    </NextLink>
  )
}
