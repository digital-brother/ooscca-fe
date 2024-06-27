import React from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { useSnackbar } from 'notistack';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { createBooking, getChildren } from "../api.mjs";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PopupState, { bindTrigger } from 'material-ui-popup-state';
import { getFlatErrors } from "../activities/[activityId]/edit/components/formikFields";
import MenuChildPopup from "./MenuChildPopup";

export const BookNowButton = ({ activityId, targetDate, isEarlyDropOffSelected, isLatePickUpSelected }) => {
    const { data: children } = useQuery("children", getChildren);
    const queryClient = useQueryClient();
    const { enqueueSnackbar } = useSnackbar();
    const mutation = useMutation((childId) => createBooking({ activity: activityId, child: childId, date: targetDate, isEarlyDropOff: isEarlyDropOffSelected, isLatePickUp: isLatePickUpSelected }), 
    {
      onSuccess: () => {
        enqueueSnackbar("Booking created", { variant: "success" });
        queryClient.invalidateQueries("bookings");
      },
      onError: (error) => {
          const errorMessage = getFlatErrors(error).join(". ");
          enqueueSnackbar(errorMessage, { variant: "error" });
      },
    });
  
    return (
      <>
        {children && children.length === 1 ? (
          <Button
            variant="contained"
            onClick={() => mutation.mutate(children[0].id)}
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
                <MenuChildPopup childrenData={children} popupState={popupState} handleClick={mutation.mutate}/>
              </>
            )}
          </PopupState>
        )}
      </>
    );
  };
