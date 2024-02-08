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
  let colorSx;
  if (!image.id) colorSx = { color: "green.600" };
  if (image.toBeDeleted) colorSx = { color: "grey.400" };
  // Extracted, as every preview needs own useDrag and useDrop
  return (
    <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
      <TableCell component="th" scope="row">
        {"|||"}
      </TableCell>
      <TableCell align="right" sx={{ opacity: image.toBeDeleted ? 0.3 : 1 }}>
        <Image src={image.url} alt="thumbnail" width="50" height="50" />
      </TableCell>
      <TableCell align="right">
        <Typography sx={colorSx}>{image.name}</Typography>
        {!!image.errors && <Errors errors={image.errors} />}
      </TableCell>
      <TableCell align="right" sx={colorSx}>
        {image.order}
      </TableCell>
      <TableCell align="right" sx={colorSx}>
        {prettyBytes(image.size)}
      </TableCell>
      <TableCell align="right">
        {!image.toBeDeleted && (
          <IconButton onClick={() => handleDelete(index)}>
            <DeleteForeverIcon sx={colorSx} />
          </IconButton>
        )}
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
  const [frontEndErrors, setFrontEndErrors] = useState([]);

  const activityId = useParams().activityId;
  const queryClient = useQueryClient();
  const { data: serverImages } = useQuery(["primaryImages", activityId], () => getActivityImagesPrimary(activityId));
  const postMutation = useMutation((data) => postActivityImagePrimary(activityId, data));
  const deleteMutation = useMutation((data) => deleteActivityImagePrimary(activityId, data));

  useEffect(() => {
    setImages(serverImages);
  }, [serverImages]);

  useEffect(() => {
    setImages((images) => {
      let order = 1;
      images?.forEach((image) => {
        if (!image.toBeDeleted) image.order = order++;
        else image.order = null;
      });
    });
    setFrontEndErrors([]);
  }, [images]);

  function validateFile(file) {
    if (file.size > 5 * 1024 * 1024) return `Image "${file.name}" size (${prettyBytes(file.size)}) exceeds 5 MB.`;
  }

  function handleAdd(files) {
    const maxImagesAllowed = 5;
    if (images?.length + files?.length > maxImagesAllowed) {
      setFrontEndErrors([`Maximum ${maxImagesAllowed} images allowed.`]);
      return;
    }

    const newImages = [];
    const errors = [];

    files.forEach((file, index) => {
      const error = validateFile(file);
      if (error) errors.push(error);
      else
        newImages.push({
          activity: activityId,
          url: URL.createObjectURL(file),
          name: file.name,
          size: file.size,
          file,
        });
    });
    setImages((images) => {
      images.push(...newImages);
      // images.sort((a, b) => a.order - b.order);
    });
    setFrontEndErrors(errors);
  }

  function handleDelete(deleteIndex) {
    setImages((images) => {
      const image = images[deleteIndex];
      if (image.id) images[deleteIndex].toBeDeleted = true;
      else images.splice(deleteIndex, 1);
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
          <Errors errors={frontEndErrors} sx={{ textAlign: "center" }} />
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3, gap: 2 }}>
            <Button onClick={() => setImages(serverImages)} variant="outlined" color="grey">
              Cancel
            </Button>
            <Button onClick={handleSave} variant="contained" color="green">
              Save
            </Button>
          </Box>
        </>
      )}
    </Container>
  );
}
