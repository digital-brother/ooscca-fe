import {Box} from "@mui/material";
import Typography from "@mui/material/Typography";

const SCHOOLS = [
  {src: "/milbourne-lodge.svg", label: "Milbourne Lodge "},
  {src: "/shrewsbury-house-pre-preparatory.svg", label: "Shrewsbury House  Pre-Preparatory"},
  {src: "/rowan-preparatory.svg", label: "Rowan Preparatory"},
  {src: "/claremont-fan-court.svg", label: "Claremont Fan Court "},
  {src: "/parkside.svg", label: "Parkside "},
  {src: "/danes-hill.svg", label: "Danes Hill "},
]

export default function ClientSchools() {
  return (
    <Box mt={{xs: 5, md: 10}}>
      <Typography variant="h6" textAlign="center" fontWeight="bold" color="text.secondary">
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
          mx: "auto",
          width: "fit-content",
          alignItems: "center",
          justifyContent: "center",
          mt: 5,
        }}
      >
        {SCHOOLS.map(school => (
          <Box>
            <School {...school}/>
          </Box>
        ))}
      </Box>

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
