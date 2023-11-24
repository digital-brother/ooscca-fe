// TODO: Correct file name Header? (it is a component)
import {Box} from "@mui/material";
import Image from "next/image";

export default function Header() {
  return (
    // TODO: p={1} - how much px?
    <Box display="flex" justifyContent="space-between" p={2} sx={{borderBottom: 1}}>
      <Image src="/logo.png" width={117} height={27} alt="OOSCCA logo"/>
      {/* TODO: Add menu */}
      <Image src="/hamburger.svg" width={36} height={21} alt="Menu icon"/>
    </Box>
  )
}
