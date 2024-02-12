"use client";

import { Box, Container } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import DemoStepper from "./DemoStepper"
import { montserrat } from "@/components/ThemeRegistry/theme";
import {
  Button,
  Chip,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  useMediaQuery,
} from "@mui/material";

function TitleBlock2({ title, subtitle }) {
  return (
    <>
      <Typography variant="h5">Advantage Day Camp</Typography>
      <Typography variant="subheader">123 street, Town, Post code</Typography>

      <SlideHeader label="Review activity details" close={close} />
      <ActivityDetails sx={{ flex: 1 }} />

      <Error>{mutation.isError && mutation.error.message}</Error>
      <SmFlex sx={{ mt: 3, rowGap: 1 }}>
        {smDown && <CancelButton onClick={close} />}
        <GoBackButton onClick={scrollPrev} />
        <NextButton onClick={handleSave} label="Save" />
      </SmFlex>
      <Typography variant="body2" sx={{ mt: 1.5, textAlign: "center" }}>
        Activity will be saved in your accounts page
      </Typography>

      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6">{label}</Typography>

        {smUp && (
          <IconButton size="small" onClick={close}>
            <HighlightOffRoundedIcon sx={{ color: "common.black", fontSize: 28 }} />
          </IconButton>
        )}
      </Box>
    </>
  );


}

export default function Card(props) {
  function TitleBlock({ title, subtitle, sx }) {
    return (
      <Box sx={{ ...sx }}>
        <Typography sx={{
          fontFamily: montserrat.style.fontFamily,
          fontSize: "1rem", // 16px
          fontWeight: 700,
        }}>
          {title}
        </Typography>
        <Typography variant="body2">
          {subtitle}
        </Typography>
      </Box>
    )
  };

  function ImagePreview(sx) {
    const src = "/card-preview.jpeg";

    return (
      <Box
        component="img"
        src={src}
        sx={{
          width: "100%",
          height: "189px",
          objectFit: "cover",
          ...sx,
        }}
      />
    );
  }

  function Chips(sx) {
    return (
      <Stack
        spacing={1}
        sx={{
          width: { xs: "50%", sm: "max-content" }
      }}>
        <Chip label="Going fast" sx={{ bgcolor: "#e72e84", color: "white" }} />
        <Chip label="3 Spots left" sx={{ bgcolor: "#e7a71d", color: "black" }} />
      </Stack>
    );
  }

  return (
    <Box sx={{
      width: 353,
      height: 452,
      border: "1px solid #6C757D",
      borderRadius: 5,
    }}
    {...props}
    >
      <ImagePreview />
      <Container sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        mt: 2,
        p: 0,
      }}>
        <Box>
          <TitleBlock
            title="Advantage Day Camp"
            subtitle="123 street, Town, Post code"
            sx={{ mb: 3 }}
          />
          <TitleBlock
            title="Day camp"
            subtitle="(ages 6-12)"
          />
        </Box>
        <Chips />
        <Schedule />
        <Calculations />
        <Buttons />
      </Container>
    </Box>
  );
}
