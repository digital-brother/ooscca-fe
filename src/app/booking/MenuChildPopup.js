import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { bindMenu } from 'material-ui-popup-state';

export default function MenuChildPopup({ childrenData, popupState, handleClick }) {
  return (
      <Menu
        {...bindMenu(popupState)}
        slotProps={{
          paper: {
            style: {
              width: popupState.anchorEl ? popupState.anchorEl.clientWidth + "px" : undefined,
            },
          },
        }}
      >
        {childrenData?.map((child) => (
          <MenuItem key={child.id} onClick={() => {
            popupState.close();
            handleClick(child.id);
          }}>
            {child.displayName}
          </MenuItem> 
        ))}
      </Menu>
  );
};
