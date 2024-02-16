import ImagesMultipleUpload from "./components/ImageMultipleUpload";
import ActivitiesSection from "./sections/ActivitiesSection";
import SecondaryImagesSection from "./sections/SecondaryImagesSection";
import {MapSection} from "./sections/MapSection";
import Image from "next/image";
import React from "react";
import {Box} from "@mui/system";

export default function ActivityDetailsPage() {
  return (
    <>
      <ImagesMultipleUpload />
      <ActivitiesSection />
      <MapSection />
      <SecondaryImagesSection />
      <Box
        sx={{
        display: "flex",
        justifyContent: "center",
        mx: 2,
      }}>
        <Image
          src={ "/calendar.png" }
          alt="School"
          width="0"
          height="0"
          sizes="100vw"
          style={{ width: "100%", height: "auto", maxWidth: 500 }}
        />
      </Box>
    </>
  );
}
