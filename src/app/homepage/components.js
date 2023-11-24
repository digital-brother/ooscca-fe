import NextLink from "next/link";
import MuiLink from "@mui/material/Link";


export default function Link({label, href}) {
  return (
    <NextLink href={href} passHref>
      <MuiLink
        component="span"
        sx={(theme) => ({color: "text.secondary", textDecorationColor: theme.palette.text.secondary})}
      >
        {label}
      </MuiLink>
    </NextLink>
  )
}
