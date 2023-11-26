'use client'

import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import {IconButton} from "@mui/material";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import {NavLinks} from "@/app/Header";
import CloseIcon from "@/assets/CloseIcon";

export default function HamburgerMenu({sx}) {
  const [isOpened, setIsOpened] = React.useState(false);

  const toggleDrawer = (isOpened) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setIsOpened(isOpened);
  };

  return (
    <>
      {/*================ HAMBURGER MENU ICON ================ */}
      <IconButton onClick={toggleDrawer(true)} sx={{mr: -1, ...sx}}>
        {/*TODO: Fix color*/}
        {/*Why setting font size here?*/}
        <MenuOutlinedIcon sx={{fontSize: 33, color: "#0C0E0F"}}/>
      </IconButton>

      <Drawer
        anchor="top"
        open={isOpened}
        onClose={toggleDrawer(false)}
      >
        {/*================ HAMBURGER MENU CONTAINER ================ */}
        <Box
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 5,
            pt: 30,
            pb: 38,
            position: "relative",
            bgcolor: "#F8F9FA",
            fontSize: 24,
            fontWeight: 600,
          }}
        >
          {/*================ HAMBURGER MENU CLOSE ICON ================ */}
          <IconButton sx={{position: "absolute", top: 32, right: 32, fontSize: 15}}>
            <CloseIcon/>
          </IconButton>
          {/*================ HAMBURGER MENU LINKS ================*/}
          <NavLinks/>
        </Box>
      </Drawer>
    </>
  );
}
