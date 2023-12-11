"use client"

import Box from "@mui/material/Box";
import {styled} from "@mui/material/styles";
import Typography from "@mui/material/Typography";

const ActivitiesBox = styled(Box)({
  border: "1px solid #6C757D",
  borderRadius: 16,
  width: 541,
  height: 597,
})

function ActivitiesFirst() {
  return (
    <ActivitiesBox sx={{display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center"}}>
      <Box sx={{maxWidth: 341}}>
        <Typography variant="h5">
          Create your first activity and let’s get going
        </Typography>
      </Box>
    </ActivitiesBox>
  )
}

export default function Activities() {
  return (
    <Box sx={{m: 10}}>
      <ActivitiesFirst/>
    </Box>
  )
}
