"use client";

import OOSPlannerSection from "./OOSPlannerSection";
import ActivitiesCalendar from "./ActivitiesCalendar";
import Benefits from "./Benefits";
import Intro from "./Intro";
import { createContext, useRef, useState } from "react";
import dayjs from "dayjs";

export const SelectedDateContext = createContext({});

function getSelectedDayDefault() {
  let selectedDayDefault = dayjs.utc();
  const fixedDate = dayjs.utc('2024-07-15');
  if (selectedDayDefault.isBefore(fixedDate)) selectedDayDefault = dayjs.utc('2024-07-15');

  if (selectedDayDefault.day() === 6) return selectedDayDefault.add(2, "day");
  else if (selectedDayDefault.day() === 0) return selectedDayDefault.add(1, "day");
  else return selectedDayDefault;
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
