import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

export default function TemporaryDrawer() {
  const [isOpened, setIsOpened] = React.useState(false);

  const toggleDrawer = (isOpened) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setIsOpened(isOpened);
  };

  const menuItems = (
    <Box
      sx={{width: 'auto'}}
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
        <Button onClick={toggleDrawer(true)}>Menu</Button>
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
