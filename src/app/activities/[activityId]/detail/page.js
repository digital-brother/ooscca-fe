import ImagesMultipleUpload from "./components/ImageMultipleUpload";
import ActivitiesSection from "./sections/ActivitiesSection";
import SecondaryImagesSection from "./sections/SecondaryImagesSection";
import {MapSection} from "./sections/MapSection";
import {SubmitSection} from "./sections/SubmitSection";

export default function ActivityDetailsPage() {
  return (
    <>
      <ImagesMultipleUpload />
      <ActivitiesSection />
      <MapSection />
      <SecondaryImagesSection />
      <SubmitSection />
    </>
  );
}
