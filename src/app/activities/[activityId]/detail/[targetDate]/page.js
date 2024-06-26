"use client";

import { ImageContainer, ImagePreview } from "@/app/activities/[activityId]/edit/components/ImageUpload";
import { MAP_API_KEY } from "@/app/activities/[activityId]/edit/components/Map";
import {
  ActivityDetails,
  ActivityInfoContainer,
  SlideContainer,
} from "@/app/activities/[activityId]/edit/sections/ActivitiyInfoSection";
import { getActivityForDate, getActivityImagesPrimary, getActivityImagesSecondary } from "@/app/api.mjs";
import { Box, Container, Typography } from "@mui/material";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useQuery } from "react-query";

export function EmblaContainer({ emblaSx: emblaSxOuter, children }) {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay()]);

  const emblaSx = {
    overflow: "hidden",
    ...emblaSxOuter,
  };
  const emblaContainerSx = {
    display: "flex",
  };

  return (
    <Box sx={emblaSx} ref={emblaRef}>
      <Box sx={emblaContainerSx}>{children}</Box>
    </Box>
  );
}

export function EmblaSlide({ emblaSlideSx: emblaSlideSxOuter, children }) {
  const emblaSlideSx = {
    flex: "0 0 100%",
    minWidth: 0,
    ...emblaSlideSxOuter,
  };
  return <Box sx={emblaSlideSx}>{children}</Box>;
}

function PrimaryImages() {
  const { activityId } = useParams();
  const { data: primaryImages } = useQuery("activityImagesPrimary", () => getActivityImagesPrimary(activityId));
  return (
    <Container sx={{ mt: 5, mb: 10 }}>
      <EmblaContainer emblaSx={{ borderRadius: 2 }}>
        {primaryImages?.map((image, index) => (
          <EmblaSlide key={index} emblaSlideSx={{ height: 600, position: "relative" }}>
            <Image src={image.url} fill style={{ objectFit: "cover" }} alt={image.name} sizes="100vw" priority={true} />
          </EmblaSlide>
        ))}
      </EmblaContainer>
    </Container>
  );
}

function SecondaryImages() {
  const activityId = useParams().activityId;
  const { data: secondaryImages } = useQuery("activityImagesSecondary", () => getActivityImagesSecondary(activityId));

  let gridTemplateColumns;
  if (secondaryImages?.length === 0) return null;
  else if (secondaryImages?.length === 1) gridTemplateColumns = "1fr";
  else if (secondaryImages?.length === 2) gridTemplateColumns = { xs: "1fr", md: "repeat(2, 1fr)" };
  else if (secondaryImages?.length === 3)
    gridTemplateColumns = { xs: "1fr", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" };

  return (
    <Container sx={{ my: 10 }}>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns,
          justifyItems: "center",
          gap: 5,
        }}
      >
        {secondaryImages?.map((secondaryImage, index) => (
          <ImageContainer
            key={index}
            sx={{
              width: "100%",
              gridColumn: index === 2 ? { md: "span 2", lg: "auto" } : "auto",
              maxWidth: 553,
            }}
          >
            <ImagePreview image={secondaryImage} />
          </ImageContainer>
        ))}
      </Box>
    </Container>
  );
}

function Map() {
  const { activityId, targetDate } = useParams();
  const { data: activity } = useQuery(["activity", activityId, targetDate], () =>
    getActivityForDate(activityId, targetDate)
  );

  const londonCoordinates = { lat: 51.5074, lng: -0.1278 };
  const coordinates = { lat: parseFloat(activity?.latitude), lng: parseFloat(activity?.longitude) };

  return (
    <Container sx={{ my: 10 }}>
      <Typography sx={{ fontWeight: 600 }}>{activity?.providerName}</Typography>
      <Typography sx={{ mb: 2 }}>{activity?.address}</Typography>
      <LoadScript googleMapsApiKey={MAP_API_KEY}>
        <GoogleMap mapContainerStyle={{ height: 700 }} center={coordinates || londonCoordinates} zoom={10}>
          {coordinates && !!coordinates.lat && !!coordinates.lng && (
            <Marker position={{ lat: coordinates.lat, lng: coordinates.lng }}></Marker>
          )}
        </GoogleMap>
      </LoadScript>
    </Container>
  );
}

function ActivityDescription() {
  const { activityId, targetDate } = useParams();
  const { data: activity } = useQuery(["activity", activityId, targetDate], () =>
    getActivityForDate(activityId, targetDate)
  );

  return (
    <Box>
      <Typography variant="h5">Description</Typography>
      {activity?.description ? (
        <Box dangerouslySetInnerHTML={{ __html: activity.description }} />
      ) : (
        <Typography sx={{ fontWeight: 700 }}>Add description for parents to read here.</Typography>
      )}

      <Typography sx={{ mt: 3, fontWeight: 700 }}>Pre-requisites to join this class:</Typography>
      {activity?.preRequisites ? (
        <Box dangerouslySetInnerHTML={{ __html: activity.preRequisites }} />
      ) : (
        <Typography sx={{ fontWeight: 700 }}>Add short important information for parents to read here.</Typography>
      )}
    </Box>
  );
}

function ActivityInfo() {
  const { activityId, targetDate } = useParams();
  const [isEarlyDropOffSelected, setIsEarlyDropOffSelected] = useState(false);
  const [isLatePickUpSelected, setIsLatePickUpSelected] = useState(false);

  return (
    <Container sx={{ my: 10 }}>
      <ActivityInfoContainer>
        <ActivityDescription />
        <Box>
          <SlideContainer sx={{ minHeight: 0 }}>
            <ActivityDetails
              sx={{ flex: 1 }}
              isEarlyDropOffSelected={isEarlyDropOffSelected}
              isLatePickUpSelected={isLatePickUpSelected}
              setIsEarlyDropOffSelected={setIsEarlyDropOffSelected}
              setIsLatePickUpSelected={setIsLatePickUpSelected}
            />
          </SlideContainer>
        </Box>
      </ActivityInfoContainer>
    </Container>
  );
}
function FooterImage() {
  return (
    <Container sx={{ mt: 10 }}>
      <Image
        src="/activity-detail-footer.png"
        alt="footer image"
        width={506}
        height={410}
        style={{ maxWidth: "100%", height: "auto", display: "block", margin: "0 auto -12px" }}
      />
    </Container>
  );
}

function LogoImage() {
  const { activityId, targetDate } = useParams();
  const { data: activity } = useQuery(["activity", activityId, targetDate], () =>
    getActivityForDate(activityId, targetDate)
  );

  return (
    activity?.providerLogoUrl && (
      <Container sx={{ mt: 8, mb: 5 }}>
        <Image
          src={activity?.providerLogoUrl}
          alt="logo image"
          width={150}
          height={150}
          style={{ maxWidth: 150, height: "auto", width: "100%" }}
        />
      </Container>
    )
  );
}

export default function ActivityDetailPage() {
  return (
    <>
      <LogoImage />
      <PrimaryImages />
      <ActivityInfo />
      <Map />
      <SecondaryImages />
      <FooterImage />
    </>
  );
}
