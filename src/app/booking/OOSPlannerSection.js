"use client";

import { deleteBooking, getBookings, getChildren, createBill, getBill, getFriendsBookings } from "@/app/api.mjs";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import FamilyRestroomIcon from "@mui/icons-material/FamilyRestroom";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import IosShareIcon from "@mui/icons-material/IosShare";
import {
  Box,
  Button,
  Container,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { styled } from "@mui/system";
import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";
import _ from "lodash";
import { useRouter, useSearchParams } from "next/navigation";
import { useSnackbar } from "notistack";
import { Suspense, useContext, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { getFlatErrors } from "../activities/[activityId]/edit/components/formikFields";
import { getDisplayedWeekModayDate } from "./ActivitiesCalendar";
import { SelectedDateContext } from "./page";
import PopupState, { bindTrigger } from 'material-ui-popup-state';
import ShareCalendarPopup from './ShareCalendarPopup';
import MenuChildPopup from "./MenuChildPopup";
import PreviosWeekButton from "./PreviosWeekButton"

dayjs.extend(weekday);

const BookingBox = styled(Box)(({ theme }) => ({
  flex: 1,
  borderRadius: theme.spacing(1),
  padding: theme.spacing(2),
}));

function FilledBooking({ booking }) {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();

  const mutation = useMutation(() => deleteBooking(booking.id), {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      enqueueSnackbar("Booking deleted", { variant: "success" });
    },
    onError: (error) => {
      const errorMessage = getFlatErrors(error).join(". ");
      enqueueSnackbar(errorMessage, { variant: "error" });
    },
  });

  const colorMapping = {
    tennis: "green",
    "table-tennis": "green",
    pedal: "green",
    gymnastics: "purple",
    cricket: "yellow",
    rugby: "orange",
    swimming: "blue",
    football: "magenta",

    squash: "purple",
    cycling: "orange",
    skiing: "yellow",
    "go-karting": "magenta",
    climbing: "green",
    mix: "blue",

    music: "purple",
    dancing: "orange",
    forestry: "magenta",
    rowing: "green",
    "soft-play": "blue",
  };

  const bgcolorBase = colorMapping[booking.activity.type?.slug] || "grey";
  const bgcolor = `${bgcolorBase}.100`;
  const statusBorderSxMap = { unpaid: "2px solid", pending: "1px solid", paid: "none" };
  const border = statusBorderSxMap[booking.status];
  const showDeleteIcon = ['unpaid', 'pending'].includes(booking.status);
  const [shareCalendarPopupOpen, setShareCalendarPopupOpen] = useState(false);
  const [shareCalendarChildId, setShareCalendarChildId] = useState();

  const showSharePopup = (shareCalendarChildId) => {
    setShareCalendarChildId(shareCalendarChildId);
    setShareCalendarPopupOpen(true);
  };

  return (
    <BookingBox
      sx={{
        display: "flex",
        flexDirection: "column",
        bgcolor,
        border,
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between", gap: 1 }}>
        <Typography sx={{ fontWeight: 700 }}>{booking.activity.type?.name}</Typography>
        {booking.status !== "paid" && <Typography sx={{ right: 12, top: 12, fontWeight: 700 }}>£{booking.price}</Typography>}
      </Box>
      <Typography>
        {booking.activity.startTime} - {booking.activity.endTime}
      </Typography>
      <Typography>{booking.activity.address}</Typography>
      <Box sx={{ mt: "auto", mb: -1.5, mx: -1.5, display: "flex", justifyContent: "space-between" }}>
        <IconButton>
          <IosShareIcon onClick={() => showSharePopup(booking.child)} />
        </IconButton>
        {showDeleteIcon && (
        <IconButton>
          <DeleteForeverIcon onClick={() => mutation.mutate()} />
        </IconButton>
        )}
      </Box>
      <ShareCalendarPopup open={shareCalendarPopupOpen} onClose={() => setShareCalendarPopupOpen(false)} childId={shareCalendarChildId} />
    </BookingBox>
  );
}

function FriendFilledBooking({ booking }) {
  return (
    <BookingBox
      sx={{
        display: "flex",
        flexDirection: "column",
        borderColor: "grey.main",
        bgcolor: "grey.100",
      }}
    >
      <Box sx={{ display: "flex" }}>
        <Typography sx={{ fontWeight: 700 }}>{booking.activity.type?.name}</Typography>
      </Box>
      <Typography>
        {booking.activity.startTime} - {booking.activity.endTime}
      </Typography>
      <Typography>{booking.activity.address}</Typography>
    </BookingBox>
  );
}

function EmptyBooking({ targetDate }) {
  const { setSelectedDate, ActivitiesCalendarRef } = useContext(SelectedDateContext);

  return (
    <BookingBox
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: "1px solid",
        borderColor: "grey.main",
        borderStyle: "dashed",
      }}
    >
      <Button
        color="grey"
        startIcon={<AddCircleOutlineIcon />}
        onClick={() => {
          setSelectedDate(targetDate);
          ActivitiesCalendarRef.current?.scrollIntoView({ behavior: "smooth" });
        }}
      >
        Add
      </Button>
    </BookingBox>
  );
}

function FriendEmptyBooking() {
  return (
    <BookingBox
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: "1px solid",
        borderColor: "grey.main",
        borderStyle: "dashed",
      }}
    ></BookingBox>
  );
}

function BookingDay({ bookings = [], targetDate, sx, bookingForFriendsTable }) {
  bookings = _.sortBy(bookings, [(booking) => booking.activity.meridiem]);

  if (!bookings || _.isEmpty(bookings)) bookings = [null, null];
  if (bookings.length === 1) {
    if (bookings[0].activity.meridiem === "am") bookings.push(null);
    if (bookings[0].activity.meridiem === "pm") bookings.unshift(null);
  }
  if (bookings.length > 2) bookings = bookings.slice(-2);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", rowGap: 1, height: 360, ...sx }}>
      {bookings.map((booking, index) =>
        bookingForFriendsTable ? (
          booking ? (
            <FriendFilledBooking key={booking.id} booking={booking} />
          ) : (
            <FriendEmptyBooking key={index} />
          )
        ) : booking ? (
          <FilledBooking key={booking.id} booking={booking} />
        ) : (
          <EmptyBooking key={index} targetDate={targetDate} />
        )
      )}
    </Box>
  );
}

const StyledHeaderTableCell = styled(TableCell)(({ theme }) =>
  theme.unstable_sx({
    borderBottom: "none",
    width: "18%",
    p: 1,
    fontSize: "1rem",
    fontWeight: 400,
    color: "grey.600",
  })
);

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  justifyContent: "center",
  borderBottom: "none",
  "&:not(:last-child)": {
    borderRight: "1px dashed",
    borderRightColor: theme.palette.grey[300],
  },
  "&:first-child": {
    borderRight: "1px solid",
    borderRightColor: theme.palette.grey[300],
  },
}));

function useBillPolling({ billIdInitial = null, onSuccess = () => {} }) {
  const { enqueueSnackbar } = useSnackbar();
  const [billId, setBillId] = useState(billIdInitial);
  const queryResult = useQuery(["bill", billId], () => getBill(billId), {
    enabled: !!billId,
    refetchInterval: 2000,
    onError: (error) => {
      const errorMsg = getFlatErrors(error).join("; ");
      enqueueSnackbar(errorMsg, { variant: "error" });
      setBillId(null);
    },
    onSuccess,
  });
  return { billId, setBillId, ...queryResult };
}

function useAwaitingStripeRedirectBill(billIdInitial = null) {
  const router = useRouter();
  const onSuccess = (bill) => bill?.stripeCheckoutSessionUrl && router.push(bill.stripeCheckoutSessionUrl);
  const { setBillId } = useBillPolling({ billIdInitial, onSuccess });
  return { setBillId };
}

function useAwaitingPaidStatusBill(billIdInitial = null) {
  const { enqueueSnackbar } = useSnackbar();
  const onSuccess = (bill) => {
    if (bill.status === "paid") {
      enqueueSnackbar("Payment successful!", { variant: "success" });
      setBillId(null);
    } else if (bill.status !== "open") {
      enqueueSnackbar(`Payment unsuccessfull: ${bill.status} status!`, { variant: "error" });
      setBillId(null);
    }
  };
  const { setBillId } = useBillPolling({ billIdInitial, onSuccess });
}

function FamilyBookings({ childrenData = [], weekDates }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const today = dayjs.utc()

  const { data: bookings } = useQuery(["bookings", weekDates], () =>
    getBookings({ dateAfter: weekDates[0], dateBefore: weekDates[4] })
  );

  const unpaidBookings = bookings?.filter((booking) => ["unpaid", "pending"].includes(booking.status));
  const relevantBooking = unpaidBookings?.filter((booking) => 
    today.isBefore(dayjs.utc(`${booking.date} ${booking.activity.startTime}`, 'YYYY-MM-DD HH:mm')))
  const relevantBookingIds = relevantBooking?.map((booking) => booking.id);
  const mutation = useMutation(() => createBill({ bookings: relevantBookingIds }), {
    onSuccess: (bill) => {
      if (bill?.stripeCheckoutSessionUrl) router.push(bill.stripeCheckoutSessionUrl);
      else {
        enqueueSnackbar("Preparing a checkout session...", { variant: "success" });
        setAwaitingStripeRedirectBill(bill.id);
      }
    },
    onError: (error) => {
      const errorMsg = getFlatErrors(error).join("; ");
      enqueueSnackbar(errorMsg, { variant: "error" });
    },
  });

  const { setBillId: setAwaitingStripeRedirectBill } = useAwaitingStripeRedirectBill();
  const awaitingPaidStatusBill = searchParams.get("awaitingPaidStatusBill");
  useAwaitingPaidStatusBill(awaitingPaidStatusBill);

  return (
    <>
      {childrenData?.map((child, index) => {
        const isLastChild = index + 1 === childrenData.length;
        return (
          <TableRow key={child.id} sx={isLastChild ? {} : { borderBottom: "1px solid", borderColor: "grey.300" }}>
            <StyledTableCell component="th" scope="row">
              <Typography sx={{ fontWeight: 700, textAlign: "center" }}>{child.displayName}</Typography>
            </StyledTableCell>
            {weekDates.map((targetDate, index) => {
              const dateBookings = bookings?.filter(
                (booking) => booking.child === child.id && dayjs(booking.date).isSame(targetDate, "day")
              );
              return (
                <StyledTableCell key={index} align="left" sx={isLastChild && { pb: 0 }}>
                  <BookingDay bookings={dateBookings} targetDate={targetDate} sx={{ mx: "auto" }}/>
                </StyledTableCell>
              );
            })}
          </TableRow>
        );
      })}
      {childrenData && childrenData.length !== 0 && (
        <TableRow>
          <StyledTableCell></StyledTableCell>
          <StyledTableCell colSpan={5} sx={{ textAlign: "right" }}>
            <Button variant="contained" color="yellow" onClick={mutation.mutate}>
              Pay now
            </Button>
          </StyledTableCell>
        </TableRow>
      )}
    </>
  );
}

function FriendsBookings({ childrenData = [], weekDates }) {
  const [selectedChild, setSelectedChild] = useState(childrenData[0]);
  const { data: friendsBookings } = useQuery(["friendsBookings", weekDates], () =>
    getFriendsBookings({ dateAfter: weekDates[0], dateBefore: weekDates[4] })
  );

  return (
    <>
      <TableRow>
        <StyledTableCell sx={{ textAlign: "center" }}>
          <PersonAddAltIcon />
          <Typography sx={{ fontWeight: 700 }}>Friends</Typography>
        </StyledTableCell>
        <StyledTableCell colSpan={5}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {childrenData.map((child) => (
              <Button
                key={child.id}
                variant={selectedChild === child ? "contained" : "outlined"}
                color="grey"
                onClick={() => setSelectedChild(child)}
              >
                {child.displayName}&apos;s friends
              </Button>
            ))}
          </Box>
        </StyledTableCell>
      </TableRow>

      {selectedChild?.friends?.length === 0 ? (
        <TableRow>
          <StyledTableCell></StyledTableCell>
          <StyledTableCell colSpan={6} align="left">
            <Typography sx={{ fontWeight: 700 }}>{selectedChild.displayName} has no friends yet</Typography>
          </StyledTableCell>
        </TableRow>
      ) : (
        selectedChild?.friends?.map((friend, index) => {
          const isLastChild = index + 1 === selectedChild.friends.length;
          const friendBookings = friendsBookings?.filter((booking) => booking.child === friend.id);
          return (
            <TableRow
              key={friend.id}
              sx={{
                borderBottom: isLastChild ? "none" : "1px solid",
                borderTop: index === 0 ? "1px solid" : "none",
                borderColor: "grey.300",
              }}
            >
              <StyledTableCell component="th" scope="row">
                <Typography sx={{ fontWeight: 700, textAlign: "center" }}>{friend.displayName}</Typography>
              </StyledTableCell>

              {friendBookings?.length === 0 ? (
                <StyledTableCell colSpan={6} align="center">
                  <Typography sx={{ fontWeight: 700 }}>No bookings</Typography>
                </StyledTableCell>
              ) : (
                weekDates.map((targetDate, idx) => {
                  const dateBookings = friendsBookings?.filter(
                    (booking) => booking.child === friend.id && dayjs(booking.date).isSame(targetDate, "day")
                  );
                  return (
                    <StyledTableCell key={idx} align="left" sx={isLastChild ? { pb: 2 } : {}}>
                      <BookingDay
                        bookings={dateBookings}
                        targetDate={targetDate}
                        sx={{ mx: "auto" }}
                        bookingForFriendsTable={true}
                      />
                    </StyledTableCell>
                  );
                })
              )}
            </TableRow>
          );
        })
      )}
    </>
  );
}

export const ShareCalendar = ({ childrenData }) => {
  const [shareCalendarPopupOpen, setShareCalendarPopupOpen] = useState(false);
  const [shareCalendarChildId, setShareCalendarChildId] = useState();

  const showSharePopup = (shareCalendarChildId) => {
    setShareCalendarChildId(shareCalendarChildId);
    setShareCalendarPopupOpen(true);
  };

  return (
    <>
      {childrenData?.length === 1 ? (
        <Button startIcon={<IosShareIcon />} variant="outlined" color="grey" onClick={() => {
          showSharePopup(childrenData[0].id);
        }}>
          Share Calendar
        </Button>
      ) : (
        <PopupState variant="popover" popupId="children-popup-menu">
          {(popupState) => (
            <>
              <Button startIcon={<IosShareIcon />} {...bindTrigger(popupState)} variant="outlined" color="grey">
                  Share Calendar
              </Button>
            <MenuChildPopup childrenData={childrenData} popupState={popupState} handleClick={showSharePopup} />
            </>
          )}
        </PopupState>
      )}
      <ShareCalendarPopup open={shareCalendarPopupOpen} onClose={() => setShareCalendarPopupOpen(false)} childId={shareCalendarChildId} />
    </>
  );
};

function BookingsTable() {
  const { selectedDate, setSelectedDate } = useContext(SelectedDateContext);

  const { data: children, isLoading: isLoadingChildren } = useQuery("children", getChildren);
  const weekDates = Array.from({ length: 5 }, (_, i) => getDisplayedWeekModayDate(selectedDate).add(i, "day"));

  const formatDate = (date) => date.format("ddd D");
  const handleNextWeek = () => setSelectedDate(selectedDate.add(7, "day"));

  return (
    !isLoadingChildren && (
      <TableContainer component={Box}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <StyledTableCell rowSpan={2} sx={{ verticalAlign: "bottom", textAlign: "center" }}>
                <FamilyRestroomIcon />
                <Typography sx={{ fontWeight: 700 }}>Family</Typography>
              </StyledTableCell>

              <StyledTableCell colSpan={5}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <Typography variant="h6">{selectedDate.format("MMMM YYYY")}</Typography>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <PreviosWeekButton selectedDate={selectedDate} setSelectedDate={setSelectedDate}/>
                    <Button color="grey" sx={{ py: 0.2 }} onClick={() => setSelectedDate(dayjs())}>
                      Today
                    </Button>
                    <IconButton onClick={handleNextWeek}>
                      <ArrowForwardIosIcon />
                    </IconButton>
                  </Box>
                  <ShareCalendar childrenData={children} />
                </Box>
              </StyledTableCell>
            </TableRow>

            <TableRow sx={{ borderBottom: "1px solid", borderColor: "grey.300" }}>
              {weekDates.map((date, index) => (
                <StyledHeaderTableCell key={index} align="center">
                  <Box
                    sx={{ bgcolor: dayjs().isSame(date, "day") ? "grey.100" : "transparent", borderRadius: 1.5, py: 1 }}
                  >
                    {formatDate(date)}
                  </Box>
                </StyledHeaderTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {children?.length !== 0 ? (
              <>
                <FamilyBookings childrenData={children} weekDates={weekDates} />
                <FriendsBookings childrenData={children} weekDates={weekDates} />
              </>
            ) : (
              <TableRow>
                <StyledTableCell></StyledTableCell>
                <StyledTableCell colSpan={6} align="left" sx={{ pb: 4, pt: 2 }}>
                  <Typography sx={{ fontWeight: 700 }}>No children</Typography>
                </StyledTableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    )
  );
}

const Wrapper = styled(Box)(({ theme }) =>
  theme.unstable_sx({
    borderRadius: 2,
    border: "1px solid",
    borderColor: "grey.300",
    bgcolor: "white",
  })
);

export default function OOSPlannerSection() {
  return (
    <Box sx={{ bgcolor: "grey.50", py: 10 }}>
      <Container>
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="overlineBold">Directly from calendar</Typography>
          <Typography variant="h2" sx={{ mt: 2 }}>
            Enjoy the ease of booking activities without the text and email tennis
          </Typography>
        </Box>
        <Wrapper sx={{ mt: 8 }}>
          <Suspense fallback="loading...">
            <BookingsTable />
          </Suspense>
        </Wrapper>
      </Container>
    </Box>
  );
}
