import {Box, Button} from "@mui/material";
import Typography from "@mui/material/Typography";

export default function Intro() {
  return (
    <>
      <Box mt={5} mx="auto" maxWidth={500}>
        <img src="/demo.svg" width="100%" align="center"/>
      </Box>
      <Box textAlign="center" px={3}>
        <Typography mt={5} variant="body1" color="text.secondary">
          Bringing activity planning into 21st century.
        </Typography>
        <Typography mt={3} variant="h4" fontWeight="bold">
          Effortless to find and manage Out Of School Activities
        </Typography>
        <Typography mt={3} variant="body1" color="text.secondary">
          All-in-one platform that reimagines the way to arrange and pay activities.
        </Typography>
        <Button sx={{mt: 3}} variant="contained" color="warning">
          Sign in to plan better
        </Button>
      </Box>
    </>
  )
}
