import ActivitiesSection from "./sections/ActivitiesSection";
import SecondaryImagesSection from "./sections/SecondaryImagesSection";
import TermsAndConditionsSection from "./sections/TermsAndConditionsSection";
import {SubmitSection} from "@/app/activities/[activityId]/sections/SubmitSection";

export default function ActivityDetailsPage() {
  return (
    <>
      <ActivitiesSection />
      <SecondaryImagesSection />
      <TermsAndConditionsSection />
      <SubmitSection />
    </>
  );
}
