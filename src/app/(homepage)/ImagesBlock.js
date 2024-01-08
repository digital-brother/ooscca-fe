"use client";

import { useState } from "react";
import {Box, Button, Container, IconButton} from "@mui/material";
import Typography from "@mui/material/Typography";

import {ImageInput} from "@/app/activities/components/LogoUploadDropzone";

import * as React from "react";
import Grid from "@mui/material/Grid";

import {
  getImages,
  patchImage,
  deleteImage,
  postImage,
  TEST_ACTIVITY_ID,
} from "@/app/activities/apiImage.mjs";

export default function ImagesBlock() {
  const [files, setFiles] = useState([]);
  const numberOfElements = 3;
  const imageInputs = [];

  for (let i = 1; i <= numberOfElements; i++) {
    imageInputs.push(
      <Grid key={i} item xs={4} sx={{ borderRadius: "8px" }}>
        <ImageInput files={files} setFiles={setFiles} sx={{
          backgroundColor: "#D9D9D9",
          height: 396,
          borderRadius: "16px"
        }} />
      </Grid>
    );
  }


  return (
    <Container sx={{
      py: {xs: 6, md: 3},
      backgroundColor: "#ffffff",
      borderRadius: "16px",
      display: "flex",
      flexDirection: "column",
    }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sx={{borderRadius: "8px"}}>
          <Box sx={{
            backgroundColor: "#D9D9D9",
            borderRadius: "16px",
          }}>
            <Typography sx={{
              color: "#000",
              py: "188px",
              py: 24,
              textAlign: "center",
              // fontFamily: "Montserrat",
              fontSize: 20,
              fontStyle: "normal",
              fontWeight: 600,
              lineHeight: 1.4,
              letterSpacing: 0.2,
            }}>
              Map will auto generated here
            </Typography>
          </Box>
        </Grid>
        {imageInputs}
      </Grid>
    </Container>
  )
}
