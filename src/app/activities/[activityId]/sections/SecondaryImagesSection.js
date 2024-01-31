"use client";

import { Box, Container } from "@mui/material";

import ImageUpload from "../components/ImageUpload";

export default function SecondaryImagesSection() {
  return (
    <Container>
      <Box
        sx={{
          width: "fit-content",
          mx: "auto",
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" },
          justifyItems: "center",
          gap: 5,
          mb: 10,
        }}
      >
        <ImageUpload key={1} order={1} />
        <ImageUpload key={2} order={2} />
        <ImageUpload key={3} order={3} sx={{ gridColumn: { md: "span 2", lg: "auto" } }} />
      </Box>
    </Container>
  );
}
