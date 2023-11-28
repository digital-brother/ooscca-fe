'use client'

import {Box, Container} from "@mui/material";
import Grid from "@mui/material/Grid";
import * as React from "react";
import {HEADER_NAV_LINKS, Logo, NavLinks} from "@/app/Header";

const FOOTER_NAV_LINKS = HEADER_NAV_LINKS.filter(link => ["about", "providers", "contact"].includes(link.name))

export default function Footer() {
  return (
    <Box bgcolor="grey.900" color="#FFFFFF">
      <Container sx={{pt: {xs: 4, md: 5}, pb: {xs: 4, md: 5}}}>
        <Grid container>
          <Grid item xs={12} md={4}>
            <Logo/>
          </Grid>
          <Grid item xs={6} md={4}>
            <NavLinks links={FOOTER_NAV_LINKS}/>
          </Grid>
          <Grid item xs={6} md={4}>
            333
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}
