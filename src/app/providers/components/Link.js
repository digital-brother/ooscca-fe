"use client";

import NextLink from "next/link";
import MuiLink from "@mui/material/Link";
import { useTheme } from "@mui/material/styles";

export const StyledMuiLink = ({ children, sx, ...props }) => {
  const theme = useTheme();
  return (
    <MuiLink
      component="span"
      sx={{
        color: "text.secondary",
        textDecorationColor: theme.palette.text.secondary,
        "&:hover": {
          color: "#343A40",
        },
        "&:active": {
          color: "#FF8919",
        },
        cursor: "pointer",
        ...sx,
      }}
      {...props}
    >
      {children}
    </MuiLink>
  );
};

export default function Link({ children, href, sx }) {
  return (
    <NextLink href={href} passHref style={{ textDecoration: "none" }}>
      <StyledMuiLink>{children}</StyledMuiLink>
    </NextLink>
  );
}
