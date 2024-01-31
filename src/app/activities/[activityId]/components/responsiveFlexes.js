import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";


export const SmFlex = styled(Box)(({ theme }) => ({
  display: "flex",
  columnGap: "0.5rem",
  [theme.breakpoints.up("xs")]: {
    flexDirection: "column",
    textAlign: "center",
  },
  [theme.breakpoints.up("sm")]: {
    flexDirection: "row",
    textAlign: "left",
  },
}));
