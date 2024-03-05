"use client";

import { Box, Container } from "@mui/material";
import { useQuery } from "react-query";
import { getActivityImagesSecondary } from "../edit/api.mjs";
import { useParams } from "next/navigation";
import { ImageContainer, ImagePreview } from "../edit/components/ImageUpload";
import { grid } from "@mui/system";

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

export default function ActivityDetailPage() {
  return (
    <>
      <SecondaryImages />
    </>
  );
}