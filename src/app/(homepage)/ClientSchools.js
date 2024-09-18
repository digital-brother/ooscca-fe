'use client'

import {Box, Stack, Container} from "@mui/material";
import Typography from "@mui/material/Typography";
import Image from "next/image";

const SCHOOLS = [
  {src: "/claygate-primary.svg", label: "Claygate Primary"},
  {src: "/shrewsbury-house-pre-preparatory.svg", label: "Shrewsbury House"},
  {src: "/rowan-preparatory.svg", label: "Rowan Preparatory"},
  {src: "/claremont-fan-court.svg", label: "Claremont Fan Court"},
  {src: "/esher-church.svg", label: "Esher Church"},
  {src: "/parkside.svg", label: "Parkside"},
  {src: "/danes-hill.svg", label: "Danes Hill"},
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
              xs: "repeat(2, 160px)",
              lg: "repeat(4, 160px)",
              xl: "repeat(8, 160px)"
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
    <Stack sx={{
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
    }}>
      <Image src={src} alt={label} width={60} height={60}/>
      <Typography color="text.secondary">{label}</Typography>
    </Stack>
  )
}
