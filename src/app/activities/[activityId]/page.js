import ActivitiesSection from "./sections/ActivitiesSection";
import SecondaryImagesSection from "./sections/SecondaryImagesSection";
import TermsAndConditionsSection from "./sections/TermsAndConditionsSection";
import {MapSection} from "@/app/activities/[activityId]/sections/MapSection";
import {SubmitSection} from "@/app/activities/[activityId]/sections/SubmitSection";

export default function ActivityDetailsPage() {
  return (
    <>
      <ActivitiesSection />
      <MapSection />
      <SecondaryImagesSection />
      <TermsAndConditionsSection />
      <SubmitSection />
    </>
  );
}
