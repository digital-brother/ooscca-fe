"use client";

import { Box, Container, Typography } from "@mui/material";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { useParams } from "next/navigation";
import { useQuery } from "react-query";
import { getActivity, getActivityImagesSecondary } from "../edit/api.mjs";
import { ImageContainer, ImagePreview } from "../edit/components/ImageUpload";
import { MAP_API_KEY } from "../edit/components/Map";
import { AirlineSeatLegroomReducedOutlined } from "@mui/icons-material";

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
  const activityId = useParams().activityId;
  const { data: activity } = useQuery(["activity", activityId], () => getActivity(activityId));

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
  const activityId = useParams().activityId;
  const { data: activity } = useQuery(["activity", activityId], () => getActivity(activityId));
  const preRequisitesLines = activity?.preRequisites.split("\n");

  return (
    <>
      <Typography variant="h5">Description</Typography>
      {activity?.description}

      <Typography sx={{ mt: 3, fontWeight: 700 }}>Pre-requisites to join this class:</Typography>
      {preRequisitesLines && preRequisitesLines.map((line, index) => <Typography key={index}>- {line}</Typography>)}
    </>
  );
}

function ActivityInfo() {
  return (
    <Container sx={{ my: 10 }}>
      <ActivityDescription />
    </Container>
  );
}

export default function ActivityDetailPage() {
  return (
    <>
      <ActivityInfo />
      <Map />
      <SecondaryImages />
    </>
  );
}
