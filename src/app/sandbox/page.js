import {Box} from "@mui/material";
import Grid from "@mui/material/Grid";

export const metadata = {
  title: 'Sandbox',
  description: 'Sandbox',
};

export default function Test() {
  return (
    <>
      {/*<Box border={1} display="flex" justifyContent="center">Test</Box>*/}
      {/*<Box border={1} sx={{display: 'grid', placeItems: 'center'}}>Test</Box>*/}
      {/*<Box border={1} textAlign="center">Test</Box>*/}

      {/*<Box border={1} display="flex" justifyContent="center">*/}
      {/*  <img src="/demo.svg"/>*/}
      {/*</Box>*/}
      {/*<Box border={1} sx={{display: 'grid', placeItems: 'center'}}>*/}
      {/*  <img src="/demo.svg"/>*/}
      {/*</Box>*/}
      {/*<Box border={1} textAlign="center">*/}
      {/*  <Box>*/}
      {/*    <img src="/demo.svg"/>*/}
      {/*  </Box>*/}
      {/*</Box>*/}

      <Grid container border={1} spacing={0}>
        <Grid item border={1} md={6}>
          <Box border={1} maxWidth={300}>
            2
          </Box>
        </Grid>
        <Grid item border={1} md={6}>
          <img src="/demo-md.svg" height="300px" style={{border: '1px solid black'}}/>
        </Grid>

      </Grid>


    </>
  )
}