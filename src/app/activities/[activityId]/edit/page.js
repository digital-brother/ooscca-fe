import ImagesMultipleUpload from "./components/ImageMultipleUpload";
import ActivityInfoSection from "./sections/ActivitiyInfoSection";
import SecondaryImagesSection from "./sections/SecondaryImagesSection";
import TermsAndConditionsSection from "./sections/TermsAndConditionsSection";
import {MapSection} from "./sections/MapSection";
import {SubmitSection} from "./sections/SubmitSection";

export default function ActivityDetailsPage() {
  return (
    <>
      <ImagesMultipleUpload />
      <ActivityInfoSection />
      <MapSection />
      <SecondaryImagesSection />
      <TermsAndConditionsSection />
      <SubmitSection />
    </>
  );
}
