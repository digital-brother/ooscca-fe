import {Box} from "@mui/material";
import Image from "next/image";
import HamburgerMenu from "@/app/homepage/HamburgerMenu";

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
      <HamburgerMenu/>
    </Box>
  )
}
