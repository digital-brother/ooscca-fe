"use client";

import { useEffect, useState } from "react";
import { Box, Container } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useMutation, useQuery } from "react-query";
import { useParams } from "next/navigation";

import ImageUpload from "../components/ImageUploadDropzone";

import * as React from "react";
import Grid from "@mui/material/Grid";

import { getSecondaryImages, deleteImage, postImage } from "../api.mjs";

export function SecondaryImageMessages({ file }) {
  let messageColor = "";
  const messageTexts = [];

  if (file) {
    file.frontendErrors = [];
    if (file?.size > 5 * 1024 * 1024) {
      file?.frontendErrors.push("image: Max file size is 5.0 MB");
    }
  }

  if (file?.error || file?.frontendErrors.length > 0) {
    messageColor = "red.500";
    if (file?.error?.response?.data) {
      // 2 types errors: from backend & if network failed
      for (const [key, value] of Object.entries(file?.error?.response?.data)) {
        messageTexts.push(key + ": " + value);
      }
    } else if (file?.error?.message) {
      messageTexts.push(file?.error?.message);
    } else if (file?.frontendErrors?.length > 0) {
      file?.frontendErrors?.map((frontendError) => messageTexts.push(frontendError));
    } else {
      messageTexts.push("Unknown error");
    }
  } else {
    messageColor = "green.500";
    if (Object.prototype.isPrototypeOf.call(file, "error")) {
      messageTexts.push("Image approved");
    }
  }

  return (
    <Box>
      {messageTexts.map((text, index) => (
        <Box key={index}>
          <Typography
            sx={{
              color: messageColor,
              fontSize: 16,
              fontFamily: "Manrope",
              fontStyle: "normal",
              fontWeight: "400",
              lineHeight: 1,
              letterSpacing: 0.09,
              mt: 0.8,
            }}
          >
            {text}
          </Typography>
        </Box>
      ))}
    </Box>
  );
}

export function SecondaryImage({ initialFile, order, enabled }) {
  const activityId = useParams().activityId;

  const [file, setFile] = useState(initialFile);
  useEffect(() => {
    setFile(initialFile);
  }, [initialFile]);

  const [widgetFiles, setWidgetFiles] = useState(initialFile); // array with 0 or 1 element
  useEffect(() => {
    setWidgetFiles((widgetFiles) => initialFile);
  }, [initialFile]);

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => (file) => URL.revokeObjectURL(file.url);
  }, [initialFile]);

  function removeFile() {
    setWidgetFiles((widgetFiles) => []);
  }

  const deleteMutation = useMutation((data) => deleteImage(data?.id), {
    onSuccess: (data, sentImage, context) => {
      removeFile();
    },
    onError: (error, sentImage, context) => {
      sentImage.error = error;
    },
  });

  const postMutation = useMutation(
    (file) =>
      postImage({
        name: file.name,
        order: file.order,
        size: file.size,
        activity: activityId,
        image: file,
        type: "secondary",
      }),
    {
      onSuccess: (data, sentImage, context) => {
        sentImage.error = null;
        sentImage.id = data.id;
      },
      onError: (error, sentImage, context) => {
        sentImage.error = error;
      },
    }
  );

  async function handleDelete() {
    widgetFiles.forEach((file) => {
      if (file?.id) {
        deleteMutation.mutateAsync(file);
      } else {
        removeFile();
      }
    });
  }

  async function handleAppend(acceptedFiles) {
    setWidgetFiles((widgetFiles) => [
      ...widgetFiles,
      ...acceptedFiles.map((file, index) => {
        const newObject = Object.assign(file, {
          preview: URL.createObjectURL(file),
          order,
        });
        postMutation.mutate(newObject);
        return newObject;
      }),
    ]);
  }

  return (
    <Grid item md={4} sx={{ borderRadius: 8, width: "100%" }}>
      <ImageUpload
        file={file}
        setFile={setFile}
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
          enabled: { enabled },
        }}
      />
      <SecondaryImageMessages file={widgetFiles} />
    </Grid>
  );
}

export default function SecondaryImagesSection() {
  const activityId = useParams().activityId;
  const { data: images } = useQuery("secondaryImages", () => getSecondaryImages(activityId));

  function getFileByOrder(order) {
    const imageArr = images?.filter((file) => file.order === order);
    return imageArr ? imageArr[0] : null;
  }

  return (
    <Container sx={{ my: { xs: 6, md: 10 }, display: "flex", gap: 4 }}>
      {Array.from({ length: 3 }).map((_, index) => (
        <SecondaryImage key={index + 1} initialFile={getFileByOrder(index + 1)} order={index + 1} />
      ))}
    </Container>
  );
}