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
} from "@/app/activities/[activityId]/api.mjs";

export function SecondaryImageMessages({ messages }) {
  return (<Box>
    {messages.map((message, index) => (
      <Box key={index}>
        <Typography sx={{
          color: message.isError ? "red" : "#196B40",
          fontSize: 16,
          fontFamily: "Manrope",
          fontStyle: "normal",
          fontWeight: "400",
          lineHeight: 1,
          letterSpacing: 0.09,
          mt: 0.8,
        }}>
          {message.text}
        </Typography>
      </Box>
    ))}
  </Box>)
}

export function getMessages(mutation, frontendErrors) {
  const messages = []

  if (mutation?.error) {
    if (mutation?.error?.response?.data) {  // 2 types errors: from backend & if network failed
      for (const [key, value] of Object.entries(mutation?.error?.response?.data)) {
        messages.push({
          isError: true,
          text: key + ": " + value,
        })
      }
    } else if (mutation?.error?.message) {
      messages.push({
        isError: true,
        text: mutation?.error?.message,
      })
    } else {
      messages.push({
        isError: true,
        text: "Unknown error",
      })
    }
  }

  if (frontendErrors) {
    frontendErrors.forEach(errorText => {
      messages.push({
        isError: true,
        text: errorText,
      })
    })
  }

  if(messages.length === 0) {
    messages.push({
      isError: false,
      text: "Image approved",
    })
  }

  return messages
}

export function SecondaryImageWidget({initialFiles, order, enabled, ...props}) {
  const activityId = useParams().activityId
  const [messages, setMessages] = useState([])

  const [widgetFiles, setWidgetFiles] = useState(initialFiles)  // array with 0 or 1 element
  useEffect(() => {
    setWidgetFiles(widgetFiles => initialFiles)
    return () => initialFiles.forEach((file) => URL.revokeObjectURL(file.url));
  }, [initialFiles])


  function removeFile() {
    setWidgetFiles(widgetFiles => []);
  }

  function getfrontendErrors(file) {
    const frontendErrors = []
    if (file?.size > 5*1024*1024) {
      frontendErrors.push("image: Max file size is 5.0 MB")
    }
    return frontendErrors
  }

  const deleteMutation = useMutation((data) => deleteImage(activityId, data?.id), {
    onSuccess: (data, sentImage, context) => {
      removeFile()
      setMessages([{isError: false, text: "Image deleted"}])
    },
    onError: (error, sentImage, context) => {
      deleteMutation.error = error
      setMessages(getMessages(deleteMutation))
    },
  });

  const postMutation = useMutation((file) => postImage(activityId, {
      "name": file.name,
      "order": file.order,
      "size": file.size,
      "activity": activityId,
      "image": file,
      "type": "secondary",
    }), {
    onSuccess: (data, sentImage, context) => {
      setMessages([{isError: false, text: "Image approved"}])
      sentImage.id = data.id
    },
    onError: (error, sentImage, context) => {
      postMutation.error = error
      setMessages(getMessages(postMutation))
      removeFile()
    },
  });

  async function handleDelete() {
      widgetFiles.forEach((file) => {
      if (file?.id) {
        deleteMutation.mutate(file)
      } else {
        removeFile();
      }
    })
  }

  async function handleAppend(acceptedFiles) {
    setWidgetFiles([...acceptedFiles.map((file, index) => {
        const newObject = Object.assign(file, {
          preview: URL.createObjectURL(file),
          order,
        })
        const frontendErrors = getfrontendErrors(newObject)
        if (frontendErrors.length === 0) {
          postMutation.mutate(newObject)
        } else {
          setMessages(getMessages(null, frontendErrors))
          return null
        }

        return newObject
      }).filter((file) => file !== null),
    ]);
  }

  return (
    <Grid item md={4} sx={{ borderRadius: 8, width: "100%" }}>
      <DropZoneImageUpload
        files={widgetFiles}
        order={order}
        handleDelete={handleDelete}
        handleAppend={handleAppend}
        enabled={enabled}
        sx={{
          backgroundColor: "grey.200",
          height: { xs: 232, md: 396 },
          width: "100%",
          borderRadius: 4,
          border: "1px #ADB5BD solid",
          enabled: {enabled},
        }}
      />
      <SecondaryImageMessages messages={messages} />
    </Grid>
  )
}

export default function SecondaryImages() {

  const [initialFiles, setinitialFiles] = useState([]);
  const [isInitialFilesLoaded, setIsInitialFilesLoaded] = useState(false);
  const numberOfElements = 3;
  const imageInputs = [];
  const activityId = useParams().activityId

  const {
    data: images,
    isLoading,
    isError,
  } = useQuery({
    queryKey: "secondaryImages",
    queryFn: () => getSecondaryImages(1),
    enabled: !isInitialFilesLoaded,  // disable repeated requests
    onSuccess: (data) => {
      setinitialFiles(initialFiles => data);
      setIsInitialFilesLoaded(true);
    }
  });

  for (let order = 1; order <= numberOfElements; order++) {
    imageInputs.push(
      <SecondaryImageWidget
        initialFiles={initialFiles.filter((file) => file.order === order )}
        order={order}
        isInitialFilesLoaded={isInitialFilesLoaded}
      />
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
