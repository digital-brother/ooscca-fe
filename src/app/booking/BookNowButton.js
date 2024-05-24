import React from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { useSnackbar } from 'notistack';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { createBooking, getChildren } from "../api.mjs";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import { getFlatErrors } from "../activities/[activityId]/edit/components/formikFields";

export const BookNowButton = ({ activityId, targetDate }) => {
    const { data: children } = useQuery("children", getChildren);
    const mutation = useMutation((childId) => createBooking({ activity: activityId, child: childId, date: targetDate }));
    const queryClient = useQueryClient();
    const { enqueueSnackbar } = useSnackbar();
  
    const mutationConfig = {
      onSuccess: () => {
        enqueueSnackbar("Booking created", { variant: "success" });
        queryClient.invalidateQueries("bookings");
      },
      onError: (error) => {
          const errorMessage = getFlatErrors(error).join(". ");
          enqueueSnackbar(errorMessage, { variant: "error" });
      },
    };
  
    return (
      <>
        {children && children.length === 1 ? (
          <Button
            variant="contained"
            onClick={() => mutation.mutate(children[0].id, mutationConfig)}
          >
            Book now
          </Button>
        ) : (
          <PopupState variant="popover" popupId="children-popup-menu">
            {(popupState) => (
              <>
                <Button variant="contained" {...bindTrigger(popupState)} endIcon={<ExpandMoreIcon />}>
                Book now
                </Button>
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
                  {children?.map((child) => (
                    <MenuItem key={child.id} onClick={() => {
                      popupState.close();
                      mutation.mutate(child.id, mutationConfig);
                    }}>
                      {child.displayName}
                    </MenuItem> 
                  ))}
                </Menu>
              </>
            )}
          </PopupState>
        )}
      </>
    );
  };
