'use client'

import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import {IconButton} from "@mui/material";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";

export default function HamburgerMenu() {
  const [isOpened, setIsOpened] = React.useState(false);

  const toggleDrawer = (isOpened) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setIsOpened(isOpened);
  };

  const menuItems = (
    <Box
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {['About us', 'Providers', 'Contuct us', 'Sign in'].map((text, index) => (
          // <ListItem key={text} disablePadding>
          //   <ListItemButton>
          //     <ListItemIcon>
          //       {index % 2 === 0 ? <InboxIcon/> : <MailIcon/>}
          //     </ListItemIcon>
          //     <ListItemText primary={text}/>
          //   </ListItemButton>
          // </ListItem>

          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemText primary={text}/>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      <React.Fragment>
        <IconButton onClick={toggleDrawer(true)}>
          {/*TODO: Fix color*/}
          {/*Why setting font size here?*/}
          <MenuOutlinedIcon sx={{fontSize: 33, color: "#0C0E0F"}}/>
        </IconButton>
        <Drawer
          anchor="top"
          open={isOpened}
          onClose={toggleDrawer(false)}
        >
          {menuItems}
        </Drawer>
      </React.Fragment>
    </div>
  );
}
