'use client'

import {Box, Container} from "@mui/material";
import Typography from "@mui/material/Typography";

const SCHOOLS = [
  {src: "/milbourne-lodge.svg", label: "Milbourne Lodge "},
  {src: "/shrewsbury-house-pre-preparatory.svg", label: "Shrewsbury House Pre-Preparatory"},
  {src: "/rowan-preparatory.svg", label: "Rowan Preparatory"},
  {src: "/claremont-fan-court.svg", label: "Claremont Fan Court "},
  {src: "/parkside.svg", label: "Parkside "},
  {src: "/danes-hill.svg", label: "Danes Hill "},
]

export default function ClientSchools() {
  return (
    <Box sx={{bgcolor: "#F8F9FA"}}>
      <Container sx={{py: {xs: 6, md: 10}}}>
        <Typography variant="body1" textAlign="center" fontWeight="bold" color="text.secondary">
          Join other parents from local schools who already use OOSCCA
        </Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "repeat(2, 150px)",
              sm: "repeat(3, 150px)",
              lg: "repeat(6, 160px)"
            },
            gap: 2,
            justifyContent: "center",
            mt: 5,
          }}
        >
          {SCHOOLS.map((school, key) => <School key={key}  {...school}/>)}
        </Box>

      </Container>
    </Box>
  )
}

function School({src, label}) {
  return (
    <Box sx={{textAlign: "center"}}>
      <img src={src}/>
      <Typography color="text.secondary">{label}</Typography>
    </Box>
  )
}
