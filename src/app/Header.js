import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import {Box, IconButton} from "@mui/material";
import Image from "next/image";

export default function Header() {
  return (
    // TODO: p={1} - how much px?
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      py={1}
      pl={3}
      pr={1.5}
      // TODO: Fix color
      sx={{borderBottom: 1, borderColor: "#CED4DA"}}
    >
      <Image src="/logo.png" width={117} height={27} alt="OOSCCA logo"/>
      {/* TODO: Add menu */}
      <IconButton>
        {/*TODO: Fix color*/}
        <MenuOutlinedIcon sx={{fontSize: 33, color: "#0C0E0F"}}/>
      </IconButton>
    </Box>
  )
}
