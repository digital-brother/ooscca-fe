"use client";

import OOSPlannerSection from "./OOSPlannerSection";
import ActivitiesCalendar from "./ActivitiesCalendar";
import Benefits from "./Benefits";
import Intro from "./Intro";
import { createContext, useRef, useState } from "react";
import dayjs from "dayjs";

export const SelectedDateContext = createContext({});

function getSelectedDayDefault() {
  let today = dayjs.utc();
  const fixedDate = dayjs.utc('2024-07-15');
  if (today.isBefore(fixedDate)) today = dayjs.utc('2024-07-15');

  if (today.day() === 6) return today.add(2, "day");
  else if (today.day() === 0) return today.add(1, "day");
  else return today;
}

export default function BookingPage() {
  const [selectedDate, setSelectedDate] = useState(getSelectedDayDefault());
  const ActivitiesCalendarRef = useRef(null);

  return (
    <>
      <Intro />
      <ActivitiesCalendar ref={ActivitiesCalendarRef} {...{ selectedDate, setSelectedDate }} />
      <SelectedDateContext.Provider value={{ selectedDate, setSelectedDate, ActivitiesCalendarRef }}>
        <OOSPlannerSection />
      </SelectedDateContext.Provider>
      <Benefits />
    </>
  );
}
