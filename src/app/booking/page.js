"use client";

import OOSPlannerSection from "./OOSPlannerSection";
import ActivitiesCalendar from "./ActivitiesCalendar";
import Benefits from "./Benefits";
import Intro from "./Intro";
import { createContext, useRef, useState } from "react";
import dayjs from "dayjs";

export const SelectedDateContext = createContext({});

export default function Booking() {
  const [selectedDate, setSelectedDate] = useState(dayjs.utc());
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
