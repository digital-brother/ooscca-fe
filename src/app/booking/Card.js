"use client";

import { Box, Container } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import DemoStepper from "./DemoStepper"
import { montserrat } from "@/components/ThemeRegistry/theme";
import { manrope } from "@/components/ThemeRegistry/theme";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import {
  Button,
  Chip,
  FormControl,
  Icon,
  SvgIcon,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Checkbox,
  useMediaQuery,
} from "@mui/material";


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

  function Schedule(sx) {
    return (
      <Box>
        <Typography sx={{
          fontFamily: manrope.style.fontFamily,
          fontSize: "0.75rem",  // 12px
        }}>
          <Icon size="small" sx={{mr: 1.5, height: "12px", width: "12px", fontSize: "12px" }}><AccessTimeIcon /></Icon>
          Mon 8:30 AM - 3:30 PM
        </Typography>

        <Typography sx={{
          fontFamily: manrope.style.fontFamily,
          fontSize: "0.75rem",  // 12px
        }}>
          <Checkbox size="small" sx={{p:0, pr: 0.5, mt: -0.25, ml: 0}} />
          <span style={{color: "green", fontWeight: 700}}>FREE</span> Early drop off 8:00 am
        </Typography>

        <Typography sx={{
          fontFamily: manrope.style.fontFamily,
          fontSize: "0.75rem",  // 12px
        }}>
          <Checkbox size="small" sx={{p:0, pr: 0.5, mt: -0.25, ml: 0}}/>
          <span style={{color: "green", fontWeight: 700}}>FREE</span> Late pick-up: 4:00 pm
        </Typography>
      </Box>
    )
  }

  function Calculations(sx) {
    return (
      <Box sx={{
        width: 85,
        height: 70,
      }}>
        <Typography align="right" sx={{
          color: "green.500",
          fontWeight: 700,
          fontFamily: manrope.style.fontFamily,
          fontSize: "0.75rem",
        }}>
          10% off
        </Typography>
        <Typography align="right" sx={{
          fontWeight: 900,
          fontFamily: manrope.style.fontFamily,
        }}>
          £90.00
        </Typography>
        <Typography align="right" sx={{
          color: "grey.500",
          fontWeight: 700,
          fontFamily: manrope.style.fontFamily,
          fontSize: "0.75rem",
          textDecoration: "line-through",
        }}>
          £100.00
        </Typography>
      </Box>
    )
  }

  function Buttons(sx) {
    return (
      <Box sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
      }}>
        <Button variant="outlined" size="medium" color="orange" sx={{ width: "47%", fontSize: "13px" }}>
          Learn more
        </Button>
        <Button variant="contained" size="medium" color="orange" sx={{ width: "47%", fontSize: "13px" }}>
          Add to calendar
        </Button>
      </Box>
    )
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
        flexDirection: "column",
        justifyContent: "space-between",
        mt: 1,
      }}>
        <Box sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          mb: 1,
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
        </Box>
        <Box sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          mb: 1,
        }}>
          <Schedule />
          <Calculations />
        </Box>
        <Buttons />
      </Container>
    </Box>
  );
}
