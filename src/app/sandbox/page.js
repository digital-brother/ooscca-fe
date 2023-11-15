import {Box} from "@mui/material";
import Grid from "@mui/material/Grid";

export const metadata = {
  title: 'Sandbox',
  description: 'Sandbox',
};

export default function Test() {
  return (
    <Box sx={{display: "grid", gridTemplateColumns: "500px 1fr 2fr"}}>
      <Box>1</Box>
      <Box>2</Box>
      <Box>3</Box>
      <Box>4</Box>
      <Box>5</Box>
    </Box>
  )
}