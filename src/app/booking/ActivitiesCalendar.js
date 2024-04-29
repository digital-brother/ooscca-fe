"use client";

import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Button, Chip, IconButton, Menu, MenuItem, Stack, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import Image from "next/image";

import { DotButton, useDotButton } from "@/app/booking/useDotButton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import useEmblaCarousel from "embla-carousel-react";
import _ from "lodash";
import PopupState, { bindMenu, bindTrigger } from "material-ui-popup-state";
import Link from "next/link";
import { useSnackbar } from "notistack";
import { forwardRef, useCallback, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { getFlatErrors } from "../activities/[activityId]/edit/components/formikFields";
import { createBooking, getActivitiesForDate, getChildren } from "../api.mjs";
dayjs.extend(utc);

function PickerDate({ date, setSelectedDate, isSelectedDate }) {
  return (
    <Box sx={{ pb: 2, borderBottom: "3px solid", borderColor: isSelectedDate ? "grey.900" : "transparent" }}>
      <Box
        onClick={() => setSelectedDate(date)}
        sx={{
          textAlign: "center",
          display: "block",
          bgcolor: isSelectedDate ? "grey.100" : "transparent",
          "&:hover": {
            bgcolor: "grey.200",
          },
          "&:active": {
            bgcolor: "grey.300",
          },
          cursor: "pointer",
          borderRadius: 2,
          py: 1.5,
          width: 45,
        }}
      >
        <Typography variant="h5">{date.format("DD")}</Typography>
        <Typography sx={{ fontWeight: 700 }}>{date.format("ddd")}</Typography>
      </Box>
    </Box>
  );
}

function DateSwitcher({ selectedDate, setSelectedDate }) {
  const dayOfWeek = selectedDate.day();

  let monday;
  if (dayOfWeek === 0 || dayOfWeek === 6) {
    monday = selectedDate.startOf("week").add(1, "day").add(1, "week");
  } else {
    monday = selectedDate.startOf("week").add(1, "day");
  }
  const weekDates = Array.from({ length: 5 }, (_, i) => monday.add(i, "day"));

  const isSameMonth = weekDates[0].month() === weekDates[weekDates.length - 1].month();
  const startMonthName = weekDates[0].format("MMMM");
  const endMonthName = isSameMonth ? "" : ` - ${weekDates[weekDates.length - 1].format("MMMM")}`;

  return (
    <Box>
      <Typography variant="h6" sx={{ textAlign: "center" }}>{`${startMonthName}${endMonthName}`}</Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid",
          borderColor: "grey.500",
          mt: 1,
        }}
      >
        <IconButton onClick={() => setSelectedDate(selectedDate.subtract(1, "week"))}>
          <ArrowBackIosNewIcon />
        </IconButton>
        {weekDates.map((date, index) => {
          const isSelectedDate = date.isSame(selectedDate, "day");
          return (
            <PickerDate key={index} date={date} setSelectedDate={setSelectedDate} isSelectedDate={isSelectedDate} />
          );
        })}
        <IconButton onClick={() => setSelectedDate(selectedDate.add(1, "week"))}>
          <ArrowForwardIosIcon />
        </IconButton>
      </Box>
    </Box>
  );
}

export function ActivityCard({ activity, targetDate }) {
  const activityDetailUrl = `/activities/${activity.id}/detail/${targetDate}`;
  const { data: children } = useQuery("children", getChildren);

  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  const mutation = useMutation((childId) => createBooking({ activity: activity.id, child: childId, date: targetDate }));
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
    <Stack sx={{ height: '100%', border: "1px solid", borderColor: "grey.500", borderRadius: 2, overflow: "hidden" }}>
      <Box sx={{ height: 200, position: "relative"}}>
        {activity?.imageUrl ? (
          <Image alt="Activity image" src={activity?.imageUrl} fill sizes="351px" style={{ objectFit: "cover" }} />
        ) : (
          <Stack sx={{ bgcolor: "grey.100", height: "100%", justifyContent: "center", alignItems: "center" }}>
            <Typography variant="h5" color="grey.500">
              No image
            </Typography>
          </Stack>
        )}
      </Box>
      <Stack sx={{ p: 2, flex: 1 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", gap: 1 }}>
          <Box>
            <Typography variant="subtitle1">{activity?.providerName}</Typography>
            <Typography variant="body2">{activity?.address}</Typography>
            <Typography variant="subtitle1" sx={{ mt: 2 }}>
              {activity?.type?.name}
            </Typography>
            <Typography variant="body2" sx={{ mb: 3 }}>
              {activity?.ageTo ? `(ages ${activity?.ageFrom}-${activity?.ageTo})` : `(age ${activity?.ageFrom})`}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <AccessTimeIcon fontSize="15" />
              <Typography variant="body2">
                {activity?.startTime} - {activity?.endTime}
              </Typography>
            </Box>
            {activity?.earlyDropOff && (
              <Typography variant="body2">
                <b>
                  {parseFloat(activity?.earlyDropOffPrice) ? (
                    `£${activity?.earlyDropOffPrice}`
                  ) : (
                    <Box component="span" sx={{ color: "green.main" }}>
                      FREE
                    </Box>
                  )}
                </b>
                &nbsp; Early drop off {activity?.earlyDropOffTime}
              </Typography>
            )}
            {activity?.latePickUp && (
              <Typography variant="body2">
                <b>
                  {parseFloat(activity?.latePickUpPrice) ? (
                    `£${activity?.latePickUpPrice}`
                  ) : (
                    <Box component="span" sx={{ color: "green.main" }}>
                      FREE
                    </Box>
                  )}
                </b>
                &nbsp; Late pick up {activity?.latePickUpTime}
              </Typography>
            )}
          </Box>

          <Stack sx={{ justifyContent: "space-between" }}>
            <Stack sx={{ gap: 0.5 }}>
              <ActivityClientBadges activity={activity} />
            </Stack>
            <ActivityDiscountedPrice activity={activity} />
          </Stack>
        </Box>
        <Box flex={1}></Box>
        <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", mt: 3, gap: 2 }}>
          <Link href={activityDetailUrl} passHref>
            <Button variant="outlined" fullWidth>
              Learn more
            </Button>
          </Link>
          {children && children.length === 1 && (
            <Button variant="contained" onClick={() => mutation.mutate(children[0].id, mutationConfig)}>
              Add
            </Button>
          )}
          {children && children.length > 1 && (
            <PopupState variant="popover" popupId="children-popup-menu" fullWidth>
              {(popupState) => (
                <>
                  <Button variant="contained" {...bindTrigger(popupState)} endIcon={<ExpandMoreIcon />}>
                    Add
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
                    sx={{ mt: 1 }}
                  >
                    {children.map((child) => (
                      <MenuItem
                        key={child.id}
                        onClick={() => {
                          popupState.close();
                          mutation.mutate(child.id, mutationConfig);
                        }}
                      >
                        {child.name}
                      </MenuItem>
                    ))}
                  </Menu>
                </>
              )}
            </PopupState>
          )}
        </Box>
      </Stack>
    </Stack>
  );
}

export function EmblaContainer({ emblaSx: emblaSxOuter, children }) {
  const [viewportRef, embla] = useEmblaCarousel({ align: "start", loop: true });
  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(embla);

  const scrollPrev = useCallback(() => {
    if (embla) embla.scrollPrev();
  }, [embla]);

  const scrollNext = useCallback(() => {
    if (embla) embla.scrollNext();
  }, [embla]);

  const emblaSx = {
    overflow: "hidden",
    ...emblaSxOuter,
  };
  const emblaContainerSx = {
    display: "flex",
    width: "100%",
  };

  return (
    <Box>
      <Box sx={emblaSx} ref={viewportRef}>
        <Box sx={emblaContainerSx}>{children}</Box>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
        <IconButton onClick={scrollPrev}>
          <ArrowBackIosNewIcon />
        </IconButton>

        {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              isSelected={index === selectedIndex}
              onClick={() => onDotButtonClick(index)}
            />
          ))}

        <IconButton onClick={scrollNext} >
          <ArrowForwardIosIcon />
        </IconButton>
      </Box>
    </Box>
  );
}

export function EmblaSlide({ emblaSlideSx: emblaSlideSxOuter, children }) {

  const emblaSlideSx = {
    flex: {xs: '0 0 100%', sm: '0 0 50%', md: `0 0 ${100/3}%`},
    minWidth: 0,
    pr: 2,
    ...emblaSlideSxOuter,
  };

  return <Box sx={emblaSlideSx}>{children}</Box>;
}

function ActivitiesList({ sx, selectedDate, meridiem }) {
  const formatDate = (date) => date.format("YYYY-MM-DD");

  const { status, data: activities } = useQuery(
    ["activitiesForDate", formatDate(selectedDate)],
    () => getActivitiesForDate(selectedDate),
    { staleTime: 1000 * 60 * 2 }
  );

  const isAgeMatch = (activity, child) => {
    const isSingleAge = !activity.ageTo;
    if (isSingleAge) return activity.ageFrom === child.age;
    else return activity.ageFrom <= child.age && activity.ageTo >= child.age;
  };
  const { data: children } = useQuery("children", getChildren);
  const ageMatchingActivities = activities?.filter((activity) =>
    children?.some((child) => isAgeMatch(activity, child))
  );

  let matchingActivities = [];
  if (["am", "pm", "full_day"].includes(meridiem))
    matchingActivities = ageMatchingActivities?.filter((activity) => activity.meridiem === meridiem);
  else matchingActivities = ageMatchingActivities;

  return (
    <>
      {status === "success" && matchingActivities && !_.isEmpty(matchingActivities) && (
        <EmblaContainer emblaSx={{ mt: 2 }}>
          {matchingActivities.map((activity) => (
            <EmblaSlide key={activity.id} >
              <ActivityCard activity={activity} targetDate={formatDate(selectedDate)} />
            </EmblaSlide>
          ))}
        </EmblaContainer>
      )}
    </>
  );
}

function MeridiemPicker({ sx, meridiem, setMeridiem }) {
  function handleClick(clickedMeridiem) {
    if (meridiem === clickedMeridiem) return setMeridiem(null);
    setMeridiem(clickedMeridiem);
  }
  return (
    <Box sx={{ display: "flex", gap: 1, ...sx }}>
      <Chip label="AM" variant={meridiem === "am" ? "filled" : "outlined"} onClick={() => handleClick("am")} />
      <Chip label="PM" variant={meridiem === "pm" ? "filled" : "outlined"} onClick={() => handleClick("pm")} />
      <Chip
        label="Full Day"
        variant={meridiem === "full_day" ? "filled" : "outlined"}
        onClick={() => handleClick("full_day")}
      />
    </Box>
  );
}

function ActivitiesCalendarBase({ selectedDate, setSelectedDate }, ref) {
  const [meridiem, setMeridiem] = useState(null);

  return (
    <Container ref={ref} sx={{ py: 10 }}>
      <DateSwitcher {...{ selectedDate, setSelectedDate }} />
      <MeridiemPicker {...{ meridiem, setMeridiem, sx: { mt: 4 } }} />
      <ActivitiesList sx={{ mt: 2, justifyContent: "center" }} {...{ selectedDate, meridiem }} />
    </Container>
  );
}
const ActivitiesCalendar = forwardRef(ActivitiesCalendarBase);
ActivitiesCalendar.displayName = "ActivitiesCalendar";
export default ActivitiesCalendar;

export function ActivityClientBadges({ activity }) {
  return (
    <>
      {activity?.goingFast && <Chip label="Going fast" sx={{ bgcolor: "magenta.main", color: "common.white" }} />}
      {activity?.spacesLeft <= 5 && (
        <Chip label="3 Spots left" sx={{ bgcolor: "yellow.main", color: "common.black" }} />
      )}
    </>
  );
}

export function ActivityDiscountedPrice({ activity }) {
  return (
    <Box sx={{ textAlign: "right" }}>
      {activity?.discountPercent ? (
        <>
          <Typography variant="body1" sx={{ fontWeight: 700, color: "green.500" }}>
            {activity.discountPercent}% off
          </Typography>
          <Typography variant="h5"> £{activity.discountedPrice}</Typography>
          <Typography variant="body1" sx={{ color: "grey.500", textDecoration: "line-through" }}>
            £{activity.price}
          </Typography>
        </>
      ) : (
        <Typography variant="h5"> £{activity?.price}</Typography>
      )}
    </Box>
  );
}
