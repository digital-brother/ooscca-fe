import ActivitiesSection from "./sections/ActivitiesSection";
import SecondaryImagesSection from "./sections/SecondaryImagesSection";
import TermsAndConditionsSection from "./sections/TermsAndConditionsSection";
import {MapSection} from "@/app/activities/[activityId]/sections/MapSection";

export default function ActivityDetailsPage() {
  return (
    <>
      <ActivitiesSection />
      <MapSection />
      <SecondaryImagesSection />
      <TermsAndConditionsSection />
    </>
  );
}
