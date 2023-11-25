import Image from "next/image";
import HamburgerMenu from "@/app/homepage/HamburgerMenu";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";

export default function Header() {
  return (
    <>
      {/*TODO: p={1} - how much px?*/}
      <AppBar elevation={0} color="transparent" position="static">
        <Toolbar
          sx={{
            justifyContent: "space-between",
            borderBottom: 1,
            borderColor: "#CED4DA",
            minHeight: 70,
            // TODO: Fix color
          }}
        >
          <Image src="/logo.png" width={117} height={27} alt="OOSCCA logo"/>
          {/* TODO: Add menu */}
          <HamburgerMenu/>
        </Toolbar>
      </AppBar>
    </>
  )
}
