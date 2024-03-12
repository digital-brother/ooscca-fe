import OOSPlannerSection from "./OOSPlannerSection";
import ActivitiesCalendar from "./ActivitiesCalendar";
import Benefits from "./Benefits";
import Intro from "./Intro";

export default function Booking() {
  return (
    <>
      <Intro />
      <ActivitiesCalendar />
      <OOSPlannerSection />
      <Benefits />
    </>
  )
}
