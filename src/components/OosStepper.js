"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import MUIStepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { styled } from "@mui/material";
import Typography from "@mui/material/Typography";
import { manrope } from "@/components/ThemeRegistry/theme";
import MUIStepConnector, {
  stepConnectorClasses as MUIStepConnectorClasses,
} from "@mui/material/StepConnector";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

const StepConnector = styled(MUIStepConnector)({
  [`&.${MUIStepConnectorClasses.horizontal}`]: {
    top: 30,
    left: "calc(-50% + 30px)",
    right: "calc(50% + 30px)",
  },
  [`&.${MUIStepConnectorClasses.vertical}`]: {
    top: "calc(-100% + 100px)",
    left: "calc(50% - 12px)",
  },
  [`& .${MUIStepConnectorClasses.line}`]: {
    borderColor: "#6C757D",
  },
});

function StepIcon({ icon }) {
  const theme = useTheme();
  const smUp = useMediaQuery(theme.breakpoints.up("sm"));

  return (
    <Box
      sx={{
        width: { xs: 37, sm: 54 },
        height: { xs: 37, sm: 54 },
        borderRadius: "50%",
        backgroundColor: "#000000",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography
        variant={ smUp ? "h4" : "h5" }
        sx={{
          color: "#FFFFFF",
          fontWeight: 600,
          fontFamily: manrope.style.fontFamily,
        }}
      >
        {icon}
      </Typography>
    </Box>
  );
}

export default function OosStepper(props) {
  const theme = useTheme();
  const smUp = useMediaQuery(theme.breakpoints.up("sm"));

  return (
    <Box {...props.sx}>
      <MUIStepper
        alternativeLabel
        connector={<StepConnector />}
        orientation={smUp ? "horizontal" : "vertical"}
        sx={{
          minHeight: { xs: 393, sm: 0 },
          alignItems: "center",
        }}
      >
        {props.steps.map((label, index) => {
          return (
            <Step key={index}>
              <StepLabel
                StepIconComponent={StepIcon}
                sx={{ py: 0, "& .MuiStepLabel-label": { mt: 0.5 } }}
              >
                <Typography
                  sx={{
                    fontFamily: manrope.style.fontFamily,
                    fontWeight: 700,
                    color: "#495057",
                    maxWidth: 180,
                    mx: "auto",
                  }}
                >
                  {label}
                </Typography>
              </StepLabel>
            </Step>
          );
        })}
      </MUIStepper>
    </Box>
  );
}
