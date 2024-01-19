"use client";

import { useEffect, useState } from "react";
import {Box, Button, Container, IconButton} from "@mui/material";
import Typography from "@mui/material/Typography";
import { useMutation, useQuery } from "react-query";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

import {ImageInput, ImagePreview, ImageDeleteConfirm, } from "@/app/activities/[activityId]/components/ImageUploadDropzone";
import DropZoneLogoUpload from "@/app/activities/[activityId]/components/LogoUploadDropzone";
import DropZoneImageUpload from "@/app/activities/[activityId]/components/ImageUploadDropzone";

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

    let messageColor = ""
    let messageTexts = []

    if (_files[0]) {
      _files[0].frontendErrors = []
      if (_files[0]?.size > 5*1024*1024) {
        _files[0]?.frontendErrors.push("image: Max file size is 5.0 MB")
      }
    }

    if (_files[0]?.error || _files[0]?.frontendErrors.length > 0) {
      messageColor = "red.500"
      if (_files[0]?.error?.response?.data) {  // 2 types errors: from backend & if network failed
        for (const [key, value] of Object.entries(_files[0]?.error?.response?.data)) {
          messageTexts.push(key + ": " + value)
        }
      } else if (_files[0]?.error?.message) {
        messageTexts.push(_files[0]?.error?.message)
      } else if (_files[0]?.frontendErrors?.length > 0) {
        _files[0]?.frontendErrors?.map(frontendError => messageTexts.push(frontendError))
      } else {
        messageTexts.push("Unknown error")
      }

    } else {
      messageColor = "green.500"
      if (_files[0]?.hasOwnProperty("error")) {
        messageTexts.push("Image approved")
      }
    }

    imageInputs.push(
      <Grid key={i} item md={4} sx={{ borderRadius: 8, width: "100%" }}>
        <DropZoneImageUpload
          files={_files}
          position={i}
          handleDelete={handleDelete}
          handleAppend={handleAppend}
          key={i}
          sx={{
            backgroundColor: "grey.200",
            height: { xs: 232, md: 396 },
            width: "100%",
            borderRadius: 4,
            border: "1px #ADB5BD solid",
          }}
        />
        <Box>
          {messageTexts.map(text => (
            <Box>
              <Typography sx={{
                color: messageColor,
                fontSize: 16,
                fontFamily: "Manrope",
                fontStyle: "normal",
                fontWeight: "400",
                lineHeight: 1,
                letterSpacing: 0.09,
                mt: 0.8,
              }}>
                {text}
              </Typography>
            </Box>
          ))}
        </Box>
      </Grid>
    );
  }

  return (
    <Container sx={{
      py: {xs: 6, md: 3},
      backgroundColor: "white",
      display: "flex",
      flexDirection: "column",
    }}>
      <Grid container spacing={3.5}>
        <Grid item xs={12} sx={{ borderRadius: 8 }}>
          <Box sx={{
            backgroundColor: "grey.200",
            borderRadius: 4,
            border: "1px #ADB5BD solid",
            px: 5,
            height: { xs: 416, md: 416 },
          }}>
            <Typography sx={{
              color: "black",
              py: 24,
              textAlign: "center",
              fontFamily: "Montserrat",
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
