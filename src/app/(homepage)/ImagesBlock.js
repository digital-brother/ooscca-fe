"use client";

import { useEffect, useState } from "react";
import {Box, Button, Container, IconButton} from "@mui/material";
import Typography from "@mui/material/Typography";
import { useMutation, useQuery } from "react-query";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

import {LogoPreview, LogoDeleteConfirm, } from "@/app/activities/components/LogoUploadDropzone";
import {ImageInput, ImagePreview, ImageDeleteConfirm, } from "@/app/activities/components/ImageUploadDropzone";
import DropZoneLogoUpload from "@/app/activities/components/LogoUploadDropzone";
import DropZoneImageUpload from "@/app/activities/components/ImageUploadDropzone";

import * as React from "react";
import Grid from "@mui/material/Grid";

import {
  getImagesWithMapBlock,
  patchImage,
  deleteImage,
  postImage,
  TEST_ACTIVITY_ID,
} from "@/app/activities/apiImage.mjs";

export default function ImagesBlock() {

  const [files, setFiles] = useState([]);
  const [filesLoaded, setFilesLoaded] = useState(false);
  const numberOfElements = 3;
  const imageInputs = [];

  const deleteMutation = useMutation((data) => deleteImage(data?.id), {
    onSuccess: (data, variables, context) => {
      setFiles(files => files.filter(item => item.id !== variables?.id));
    },
    onError: (error, variables, context) => {
      variables.error = error
    },
  });

  const postMutation = useMutation((file) => postImage({
      "name": file.name,
      "position": file.position,
      "size": file.size,
      "activity": TEST_ACTIVITY_ID,
      "image": file,
      "type": "with_map",
    }), {
    onSuccess: (data, variables, context) => {
      variables.error = null
      variables.id = data.id
    },
    onError: (error, variables, context) => {
      variables.error = error
    },
  });

  const {
    data: images,
    isLoading,
    isError,
  } = useQuery({
    queryKey: "images",
    queryFn: () => getImagesWithMapBlock(),
    enabled: !filesLoaded,  // disable repeated requests
    onSuccess: (data) => {
      setFilesLoaded(true);
    }
  });

  useEffect(() => {
    if (!isLoading && !isError && images) {
      setFiles(files => images);
    }
  }, [images, isLoading, isError]);

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach((file) => URL.revokeObjectURL(file.url));
  }, []);

  for (let i = 1; i <= numberOfElements; i++) {
    const _files = files.filter(f => f?.position == i)

    async function handleDelete() {
      files.filter(f => f?.position == i).map((file) => {
        if (file?.id) {
          deleteMutation.mutateAsync(file)
        } else {
          setFiles(files => files.filter(item => item !== _files[0]));
        }
      })
    }

    async function handleAppend(acceptedFiles) {
      setFiles(files => [...files, ...acceptedFiles.map((file, index) => {
          let new_object = Object.assign(file, {
            preview: URL.createObjectURL(file),
            position: i,
          })
          postMutation.mutate(new_object)
          return new_object
        }),
      ]);
    }

    imageInputs.push(
      <Grid key={i} item xs={4} sx={{ borderRadius: "8px" }}>
        <DropZoneImageUpload
          files={_files}
          position={i}
          handleDelete={handleDelete}
          handleAppend={handleAppend}
          key={i}
          sx={{
            backgroundColor: "#D9D9D9",
            backgroundColor: "#DEE2E6",
            height: "396px",
            borderRadius: "16px",
          }}
        />
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
            backgroundColor: "#DEE2E6",
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
