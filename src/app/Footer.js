'use client'

import { FooterLogo } from "@/app/(homepage)/components/Logo";
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { Box, Container, Stack, styled } from "@mui/material";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

const FooterLink = styled(Link)(({ theme }) => ({
  color: "white",
  textDecoration: 'none',
  '&:hover': {
    textDecoration: 'underline',
  },
}));

const FooterBox = styled(Box)(({ theme }) => ({
  color: "white",
  textDecoration: 'none',
  '&:hover': {
    textDecoration: 'underline',
  },
}));

// const FOOTER_NAV_LINKS = HEADER_NAV_LINKS.filter(link => ["about", "providers", "contact"].includes(link.name))

export default function Footer() {
  return (
    <Box bgcolor="#1E252A" color="#FFFFFF">
      <Container sx={{pt: {xs: 4, md: 5}, pb: {xs: 4, md: 5}}}>
        <Grid container rowSpacing={7} sx={{justifyContent: "space-between"}}>
          <Grid item xs={12} sm="auto" sx={{display: "flex", justifyContent: "center"}}>
            <FooterLogo/>
          </Grid>
          <Grid item xs={6} sm={5}>
            <Box sx={{
              display: "flex",
              flexDirection: {xs: "column", md: "row"},
              justifyContent: "space-between",
              alignItems: "start",
              mt: 1,
              gap: 5,
            }}>
            <Stack sx={{ gap: 0.5 }}>
              <FooterLink href="/parent-terms-of-use" variant="body2">Parent Terms of Use</FooterLink>
              <FooterLink href="/privacy-policy" variant="body2">Privacy Policy</FooterLink>
              <Typography variant="body2">Data Processing Agreement</Typography>
            </Stack>
            <Stack sx={{ gap: 0.5 }}>
              <FooterLink href="/provider-service-agreement" variant="body2">Provider Processing Agreement</FooterLink>
              <FooterLink href="/b2b-terms" variant="body2">B2B Terms</FooterLink>
            </Stack>
            </Box>
          </Grid>
          <Grid item xs={6} sm="auto" sx={{textAlign: "right"}}>
            <Box sx={{display: "inline-flex", gap: 3, mt: 1}}>
              <InstagramIcon/>
              <LinkedInIcon/>
              <FacebookIcon/>
            </Box>
            <Stack sx={{ gap: 0.5, mt: 3}}>
              <Typography variant="body2">Copyright © 2023 OOSCCA</Typography>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}
