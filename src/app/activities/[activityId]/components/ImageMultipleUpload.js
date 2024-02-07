"use client";

import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import {
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Box, Container } from "@mui/system";
import { useEffect, useState } from "react";
import { ImageInput } from "./ImageUpload";

import _ from "lodash";
import Image from "next/image";
import { useParams } from "next/navigation";
import prettyBytes from "pretty-bytes";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { deleteActivityImagePrimary, getActivityImagesPrimary, postActivityImagePrimary } from "../api.mjs";
import { useImmer } from "use-immer";
import { Errors, getFlatErrors } from "./formikFields";

function ImagePreviewRow({ index, image, handleDelete }) {
  // Extracted, as every preview needs own useDrag and useDrop
  return (
    <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
      <TableCell component="th" scope="row">
        {"|||"}
      </TableCell>
      <TableCell align="right">
        <Image src={image.url} alt="thumbnail" width="50" height="50" />
      </TableCell>
      <TableCell align="right">
        <Typography>{image.name}</Typography>
        {!!image.errors && <Errors errors={image.errors} />}
      </TableCell>
      <TableCell align="right">{image.order}</TableCell>
      <TableCell align="right">{prettyBytes(image.size)}</TableCell>
      <TableCell align="right">
        <IconButton onClick={() => handleDelete(index)}>
          <DeleteForeverIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
}

function ImagePreviewTable({ images, handleDelete }) {
  return (
    <TableContainer sx={{ mt: 5 }}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell align="right">Thumbnail</TableCell>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Order</TableCell>
            <TableCell align="right">Size</TableCell>
            <TableCell align="right">Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {images.map((image, index) => (
            <ImagePreviewRow key={index} {...{ index, image, handleDelete }} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default function ImageMultipleUpload() {
  const [images, setImages] = useImmer([]);

  const activityId = useParams().activityId;
  const queryClient = useQueryClient();
  const { data: serverImages } = useQuery(["primaryImages", activityId], () => getActivityImagesPrimary(activityId));
  const postMutation = useMutation((data) => postActivityImagePrimary(activityId, data));
  const deleteMutation = useMutation((data) => deleteActivityImagePrimary(activityId, data));

  useEffect(() => {
    setImages(serverImages);
  }, [serverImages]);

  const filesCount = images?.length;
  function handleAdd(files) {
    const newImages = files.map((file, index) => ({
      activity: activityId,
      url: URL.createObjectURL(file),
      order: index + filesCount + 1,
      name: file.name,
      size: file.size,
      file,
    }));
    setImages((images) => {
      images.push(...newImages);
      images.sort((a, b) => a.order - b.order);
    });
  }

  function handleDelete(deleteIndex) {
    setImages((images) => {
      images[deleteIndex].toBeDeleted = true;
    });
  }

  function handleSave() {
    images.forEach((image, index) => {
      const isAdded = !image.id;
      const isUpdated = serverImages.some(
        (serverImage) => serverImage.id === image.id && !_.isEqual(image, serverImage)
      );

      if (isAdded)
        postMutation.mutate(image, {
          onError: (error) => {
            setImages((images) => {
              const errors = getFlatErrors(error);
              images[index].errors = errors;
            });
          },
          onSuccess: () => {
            queryClient.invalidateQueries(["primaryImages", activityId]);
          },
        });

      if (image.toBeDeleted)
        deleteMutation.mutate(image.id, {
          onError: (error) => {
            setImages((images) => {
              const errors = getFlatErrors(error);
              images[index].errors = errors;
            });
          },
          onSuccess: () => {
            queryClient.invalidateQueries(["primaryImages", activityId]);
          },
        });
    });
  }

  useEffect(() => {
    return () => images.forEach((image) => URL.revokeObjectURL(image.file));
  }, []);

  return (
    <Container sx={{ my: 10 }}>
      <Box sx={{ height: 110, border: "1px #ADB5BD solid", borderRadius: 1.5, bgcolor: "grey.200" }}>
        <ImageInput multiple={true} handleAdd={handleAdd} />
      </Box>
      {!!images?.length && (
        <>
          <ImagePreviewTable {...{ images, handleDelete }} />
          <Button onClick={handleSave} variant="contained" color="green" sx={{ mt: 4, display: "block", ml: "auto" }}>
            Save
          </Button>
        </>
      )}
    </Container>
  );
}
