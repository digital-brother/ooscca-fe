"use client";

import { Box, Button, Container, Typography } from "@mui/material";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { useParams } from "next/navigation";
import { useQuery } from "react-query";
import { getActivityForDate, getActivityImagesPrimary, getActivityImagesSecondary } from "../../edit/api.mjs";
import { ImageContainer, ImagePreview } from "../../edit/components/ImageUpload";
import { MAP_API_KEY } from "../../edit/components/Map";
import { ActivityDetails, ActivityInfoContainer, SlideContainer } from "../../edit/sections/ActivitiyInfoSection";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

export function EmblaCarousel() {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay()]);
  
  const { activityId } = useParams();
  const { data: primaryImages } = useQuery("activityImagesPrimary", () => getActivityImagesPrimary(activityId));

  const emblaSx = {
    overflow: "hidden",
  };
  const emblaContainerSx = {
    display: "flex",
  };
  const emblaSlideSx = {
    flex: "0 0 100%",
    minWidth: 0,
  };

  return (
    <Box sx={emblaSx} ref={emblaRef}>
      <Box sx={emblaContainerSx}>
        {primaryImages?.map((image, index) => (
          <Box key={index} sx={emblaSlideSx}>
            <img src={image.url} style={{ width: "100%", height: 600, objectFit: "cover" }} />
          </Box>
        ))}
      </Box>
    </Box>
  );
}

function PrimaryImages() {
  return (
    <Container sx={{ my: 10 }}>
      <EmblaCarousel />
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
  const preRequisitesLines = activity?.preRequisites.split("\n");

  return (
    <Box>
      <Typography variant="h5">Description</Typography>
      {activity?.description}

      <Typography sx={{ mt: 3, fontWeight: 700 }}>Pre-requisites to join this class:</Typography>
      {preRequisitesLines && preRequisitesLines.map((line, index) => <Typography key={index}>- {line}</Typography>)}
    </Box>
  );
}

function ActivityInfo() {
  return (
    <Container sx={{ my: 10 }}>
      <ActivityInfoContainer>
        <ActivityDescription />
        <SlideContainer sx={{ minHeight: 0 }}>
          <ActivityDetails sx={{ flex: 1 }} />
          <Button variant="contained" sx={{ mt: 3 }}>
            Add to calendar
          </Button>
        </SlideContainer>
      </ActivityInfoContainer>
    </Container>
  );
}

export default function ActivityDetailPage() {
  return (
    <>
      <PrimaryImages />
      <ActivityInfo />
      <Map />
      <SecondaryImages />
    </>
  );
}
