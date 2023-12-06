'use client'

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

const STEPS = [
  "Find the activities your child will love",
  "Add them to child’s calendar",
  "Review and then pay for all in one click",
];

const StepConnector = styled(MUIStepConnector)({
  [`&.${MUIStepConnectorClasses.alternativeLabel}`]: {
    top: 26,
    left: "calc(-50% + 30px)",
    right: "calc(50% + 30px)",
  },
  [`& .${MUIStepConnectorClasses.line}`]: {
    borderColor: "#6C757D",
  },
});

function StepIcon({ icon }) {
  return (
    <Box
      sx={{
        width: { xs: 41, md: 54 },
        height: { xs: 41, md: 54 },
        borderRadius: "50%",
        backgroundColor: "#000000",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography
        variant="h4"
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

export default function DemoStepper({ sx }) {
  const theme = useTheme();
  const mdUp = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <Box {...sx}>
      <MUIStepper
        alternativeLabel
        connector={<StepConnector />}
        orientation={mdUp ? "horizontal" : "vertical"}
        sx={{
          minHeight: { sm: 393, md: 0 },
        }}
      >
        {STEPS.map((label, index) => {
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
