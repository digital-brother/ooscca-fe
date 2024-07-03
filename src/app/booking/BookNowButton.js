import {  useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { useSnackbar } from 'notistack';
import Button from '@mui/material/Button';
import { getDisplayedWeekModayDate } from "@/app/booking/ActivitiesCalendar";
import { createBooking, getChildren, createBookingSet } from "../api.mjs";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PopupState, { bindTrigger } from 'material-ui-popup-state';
import { getFlatErrors } from "../activities/[activityId]/edit/components/formikFields";
import MenuChildPopup from "./MenuChildPopup";
import WholeWeekDialog from "./WholeWeekDialog";
import dayjs from "dayjs";

export const BookNowButton = ({ activity, targetDate, isEarlyDropOffSelected, isLatePickUpSelected }) => {
    const displayedWeekModayDate = getDisplayedWeekModayDate(dayjs(targetDate));
    const weekDates = Array.from({ length: 5 }, (_, i) => displayedWeekModayDate.add(i, "day"));
    const [isDialogOpen, setDialogOpen] = useState(false);
    const [selectedChildId, setSelectedChildId] = useState(null);

    const [earlyDropOffDays, setEarlyDropOffDays] = useState({
      Monday: false,
      Tuesday: false,
      Wednesday: false,
      Thursday: false,
      Friday: false,
    });
  
    const [latePickupDays, setLatePickupDays] = useState({
      Monday: false,
      Tuesday: false,
      Wednesday: false,
      Thursday: false,
      Friday: false,
    });

    const transformDaysToArray = (days) => {
      return ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map(day => days[day]);
    };

    const { data: children } = useQuery("children", getChildren);
    const queryClient = useQueryClient();
    const { enqueueSnackbar } = useSnackbar();

    const onSuccess = () => {
      enqueueSnackbar("Booking created", { variant: "success" });
      queryClient.invalidateQueries("bookings");
    }
    const onError = (error) => {
        const errorMessage = getFlatErrors(error).join(". ");
        enqueueSnackbar(errorMessage, { variant: "error" });
    }

    const mutation = useMutation(
      (childId) => activity.isWholeWeekOnly
        ? createBookingSet(
          {
            activity: activity.id,
            child: childId,
            startDate: weekDates[0].format("YYYY-MM-DD"),
            endDate: weekDates[4].format("YYYY-MM-DD"),
            isEarlyDropOffList: transformDaysToArray(earlyDropOffDays),
            isLatePickUpList: transformDaysToArray(latePickupDays),
          }
        )
        : 
          createBooking({
            activity: activity.id,
            child: childId,
            date: targetDate,
            isEarlyDropOff: isEarlyDropOffSelected,
            isLatePickUp: isLatePickUpSelected
          }),
      {
        onSuccess,
        onError
      }
    );

    const handleBookNowClick = (childId) => {
      if (activity.isWholeWeekOnly) {
        setSelectedChildId(childId);
        setDialogOpen(true);
      } else {
        mutation.mutate(childId);
      }
    };

    const handleConfirm = () => {
      setDialogOpen(false);
      mutation.mutate(selectedChildId);
    };
  
    return (
      <>
        <WholeWeekDialog
          open={isDialogOpen}
          onClose={() => setDialogOpen(false)}
          activity={activity}
          onConfirm={handleConfirm}
          earlyDropOffDays={earlyDropOffDays}
          setEarlyDropOffDays={setEarlyDropOffDays}
          latePickupDays={latePickupDays}
          setLatePickupDays={setLatePickupDays}
        />
        {children && children.length === 1 ? (
          <Button
            variant="contained"
            onClick={() => handleBookNowClick(children[0].id)}
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
                <MenuChildPopup childrenData={children} popupState={popupState} handleClick={handleBookNowClick}/>
              </>
            )}
          </PopupState>
        )}
      </>
    );
  };
