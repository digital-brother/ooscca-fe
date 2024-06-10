'use client'

import { FooterLogo } from "@/app/(homepage)/components/Logo";
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { Box, Container } from "@mui/material";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

// const FOOTER_NAV_LINKS = HEADER_NAV_LINKS.filter(link => ["about", "providers", "contact"].includes(link.name))

export default function Footer() {
  return (
    <Box bgcolor="#1E252A" color="#FFFFFF">
      <Container sx={{pt: {xs: 4, md: 5}, pb: {xs: 4, md: 5}}}>
        <Grid container rowSpacing={7} sx={{justifyContent: "space-between"}}>
          <Grid item xs={12} sm="auto" sx={{display: "flex", justifyContent: "center"}}>
            <FooterLogo/>
          </Grid>
          <Grid item xs={6} sm={4}>
            <Box sx={{
              display: "flex",
              flexDirection: {xs: "column", md: "row"},
              justifyContent: "space-between",
              alignItems: {xs: "start", sm: "center"},
              mt: 1,
              gap: 3,
            }}>
              <Typography sx={{fontWeight: 600}}>About</Typography>
              <Typography sx={{fontWeight: 600}}>Providers</Typography>
              <Typography sx={{fontWeight: 600}}>Contact</Typography>
            </Box>
          </Grid>
          <Grid item xs={6} sm="auto" sx={{textAlign: "right"}}>
            <Box sx={{display: "inline-flex", gap: 3, mt: 1}}>
              <InstagramIcon/>
              <LinkedInIcon/>
              <FacebookIcon/>
            </Box>
            <Box sx={{display: "flex", flexDirection: "column", gap: 0.5, mt: 3}}>
              <Link href="/terms" variant="body2" sx={{color: "white", textDecoration: "none"}}>Terms & Conditions</Link>
              <Typography variant="body2">Privacy policy</Typography>
              <Typography variant="body2">Copyright © 2023 OOSCCA</Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}
