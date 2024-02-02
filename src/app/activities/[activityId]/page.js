import ImageMultipleUpload from "./components/ImageMultipleUpload";
import ActivitiesSection from "./sections/ActivitiesSection";
import SecondaryImagesSection from "./sections/SecondaryImagesSection";
import TermsAndConditionsSection from "./sections/TermsAndConditionsSection";

export default function ActivityDetailsPage() {
  return (
    <>
      <ImageMultipleUpload />
      <ActivitiesSection />
      <SecondaryImagesSection />
      <TermsAndConditionsSection />
    </>
  );
}
