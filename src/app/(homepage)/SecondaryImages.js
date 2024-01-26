"use client";

import { useEffect, useState } from "react";
import {Box, Container} from "@mui/material";
import Typography from "@mui/material/Typography";
import { useMutation, useQuery } from "react-query";
import { useParams } from "next/navigation";

import DropZoneImageUpload from "@/app/activities/[activityId]/components/ImageUploadDropzone";

import * as React from "react";
import Grid from "@mui/material/Grid";

import {
  getSecondaryImages,
  deleteImage,
  postImage,
} from "@/app/activities/apiImage.mjs";

export default function SecondaryImages() {

  const [files, setFiles] = useState([]);
  const [isFilesLoaded, setIsFilesLoaded] = useState(false);
  const numberOfElements = 3;
  const imageInputs = [];
  const activityId = useParams().activityId;

  function removeFile(sentImage) {
    setFiles(files => files.filter(item => item.id !== sentImage?.id));
  }

  const deleteMutation = useMutation((data) => deleteImage(data?.id), {
    onSuccess: (data, sentImage, context) => {
      removeFile(sentImage);
    },
    onError: (error, sentImage, context) => {
      sentImage.error = error
    },
  });

  const postMutation = useMutation((file) => postImage({
      "name": file.name,
      "order": file.order,
      "size": file.size,
      "activity": activityId,
      "image": file,
      "type": "secondary",
    }), {
    onSuccess: (data, sentImage, context) => {
      sentImage.error = null
      sentImage.id = data.id
    },
    onError: (error, sentImage, context) => {
      sentImage.error = error
    },
  });

  const {
    data: images,
    isLoading,
    isError,
  } = useQuery({
    queryKey: "secondaryImages",
    queryFn: () => getSecondaryImages(),
    enabled: !isFilesLoaded,  // disable repeated requests
    onSuccess: () => {
      setIsFilesLoaded(true);
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
  }, [files]);

  for (let i = 1; i <= numberOfElements; i++) {
    const _files = files.filter(f => f?.order === i)

    async function handleDelete() {
        _files.forEach((file) => {
        if (file?.id) {
          deleteMutation.mutateAsync(file)
        } else {
          setFiles(files => files.filter(item => item !== _files[0]));
        }
      })
    }

    async function handleAppend(acceptedFiles) {
      setFiles(files => [...files, ...acceptedFiles.map((file, index) => {
          const newObject = Object.assign(file, {
            preview: URL.createObjectURL(file),
            order: i,
          })
          postMutation.mutate(newObject)
          return newObject
        }),
      ]);
    }

    let messageColor = ""
    const messageTexts = []

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
      if (Object.prototype.isPrototypeOf.call(_files[0], "error")) {
        messageTexts.push("Image approved")
      }
    }

    imageInputs.push(
      <Grid key={i} item md={4} sx={{ borderRadius: 8, width: "100%" }}>
        <DropZoneImageUpload
          files={_files}
          order={i}
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
          {messageTexts.map((text, index) => (
            <Box key={index}>
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
        {imageInputs}
      </Grid>
    </Container>
  )
}
