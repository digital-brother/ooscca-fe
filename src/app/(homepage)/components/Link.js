'use client'

import NextLink from "next/link";
import MuiLink from "@mui/material/Link";
import {useTheme} from "@mui/material/styles";


export default function Link({children, href, sx}) {
  const theme = useTheme();

  return (
    <NextLink href={href} passHref style={{textDecoration: "none"}}>
      <MuiLink
        component="span"
        sx={{
          color: "text.secondary",
          textDecorationColor: theme.palette.text.secondary,
          '&:hover': {
            color: '#343A40',
          },
          '&:active': {
            color: '#FF8919',
          },
          ...sx
        }}
      >
        {children}
      </MuiLink>
    </NextLink>
  )
}
